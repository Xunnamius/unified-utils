import { readFileSync as readToString } from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toMarkdown, type Options } from 'mdast-util-to-markdown';

import type { Root } from 'mdast';

export function getFixtureString(fixture: string, { trim = false } = {}) {
  return readToString(`${__dirname}/fixtures/${fixture}.md`, 'utf8')[
    trim ? 'trim' : 'toString'
  ]();
}

export function transformString(str: string, { toMarkdownOptions = {} as Options } = {}) {
  const tree = unified().use(remarkParse).parse(str);
  return toMarkdown(tree as Root, toMarkdownOptions);
}
