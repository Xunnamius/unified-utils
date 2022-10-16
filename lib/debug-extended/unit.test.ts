import { debugFactory, extendDebugger } from 'multiverse/debug-extended';
import { debug as oldDebug } from 'debug';

describe('::debugFactory', () => {
  it('returns ExtendedDebugger instances', async () => {
    expect.hasAssertions();

    const debug = debugFactory('namespace');

    expect(debug).toHaveProperty('error');
    expect(debug).toHaveProperty('warn');
    expect(debug).toHaveProperty('extend');
  });

  it('returns an instance with error, warn, and extend', async () => {
    expect.hasAssertions();

    const debug = debugFactory('namespace');
    const extended = debug.extend('extended');

    expect(extended).toHaveProperty('error');
    expect(extended).toHaveProperty('warn');
    expect(extended).toHaveProperty('extend');
  });
});

describe('::extendDebugger', () => {
  it('returns an instance with error, warn, and extend', async () => {
    expect.hasAssertions();

    const debug = oldDebug('namespace');
    const extended = extendDebugger(debug);

    expect(extended).toHaveProperty('error');
    expect(extended).toHaveProperty('warn');
    expect(extended).toHaveProperty('extend');
  });
});
