import { visit } from 'unist-util-visit';
import { generated as isGenerated } from 'unist-util-generated';
import { lintRule as createLintRule } from 'unified-lint-rule';
import { toString } from 'mdast-util-to-string';

import type { List } from 'mdast';
import type { VFile } from 'vfile';

const origin = 'unified-utils:list-item-style plugin';

/**
 * Valid values for the Options.checkFirstWord property.
 */
export const optionsCheckFirstWord = [false, 'capitalize', 'lowercase'] as const;

/**
 * Valid values for the Options.checkListSpread property.
 */
export const optionsCheckListSpread = [
  'first',
  'final',
  'first-and-final',
  'each'
] as const;

/**
 * Options type for the remark-lint-list-item-style plugin.
 */
export type Options = {
  /**
   * Checks that the final character of each stringified list item matches at
   * least one of the given values.
   *
   * To match all unicode punctuation characters, you could provide `["\p{P}"]`
   * instead of the default, but this will match characters like `)` and `]`.
   *
   * Alternatively, to prevent punctuation, you could provide `["\P{P}"]`.
   *
   * Lines that consist solely of an image are ignored.
   *
   * @default ["(\\.|\\?|;|,|!)"]
   */
  checkPunctuation?: false | (string | RegExp)[];
  /**
   * Checks that the first word of each stringified list item paragraph begins
   * with a non-lowercase character (`"capitalize"`) or a non-uppercase
   * character (`"lowercase"`).
   *
   * List items beginning with a link, image, or inline code block are ignored.
   *
   * @default "capitalize"
   */
  checkFirstWord?: typeof optionsCheckFirstWord[number];
  /**
   * Determines how `checkPunctuation` is applied to list items with spread
   * children. Has no effect when `checkPunctuation` is `false`.
   *
   * @default "each"
   */
  checkListSpread?: typeof optionsCheckListSpread[number];
};

/**
 * A remark-lint rule that takes a Root node as input and attaches any error
 * messages to the resulting virtual file pertaining to list item style.
 */
const remarkLintFencedCodeFlagCase = createLintRule(
  {
    origin,
    url: 'https://github.com/Xunnamius/unified-utils/tree/main/packages/remark-lint-list-item-style plugin#readme'
  },
  function (tree, file, options = {}) {
    const { checkPunctuation, checkFirstWord, checkListSpread } = coerceToOptions(
      file,
      options
    );

    visit(tree, (node) => {
      if (!isGenerated(node) && node.type == 'list') {
        const list = node as List;

        list.children.forEach((listItem) => {
          if (!isGenerated(listItem)) {
            if (checkPunctuation) {
              if (!listItem.children.length) {
                file.message(
                  'empty list item without punctuation is not allowed',
                  listItem
                );
              } else {
                const targets =
                  checkListSpread == 'each'
                    ? listItem.children
                    : checkListSpread == 'first'
                    ? [listItem.children[0]]
                    : checkListSpread == 'final'
                    ? ([listItem.children.at(-1)] as typeof listItem.children)
                    : listItem.children.length > 1
                    ? ([
                        listItem.children[0],
                        listItem.children.at(-1)
                      ] as typeof listItem.children)
                    : [listItem.children[0]];

                targets.forEach((child) => {
                  if (
                    child.type != 'paragraph' ||
                    child.children.length > 1 ||
                    !['image', 'imageReference'].includes(child.children[0]?.type)
                  ) {
                    // ? String iterator iterates over code points, meaning it
                    // ? doesn't mangle emojis like `'str'.at(-1)` does.
                    // * See: http://xunn.at/mdn-string-iterator
                    const chars = [...toString(child)].filter(Boolean).slice(-2);
                    const punctuation =
                      // ? Account for "old style" two-part emojis using \uFE0F.
                      chars.at(-1) == '\uFE0F' ? chars.join('') : chars.at(-1) || '';

                    // eslint-disable-next-line unicorn/prefer-regexp-test
                    if (!checkPunctuation.some((regExp) => !!punctuation.match(regExp))) {
                      file.message(
                        `"${punctuation}" is not allowed to punctuate list item`,
                        child
                      );
                    }
                  }
                });
              }
            }

            if (
              checkFirstWord &&
              typeof listItem.checked != 'boolean' &&
              listItem.children.length
            ) {
              listItem.children.forEach((child) => {
                if (
                  child.type != 'paragraph' ||
                  (child.children.length &&
                    ![
                      'inlineCode',
                      'link',
                      'linkReference',
                      'image',
                      'imageReference'
                    ].includes(child.children[0]?.type))
                ) {
                  const actual = toString(child)[0];
                  const expected =
                    actual[
                      checkFirstWord == 'capitalize' ? 'toUpperCase' : 'toLowerCase'
                    ]();

                  if (expected != actual) {
                    file.message(
                      `Inconsistent list item capitalization: "${actual}" should be "${expected}"`,
                      child
                    );
                  }
                }
              });
            }
          }
        });
      }
    });
  }
);

export default remarkLintFencedCodeFlagCase;

function coerceToOptions(file: VFile, options: unknown) {
  options = options || {};

  if (!options || typeof options != 'object' || Array.isArray(options)) {
    file.fail('Error: Bad configuration');
  }

  const checkPunctuation = (
    'checkPunctuation' in options
      ? options.checkPunctuation
      : ['(\\.|\\?|;|,|!|\\p{Emoji}\uFE0F|\\p{Emoji_Presentation})']
  ) as NonNullable<Options['checkPunctuation']>;

  const checkFirstWord = (
    'checkFirstWord' in options ? options.checkFirstWord : 'capitalize'
  ) as NonNullable<Options['checkFirstWord']>;

  const checkListSpread = (
    'checkListSpread' in options ? options.checkListSpread : 'each'
  ) as NonNullable<Options['checkListSpread']>;

  const checkPunctuationRegExp = checkPunctuationToRegExp();

  if (!optionsCheckFirstWord.includes(checkFirstWord)) {
    file.fail(`Error: Bad configuration checkFirstWord value "${checkFirstWord}"`);
  }

  if (!optionsCheckListSpread.includes(checkListSpread)) {
    file.fail(`Error: Bad configuration checkListSpread value "${checkListSpread}"`);
  }

  return {
    checkPunctuation: checkPunctuationRegExp as false | RegExp[],
    checkFirstWord,
    checkListSpread
  };

  function checkPunctuationToRegExp() {
    if (checkPunctuation !== false && !Array.isArray(checkPunctuation)) {
      file.fail(`Error: Bad configuration checkPunctuation value "${checkPunctuation}"`);
    }

    try {
      return checkPunctuation ? checkPunctuation.map((r) => new RegExp(r, 'gu')) : false;
    } catch (error) {
      file.fail(`Error: Bad configuration checkPunctuation RegExp: ${error}`);
    }
  }
}
