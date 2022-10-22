import assert from 'node:assert';
import { visit, SKIP, type Visitor } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';

import type { Node, Parent, Data } from 'unist';
import type { Content as MdastContent } from 'mdast';

/**
 * The shape of a `Hidden` mdast node containing mdast content that is hidden
 * (and thus protected) from transformers.
 *
 * `Hidden` nodes are always generated, cannot be serialized to markdown, and
 * cannot be derived from markdown directly.
 */
export interface Hidden extends Node {
  type: 'hidden';
  hiddenChildren: MdastContent[];
}

/**
 * Returns a new `Hidden` node ready to be inserted into a mdast tree.
 */
export function createHiddenNode(children: MdastContent[]): Hidden {
  return {
    type: 'hidden',
    hiddenChildren: children
  };
}

/**
 * Type guard that returns true if `node` is a well-formed `Hidden` node
 * instance.
 */
export function isHidden(node: Node<Data>): node is Hidden {
  return node.type == 'hidden' && 'hiddenChildren' in node;
}

/**
 * Inserts a `Hidden` node as a child of `parent` at `index`. Any `nodes` passed
 * in will become the hidden children of this new node.
 */
export function hide<Nodes extends MdastContent[]>({
  nodes,
  index,
  parent,
  replaceChildAtIndex = true
}: {
  nodes: Nodes;
  index: number;
  parent: Parent<Node<Data>>;
  /**
   * If `replaceChildAtIndex` is `true`, the child node of `parent` at `index`
   * will be replaced by the new `Hidden` node.
   *
   * On the other hand, if `replaceChildAtIndex` is `false`, this function will
   * not remove any nodes from `parent`. In this case, if you do not manually
   * remove the node at `index`, **you must skip two nodes ahead instead of just
   * one when using a visitor or risk an infinite loop!**
   *
   * @default true
   * @example
   * ```typescript
   * visit(tree, 'heading', (node, index, parent) => {
   *   if (index !== null && parent !== null) {
   *     hide({
   *       nodes: [node],
   *       index,
   *       parent,
   *       replaceChildAtIndex: false
   *     });
   *     return [SKIP, index + 2]; // <- +2 here is IMPORTANT
   *   }
   * });
   * ```
   */
  replaceChildAtIndex?: boolean;
}) {
  parent.children.splice(index, replaceChildAtIndex ? 1 : 0, createHiddenNode(nodes));
}

/**
 * Replaces the child node of `parent` at `index` with the hidden children of
 * one or more `Hidden` `nodes`.
 */
export function reveal<Nodes extends Hidden[]>({
  nodes,
  index,
  parent
}: {
  nodes: Nodes;
  index: number;
  parent: Parent<Node<Data>>;
}) {
  parent.children.splice(
    index,
    1,
    ...nodes.flatMap((n) => n.hiddenChildren.map((n) => removePosition(n)))
  );
}

/**
 * Walks `tree` using unist-util-visit to search for any `Hidden` nodes. Upon
 * encountering a `Hidden` node, `visitor` is called if provided.
 *
 * If `visitor` is provided but returns `false`, `reveal` is not called and the
 * hidden is not revealed. Otherwise, `reveal` will always be called.
 *
 * If `visitor` is provided and returns a defined value other than `false`, that
 * value will be passed through to unist-util-visit. If `visitor` is not
 * provided, or it returns `undefined`, `[SKIP, index]` will be passed through
 * instead.
 */
export function visitAndReveal<Tree extends Node<Data>>({
  tree,
  visitor,
  reverse = false
}: {
  /**
   * @see https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse
   */
  tree: Tree;
  /**
   * If `visitor` is provided but returns `false`, `reveal` is not called and the
   * hidden is not revealed. Otherwise, `reveal` will always be called.
   *
   * If `visitor` is provided and returns a defined value other than `false`, that
   * value will be passed through to unist-util-visit. If `visitor` is not
   * provided, or it returns `undefined`, `[SKIP, index]` will be passed through
   * instead.
   */
  visitor?: Visitor;
  /**
   * @see https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse
   * @default false
   */
  reverse?: boolean;
}) {
  visit(
    tree,
    'hidden',
    (node, index, parent) => {
      assert(index !== null, 'index is missing');
      assert(parent !== null, 'parent is missing');
      assert(isHidden(node), 'malformed hidden node');

      const result = visitor?.(node, index, parent);

      if (result !== false) {
        reveal({ nodes: [node], index, parent });
        return result ?? [SKIP, index];
      }
    },
    reverse
  );
}
