import { readFileSync as readToString } from 'node:fs';

import { toMarkdown } from 'mdast-util-to-markdown';
import remarkParse from 'remark-parse';
import unified from 'unified';

import type { Root } from 'mdast';
import type { Options } from 'mdast-util-to-markdown';

export function getFixtureString(fixture: string, { trim = false } = {}) {
  return readToString(`${__dirname}/fixtures/${fixture}.md`, 'utf8')[
    trim ? 'trim' : 'toString'
  ]();
}

export function transformString(
  str: string,
  { toMarkdownOptions = {} as Options } = {}
) {
  const tree = unified().use(remarkParse).parse(str);
  return toMarkdown(tree as Root, toMarkdownOptions);
}
