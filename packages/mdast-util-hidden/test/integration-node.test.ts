import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import { getAst as getReplacedAst } from './fixtures/hidden-replaced-ast';

import {
  getInitialAst,
  removePositionDataFrom
} from 'pkgverse/mdast-util-hidden/test/helpers';

import {
  name as pkgName,
  exports as pkgExports
} from 'pkgverse/mdast-util-hidden/package.json';

import {
  mockFixtureFactory,
  dummyFilesFixture,
  dummyNpmPackageFixture,
  npmCopySelfFixture,
  nodeImportTestFixture
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
    nodeImportTestFixture()
  ],
  npmInstall: ['unist-util-visit', 'unist-util-remove-position']
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

it('works as an ESM import', async () => {
  expect.hasAssertions();

  const initialAst = getInitialAst();
  const replacedAst = getReplacedAst();

  await withMockedFixture(
    async (ctx) => {
      if (!ctx.testResult) throw new Error('must use node-import-test fixture');
      expect(ctx.testResult?.stderr).toBeEmpty();
      expect(ctx.testResult?.stdout).toBe('success');
      expect(ctx.testResult?.code).toBe(0);
    },
    {
      initialFileContents: {
        'src/index.mjs': `
import { deepStrictEqual } from 'assert';
import * as _unistUtilVisit from 'unist-util-visit';
import * as _unistUtilRemovePosition from 'unist-util-remove-position';

import {
  hide,
  visitAndReveal
} from '${pkgName}';

const removePositionDataFrom = ${removePositionDataFrom.toString()}

const initialAst = ${JSON.stringify(initialAst)};
const replacedAst = ${JSON.stringify(replacedAst)};
const tree = JSON.parse(JSON.stringify(initialAst));
const finalAst = removePositionDataFrom('heading', initialAst);

_unistUtilVisit.visit(tree, 'heading', (node, index, parent) => {
  if (index !== null && parent !== null) {
    hide({ nodes: [node], index, parent });
    return [_unistUtilVisit.SKIP, index + 1];
  }
});

deepStrictEqual(tree, replacedAst);

visitAndReveal({ tree });

deepStrictEqual(tree, finalAst);

console.log('success');
`
      }
    }
  );
});
