import { visit } from 'unist-util-visit';
import { generated as isGenerated } from 'unist-util-generated';
import { lintRule as createLintRule } from 'unified-lint-rule';

import type { Code } from 'mdast';

const origin = 'unified-utils:fenced-code-flag-case';

/**
 * Valid values for the Options.case property.
 */
export const optionsCases = ['lower', 'upper', 'capitalize'] as const;

/**
 * Options type for the remark-lint-fenced-code-flag-case plugin.
 */
export type Options = {
  /**
   * All code fence flags must be of the specified case. Code fences without
   * flags are ignored.
   *
   * @default "lower"
   */
  case?: typeof optionsCases[number];
};

/**
 * A remark-lint rule that takes a Root node as input and attaches any error
 * messages to the resulting virtual file pertaining to fenced code flag case.
 */
const remarkLintFencedCodeFlagCase = createLintRule(
  {
    origin,
    url: 'https://github.com/Xunnamius/unified-utils/tree/main/packages/remark-lint-fenced-code-flag-case#readme'
  },
  function (tree, file, options) {
    options = options || {};

    if (!!options && typeof options == 'object' && !Array.isArray(options)) {
      const expectedCase =
        // @ts-expect-error: works in typescript@4.9
        ('case' in options ? options.case : 'lower') as NonNullable<Options['case']>;

      if (optionsCases.includes(expectedCase)) {
        // The visit function's types are not very optimal and cause problems...
        visit(tree, (node) => {
          if (node.type == 'code') {
            const { lang: langActual } = node as Code;
            if (!isGenerated(node) && langActual) {
              const langExpected =
                expectedCase == 'lower'
                  ? langActual.toLowerCase()
                  : expectedCase == 'upper'
                  ? langActual.toUpperCase()
                  : langActual[0].toUpperCase() + langActual.slice(1).toLowerCase();

              if (langActual != langExpected) {
                file.message(
                  `Code fence flag "${langActual}" should be "${langExpected}"`,
                  node
                );
              }
            }
          }
        });
      } else {
        file.fail(`Error: Bad configuration case value "${expectedCase}"`);
      }
    } else {
      file.fail('Error: Bad configuration');
    }
  }
);

export default remarkLintFencedCodeFlagCase;
