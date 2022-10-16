/* eslint-disable jest/no-conditional-in-test */
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';

import {
  mockFixtureFactory,
  dummyFilesFixture,
  dummyDirectoriesFixture,
  dummyNpmPackageFixture,
  npmLinkSelfFixture,
  nodeImportTestFixture
} from 'testverse/setup';

import {
  name as pkgName,
  version as pkgVersion,
  exports as pkgExports
} from '../package.json';

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
  directoryPaths: ['packages/pkg1', 'packages/pkg2', '.git'],
  pkgRoot: `${__dirname}/..`,
  pkgName,
  initialFileContents: {
    'package.json': `{"name":"dummy-pkg","workspaces":["packages/*"],"dependencies":{"${pkgName}":"${pkgVersion}"}}`,
    'packages/pkg1/package.json': `{"name":"pkg-1","version":"1.2.3"}`,
    'packages/pkg2/package.json': `{"name":"pkg-2","version":"1.2.3"}`
  } as FixtureOptions['initialFileContents'],
  use: [
    dummyNpmPackageFixture(),
    dummyDirectoriesFixture(),
    dummyFilesFixture(),
    npmLinkSelfFixture(),
    nodeImportTestFixture()
  ]
} as Partial<FixtureOptions> & {
  initialFileContents: FixtureOptions['initialFileContents'];
};

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, fixtureOptions);

const runTest = async (
  importAsEsm: boolean,
  testFixtureFn: Parameters<typeof withMockedFixture>[0]
) => {
  const indexPath = `src/index.${importAsEsm ? 'm' : ''}js`;

  fixtureOptions.initialFileContents[indexPath] =
    (importAsEsm
      ? `import { getRunContext } from '${pkgName}/project-utils';`
      : `const { getRunContext } = require('${pkgName}/project-utils');`) +
    '\n' +
    (importAsEsm
      ? `import { getEslintAliases } from '${pkgName}/import-aliases';`
      : `const { getEslintAliases } = require('${pkgName}/import-aliases');`) +
    `
    console.log(getRunContext().project.json.name == 'dummy-pkg');
    console.log(getRunContext().project.packages.get('pkg-1').json.name == 'pkg-1');
    console.log(getEslintAliases()[0][0] == 'universe' && getEslintAliases()[0][1] == './src');
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
    expect(ctx.testResult?.stdout).toBe('true\ntrue\ntrue');
    expect(ctx.testResult?.code).toBe(0);
  });
});

it('works as a CJS require(...)', async () => {
  expect.hasAssertions();
  await runTest(false, async (ctx) => {
    expect(ctx.testResult?.stdout).toBe('true\ntrue\ntrue');
    expect(ctx.testResult?.code).toBe(0);
  });
});
