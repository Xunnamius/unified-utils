import remarkParse from 'remark-parse';
import unified from 'unified';
import { removePosition } from 'unist-util-remove-position';
import { SKIP, visit } from 'unist-util-visit';

//{@symbiote/notInvalid mdast}
//{@symbiote/notExtraneous @types/mdast}
import type { Node, Root } from 'mdast';
import type { Test } from 'unist-util-visit';

export const dummyMarkdown = `
# Hello

Some *emphasis*, **importance**, and \`code\`.

# Goodbye
`;

export const removePositionDataFrom = (test: Test, t: Node) => {
  visit(t, test, (node, index) => {
    if (index !== undefined) {
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
    if (index !== undefined && parent !== undefined) {
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
