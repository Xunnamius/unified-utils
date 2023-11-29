import { toString } from 'mdast-util-to-string';
import assert from 'node:assert';
import title from 'title';
import { SKIP, visit } from 'unist-util-visit';

import type { Root } from 'mdast';
import type { Plugin } from 'unified';

/**
 * Options type for the remark-remove-url-trailing-slash plugin.
 */
export type Options = {
  /**
   * Headings of the specified `level` in `{ [level]: true }` will be excluded
   * from capitalization entirely, where `h1` corresponds to `<h1>…</h1>`/`# …`,
   * `h2` to `<h2>…</h2>`/`## …`, etc.
   *
   * > Excludes with `false` values are treated as if they were commented out.
   *
   * @default {}
   */
  excludeHeadingLevel?: { [level in 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6']?: boolean };
  /**
   * Entire sections with a stringified heading matching at least one of
   * the given regular expression strings will be excluded from capitalization
   * entirely.
   *
   * @default []
   */
  excludeSectionRegExp?: (string | RegExp)[];
  /**
   * This option lets you manipulate non-excluded headers in their stringified
   * form _after they've been transformed by title_ by leveraging mdast position
   * data.
   *
   * This extra context is useful for tasks like capitalizing a word only if it
   * appears at the end of a heading, or as part of a phrase, or to prevent a
   * word from being capitalized.
   *
   * This option also supports using matching groups in during replacement.
   *
   * @default { "(?<=\\s)a(?=\\p{P})": "A" }
   */
  replaceHeadingRegExp?: { [regExp: string]: string };
  /**
   * TODO: Write docs
   */
  excludeHeadingText?: string[];
};

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all heading nodes capitalized using Vercel's `title` package.
 */
const remarkCapitalizeHeadings: Plugin<[options: Options] | void[], Root> = function (
  {
    excludeHeadingLevel = {},
    excludeSectionRegExp = [],
    replaceHeadingRegExp = { '(?<=\\s)a(?=\\p{P})': 'A' },
    excludeHeadingText = ["\\{\\s*#.*?\\}\\s*$"]
  } = {} as Options,
  ..._ignored
) {
  const computedExcludeHeadingLevel: Options['excludeHeadingLevel'] = excludeHeadingLevel;
  const computedExcludeSectionRegExp = excludeSectionRegExp.map(
    (r) => new RegExp(r, 'gu')
  );
  const computedReplaceHeadingRegExp = Object.entries(replaceHeadingRegExp).map(
    ([key, value]) => [new RegExp(key, 'gu'), value] as [key: RegExp, value: string]
  );

  return (tree) => {
    let skipIfDepthGreaterThan = Number.POSITIVE_INFINITY;

    visit(tree, 'heading', (node, index) => {
      assert(index !== undefined, 'index is missing');
      const stringified = toString(node);

      if (!skipSection() && !computedExcludeHeadingLevel[`h${node.depth}`]) {
        let manipulated = title(stringified);
        let unstringifyIndex = 0;

        computedReplaceHeadingRegExp.forEach(([regExp, replaceWith]) => {
          manipulated = manipulated.replaceAll(regExp, replaceWith);
        });

        if (stringified.length != manipulated.length) {
          throw new Error(
            `replaceHeadingRegExp option must not change the length of the following header: ${stringified}`
          );
        }

        if (manipulated != stringified) {
          const ignoredIndexes = new Set();
          for (const regex of excludeHeadingText) {
            const matches = stringified.match(new RegExp(regex, 'gmu'));
            if (!matches) continue;
            let lastIndex = 0;
            for (const match of matches) {
              const matchedIndex = stringified.indexOf(match, lastIndex);
              lastIndex = matchedIndex + match.length;
              for (let indexOfMatchLength = 0; indexOfMatchLength < match.length; indexOfMatchLength++) {
                ignoredIndexes.add(matchedIndex + indexOfMatchLength);
              }
            }
          }

          visit(node, (childNode, childIndex) => {
            if (childIndex !== undefined) {
              switch (childNode.type) {
                case 'inlineCode': {
                  unstringifyIndex += childNode.value.length;
                  return [SKIP, childIndex + 1];
                }

                case 'link':
                case 'linkReference': {
                  visit(childNode, 'text', (skippedTextNode) => {
                    unstringifyIndex += skippedTextNode.value.length;
                  });
                  return [SKIP, childIndex + 1];
                }

                case 'text': {
                  const text = toString(childNode);

                  childNode.value = "";

                  for (let inputIndex = unstringifyIndex; inputIndex < unstringifyIndex + text.length; inputIndex++) {
                    childNode.value += ignoredIndexes.has(inputIndex) ? stringified[inputIndex] : manipulated[inputIndex];
                  }

                  unstringifyIndex += text.length;

                  break;
                }
              }
            }
          });
        }
      }

      return [SKIP, index + 1];

      function skipSection() {
        if (node.depth > skipIfDepthGreaterThan) {
          return true;
        } else if (
          // eslint-disable-next-line unicorn/prefer-regexp-test
          computedExcludeSectionRegExp.some((regExp) => !!stringified.match(regExp))
        ) {
          skipIfDepthGreaterThan = node.depth;
          return true;
        } else {
          skipIfDepthGreaterThan = Number.POSITIVE_INFINITY;
          return false;
        }
      }
    });
  };
};

export default remarkCapitalizeHeadings;
