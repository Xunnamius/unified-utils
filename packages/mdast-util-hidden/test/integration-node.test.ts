import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';

import {
  mockFixtureFactory,
  dummyFilesFixture,
  dummyNpmPackageFixture,
  npmLinkSelfFixture,
  nodeImportTestFixture
} from 'testverse/setup';

import { name as pkgName, exports as pkgExports } from '../package.json';
import { getAst as getReplacedAst } from './__fixtures__/hidden-replaced-ast';

import type { FixtureOptions } from 'testverse/setup';

const TEST_IDENTIFIER = 'integration-node';
const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);
const nodeVersion = process.env.MATRIX_NODE_VERSION || process.version;

const pkgMainPaths = Object.values(pkgExports)
  .map((xport) => (typeof xport == 'string' ? null : `${__dirname}/../${xport.node}`))
  .filter(Boolean) as string[];

// eslint-disable-next-line jest/require-hook
debug('pkgMainPaths: %O', pkgMainPaths);
// eslint-disable-next-line jest/require-hook
debug(`nodeVersion: "${nodeVersion}"`);

const fixtureOptions = {
  performCleanup: true,
  pkgRoot: `${__dirname}/..`,
  pkgName,
  initialFileContents: {} as FixtureOptions['initialFileContents'],
  use: [
    dummyNpmPackageFixture(),
    dummyFilesFixture(),
    npmLinkSelfFixture(),
    nodeImportTestFixture()
  ]
} as Partial<FixtureOptions> & {
  initialFileContents: FixtureOptions['initialFileContents'];
};

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, fixtureOptions);

const runTest = async (
  _importAsEsm: boolean,
  testFixtureFn: Parameters<typeof withMockedFixture>[0]
) => {
  const indexPath = `src/index.mjs`;

  const initialAst = unified().use(remarkParse).parse(`
  # Hello

  Some *emphasis*, **importance**, and \`code\`.

  # Goodbye
  `);

  const replacedAst = getReplacedAst();

  fixtureOptions.initialFileContents[indexPath] = `
    import {
      createHiddenNode,
      hide,
      reveal,
      visitAndReveal
    } from '${pkgName}';

    const initialAstStr = ${JSON.stringify(initialAst)};
    const tree = JSON.parse(initialAstStr);
    const replacedAstStr = ${JSON.stringify(replacedAst)};

    visit(tree, 'heading', (node, index, parent) => {
      if (index !== null && parent !== null) {
        hide({ nodes: [node], index, parent });
        return [SKIP, index + 1];
      }
    });

    console.log(JSON.stringify(tree) == replacedAstStr);

    visitAndReveal({ tree });

    console.log(JSON.stringify(tree) == initialAstStr);
  `;

  await withMockedFixture(async (ctx) => {
    if (!ctx.testResult) throw new Error('must use node-import-test fixture');
    await testFixtureFn(ctx);
  });

  delete fixtureOptions.initialFileContents[indexPath];
};

beforeAll(async () => {
  await Promise.all(
    pkgMainPaths.map(async (pkgMainPath) => {
      if ((await run('test', ['-e', pkgMainPath])).code != 0) {
        debug(`unable to find main distributable: ${pkgMainPath}`);
        throw new Error('must build distributables first (try `npm run build-dist`)');
      }
    })
  );
});

it('works as an ESM import', async () => {
  expect.hasAssertions();
  await runTest(true, async (ctx) => {
    expect(ctx.testResult?.stdout).toBe('true\ntrue');
    expect(ctx.testResult?.code).toBe(0);
  });
});

// ? There is no CJS distributable for this package
// eslint-disable-next-line jest/no-commented-out-tests
/* it('works as a CJS require(...)', async () => {
  expect.hasAssertions();
  await runTest(false, async (ctx) => {
    expect(ctx.testResult?.stdout).toBe('true\ntrue');
    expect(ctx.testResult?.code).toBe(0);
  });
}); */
