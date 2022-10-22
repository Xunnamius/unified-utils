import assert from 'node:assert';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import { getFixtureString } from 'pkgverse/remark-ignore/test/helpers';
import { name as pkgName, exports as pkgExports } from '../package.json';

import {
  mockFixtureFactory,
  dummyFilesFixture,
  dummyNpmPackageFixture,
  npmCopySelfFixture,
  nodeImportTestFixture,
  runTestFixture
} from 'testverse/setup';

// TODO: note that we've made some modifications to the setup.ts file that
// TODO: should be propagated!

const TEST_IDENTIFIER = 'integration-node';
const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);

const pkgMainPaths = Object.values(pkgExports)
  .map((xport) =>
    typeof xport == 'string' ? null : `${__dirname}/../${xport.node || xport.default}`
  )
  .filter(Boolean) as string[];

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, {
  performCleanup: true,
  pkgRoot: `${__dirname}/..`,
  pkgName,
  use: [
    dummyNpmPackageFixture(),
    dummyFilesFixture(),
    npmCopySelfFixture(),
    runTestFixture()
  ],
  npmInstall: ['remark', 'remark-cli', 'remark-remove-comments', 'remark-reference-links']
});

beforeAll(async () => {
  debug('pkgMainPaths: %O', pkgMainPaths);

  await Promise.all(
    pkgMainPaths.map(async (pkgMainPath) => {
      if ((await run('test', ['-e', pkgMainPath])).code != 0) {
        debug(`unable to find main distributable: ${pkgMainPath}`);
        throw new Error('must build distributables first (try `npm run build:dist`)');
      }
    })
  );
});

describe('via api', () => {
  it('works as an ESM import', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (ctx) => {
        assert(ctx.testResult, 'must use node-import-test fixture');
        expect(ctx.testResult?.stderr).toBeEmpty();
        expect(ctx.testResult?.stdout).toBe('success');
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'src/index.mjs': `
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
          npmCopySelfFixture(),
          nodeImportTestFixture()
        ]
      }
    );
  });
});

describe('via remark-cli inline configuration', () => {
  it('works with --use option using default syntax', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: { 'README.md': getFixtureString('ignore-range') },
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
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: { 'README.md': getFixtureString('ignore-range-2') },
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
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
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
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
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
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
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
      async (ctx) => {
        assert(ctx.testResult, 'must use run-test-test fixture');
        expect(ctx.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(ctx.testResult?.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(ctx.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
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
