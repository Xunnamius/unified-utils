import assert from 'node:assert';
import { parse as parseUrl, format as stringifyUrl } from 'node:url';
import { visit } from 'unist-util-visit';

import type { Root } from 'mdast';
import type { Plugin } from 'unified';

/**
 * Options type for the remark-remove-url-trailing-slash plugin.
 */
export type Options = {
  /**
   * If this option is `false`, trailing slashes will be removed from all URL
   * paths, including single-character `/` paths (i.e. "empty" paths).
   *
   * If this option is `true`, trailing slashes will only be removed from
   * non-relative URLs with empty paths, e.g. `https://example.com/ =>
   * https://example.com`.
   *
   * @default false
   */
  onlyConsiderHostUrls?: boolean;
};

/**
 * A remark plugin that takes a Root node as input and returns the same node
 * with all Link, Image, and Definition node `url` paths stripped of
 * trialing slashes.
 */
const remarkRemoveUrlTrailingSlash: Plugin<[options: Options] | void[], Root> =
  function ({ onlyConsiderHostUrls = false } = {} as Options, ..._ignored) {
    return (tree) => {
      visit(tree, ['link', 'image', 'definition'], (node) => {
        assert(
          node.type === 'link' || node.type === 'image' || node.type === 'definition',
          `unexpected node type ${node.type}`
        );

        const parsedUrl = parseUrl(node.url);
        const target =
          parsedUrl.protocol && parsedUrl.host
            ? `${parsedUrl.protocol}//${parsedUrl.host}`
            : '';

        if (node.url === `${target}/`) {
          node.url = node.url.slice(0, -1);
        } else if (
          (onlyConsiderHostUrls && parsedUrl.pathname === '/') ||
          (!onlyConsiderHostUrls && parsedUrl.pathname?.endsWith('/'))
        ) {
          const { hash, search } = parsedUrl;
          parsedUrl.hash = parsedUrl.search = '';
          node.url = `${stringifyUrl(parsedUrl).slice(0, -1)}${search || ''}${hash || ''}`;
        }
      });
    };
  };

export default remarkRemoveUrlTrailingSlash;
