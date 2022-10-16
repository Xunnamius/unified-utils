import getDebugger from 'debug';
import type { Debug, Debugger } from 'debug';

export type { Debug, Debugger };

/**
 * A Debug factory interface that returns `ExtendedDebugger` instances.
 */
export interface ExtendedDebug extends Debug {
  (...args: Parameters<Debug>): ExtendedDebugger;
}

/**
 * A Debugger interface extended with convenience methods.
 */
export interface ExtendedDebugger extends Debugger {
  error: Debugger;
  warn: Debugger;
  extend: (...args: Parameters<Debugger['extend']>) => ExtendedDebugger;
}

/**
 * An `ExtendedDebug` instance that returns an `ExtendedDebugger` instance via
 * `extendDebugger`.
 */
const debugFactory = ((...args: Parameters<Debug>) => {
  return extendDebugger(getDebugger(...args));
}) as ExtendedDebug;

Object.assign(debugFactory, getDebugger);

export { debugFactory };

/**
 * Extends a `Debugger` instance with several convenience methods, returning
 * what would more accurately be called an `ExtendedDebugger` instance.
 */
export function extendDebugger(instance: Debugger) {
  const extend = instance.extend.bind(instance);
  const finalInstance = instance as ExtendedDebugger;

  finalInstance.error = finalInstance.extend('<error>');
  finalInstance.warn = finalInstance.extend('<warn>');
  finalInstance.extend = (...args) => extendDebugger(extend(...args));

  return finalInstance;
}
