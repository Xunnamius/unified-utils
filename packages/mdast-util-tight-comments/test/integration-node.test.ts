import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import assert from 'node:assert';
import { getFixtureString } from 'pkgverse/mdast-util-tight-comments/test/helpers';

import {
  exports as pkgExports,
  name as pkgName
} from 'pkgverse/mdast-util-tight-comments/package.json';

import {
  dummyFilesFixture,
  dummyNpmPackageFixture,
  mockFixtureFactory,
  nodeImportTestFixture,
  npmCopySelfFixture
} from 'testverse/setup';

// TODO: note that we've made some modifications to the setup.ts file that
// TODO: should be propagated!

const TEST_IDENTIFIER = 'integration-node';
const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);

const pkgMainPaths = Object.values(pkgExports)
  .map((xport) =>
    typeof xport === 'string' ? null : `${__dirname}/../${xport.node || xport.default}`
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
  npmInstall: ['unified', 'remark-parse', 'mdast-util-to-markdown']
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

  await withMockedFixture(
    async (context) => {
      assert(context.testResult, 'must use node-import-test fixture');
      expect(context.testResult?.stderr).toBeEmpty();
      expect(context.testResult?.stdout).toBe(getFixtureString('spaced-transformed'));
      expect(context.testResult?.code).toBe(0);
    },
    {
      initialFileContents: {
        'src/index.mjs': `
          import fs from 'node:fs';
          import { unified } from 'unified';
          import remarkParse from 'remark-parse';
          import { toMarkdown } from 'mdast-util-to-markdown';
          import { joinTightComments } from '${pkgName}';

          const doc = ${JSON.stringify(getFixtureString('spaced'))}
          const tree = unified().use(remarkParse).parse(doc);

          console.log(toMarkdown(tree, joinTightComments()));
        `
      }
    }
  );
});
