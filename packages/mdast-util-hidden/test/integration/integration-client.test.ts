// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+mdast-util-hidden:package.json';

import { getAst as getReplacedAst } from 'testverse+mdast-util-hidden:fixtures/hidden-replaced-ast.ts';

import {
  getInitialAst,
  removePositionDataFrom
} from 'testverse+mdast-util-hidden:helpers.ts';

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

const TEST_IDENTIFIER = `${packageJson.name.split('/').at(-1)!}-client`;
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;
const debug = createDebugLogger({ namespace: 'mdast-util-hidden' }).extend(
  TEST_IDENTIFIER
);

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(require.resolve('rootverse+mdast-util-hidden:package.json'))
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
    additionalPackagesToInstall: ['unist-util-visit', 'unist-util-remove-position']
  }
);

it('works as an ESM import', async () => {
  expect.hasAssertions();

  const initialAst = getInitialAst();
  const replacedAst = getReplacedAst();

  await withMockedFixture(
    async (context) => {
      expect(context.testResult?.stderr).toBeEmpty();
      expect(context.testResult?.stdout).toBe('success');
      expect(context.testResult?.code).toBe(0);
    },
    {
      initialVirtualFiles: {
        'src/index.mjs': /*js*/ `
import { deepStrictEqual } from 'assert';
import * as _unistUtilVisit from 'unist-util-visit';
import * as _unistUtilRemovePosition from 'unist-util-remove-position';

import {
  hide,
  visitAndReveal
} from '${packageName}';

const removePositionDataFrom = ${removePositionDataFrom.toString()}

const initialAst = ${JSON.stringify(initialAst)};
const replacedAst = ${JSON.stringify(replacedAst)};
const tree = JSON.parse(JSON.stringify(initialAst));
const finalAst = removePositionDataFrom('heading', initialAst);

_unistUtilVisit.visit(tree, 'heading', (node, index, parent) => {
  if (index !== undefined && parent !== undefined) {
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
