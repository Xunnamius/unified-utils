// * These tests verify that consumers of this software actually receive an API
// * that behaves as described in help text and other documentation. Typically,
// * these integration tests limit module-level mocking to peripheral concerns
// * (e.g. mocking output handling and mocking networking while eschewing
// * filesystem mocking) in favor of testing a "fully integrated" system.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import packageJson, {
  name as packageName
} from 'rootverse+mdast-util-tight-comments:package.json';

import { getFixtureString } from 'testverse+mdast-util-tight-comments:helpers.ts';

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
const debug = createDebugLogger({ namespace: 'mdast-util-tight-comments' }).extend(
  TEST_IDENTIFIER
);

debug('nodeVersion: %O (process.version=%O)', nodeVersion, process.version);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(
      toAbsolutePath(require.resolve('rootverse+mdast-util-tight-comments:package.json'))
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
    additionalPackagesToInstall: ['unified', 'remark-parse', 'mdast-util-to-markdown']
  }
);

it('works as an ESM import', async () => {
  expect.hasAssertions();

  await withMockedFixture(
    async (context) => {
      expect(context.testResult.stderr).toBeEmpty();
      expect(context.testResult.stdout).toBe(getFixtureString('spaced-transformed'));
      expect(context.testResult.exitCode).toBe(0);
    },
    {
      initialVirtualFiles: {
        'src/index.mjs': /*js*/ `
          import fs from 'node:fs';
          import { unified } from 'unified';
          import remarkParse from 'remark-parse';
          import { toMarkdown } from 'mdast-util-to-markdown';
          import { joinTightComments } from '${packageName}';

          const doc = ${JSON.stringify(getFixtureString('spaced'))}
          const tree = unified().use(remarkParse).parse(doc);

          console.log(toMarkdown(tree, joinTightComments()));
        `
      }
    }
  );
});
