<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![Last commit timestamp][badge-last-commit]][link-repo]
[![Open issues][badge-issues]][link-issues]
[![Pull requests][badge-pulls]][link-pulls]
[![Uses semantic-release][badge-semantic-release]][link-semantic-release]

<!-- badges-end -->

# unified-utils

This monorepo contains several utilities for working with [unist][1]/[mdast][2]
ASTs, [remark][3] and [remark-lint][4], and the broader [unified ecosystem][5].

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Packages](#packages)
  - [mdast](#mdast)
  - [remark](#remark)
  - [remark-lint](#remark-lint)
  - [Forks](#forks)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Packages

<!-- remark-ignore -->

### [mdast](https://github.com/syntax-tree/mdast)

- [mdast-util-hidden][6] — prevent nodes from being seen by [transformers][7].
- [mdast-util-tight-comments][8] — selectively remove newlines around comment
  nodes during serialization.

<!-- remark-ignore -->

### [remark](https://github.com/remarkjs)

- [remark-capitalize-headings][9] — selectively transform headings using
  Vercel's [title][10] package.
- [remark-ignore][11] — use comments to exclude one or more nodes from
  [transformation][7].
- [remark-remove-unused-definitions][12] — remove unused [reference-style link
  definitions][13] from a document.
- [remark-remove-url-trailing-slash][14] — remove trailing slashes from the ends
  of all URL paths.
- [remark-renumber-references][15] — renumber numeric [reference-style link
  ids][13] contiguously starting from `[1]`.
- [remark-sort-definitions][16] — reorder [reference-style link definitions][13]
  at the end of a document.
- [remark-tight-comments][17] — selectively remove newlines around comments.

<!-- remark-ignore -->

### [remark-lint](https://github.com/remarkjs/remark-lint)

- [remark-lint-fenced-code-flag-case][18] — warn when fenced code blocks have
  inconsistent or improperly cased language flags.
- [remark-lint-heading-word-length][19] — warn when headings have too many or
  too few words.
- [remark-lint-list-item-style][20] — warn when list items violate a given
  style.

### Forks

These are (likely temporary) installable forks with changes that might be merged
back upstream.

- [remark-lint-no-empty-url][21] — warn for empty URLs in links and images
  ([upstream][22]).

## Related

- [@projectorjs/config-remark][23] — reusable remark presets.
- [remark][3] — processor and CLI.
- [unified][5] — parser ecosystem.
- [mdast][2] — Markdown specification.
- [unist][1] — base specification.

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- remark-ignore-end -->

Thanks goes to these wonderful people ([emoji key][24]):

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://xunn.io/"><img src="https://avatars.githubusercontent.com/u/656017?v=4?s=100" width="100px;" alt="Bernard"/><br /><sub><b>Bernard</b></sub></a><br /><a href="#infra-Xunnamius" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Code">💻</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Documentation">📖</a> <a href="#maintenance-Xunnamius" title="Maintenance">🚧</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Tests">⚠️</a> <a href="https://github.com/Xunnamius/unified-utils/pulls?q=is%3Apr+reviewed-by%3AXunnamius" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- remark-ignore-end -->

This project follows the [all-contributors][25] specification. Contributions of
any kind welcome!

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[badge-issues]:
  https://img.shields.io/github/issues/Xunnamius/unified-utils
  'Open issues'
[badge-last-commit]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils
  'Latest commit timestamp'
[badge-pulls]:
  https://img.shields.io/github/issues-pr/xunnamius/unified-utils
  'Open pull requests'
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo uses semantic-release!'
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[contributing]: CONTRIBUTING.md
[link-blm]: https://xunn.at/donate-blm
[link-issues]: https://github.com/Xunnamius/unified-utils/issues?q=
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]: https://github.com/xunnamius/unified-utils
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: .github/SUPPORT.md
[1]: https://github.com/syntax-tree/unist
[2]: https://github.com/syntax-tree/mdast
[3]: https://github.com/remarkjs
[4]: https://github.com/remarkjs/remark-lint
[5]: https://github.com/unifiedjs
[6]: ./packages/mdast-util-hidden
[7]: https://github.com/unifiedjs/unified#overview
[8]: ./packages/mdast-util-tight-comments
[9]: ./packages/remark-capitalize-headings
[10]: https://github.com/vercel/title
[11]: ./packages/remark-ignore
[12]: /packages/remark-remove-unused-definitions
[13]: https://github.com/remarkjs/remark-reference-links#what-is-this
[14]: ./packages/remark-remove-url-trailing-slash
[15]: ./packages/remark-renumber-references
[16]: ./packages/remark-sort-definitions
[17]: ./packages/remark-tight-comments
[18]: ./packages/remark-lint-fenced-code-flag-case
[19]: /packages/remark-lint-heading-word-length
[20]: ./packages/remark-lint-list-item-style
[21]:
  https://github.com/Xunnamius/remark-lint/tree/main/packages/remark-lint-no-empty-url
[22]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-empty-url
[23]: https://github.com/Xunnamius/projector/blob/main/packages/config-remark
[24]: https://allcontributors.org/docs/en/emoji-key
[25]: https://github.com/all-contributors/all-contributors
