import { hide } from 'pkgverse/mdast-util-hidden/src/index';
import { commentMarker } from 'mdast-comment-marker';
import { visit, SKIP } from 'unist-util-visit';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all child nodes following an ignore command having been hidden.
 *
 * In this way, nodes hidden by this plugin are unaffected by transformations
 * from other plugins until said nodes are revealed.
 */
const ignoreStart: Plugin<void[], Root> = function () {
  return ignoreStartTransformer;
};

/**
 * A unified transformer that takes a Root node as input and returns the same
 * node with all child nodes following an ignore command having been hidden.
 */
export function ignoreStartTransformer(tree: Root) {
  let hiding: boolean | 'once' = false;

  visit(tree, (node, index, parent) => {
    if (index !== null && parent !== null) {
      if (node.type == 'html') {
        const info = commentMarker(node);

        if (info) {
          if (info.name == 'remark-ignore') {
            hiding ||= 'once';
          } else if (info.name == 'remark-ignore-start') {
            hiding = true;
          } else if (info.name == 'remark-ignore-end') {
            hiding = false;
          }
        }

        return;
      }

      if (hiding) {
        // ? Since we've filtered out nodes without parents, type can't be Root
        hide({ nodes: [node as Exclude<typeof node, Root>], index, parent });

        if (hiding === 'once') {
          hiding = false;
        }

        return [SKIP, index + 1];
      }
    }
  });
}

export default ignoreStart;
