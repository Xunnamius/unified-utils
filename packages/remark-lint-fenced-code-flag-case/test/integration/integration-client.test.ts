// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+remark-lint-fenced-code-flag-case:package.json';

import { getFixtureString } from 'testverse+remark-lint-fenced-code-flag-case:helpers.ts';

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
const debug = createDebugLogger({
  namespace: 'remark-lint-fenced-code-flag-case'
}).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(
        require.resolve('rootverse+remark-lint-fenced-code-flag-case:package.json')
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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js"\s/
        );

        expect(context.testResult.stdout).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript"$/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'src/index.mjs': /*js*/ `
            import { remark } from 'remark';
            import remarkLintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case';

            const file = await remark()
              .use(remarkLintFencedCodeFlagCase)
              .process(${JSON.stringify(getFixtureString('not-ok-upper'))});

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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js".*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('not-ok-upper') },
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
            'remark-lint-fenced-code-flag-case',
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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js".*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-upper'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['lint-fenced-code-flag-case'] }
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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js".*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-upper'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: {
              plugins: ['remark-lint', 'remark-lint-fenced-code-flag-case']
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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js".*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-upper'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-lint', 'remark-lint-fenced-code-flag-case']
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
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js".*/
        );

        expect(context.testResult.stderr).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-upper'),
          '.remarkrc.mjs': `
            import remarkLintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case';
            export default { plugins: [remarkLintFencedCodeFlagCase] };
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
