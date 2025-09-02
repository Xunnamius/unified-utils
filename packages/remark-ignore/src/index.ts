import ignoreEnd from 'universe+remark-ignore:end.ts';
import ignoreStart, { ignoreStartTransformer } from 'universe+remark-ignore:start.ts';

//{@symbiote/notInvalid mdast}
//{@symbiote/notExtraneous @types/mdast}
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

export { ignoreEnd, ignoreStart };

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all child nodes following an ignore command having been hidden. After
 * all registered other plugins are run, this plugin visits the each hidden
 * child and reveals them.
 *
 * In this way, nodes hidden by this plugin are unaffected by transformations
 * from other plugins until said nodes are revealed.
 */
const remarkIgnore: Plugin<never[], Root> = function () {
  this.use(ignoreEnd);
  return ignoreStartTransformer;
};

export default remarkIgnore;
