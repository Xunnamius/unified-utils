import assert from 'node:assert';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import { getFixtureString } from 'pkgverse/remark-lint-list-item-style/test/helpers';
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
  npmInstall: ['remark', 'remark-cli', 'remark-lint']
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

        expect(context.testResult?.stdout).toMatch(
          /.*?1:3-1:8.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult?.stdout).toMatch(
          /.*?2:3-2:7.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult?.stdout).toMatch(
          /.*?3:3-3:8.*?"a" is not allowed to punctuate list item\s/
        );

        expect(context.testResult?.stdout).toMatch(
          /.*?4:1-4:2.*?empty list item without punctuation is not allowed$/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'src/index.mjs': `
            import { remark } from 'remark';
            import remarkLintListItemStyle from 'remark-lint-list-item-style';

            const file = await remark()
              .use(remarkLintListItemStyle)
              .process(${JSON.stringify(getFixtureString('not-ok-punctuation'))});

              console.log(file.messages.map(String).join('\\n'));
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
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*? 1:3-1:35 .*? Inconsistent list item capitalization: "n" should be "N" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: { 'README.md': getFixtureString('not-ok-first-word') },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*? 1:3-1:35 .*? Inconsistent list item capitalization: "n" should be "N" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('not-ok-first-word'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['lint-list-item-style'] }
          })
        },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();
        expect(context.testResult?.stderr).toMatch(
          /.*? 1:3-1:35 .*? Inconsistent list item capitalization: "n" should be "N" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('not-ok-first-word'),
          'package.json': JSON.stringify({
            name: 'dummy-pkg',
            remarkConfig: { plugins: ['remark-lint', 'remark-lint-list-item-style'] }
          })
        },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*? 1:3-1:35 .*? Inconsistent list item capitalization: "n" should be "N" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('not-ok-first-word'),
          '.remarkrc.js': `
            module.exports = {
              plugins: ['remark-lint', 'remark-lint-list-item-style']
            };
          `
        },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*? 1:3-1:35 .*? Inconsistent list item capitalization: "n" should be "N" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialFileContents: {
          'README.md': getFixtureString('not-ok-first-word'),
          '.remarkrc.mjs': `
            import remarkLintListItemStyle from 'remark-lint-list-item-style';
            export default { plugins: [remarkLintListItemStyle] };
          `
        },
        runWith: {
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });
});
