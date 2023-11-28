import assert from 'node:assert';
import { hide, visitAndReveal } from 'pkgverse/mdast-util-hidden/src/index';
import remarkInlineLinks from 'remark-inline-links';
import remarkReferenceLinks from 'remark-reference-links';
import { removePosition } from 'unist-util-remove-position';
import { SKIP, visit } from 'unist-util-visit';

import type { Definition, Root } from 'mdast';
import type { Plugin } from 'unified';

const scopeSymbol: unique symbol = Symbol('owned-by: remark-renumber-references');

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
  preserveAlphanumericDefinitions?: boolean;
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
  return async (tree) => {
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

          assert(index !== undefined, 'index is missing');
          assert(parent !== undefined, 'parent is missing');

          if (isAlphanumeric(node.identifier)) {
            if (node.type === 'definition') {
              removePosition(node);
              definitions.push(node);
            } else {
              hide({ nodes: [node], index, parent });

              parent.children[index].data = {
                ...parent.children[index].data,
                scope: scopeSymbol
              };

              return [SKIP, index + 1];
            }
          }
        }
      );
    }

    async function convertNonHiddenReferenceLinksToInlineLinks() {
      const transformer = remarkInlineLinks();
      assert(transformer, 'remark-inline-links did not return a transformer');
      await transformer(tree);
    }

    function revealHiddenReferenceLinks() {
      // ? Ensure that we're only revealing the hidden nodes that belong to us
      visitAndReveal({
        tree,
        visitor: (node) =>
          (node.data as Record<string, unknown>)?.scope === scopeSymbol
            ? undefined
            : false
      });
    }

    function appendRevealedReferenceLinkDefinitionsToDocument() {
      tree.children.push(...definitions);
    }

    async function convertInlineLinksToNumericReferenceLinks() {
      const transformer = remarkReferenceLinks();
      assert(transformer, 'remark-reference-links did not return a transformer');
      await transformer(tree);
    }

    function isAlphanumeric(identifier: string) {
      return identifier && !/^\p{Decimal_Number}+$/u.test(identifier);
    }
  };
};

export default remarkRenumberReferences;
