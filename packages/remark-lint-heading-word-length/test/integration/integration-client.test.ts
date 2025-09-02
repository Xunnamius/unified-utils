// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+remark-lint-heading-word-length:package.json';

import { getFixtureString } from 'testverse+remark-lint-heading-word-length:helpers.ts';

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
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;
const debug = createDebugLogger({ namespace: 'remark-lint-heading-word-length' }).extend(
  TEST_IDENTIFIER
);

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(
        require.resolve('rootverse+remark-lint-heading-word-length:package.json')
      )
    ),
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
    additionalPackagesToInstall: ['remark', 'remark-cli', 'remark-lint']
  }
);

describe('via api', () => {
  it('works as an ESM import', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toBeEmpty();

        expect(context.testResult.stdout).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\)\s/
        );

        expect(context.testResult.stdout).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\)$/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'src/index.mjs': /*js*/ `
            import { remark } from 'remark';
            import remarkLintHeadingWordLength from 'remark-lint-heading-word-length';

            const file = await remark()
              .use(remarkLintHeadingWordLength)
              .process(${JSON.stringify(getFixtureString('not-ok'))});

            console.log(file.messages.map(String).join('\\n'));
          `
        }
      }
    );
  });
});

describe('via remark-cli inline configuration', () => {
  it('works with --use option', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stdout).toBeEmpty();

        expect(context.testResult.stderr).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\).*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\).*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('not-ok') },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: [
            '--no-install',
            'remark',
            '--no-stdout',
            '--use',
            'remark-lint',
            '--use',
            'remark-lint-heading-word-length',
            'README.md'
          ]
        }
      }
    );
  });
});

describe('via remark-cli unified configuration', () => {
  it('works with package.json (short-string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stdout).toBeEmpty();

        expect(context.testResult.stderr).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\).*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\).*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['lint-heading-word-length'] }
          })
        },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });

  it('works with package.json (string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stdout).toBeEmpty();
        expect(context.testResult.stderr).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\).*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\).*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: {
              plugins: ['remark-lint', 'remark-lint-heading-word-length']
            }
          })
        },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });

  it('works with .remarkrc.js (string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stdout).toBeEmpty();

        expect(context.testResult.stderr).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\).*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\).*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-lint', 'remark-lint-heading-word-length']
            };
          `
        },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });

  it('works with .remarkrc.mjs (function)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stdout).toBeEmpty();

        expect(context.testResult.stderr).toMatch(
          /.*?1:1-1:51.*?Heading must have at most 10 words \(current length: 11\).*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?3:1-3:2.*?Heading must have at least 1 word \(current length: 0\).*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok'),
          '.remarkrc.mjs': `
            import remarkLintHeadingWordLength from 'remark-lint-heading-word-length';
            export default { plugins: [remarkLintHeadingWordLength] };
          `
        },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });
});
