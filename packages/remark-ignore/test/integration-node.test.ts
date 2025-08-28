import assert from 'node:assert';

import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';

import { getFixtureString } from 'testverse+remark-ignore:helpers.ts';

import {
  dummyFilesFixture,
  dummyNpmPackageFixture,
  mockFixturesFactory,
  nodeImportAndRunTestFixture,
  npmCopyPackageFixture,
  runTestFixture
} from 'testverse:util.ts';

import { exports as packageExports, name as packageName } from '../package.json';

// TODO: note that we've made some modifications to the setup.ts file that
// TODO: should be propagated!

const TEST_IDENTIFIER = 'integration-node';
const debug = debugFactory(`${packageName}:${TEST_IDENTIFIER}`);

const packageMainPaths = Object.values(packageExports)
  .map((xport) =>
    typeof xport === 'string' ? null : `${__dirname}/../${xport.node || xport.default}`
  )
  .filter(Boolean) as string[];

const withMockedFixture = mockFixturesFactory(TEST_IDENTIFIER, {
  performCleanup: true,
  pkgRoot: `${__dirname}/..`,
  pkgName: packageName,
  use: [
    dummyNpmPackageFixture(),
    dummyFilesFixture(),
    npmCopyPackageFixture(),
    runTestFixture()
  ],
  npmInstall: [
    'remark',
    'remark-cli',
    'remark-remove-comments@0.2.0',
    'remark-reference-links'
  ]
});

beforeAll(async () => {
  debug('pkgMainPaths: %O', packageMainPaths);

  await Promise.all(
    packageMainPaths.map(async (packageMainPath) => {
      if ((await run('test', ['-e', packageMainPath])).code != 0) {
        debug(`unable to find main distributable: ${packageMainPath}`);
        throw new Error('must build distributables first (try `npm run build:dist`)');
      }
    })
  );
});

describe('via api', () => {
  it('works as an ESM import', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult?.stderr).toBeEmpty();
        expect(context.testResult?.stdout).toBe('success');
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: {
          'src/index.mjs': /*js*/ `
import { deepStrictEqual } from 'assert';
import { remark } from 'remark';
import remarkReferenceLinks from 'remark-reference-links';
import remarkIgnore, { ignoreStart, ignoreEnd } from 'remark-ignore';
import defaultIgnoreStart from 'remark-ignore/start';
import defaultIgnoreEnd from 'remark-ignore/end';

const mdIgnoreNext = ${JSON.stringify(getFixtureString('ignore-next'))};

const mdIgnoreNextTransformed = ${JSON.stringify(
            getFixtureString('ignore-next-transformed')
          )};

const result1 = await remark()
  .use(remarkIgnore)
  .use(remarkReferenceLinks)
  .process(mdIgnoreNext);

const result2 = await remark()
  .use(ignoreStart)
  .use(remarkReferenceLinks)
  .use(ignoreEnd)
  .process(mdIgnoreNext);

const result3 = await remark()
  .use(defaultIgnoreStart)
  .use(remarkReferenceLinks)
  .use(defaultIgnoreEnd)
  .process(mdIgnoreNext);

deepStrictEqual(result1.toString(), mdIgnoreNextTransformed);
deepStrictEqual(result2.toString(), mdIgnoreNextTransformed);
deepStrictEqual(result3.toString(), mdIgnoreNextTransformed);

console.log('success');
      `
        },
        use: [
          dummyNpmPackageFixture(),
          dummyFilesFixture(),
          npmCopyPackageFixture(),
          nodeImportAndRunTestFixture()
        ]
      }
    );
  });
});

describe('via remark-cli inline configuration', () => {
  it('works with --use option using default syntax', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('ignore-range') },
        runWith: {
          binary: 'npx',
          args: [
            '--no-install',
            'remark',
            '--use',
            'remark-ignore',
            '--use',
            'remark-reference-links',
            'README.md'
          ]
        }
      }
    );
  });

  it('works with --use option using alternative syntax', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('ignore-range-2') },
        runWith: {
          binary: 'npx',
          args: [
            '--no-install',
            'remark',
            '--use',
            'ignore/start',
            '--use',
            'reference-links',
            '--use',
            'ignore/end',
            '--use',
            'remove-comments',
            'README.md'
          ]
        }
      }
    );
  });
});

describe('via remark-cli unified configuration', () => {
  it('works with package.json using default syntax (short-string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('ignore-range'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['ignore', 'reference-links'] }
          })
        },
        runWith: {
          binary: 'npx',
          args: ['--no-install', 'remark', 'README.md']
        }
      }
    );
  });

  it('works with package.json using default syntax (string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('ignore-range'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['remark-ignore', 'remark-reference-links'] }
          })
        },
        runWith: {
          binary: 'npx',
          args: ['--no-install', 'remark', 'README.md']
        }
      }
    );
  });

  it('works with .remarkrc.js using alternative syntax (strings)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('ignore-range-2'),
          '.remarkrc.js': `
            module.exports = {
              plugins: [
                'remark-ignore/start',
                'remark-reference-links',
                'remark-ignore/end',
                'remark-remove-comments'
              ]
            };
          `
        },
        runWith: {
          binary: 'npx',
          args: ['--no-install', 'remark', 'README.md']
        }
      }
    );
  });

  it('works with .remarkrc.mjs using alternative syntax (short-string, function)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('ignore-range-2'),
          '.remarkrc.mjs': `
            import { ignoreStart } from 'remark-ignore';
            export default {
              plugins: [
                ignoreStart,
                'reference-links',
                'ignore/end',
                'remove-comments'
              ]
            };
          `
        },
        runWith: {
          binary: 'npx',
          args: ['--no-install', 'remark', 'README.md']
        }
      }
    );
  });
});
