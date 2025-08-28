// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import {
  exports as packageExports,
  name as packageName
} from 'rootverse+remark-tight-comments:package.json';

import {
  ensurePackageHasBeenBuilt,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

const TEST_IDENTIFIER = `${packageName.split('/').at(-1)!}-client`;
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;
const debug = createDebugLogger({ namespace: 'remark-tight-comments' }).extend(
  TEST_IDENTIFIER
);

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(require.resolve('rootverse+remark-tight-comments:package.json'))
    ),
    packageName,
    packageExports
  );
});

test.todo('this');
