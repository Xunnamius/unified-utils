import { joinTightComments } from 'pkgverse/mdast-util-tight-comments/src/index';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

/**
 * A remark plugin that ensures tight spacing between HTML comments and select
 * other mdast nodes under certain conditions.
 */
const remarkTightComments: Plugin<void[], Root> = function () {
  const data = this.data();

  add('toMarkdownExtensions', joinTightComments());

  function add(field: string, value: unknown) {
    const list = // ? Be cognizant of other extensions
      (data[field] || (data[field] = [])) as unknown[];

    list.push(value);
  }
};

export default remarkTightComments;
