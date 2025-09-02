import { toString } from 'mdast-util-to-string';
import { lintRule as createLintRule } from 'unified-lint-rule';
import { generated as isGenerated } from 'unist-util-generated';
import { visit } from 'unist-util-visit';

//{@symbiote/notInvalid mdast}
//{@symbiote/notExtraneous @types/mdast}
import type { Heading, Parent } from 'mdast';
import type { Plugin } from 'unified';

const origin = 'remark-lint:heading-word-length';

/**
 * Options type for the remark-lint-heading-word-length plugin.
 */
export type Options = {
  /**
   * The minimum number of words required in a heading.
   *
   * Set to `false` to prevent minimum word length checks.
   *
   * @default 1
   */
  minimumWords?: false | number;

  /**
   * The maximum number of words allowed in a heading.
   *
   * Set to `false` (or `Infinity`) to prevent maximum word length checks.
   *
   * @default 10
   */
  maximumWords?: false | number;
};

/**
 * A remark-lint rule that takes a Root node as input and attaches any error
 * messages to the resulting virtual file pertaining to fenced code flag case.
 */
const remarkLintHeadingWordLength: Plugin<[Options] | []> = createLintRule(
  {
    origin,
    url: 'https://github.com/Xunnamius/unified-utils/tree/main/packages/remark-lint-heading-word-length#readme'
  },
  function (tree, file, options) {
    const { minimumWords, maximumWords } = coerceToOptions(file, options);

    visit(tree, (node) => {
      if (node.type === 'heading' && !isGenerated(node)) {
        const heading = node as Heading;
        const words = toString(heading).split(/\s/).filter(Boolean);

        // ? Scuttle attempts from recent unified-message-control versions to
        // ? filter out messages based on so-called "gaps"
        if (
          'children' in tree &&
          (tree as Parent).children.at(-1) === node &&
          typeof heading.position?.start.offset === 'number'
        ) {
          heading.position.start.offset++;
        }

        if (minimumWords !== false && words.length < minimumWords) {
          file.message(
            `Heading must have at least ${minimumWords} word${
              minimumWords === 1 ? '' : 's'
            } (current length: ${words.length})`,
            heading
          );
        }

        if (maximumWords !== false && words.length > maximumWords) {
          file.message(
            `Heading must have at most ${maximumWords} word${
              maximumWords === 1 ? '' : 's'
            } (current length: ${words.length})`,
            heading
          );
        }
      }
    });
  }
);

export default remarkLintHeadingWordLength;

function coerceToOptions(file: { fail: (str: string) => never }, options: unknown) {
  options = options || {};

  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    file.fail('Error: Bad configuration');
  }

  const minimumWords = (
    'minimumWords' in options ? options.minimumWords : 1
  ) as NonNullable<Options['minimumWords']>;

  const maximumWords = (
    'maximumWords' in options ? options.maximumWords : 10
  ) as NonNullable<Options['maximumWords']>;

  if (
    minimumWords !== false &&
    (typeof minimumWords !== 'number' || Number.isNaN(minimumWords) || minimumWords < 0)
  ) {
    file.fail(`Error: Bad configuration minimumWords value "${minimumWords}"`);
  }

  if (
    maximumWords !== false &&
    (typeof maximumWords !== 'number' || Number.isNaN(maximumWords) || maximumWords < 0)
  ) {
    file.fail(`Error: Bad configuration maximumWords value "${maximumWords}"`);
  }

  return {
    minimumWords,
    maximumWords
  };
}
