import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit, SKIP } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';

import type { Test } from 'unist-util-visit';
import type { Node, Data } from 'unist';
import type { Root } from 'mdast';

export const dummyMarkdown = `
# Hello

Some *emphasis*, **importance**, and \`code\`.

# Goodbye
`;

export const removePositionDataFrom = (test: Test, t: Node<Data>) => {
  visit(t, test, (node, index) => {
    if (index !== null) {
      removePosition(node);
      return [SKIP, index + 1];
    }
  });

  return t;
};

export const getInitialAst = () => {
  return unified().use(remarkParse).parse(dummyMarkdown) as Root;
};

export const getMultiInitialAst = () => {
  const tree = getInitialAst();

  visit(tree, 'heading', (_, index, parent) => {
    if (index !== null && parent !== null) {
      parent.children.splice(
        index,
        1,
        { type: 'text', value: 'Hello', position: undefined },
        { type: 'text', value: 'to the', position: undefined },
        { type: 'text', value: 'world!', position: undefined }
      );
      return [SKIP, index + 3];
    }
  });

  return tree;
};
