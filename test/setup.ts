import execa from 'execa';
import glob from 'glob';
import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';
import assert from 'node:assert';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { name as rootPkgName } from 'package';
import gitFactory from 'simple-git';
import uniqueFilename from 'unique-filename';
// ? https://github.com/jest-community/jest-extended#typescript
import 'jest-extended';
import 'jest-extended/all';

import type { Debugger } from 'debug';
import type { SimpleGit } from 'simple-git';
import type { PackageJson, Promisable } from 'type-fest';

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
  const warnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => undefined);
  const errorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);
  const infoSpy = jest
    .spyOn(console, 'info')
    .mockImplementation(() => undefined);
  const stdoutSpy = jest
    .spyOn(process.stdout, 'write')
    .mockImplementation(() => true);
  const stdErrSpy = jest
    .spyOn(process.stderr, 'write')
    .mockImplementation(() => true);

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
export interface FixtureContext<
  CustomOptions extends Record<string, unknown> = {}
> extends Partial<TestResultProvider>,
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
export type FixtureAction<Context = FixtureContext> = (
  context: Context
) => Promise<unknown>;

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export type ReturnsString<Context = FixtureContext> = (
  context: Context
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
    description: (context) =>
      `creating a unique root directory${
        context.options.performCleanup
          ? ' (will be deleted after all tests complete)'
          : ''
      }`,
    setup: async (context) => {
      // TODO: add package-specific prefix to differentiate from other projects
      context.root = uniqueFilename(tmpdir(), context.testIdentifier);

      await run('mkdir', ['-p', context.root], { reject: true });
      await run('mkdir', ['-p', 'src'], { cwd: context.root, reject: true });
    },
    teardown: async (context) =>
      context.options.performCleanup &&
      run('rm', ['-rf', context.root], { reject: true })
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function dummyNpmPackageFixture(): MockFixture {
  return {
    name: 'dummy-npm-package',
    description: 'creating package.json file and node_modules subdirectory',
    setup: async (context) => {
      await Promise.all([
        writeFile(
          `${context.root}/package.json`,
          (context.fileContents['package.json'] =
            context.fileContents['package.json'] || '{"name":"dummy-pkg"}')
        ),
        run('mkdir', ['-p', 'node_modules'], {
          cwd: context.root,
          reject: true
        })
      ]);

      if ((context.options.pkgName || rootPkgName).includes('/')) {
        await run(
          'mkdir',
          ['-p', (context.options.pkgName || rootPkgName).split('/')[0]],
          {
            cwd: `${context.root}/node_modules`,
            reject: true
          }
        );
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
    setup: async (context) => {
      await run(
        'ln',
        [
          '-s',
          resolve(context.options.pkgRoot ?? `${__dirname}/..`),
          context.options.pkgName || rootPkgName
        ],
        {
          cwd: `${context.root}/node_modules`,
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
    setup: async (context) => {
      const projectRoot = resolve(`${__dirname}/..`);
      const { pkgName: contextPkgName, npmInstall, pkgRoot } = context.options;

      // TODO: rename context.root to context.fixtureRoot

      const patterns: string[] =
        // TODO: old comment: 👇🏿 this is bad, don't do this, fix this for monorepos 👇🏿
        require(`${pkgRoot}/package.json`)?.files ||
        require(`${process.cwd()}/package.json`)?.files ||
        require('package')?.files;

      const files = patterns.flatMap((p) =>
        glob.sync(p, { cwd: pkgRoot, root: pkgRoot })
      );

      const dest = `${context.root}/node_modules/${
        contextPkgName || rootPkgName
      }`;
      const destPkgJson = `${dest}/package.json`;

      context.debug(`cp destination: ${dest}`);
      context.debug(`cp sources (cwd: ${projectRoot}): %O`, files);

      await run('mkdir', ['-p', dest], { reject: true });
      await run('cp', ['-r', ...files, dest], {
        cwd: projectRoot,
        reject: true
      });

      assert(destPkgJson, `expected "${destPkgJson}" to exist`);

      // TODO: only optionally remove peer dependencies from the install loop
      // TODO: (and by default they should NOT be removed, unlike below).
      // TODO: Same deal with dev dependencies (except removed by default).
      const {
        peerDependencies: _,
        devDependencies: __,
        ...dummyPkgJson
      } = JSON.parse(await readFile(destPkgJson, 'utf8')) as PackageJson;

      const installTargets = {
        ...dummyPkgJson.dependencies,
        ...Object.fromEntries(
          [npmInstall]
            .flat()
            .filter((r): r is string => Boolean(r))
            .map((pkgStr) => {
              const pkg = pkgStr.split('@');
              return [[pkg[0]], pkg[1] || 'latest'];
            })
        )
      };

      await writeFile(
        destPkgJson,
        JSON.stringify({ ...dummyPkgJson, dependencies: installTargets })
      );

      await run('npm', ['install', '--no-save', '--omit=dev'], {
        cwd: dest,
        reject: true,
        env: { NODE_ENV: 'production', CI: 'true' }
      });

      await run('mv', ['node_modules', 'node_modules_old'], {
        cwd: context.root,
        reject: true
      });

      await run(
        'mv',
        [`node_modules_old/${contextPkgName || rootPkgName}/node_modules`, '.'],
        {
          cwd: context.root,
          reject: true
        }
      );

      await run(
        'mv',
        [`node_modules_old/${contextPkgName || rootPkgName}`, 'node_modules'],
        {
          cwd: context.root,
          reject: true
        }
      );

      await run('rm', ['-rf', 'node_modules_old'], {
        cwd: context.root,
        reject: true
      });
    }
  };
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function webpackTestFixture(): MockFixture {
  return {
    name: 'webpack-test',
    description: 'setting up webpack jest integration test',
    setup: async (context) => {
      assert(
        typeof context.options.webpackVersion === 'string',
        'invalid or missing options.webpackVersion, expected string'
      );

      const indexPath = Object.keys(context.fileContents).find((path) =>
        /^src\/index\.(((c|m)?js)|ts)x?$/.test(path)
      );

      assert(indexPath, 'could not find initial contents for src/index file');
      assert(
        context.fileContents['webpack.config.js'],
        'could not find initial contents for webpack.config.js file'
      );

      await Promise.all([
        writeFile(
          `${context.root}/${indexPath}`,
          context.fileContents[indexPath]
        ),
        writeFile(
          `${context.root}/webpack.config.js`,
          context.fileContents['webpack.config.js']
        )
      ]);

      context.treeOutput = await getTreeOutput(context);

      await run(
        'npm',
        [
          'install',
          '--no-save',
          `webpack@${context.options.webpackVersion}`,
          'webpack-cli'
        ],
        {
          cwd: context.root,
          reject: true
        }
      );

      await run('npx', ['webpack'], { cwd: context.root, reject: true });

      const { code, stdout, stderr } = await run('node', [
        `${context.root}/dist/index.js`
      ]);

      context.testResult = {
        code,
        stdout,
        stderr
      };
    }
  };
}

async function getTreeOutput(context: FixtureContext) {
  return (await execa('tree', ['-a', '-L', '2'], { cwd: context.root })).stdout;
}

// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function nodeImportTestFixture(): MockFixture {
  return {
    name: 'node-import-test',
    description: 'setting up node import jest integration test',
    setup: async (context) => {
      const indexPath = Object.keys(context.fileContents).find((path) =>
        /^src\/index(\.test)?\.(((c|m)?js)|ts)x?$/.test(path)
      );

      assert(
        indexPath,
        'could not find initial contents for src/index test file'
      );

      // TODO: do we have to write this AND have the dummyFilesFixture too?!
      await writeFile(
        `${context.root}/${indexPath}`,
        context.fileContents[indexPath]
      );

      // TODO: also test all current/active/maintenance versions of node too
      // TODO: and enable that functionality
      const bin = context.options.runWith?.binary || 'node';
      const args = context.options.runWith?.args || [
        '--experimental-json-modules'
      ];
      const options = context.options.runWith?.opts || {};

      context.treeOutput = await getTreeOutput(context);

      const { code, stdout, stderr } = await run(bin, [...args, indexPath], {
        cwd: context.root,
        ...options
      });

      context.testResult = {
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
    setup: async (context) => {
      assert(
        !context.options.setupGit ||
          typeof context.options.setupGit === 'function',
        'invalid or missing options.setupGit, expected function'
      );

      context.git = gitFactory({ baseDir: context.root });

      await (context.options.setupGit
        ? context.options.setupGit(context.git)
        : context.git
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
    setup: async (context) => {
      assert(
        Array.isArray(context.options.directoryPaths),
        'invalid or missing options.directoryPaths, expected array'
      );

      await Promise.all(
        context.options.directoryPaths.map((path) =>
          run('mkdir', ['-p', path], { cwd: context.root, reject: true })
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
    setup: async (context) => {
      await Promise.all(
        Object.entries(context.fileContents).map(async ([path, contents]) => {
          const fullPath = `${context.root}/${path}`;
          await accessFile(fullPath).then(
            () =>
              debug(
                `skipped creating dummy file: file already exists at ${path}`
              ),
            async () => {
              debug(`creating dummy file "${path}" with contents:`);
              debug.extend('contents >')(contents);
              await writeFile(
                fullPath,
                (context.fileContents[path] = contents)
              );
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
    setup: async (context) => {
      context.debug('test identifier: %O', context.testIdentifier);
      context.debug('root: %O', context.root);
      context.debug(context.treeOutput || (await getTreeOutput(context)));
      context.debug('per-file contents: %O', context.fileContents);
    }
  };
}

// ! Updated to use stripAnsi
// TODO: XXX: make this into a separate (mock-fixture) package (along w/ below)
export function runTestFixture(): MockFixture {
  return {
    name: 'run-test',
    description: 'running CLI command for jest integration test',
    setup: async (context) => {
      const bin = context.options.runWith?.binary;

      assert(bin, 'could not find runWith binary (required)');

      const args = context.options.runWith?.args || [];
      const options = context.options.runWith?.opts || {};

      const { code, stdout, stderr } = await run(bin, args, {
        cwd: context.root,
        ...options
      });

      const stripAnsi = (await import('strip-ansi')).default;

      context.testResult = {
        code,
        stdout: stripAnsi(stdout),
        stderr: stripAnsi(stderr)
      };
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
    FixtureContext<
      FixtureOptions & Partial<Record<string, unknown> & CustomOptions>
    > &
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

  const context = {
    root: '',
    testIdentifier,
    debug,
    using: [] as MockFixture[],
    options: finalOptions,
    fileContents: { ...finalOptions.initialFileContents }
    // TODO: 👇🏿 this is bad, don't do this, fix this 👇🏿
  } as unknown as CustomizedFixtureContext & { using: CustomizedMockFixture[] };

  if (finalOptions.use) {
    if (finalOptions.use?.[0]?.name != 'root')
      context.using.push(rootFixture());
    context.using = [...context.using, ...finalOptions.use];
    // ? `describe-root` fixture doesn't have to be the last one, but a fixture
    // ? with that name must be included at least once
    if (!finalOptions.use.some((f) => f.name === 'describe-root'))
      context.using.push(describeRootFixture());
  } else context.using = [rootFixture(), describeRootFixture()];

  context.using.push({
    name: testSymbol,
    description: '',
    setup: fn
  });

  let ranDescribe = false;
  const cleanupFunctions: NonNullable<CustomizedMockFixture['teardown']>[] = [];

  const setupDebugger = async (
    fixture: CustomizedMockFixture,
    error = false
  ) => {
    const toString = async (
      p: CustomizedMockFixture['name'] | CustomizedMockFixture['description']
      // TODO: replace with toss
    ) =>
      typeof p === 'function'
        ? p(context)
        : typeof p === 'string'
          ? p
          : ':impossible:';
    const name = await toString(fixture.name.toString());
    const desc = await toString(fixture.description);
    const dbg = debug.extend(error ? `${name}:<error>` : name);
    context.debug = dbg;
    dbg(desc);
  };

  try {
    for (const mockFixture of context.using) {
      if (mockFixture.name === testSymbol) {
        context.debug = debug;
        debug('executing test callback');
      } else {
        // eslint-disable-next-line no-await-in-loop
        await setupDebugger(mockFixture);
        if (mockFixture.teardown) cleanupFunctions.push(mockFixture.teardown);
      }

      mockFixture.setup
        ? // eslint-disable-next-line no-await-in-loop
          await mockFixture.setup(context)
        : context.debug('(warning: mock fixture has no setup function)');

      if (mockFixture.name === 'describe-root') ranDescribe = true;
    }
  } catch (error) {
    context.debug.extend('<error>')('exception occurred: %O', error);
    throw error;
  } finally {
    if (!ranDescribe) {
      const fixture = describeRootFixture();
      await setupDebugger(fixture, true);
      await fixture.setup?.(context);
    }

    context.debug = debug.extend('<cleanup>');

    for (const cfn of cleanupFunctions.reverse()) {
      // eslint-disable-next-line no-await-in-loop
      await cfn(context).catch((error) =>
        context.debug(
          `ignored exception in teardown function: ${
            error?.message || error.toString() || '<no error message>'
          }`
        )
      );
    }
  }
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
      FixtureContext<
        FixtureOptions & Partial<Record<string, unknown> & CustomOptions>
      > &
        CustomContext
    >,
    optionsOverrides?: Partial<FixtureOptions & CustomOptions>
  ) =>
    withMockedFixture<CustomOptions, CustomContext>({
      fn,
      testIdentifier,
      options: { ...options, ...optionsOverrides } as typeof options
    });
}
