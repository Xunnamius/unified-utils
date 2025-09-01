import assert from 'node:assert';

import { SKIP, visit } from 'unist-util-visit';

//{@symbiote/notInvalid mdast}
//{@symbiote/notExtraneous @types/mdast}
import type { Definition, Root } from 'mdast';
import type { Plugin } from 'unified';

const compareNaturally = new Intl.Collator(undefined, { numeric: true }).compare;

/**
 * Options type for the remark-sort-definitions plugin.
 */
export type Options = {
  /**
   * This option determines the sorting preference used when reordering
   * definitions.
   *
   * `numeric-first` will put definitions with purely numeric ids first, sorted
   * from least (i.e. 1) to greatest, followed by any remaining definitions
   * sorted [naturally][5].
   *
   * `alphanumeric-first` will put definitions with alphanumeric ids (i.e. any
   * id that cannot be parsed into an integer) first, sorted naturally, followed
   * by any remaining definitions sorted from least (i.e. 1) to greatest.
   *
   * @default "alphanumeric-first"
   */
  algorithm?: 'numeric-first' | 'alphanumeric-first';
};

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all definition nodes ordered with respect to the chosen
 * `Options.algorithm`.
 */
const remarkSortDefinitions: Plugin<[options: Options] | void[], Root> = function (
  { algorithm = 'alphanumeric-first' } = {} as Options,
  ..._ignored
) {
  const definitionMap = new Map<string, Definition>();

  return (tree) => {
    visit(tree, 'definition', (node, index, parent) => {
      assert(node.type === 'definition', `unexpected node type ${node.type}`);
      assert(index !== undefined, 'index is missing');
      assert(parent !== undefined, 'parent is missing');

      definitionMap.set(node.identifier.toUpperCase(), node);
      parent.children.splice(index, 1);

      return [SKIP, index];
    });

    tree.children.push(...getSortedDefinitions());

    function getSortedDefinitions() {
      return Array.from(definitionMap.entries())
        .sort(([a], [b]) => {
          const aIsNumeric = isNumeric(a);
          const bIsNumeric = isNumeric(b);
          const result = algorithm === 'numeric-first' ? -1 : 1;

          return aIsNumeric && !bIsNumeric
            ? result
            : !aIsNumeric && bIsNumeric
              ? -1 * result
              : compareNaturally(a, b);
        })
        .map(([, definition]) => definition);
    }

    function isNumeric(identifier: string) {
      return /^\p{Decimal_Number}+$/u.test(identifier);
    }
  };
};

export default remarkSortDefinitions;
