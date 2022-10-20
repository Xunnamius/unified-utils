import type { Options as ToMarkdownOptions } from 'mdast-util-to-markdown';

/**
 * A mdast-util-to-markdown joiner function that ensures tight spacing between
 * HTML comments and select other mdast nodes under certain conditions.
 */
export function joinTightComments(): ToMarkdownOptions {
  return {
    join: [
      (leftNode, rightNode) => {
        if (leftNode.type == 'html') {
          const leftNodeIsComment = leftNode.value.startsWith('<!--');
          const leftNodeIsSimpleIgnore = leftNode.value === '<!-- remark-ignore -->';
          const leftNodeWantsSpaceAfter = leftNode.value.endsWith('|-->');
          const rightNodeIsHTML = rightNode.type == 'html';
          const rightNodeIsComment =
            rightNodeIsHTML && rightNode.value.startsWith('<!--');
          const rightNodeIsSimpleIgnore =
            rightNodeIsHTML && rightNode.value === '<!-- remark-ignore -->';
          const rightNodeWantsSpaceBefore =
            rightNodeIsHTML && rightNode.value.startsWith('<!--|');

          if (
            // ? Ensure there's no newline below <!-- remark-ignore -->
            leftNodeIsSimpleIgnore ||
            // ? Ensure there's no newline between two comments...
            // prettier-ignore
            leftNodeIsComment && rightNodeIsComment &&
              // ? ... unless the right node is <!-- remark-ignore -->
              !rightNodeIsSimpleIgnore &&
              // ? ... unless the left node ends in |-->
              !leftNodeWantsSpaceAfter &&
              // ? ... unless the right node begins with <!--|
              !rightNodeWantsSpaceBefore
          ) {
            // ? Ensure "tight" spacing (separated by 0 newlines)
            return 0;
          }
        }

        // ? Let another joiner (or the default) decide the number of newlines
        return undefined;
      }
    ]
  };
}
