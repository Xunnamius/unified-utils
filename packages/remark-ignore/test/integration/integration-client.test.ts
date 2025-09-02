// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, { name as packageName } from 'rootverse+remark-ignore:package.json';

import { getFixtureString } from 'testverse+remark-ignore:helpers.ts';

import {
  dummyFilesFixture,
  dummyNpmPackageFixture,
  ensurePackageHasBeenBuilt,
  mockFixturesFactory,
  nodeImportAndRunTestFixture,
  npmCopyPackageFixture,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

import type { PackageJson } from 'type-fest';

const TEST_IDENTIFIER = `${packageName.split('/').at(-1)!}-client`;
const debug = createDebugLogger({ namespace: 'remark-ignore' }).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(toAbsolutePath(require.resolve('rootverse+remark-ignore:package.json'))),
    packageJson.name,
    packageJson.exports
  );
});

const withMockedFixture = mockFixturesFactory(
  [
    dummyNpmPackageFixture,
    dummyFilesFixture,
    npmCopyPackageFixture,
    nodeImportAndRunTestFixture
  ],
  {
    performCleanup: true,
    identifier: TEST_IDENTIFIER,
    initialVirtualFiles: {},
    packageUnderTest: {
      root: toAbsolutePath(__dirname, '../..'),
      attributes: { esm: true, monorepo: true },
      json: packageJson as PackageJson
    },
    additionalPackagesToInstall: [
      'remark',
      'remark-cli',
      'remark-remove-comments@0.2.0',
      'remark-reference-links'
    ]
  }
);

describe('via api', () => {
  it('works as an ESM import', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toBeEmpty();
        expect(context.testResult.stdout).toBe('success');
        expect(context.testResult.exitCode).toBe(0);
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
        }
      }
    );
  });
});

describe('via remark-cli inline configuration', () => {
  it('works with --use option using default syntax', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('ignore-range') },
        runWith: {
          useIndexPath: false,
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('ignore-range-2') },
        runWith: {
          useIndexPath: false,
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
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
          useIndexPath: false,
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
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
          useIndexPath: false,
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
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
          useIndexPath: false,
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/m);
        expect(context.testResult.stdout).toBe(
          getFixtureString('ignore-range-2-transformed', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
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
          useIndexPath: false,
          binary: 'npx',
          args: ['--no-install', 'remark', 'README.md']
        }
      }
    );
  });
});
