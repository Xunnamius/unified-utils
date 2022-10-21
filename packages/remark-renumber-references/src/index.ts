import assert from 'node:assert';
import { visit, SKIP } from 'unist-util-visit';
import { hide, visitAndReveal } from 'mdast-util-hidden';
import { removePosition } from 'unist-util-remove-position';
import remarkInlineLinks from 'remark-inline-links';
import remarkReferenceLinks from 'remark-reference-links';

import type { Plugin } from 'unified';
import type { Root, Definition } from 'mdast';

/**
 * Options type for the remark-renumber-references plugin.
 */
export type Options = {
  /**
   * If `true`, alphanumeric definition ids (i.e. any id that cannot be parsed
   * into an integer) will be spared during the renumbering. If `false`, _all_
   * definition ids will be deleted and recreated starting from `[1]`.
   *
   * @default true
   */
  preserveAlphanumericDefinitions: boolean;
};

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all reference-style link nodes and their definition nodes renumbered in
 * ascending order starting from `[1]`.
 *
 * Links are assigned a numeric reference id as they are encountered.
 */
const remarkRenumberReferences: Plugin<[options: Options] | void[], Root> = function (
  { preserveAlphanumericDefinitions = true } = {} as Options,
  ..._ignored
) {
  return async (tree, file) => {
    const definitions: Definition[] = [];

    if (preserveAlphanumericDefinitions) {
      hideAlphanumericReferenceLinks();
    }

    await convertNonHiddenReferenceLinksToInlineLinks();

    if (preserveAlphanumericDefinitions) {
      revealHiddenReferenceLinks();
      appendRevealedReferenceLinkDefinitionsToDocument();
    }

    await convertInlineLinksToNumericReferenceLinks();

    function hideAlphanumericReferenceLinks() {
      visit(
        tree,
        ['imageReference', 'linkReference', 'definition'],
        (node, index, parent) => {
          assert(
            node.type === 'imageReference' ||
              node.type === 'linkReference' ||
              node.type === 'definition',
            `unexpected node type ${node.type}`
          );

          assert(index !== null, 'index is missing');
          assert(parent !== null, 'parent is missing');

          if (isAlphanumeric(node.identifier)) {
            if (node.type == 'definition') {
              definitions.push(removePosition(node));
            } else {
              hide({ nodes: [node], index, parent });
              return [SKIP, index + 1];
            }
          }
        }
      );
    }

    async function convertNonHiddenReferenceLinksToInlineLinks() {
      const transformer = remarkInlineLinks();
      assert(transformer, 'remark-inline-links did not return a transformer');
      await transformer(tree, file, () => undefined);
    }

    function revealHiddenReferenceLinks() {
      visitAndReveal({ tree });
    }

    function appendRevealedReferenceLinkDefinitionsToDocument() {
      tree.children.push(...definitions);
    }

    async function convertInlineLinksToNumericReferenceLinks() {
      const transformer = remarkReferenceLinks();
      assert(transformer, 'remark-reference-links did not return a transformer');
      await transformer(tree, file, () => undefined);
    }

    function isAlphanumeric(identifier: string) {
      return identifier && !/^\p{Decimal_Number}+$/u.test(identifier);
    }
  };
};

export default remarkRenumberReferences;
