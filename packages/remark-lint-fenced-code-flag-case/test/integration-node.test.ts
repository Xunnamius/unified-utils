import assert from 'node:assert';

import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';

import { getFixtureString } from 'testverse+remark-lint-fenced-code-flag-case:helpers.ts';

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
  npmInstall: ['remark', 'remark-cli', 'remark-lint']
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

        expect(context.testResult?.stdout).toMatch(
          /.*?3:1-5:4.*?Code fence flag "JS" should be "js"\s/
        );

        expect(context.testResult?.stdout).toMatch(
          /.*?7:1-9:4.*?Code fence flag "JAVASCRIPT" should be "javascript"$/
        );

        expect(context.testResult?.code).toBe(0);
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
  it('works with --use option', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*?3:1-5:4 .*? Code fence flag "JS" should be "js" .*/
        );

        expect(context.testResult?.stderr).toMatch(
          /.*?7:1-9:4 .*? Code fence flag "JAVASCRIPT" should be "javascript" .*/
        );

        expect(context.testResult?.code).toBe(0);
      },
      {
        initialVirtualFiles: { 'README.md': getFixtureString('not-ok-upper') },
        runWith: {
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
        assert(context.testResult, 'must use run-test-test fixture');
        expect(context.testResult?.stdout).toBeEmpty();

        expect(context.testResult?.stderr).toMatch(
          /.*?3:1-5:4 .*? Code fence flag "JS" should be "js" .*/
        );

        expect(context.testResult?.stderr).toMatch(
          /.*?7:1-9:4 .*? Code fence flag "JAVASCRIPT" should be "javascript" .*/
        );

        expect(context.testResult?.code).toBe(0);
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
          /.*?3:1-5:4 .*? Code fence flag "JS" should be "js" .*/
        );

        expect(context.testResult?.stderr).toMatch(
          /.*?7:1-9:4 .*? Code fence flag "JAVASCRIPT" should be "javascript" .*/
        );

        expect(context.testResult?.code).toBe(0);
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
          /.*?3:1-5:4 .*? Code fence flag "JS" should be "js" .*/
        );

        expect(context.testResult?.stderr).toMatch(
          /.*?7:1-9:4 .*? Code fence flag "JAVASCRIPT" should be "javascript" .*/
        );

        expect(context.testResult?.code).toBe(0);
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
          /.*?3:1-5:4 .*? Code fence flag "JS" should be "js" .*/
        );

        expect(context.testResult?.stderr).toMatch(
          /.*?7:1-9:4 .*? Code fence flag "JAVASCRIPT" should be "javascript" .*/
        );

        expect(context.testResult?.code).toBe(0);
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
          binary: 'npx',
          args: ['--no-install', 'remark', '--no-stdout', 'README.md']
        }
      }
    );
  });
});
