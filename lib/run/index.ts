import execa from 'execa';
import { debugFactory } from 'multiverse/debug-extended';

import type { ExecaReturnValue, ExecaSyncError } from 'execa';

const debug = debugFactory('@xunnamius/run:runtime');

/**
 * Options passed to execa.
 *
 * @see https://github.com/sindresorhus/execa#options
 */
export interface RunOptions extends execa.Options {
  /**
   * Setting this to `true` rejects the promise instead of resolving it with the
   * error.
   *
   * @default false
   */
  reject?: boolean;
}

export type RunReturnType = ExecaReturnValue &
  ExecaSyncError & { code: ExecaReturnValue['exitCode'] };

/**
 * Runs (executes) `file` with the given arguments (`args`) with respect to the
 * given `options`.
 *
 * Note that, by default, this function does NOT reject on a
 * non-zero exit code. Set `reject: true` to override this.
 */
export async function run(file: string, args?: string[], options?: RunOptions) {
  debug(`executing command: ${file}${args ? ` ${args.join(' ')}` : ''}`);

  const result = (await execa(file, args, {
    reject: false,
    ...options
  })) as RunReturnType;

  result.code = result.exitCode;
  debug('execution result: %O', result);

  return result;
}

/**
 * Returns a function that, when called, runs (executes) `file` with the given
 * arguments (`args`) with respect to the given `options`. These parameters can
 * be overridden during individual invocations.
 *
 * Note that, by default, this function does NOT reject on a
 * non-zero exit code. Set `reject: true` to override this.
 */
export function runnerFactory(file: string, args?: string[], options?: RunOptions) {
  const factoryArgs = args;
  const factoryOptions = options;

  return (args?: string[], options?: RunOptions) =>
    run(file, args || factoryArgs, { ...factoryOptions, ...options });
}
