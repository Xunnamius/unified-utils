import { name as rootPkgName } from 'package';
import { tmpdir } from 'os';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import glob from 'glob';
import execa from 'execa';
import uniqueFilename from 'unique-filename';
import gitFactory from 'simple-git';
// ? https://github.com/jest-community/jest-extended#typescript
import 'jest-extended/all';
import 'jest-extended';

import type { Debugger } from 'debug';
import type { SimpleGit } from 'simple-git';
import type { Promisable } from 'type-fest';

const { writeFile, readFile, access: accessFile } = fs;

const debug = debugFactory(`${rootPkgName}:jest-setup`);

debug(`rootPkgName: "${rootPkgName}"`);
debug(`pkgVersion: "N/A"`);

export async function withMockedOutput(
  fn: (spies: {
    logSpy: jest.SpyInstance;
    warnSpy: jest.SpyInstance;
    errorSpy: jest.SpyInstance;
    infoSpy: jest.SpyInstance;
    stdoutSpy: jest.SpyInstance;
    stdErrSpy: jest.SpyInstance;
  }) => unknown
) {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => undefined);
  const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  const stdErrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);

  try {
    await fn({
      logSpy,
      warnSpy,
      errorSpy,
      infoSpy,
      stdoutSpy,
      stdErrSpy
    });
  } finally {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
    infoSpy.mockRestore();
    stdoutSpy.mockRestore();
    stdErrSpy.mockRestore();
  }
}

