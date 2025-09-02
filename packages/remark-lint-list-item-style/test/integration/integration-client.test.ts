// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+remark-lint-list-item-style:package.json';

import { getFixtureString } from 'testverse+remark-lint-list-item-style:helpers.ts';

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
const debug = createDebugLogger({ namespace: 'remark-lint-list-item-style' }).extend(
  TEST_IDENTIFIER
);

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(
        require.resolve('rootverse+remark-lint-list-item-style:package.json')
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
          /.*?1:3-1:8.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult.stdout).toMatch(
          /.*?2:3-2:7.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult.stdout).toMatch(
          /.*?3:3-3:8.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult.stdout).toMatch(
          /.*?4:1-4:2.*?empty list item without punctuation is not allowed$/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'src/index.mjs': /*js*/ `
            import { remark } from 'remark';
            import remarkLintListItemStyle from 'remark-lint-list-item-style';

            const file = await remark()
              .use(remarkLintListItemStyle)
              .process(${JSON.stringify(getFixtureString('not-ok-punctuation'))});

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
          /.*?1:3-1:35.*?Inconsistent list item capitalization: "n" should be "N".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('not-ok-first-word') },
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
            'remark-lint-list-item-style',
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
          /.*?1:3-1:35.*?Inconsistent list item capitalization: "n" should be "N".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-first-word'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['lint-list-item-style'] }
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
          /.*?1:3-1:35.*?Inconsistent list item capitalization: "n" should be "N".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-first-word'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['remark-lint', 'remark-lint-list-item-style'] }
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
          /.*?1:3-1:35.*?Inconsistent list item capitalization: "n" should be "N".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-first-word'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-lint', 'remark-lint-list-item-style']
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
          /.*?1:3-1:35.*?Inconsistent list item capitalization: "n" should be "N".*/
        );

        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('not-ok-first-word'),
          '.remarkrc.mjs': `
            import remarkLintListItemStyle from 'remark-lint-list-item-style';
            export default { plugins: [remarkLintListItemStyle] };
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
