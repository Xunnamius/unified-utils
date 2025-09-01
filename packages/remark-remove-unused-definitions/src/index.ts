import assert from 'node:assert';

import { generated as isGenerated } from 'unist-util-generated';
import { SKIP, visit } from 'unist-util-visit';

//{@symbiote/notInvalid mdast}
//{@symbiote/notExtraneous @types/mdast}
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

// * Inspired by:
// * https://github.com/remarkjs/remark-lint/blob/6ca7eeff07bb5c5e6a0daad68520b46e3d56ad8e/packages/remark-lint-no-unused-definitions/index.js

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all unused definition nodes deleted.
 */
const remarkRemoveUnusedDefinitions: Plugin<void[], Root> = function () {
  return (tree) => {
    const map = new Map<string, { used: boolean }>();

    visit(
      tree,
      [
        'imageReference',
        'linkReference',
        'footnoteReference',
        'definition',
        'footnoteDefinition'
      ],
      (node) => {
        assert(
          node.type === 'imageReference' ||
            node.type === 'linkReference' ||
            node.type === 'footnoteReference' ||
            node.type === 'definition' ||
            node.type === 'footnoteDefinition',
          `unexpected node type ${node.type}`
        );

        if (!isGenerated(node)) {
          if (
            node.type === 'imageReference' ||
            node.type === 'linkReference' ||
            node.type === 'footnoteReference'
          ) {
            const id = node.identifier.toUpperCase();
            const info = map.get(id);

            if (info) {
              info.used = true;
            } else {
              map.set(id, { used: true });
            }
          } else {
            const id = node.identifier.toUpperCase();

            if (!map.has(id)) {
              map.set(id, { used: false });
            }
          }
        }
      }
    );

    visit(tree, ['definition', 'footnoteDefinition'], (node, index, parent) => {
      assert(
        node.type === 'definition' || node.type === 'footnoteDefinition',
        `unexpected node type ${node.type}`
      );

      if (!isGenerated(node)) {
        const id = node.identifier.toUpperCase();
        const info = map.get(id);

        assert(info, 'new definition node magically appeared?!');
        assert(index !== undefined && parent !== undefined, 'expected index and parent');

        if (!info.used) {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
    });
  };
};

export default remarkRemoveUnusedDefinitions;