// TODO: XXX: need some way to make setting different fixture options for
// TODO: XXX: different tests much less painful!

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface FixtureOptions
  extends Partial<WebpackTestFixtureOptions>,
    Partial<GitRepositoryFixtureOptions>,
    Partial<NodeImportTestFixtureOptions>,
    Partial<DummyDirectoriesFixtureOptions> {
  performCleanup: boolean;
  use: MockFixture[];
  initialFileContents: { [filePath: string]: string };
  pkgRoot?: string;
  pkgName?: string;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface WebpackTestFixtureOptions {
  webpackVersion: string;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface GitRepositoryFixtureOptions {
  setupGit: (git: SimpleGit) => Promisable<void>;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface DummyDirectoriesFixtureOptions {
  directoryPaths: string[];
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface NodeImportTestFixtureOptions {
  npmInstall?: string | string[];
  runWith?: {
    binary?: string;
    args?: string[];
    opts?: Record<string, unknown>;
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
// eslint-disable-next-line @typescript-eslint/ban-types
export interface FixtureContext<CustomOptions extends Record<string, unknown> = {}>
  extends Partial<TestResultProvider>,
    Partial<TreeOutputProvider>,
    Partial<GitProvider> {
  root: string;
  testIdentifier: string;
  options: FixtureOptions & CustomOptions;
  using: MockFixture[];
  fileContents: { [filePath: string]: string };
  debug: Debugger;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface TestResultProvider {
  testResult: { code: number; stdout: string; stderr: string };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface TreeOutputProvider {
  treeOutput: string;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface GitProvider {
  git: SimpleGit;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
// eslint-disable-next-line @typescript-eslint/ban-types
export type FixtureAction<Context = FixtureContext> = (ctx: Context) => Promise<unknown>;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export type ReturnsString<Context = FixtureContext> = (
  ctx: Context
) => Promise<string> | string;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export interface MockFixture<Context = FixtureContext> {
  name: 'root' | 'describe-root' | string | ReturnsString<Context> | symbol;
  description: string | ReturnsString<Context>;
  setup?: FixtureAction<Context>;
  teardown?: FixtureAction<Context>;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function rootFixture(): MockFixture {
  return {
    name: 'root', // ? If first isn't named root, root used automatically
    description: (ctx) =>
      `creating a unique root directory${
        ctx.options.performCleanup ? ' (will be deleted after all tests complete)' : ''
      }`,
    setup: async (ctx) => {
      ctx.root = uniqueFilename(tmpdir(), ctx.testIdentifier);

      await run('mkdir', ['-p', ctx.root], { reject: true });
      await run('mkdir', ['-p', 'src'], { cwd: ctx.root, reject: true });
    },
    teardown: async (ctx) =>
      ctx.options.performCleanup && run('rm', ['-rf', ctx.root], { reject: true })
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyNpmPackageFixture(): MockFixture {
  return {
    name: 'dummy-npm-package',
    description: 'creating package.json file and node_modules subdirectory',
    setup: async (ctx) => {
      await Promise.all([
        writeFile(
          `${ctx.root}/package.json`,
          (ctx.fileContents['package.json'] =
            ctx.fileContents['package.json'] || '{"name":"dummy-pkg"}')
        ),
        run('mkdir', ['-p', 'node_modules'], { cwd: ctx.root, reject: true })
      ]);

      if ((ctx.options.pkgName || rootPkgName).includes('/')) {
        await run('mkdir', ['-p', (ctx.options.pkgName || rootPkgName).split('/')[0]], {
          cwd: `${ctx.root}/node_modules`,
          reject: true
        });
      }
    }
  };
}

// ! THIS !
// TODO: XXX: XXX: create npmInstallSelfFixture that just uses npm install instead of soft linking or copying
// ! THIS !

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function npmLinkSelfFixture(): MockFixture {
  return {
    name: 'npm-link-self',
    description:
      'soft-linking project repo into node_modules to emulate package installation',
    setup: async (ctx) => {
      await run(
        'ln',
        [
          '-s',
          resolve(ctx.options.pkgRoot ?? `${__dirname}/..`),
          ctx.options.pkgName || rootPkgName
        ],
        {
          cwd: `${ctx.root}/node_modules`,
          reject: true
        }
      );
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function npmCopySelfFixture(): MockFixture {
  return {
    name: 'npm-copy-self',
    description:
      'copying package.json#files into node_modules to emulate package installation',
    setup: async (ctx) => {
      const projectRoot = resolve(`${__dirname}/..`);
      const { pkgRoot } = ctx.options;

      // TODO: rename ctx.root to ctx.fixtureRoot

      const patterns: string[] =
        // TODO: old comment: 👇🏿 this is bad, don't do this, fix this for monorepos 👇🏿
        require(`${pkgRoot}/package.json`)?.files ||
        require(`${process.cwd()}/package.json`)?.files ||
        require('package')?.files;

      const files = patterns.flatMap((p) =>
        glob.sync(p, { cwd: pkgRoot, root: pkgRoot })
      );

      const dest = `${ctx.root}/node_modules/${ctx.options.pkgName || rootPkgName}`;
      const destPkgJson = `${dest}/package.json`;

      ctx.debug(`cp destination: ${dest}`);
      ctx.debug(`cp sources (cwd: ${projectRoot}): %O`, files);

      await run('mkdir', ['-p', dest], { reject: true });
      await run('cp', ['-r', ...files, dest], { cwd: projectRoot, reject: true });

      if (!destPkgJson) {
        throw new Error(`expected "${destPkgJson}" to exist`);
      }

      // TODO: only optionally remove peer dependencies from the install loop
      // TODO: (and by default they should NOT be removed, unlike below).
      // TODO: Same deal with dev dependencies (except removed by default).
      const {
        peerDependencies: _,
        devDependencies: __,
        ...dummyPkgJson
      } = JSON.parse(await readFile(destPkgJson, 'utf-8'));

      const installTargets = [ctx.options.npmInstall]
        .flat()
        .filter((r): r is string => Boolean(r))
        .reduce<Record<string, string>>((obj, pkgStr) => {
          const pkg = pkgStr.split('@');
          return { ...obj, [pkg[0]]: pkg[1] || 'latest' };
        }, dummyPkgJson.dependencies || {});

      await writeFile(
        destPkgJson,
        JSON.stringify({ ...dummyPkgJson, dependencies: installTargets })
      );

      await run('npm', ['install', '--no-save', '--production'], {
        cwd: dest,
        reject: true,
        env: { NODE_ENV: 'production', CI: 'true' }
      });

      await run('mv', ['node_modules', 'node_modules_old'], {
        cwd: ctx.root,
        reject: true
      });

      await run(
        'mv',
        [`node_modules_old/${ctx.options.pkgName || rootPkgName}/node_modules`, '.'],
        {
          cwd: ctx.root,
          reject: true
        }
      );

      await run(
        'mv',
        [`node_modules_old/${ctx.options.pkgName || rootPkgName}`, 'node_modules'],
        {
          cwd: ctx.root,
          reject: true
        }
      );

      await run('rm', ['-rf', 'node_modules_old'], { cwd: ctx.root, reject: true });
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function webpackTestFixture(): MockFixture {
  return {
    name: 'webpack-test',
    description: 'setting up webpack jest integration test',
    setup: async (ctx) => {
      if (typeof ctx.options.webpackVersion != 'string') {
        throw new Error('invalid or missing options.webpackVersion, expected string');
      }

      const indexPath = Object.keys(ctx.fileContents).find((path) =>
        /^src\/index\.(((c|m)?js)|ts)x?$/.test(path)
      );

      if (!indexPath)
        throw new Error('could not find initial contents for src/index file');

      if (!ctx.fileContents['webpack.config.js'])
        throw new Error('could not find initial contents for webpack.config.js file');

      await Promise.all([
        writeFile(`${ctx.root}/${indexPath}`, ctx.fileContents[indexPath]),
        writeFile(`${ctx.root}/webpack.config.js`, ctx.fileContents['webpack.config.js'])
      ]);

      ctx.treeOutput = await getTreeOutput(ctx);

      await run(
        'npm',
        ['install', '--no-save', `webpack@${ctx.options.webpackVersion}`, 'webpack-cli'],
        {
          cwd: ctx.root,
          reject: true
        }
      );

      await run('npx', ['webpack'], { cwd: ctx.root, reject: true });

      const { code, stdout, stderr } = await run('node', [`${ctx.root}/dist/index.js`]);

      ctx.testResult = {
        code,
        stdout,
        stderr
      };
    }
  };
}

async function getTreeOutput(ctx: FixtureContext) {
  return (await execa('tree', ['-a', '-L', '2'], { cwd: ctx.root })).stdout;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function nodeImportTestFixture(): MockFixture {
  return {
    name: 'node-import-test',
    description: 'setting up node import jest integration test',
    setup: async (ctx) => {
      const indexPath = Object.keys(ctx.fileContents).find((path) =>
        /^src\/index(\.test)?\.(((c|m)?js)|ts)x?$/.test(path)
      );

      if (!indexPath)
        throw new Error('could not find initial contents for src/index test file');

      await writeFile(`${ctx.root}/${indexPath}`, ctx.fileContents[indexPath]);

      // TODO: also test all current/active/maintenance versions of node too
      // TODO: and enable that functionality
      const bin = ctx.options.runWith?.binary || 'node';
      const args = ctx.options.runWith?.args || ['--experimental-json-modules'];
      const opts = ctx.options.runWith?.opts || {};

      ctx.treeOutput = await getTreeOutput(ctx);

      const { code, stdout, stderr } = await run(bin, [...args, indexPath], {
        cwd: ctx.root,
        ...opts
      });

      ctx.testResult = {
        code,
        stdout,
        stderr
      };
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function gitRepositoryFixture(): MockFixture {
  return {
    name: 'git-repository',
    description: 'configuring fixture root to be a git repository',
    setup: async (ctx) => {
      if (ctx.options.setupGit && typeof ctx.options.setupGit != 'function') {
        throw new Error('invalid or missing options.setupGit, expected function');
      }

      ctx.git = gitFactory({ baseDir: ctx.root });

      await (ctx.options.setupGit
        ? ctx.options.setupGit(ctx.git)
        : ctx.git
            .init()
            .addConfig('user.name', 'fake-user')
            .addConfig('user.email', 'fake@email'));
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyDirectoriesFixture(): MockFixture {
  return {
    name: 'dummy-directories',
    description: 'creating dummy directories under fixture root',
    setup: async (ctx) => {
      if (!Array.isArray(ctx.options.directoryPaths)) {
        throw new Error('invalid or missing options.directoryPaths, expected array');
      }

      await Promise.all(
        ctx.options.directoryPaths.map((path) =>
          run('mkdir', ['-p', path], { cwd: ctx.root, reject: true })
        )
      );
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyFilesFixture(): MockFixture {
  return {
    name: 'dummy-files',
    description: 'creating dummy files under fixture root',
    setup: async (ctx) => {
      await Promise.all(
        Object.entries(ctx.fileContents).map(async ([path, contents]) => {
          const fullPath = `${ctx.root}/${path}`;
          await accessFile(fullPath).then(
            () => debug(`skipped creating dummy file: file already exists at ${path}`),
            async () => {
              debug(`creating dummy file "${path}" with contents:`);
              debug.extend('contents >')(contents);
              await writeFile(fullPath, (ctx.fileContents[path] = contents));
            }
          );
        })
      );
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
// ? If a fixture w/ this name isn't included, it's appended
// ! This fixture, when included, is always run even when errors occur!
export function describeRootFixture(): MockFixture {
  return {
    name: 'describe-root',
    description: 'outputting debug information about environment',
    setup: async (ctx) => {
      ctx.debug('test identifier: %O', ctx.testIdentifier);
      ctx.debug('root: %O', ctx.root);
      ctx.debug(ctx.treeOutput || (await getTreeOutput(ctx)));
      ctx.debug('per-file contents: %O', ctx.fileContents);
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package
export async function withMockedFixture<
  // eslint-disable-next-line @typescript-eslint/ban-types
  CustomOptions extends Record<string, unknown> = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  CustomContext extends Record<string, unknown> = {}
>({
  fn,
  testIdentifier,
  options
}: {
  fn: FixtureAction<
    FixtureContext<FixtureOptions & Partial<Record<string, unknown> & CustomOptions>> &
      CustomContext
  >;
  testIdentifier: string;
  options?: Partial<FixtureOptions & CustomOptions>;
}) {
  type CustomizedFixtureOptions = FixtureOptions &
    Partial<Record<string, unknown> & CustomOptions>;
  type CustomizedFixtureContext = FixtureContext<CustomizedFixtureOptions> &
    CustomContext;
  type CustomizedMockFixture = MockFixture<CustomizedFixtureContext>;

  const testSymbol = Symbol('test');
  const finalOptions = {
    performCleanup: true,
    use: [] as MockFixture[],
    initialFileContents: {},
    ...options
  } as CustomizedFixtureOptions & { use: CustomizedMockFixture[] };

  const ctx = {
    root: '',
    testIdentifier,
    debug,
    using: [] as MockFixture[],
    options: finalOptions,
    fileContents: { ...finalOptions.initialFileContents }
    // TODO: 👇🏿 this is bad, don't do this, fix this 👇🏿
  } as unknown as CustomizedFixtureContext & { using: CustomizedMockFixture[] };

  if (finalOptions.use) {
    if (finalOptions.use?.[0]?.name != 'root') ctx.using.push(rootFixture());
    ctx.using = [...ctx.using, ...finalOptions.use];
    // ? `describe-root` fixture doesn't have to be the last one, but a fixture
    // ? with that name must be included at least once
    if (!finalOptions.use.find((f) => f.name == 'describe-root'))
      ctx.using.push(describeRootFixture());
  } else ctx.using = [rootFixture(), describeRootFixture()];

  ctx.using.push({
    name: testSymbol,
    description: '',
    setup: fn
  });

  let ranDescribe = false;
  const cleanupFunctions: NonNullable<CustomizedMockFixture['teardown']>[] = [];

  const setupDebugger = async (fixture: CustomizedMockFixture, error = false) => {
    const toString = async (
      p: CustomizedMockFixture['name'] | CustomizedMockFixture['description']
      // TODO: replace with toss
    ) => (typeof p == 'function' ? p(ctx) : typeof p == 'string' ? p : ':impossible:');
    const name = await toString(fixture.name.toString());
    const desc = await toString(fixture.description);
    const dbg = debug.extend(error ? `${name}:<error>` : name);
    ctx.debug = dbg;
    dbg(desc);
  };

  /*eslint-disable no-await-in-loop */
  try {
    for (const mockFixture of ctx.using) {
      if (mockFixture.name == testSymbol) {
        ctx.debug = debug;
        debug('executing test callback');
      } else {
        await setupDebugger(mockFixture);
        if (mockFixture.teardown) cleanupFunctions.push(mockFixture.teardown);
      }

      mockFixture.setup
        ? await mockFixture.setup(ctx)
        : ctx.debug('(warning: mock fixture has no setup function)');

      if (mockFixture.name == 'describe-root') ranDescribe = true;
    }
  } catch (e) {
    ctx.debug.extend('<error>')('exception occurred: %O', e);
    throw e;
  } finally {
    if (!ranDescribe) {
      const fixture = describeRootFixture();
      await setupDebugger(fixture, true);
      await fixture.setup?.(ctx);
    }

    ctx.debug = debug.extend('<cleanup>');

    for (const cfn of cleanupFunctions.reverse()) {
      await cfn(ctx).catch((e) =>
        ctx.debug(
          `ignored exception in teardown function: ${
            e?.message || e.toString() || '<no error message>'
          }`
        )
      );
    }
  }
  /*eslint-enable no-await-in-loop */
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ above)
export function mockFixtureFactory<
  // eslint-disable-next-line @typescript-eslint/ban-types
  CustomOptions extends Record<string, unknown> = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  CustomContext extends Record<string, unknown> = {}
>(testIdentifier: string, options?: Partial<FixtureOptions & CustomOptions>) {
  return (
    fn: FixtureAction<
      FixtureContext<FixtureOptions & Partial<Record<string, unknown> & CustomOptions>> &
        CustomContext
    >
  ) => withMockedFixture<CustomOptions, CustomContext>({ fn, testIdentifier, options });
}
