import { joinTightComments } from 'universe+mdast-util-tight-comments';

import type { Root } from 'mdast';
import type { Plugin } from 'unified';

/**
 * A remark plugin that ensures tight spacing between HTML comments and select
 * other mdast nodes under certain conditions.
 */
const remarkTightComments: Plugin<void[], Root> = function () {
  const data = this.data() as Record<string, unknown>;

  add('toMarkdownExtensions', joinTightComments());

  function add(field: string, value: unknown) {
    const list = // ? Be cognizant of other extensions
      (data[field] || (data[field] = [])) as unknown[];

    list.push(value);
  }
};

export default remarkTightComments;
