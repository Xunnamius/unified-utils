import assert from 'node:assert';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import { getFixtureString } from 'pkgverse/remark-renumber-references/test/helpers';
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
  npmInstall: ['remark', 'remark-cli', 'remark-gfm']
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
      async (context) => {
        assert(context.testResult, 'must use node-import-test fixture');
        expect(context.testResult?.stderr).toBeEmpty();
        expect(context.testResult?.stdout).toBe(getFixtureString('renumbered-all'));
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'src/index.mjs': `
            import { remark } from 'remark';
            import remarkGfm from 'remark-gfm';
            import remarkRenumberReferences from 'remark-renumber-references';

            const file = await remark()
              .use(remarkGfm)
              .use(remarkRenumberReferences, { preserveAlphanumericDefinitions: false })
              .process(${JSON.stringify(getFixtureString('numbered'))});

            console.log(String(file));
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
  it('works with --use option', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('renumbered', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: { 'README.md': getFixtureString('numbered') },
        runWith: {
          binary: 'npx',
          args: [
            '--no-install',
            'remark',
            '--use',
            'remark-gfm',
            '--use',
            'remark-renumber-references',
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('renumbered', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('numbered'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['gfm', 'renumber-references'] }
          })
        },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('renumbered', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('numbered'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['remark-gfm', 'remark-renumber-references'] }
          })
        },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('renumbered', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('numbered'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-gfm', 'remark-renumber-references']
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

  it('works with .remarkrc.mjs (function)', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stderr).toMatch(/^.*README\.md.*: no issues found$/);
        expect(context.testResult?.stdout).toBe(
          getFixtureString('renumbered', { trim: true })
        );
        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('numbered'),
          '.remarkrc.mjs': `
            import remarkRenumberReferences from 'remark-renumber-references';
            export default { plugins: ['gfm', remarkRenumberReferences] };
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
