// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+remark-remove-url-trailing-slash:package.json';

import { getFixtureString } from 'testverse+remark-remove-url-trailing-slash:helpers.ts';

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
  namespace: 'remark-remove-url-trailing-slash'
}).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(
        require.resolve('rootverse+remark-remove-url-trailing-slash:package.json')
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
    additionalPackagesToInstall: ['remark', 'remark-cli', 'remark-gfm']
  }
);

describe('via api', () => {
  it('works as an ESM import', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toBeEmpty();
        expect(context.testResult.stdout).toBe(getFixtureString('no-slashes'));
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'src/index.mjs': /*js*/ `
            import { remark } from 'remark';
            import remarkGfm from 'remark-gfm';
            import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';

            const file = await remark()
              .use(remarkGfm)
              .use(remarkRemoveUrlTrailingSlash)
              .process(${JSON.stringify(getFixtureString('slashes'))});

            console.log(String(file));
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult.stdout).toBe(
          getFixtureString('no-slashes', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('slashes') },
        runWith: {
          useIndexPath: false,
          binary: 'npx',
          args: [
            '--no-install',
            'remark',
            '--use',
            'remark-gfm',
            '--use',
            'remark-remove-url-trailing-slash',
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
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult.stdout).toBe(
          getFixtureString('no-slashes', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('slashes'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['gfm', 'remove-url-trailing-slash'] }
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

  it('works with package.json (string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult.stdout).toBe(
          getFixtureString('no-slashes', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('slashes'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['remark-gfm', 'remark-remove-url-trailing-slash'] }
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

  it('works with .remarkrc.js (string)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult.stdout).toBe(
          getFixtureString('no-slashes', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('slashes'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-gfm', 'remark-remove-url-trailing-slash']
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

  it('works with .remarkrc.mjs (function)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        expect(context.testResult.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult.stdout).toBe(
          getFixtureString('no-slashes', { trim: true })
        );
        expect(context.testResult.exitCode).toBe(0);
      },
      {
        initialVirtualFiles: {
          'README.md': getFixtureString('slashes'),
          '.remarkrc.mjs': `
            import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';
            export default { plugins: ['gfm', remarkRemoveUrlTrailingSlash] };
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
