import { visitAndReveal } from 'universe+mdast-util-hidden';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all hidden child nodes revealed.
 */
const ignoreEnd: Plugin<void[], Root> = function () {
  return ignoreEndTransformer;
};

/**
 * A unified transformer that takes a Root node as input and returns the same
 * node with all hidden child nodes revealed.
 */
export function ignoreEndTransformer(tree: Root) {
  visitAndReveal({ tree });
}

export default ignoreEnd;
