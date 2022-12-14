import ignoreStart, { ignoreStartTransformer } from './start';
import ignoreEnd from './end';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

export { ignoreStart, ignoreEnd };

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all child nodes following an ignore command having been hidden. After
 * all registered other plugins are run, this plugin visits the each hidden
 * child and reveals them.
 *
 * In this way, nodes hidden by this plugin are unaffected by transformations
 * from other plugins until said nodes are revealed.
 */
const remarkIgnore: Plugin<void[], Root> = function () {
  this.use(ignoreEnd);
  return ignoreStartTransformer;
};

export default remarkIgnore;
