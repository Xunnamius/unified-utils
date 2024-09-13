<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Open issues][x-badge-issues-image]][x-badge-issues-link]
[![Pull requests][x-badge-pulls-image]][x-badge-pulls-link]
[![Uses semantic-release][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

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
  capitalization or punctuation style.

### Forks

These are (likely temporary) installable forks with changes that might be merged
back upstream.

- ~~[remark-lint-no-empty-url][21] — warn for empty URLs in links and images
  ([upstream][22]).~~ Was successfully merged upstream and released! 🎉

## Related

- [@projectorjs/config-remark][23] — reusable remark presets.
- [remark][3] — processor and CLI.
- [unified][5] — parser ecosystem.
- [mdast][2] — Markdown specification.
- [unist][1] — base specification.

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Thank
you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

### Contributors

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- remark-ignore-end -->

Thanks goes to these wonderful people ([emoji
key][x-repo-all-contributors-emojis]):

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://xunn.io/"><img src="https://avatars.githubusercontent.com/u/656017?v=4?s=100" width="100px;" alt="Bernard"/><br /><sub><b>Bernard</b></sub></a><br /><a href="#infra-Xunnamius" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Code">💻</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Documentation">📖</a> <a href="#maintenance-Xunnamius" title="Maintenance">🚧</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=Xunnamius" title="Tests">⚠️</a> <a href="https://github.com/Xunnamius/unified-utils/pulls?q=is%3Apr+reviewed-by%3AXunnamius" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fviolette"><img src="https://avatars.githubusercontent.com/u/19730806?v=4?s=100" width="100px;" alt="François Violette"/><br /><sub><b>François Violette</b></sub></a><br /><a href="https://github.com/Xunnamius/unified-utils/issues?q=author%3Afviolette" title="Bug reports">🐛</a> <a href="#ideas-fviolette" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://crutchcorn.dev/"><img src="https://avatars.githubusercontent.com/u/9100169?v=4?s=100" width="100px;" alt="Corbin Crutchley"/><br /><sub><b>Corbin Crutchley</b></sub></a><br /><a href="https://github.com/Xunnamius/unified-utils/commits?author=crutchcorn" title="Documentation">📖</a> <a href="#research-crutchcorn" title="Research">🔬</a> <a href="https://github.com/Xunnamius/unified-utils/issues?q=author%3Acrutchcorn" title="Bug reports">🐛</a> <a href="https://github.com/Xunnamius/unified-utils/commits?author=crutchcorn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LuchoTurtle"><img src="https://avatars.githubusercontent.com/u/17494745?v=4?s=100" width="100px;" alt="LuchoTurtle"/><br /><sub><b>LuchoTurtle</b></sub></a><br /><a href="https://github.com/Xunnamius/unified-utils/commits?author=LuchoTurtle" title="Documentation">📖</a></td>
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

This project follows the [all-contributors][x-repo-all-contributors]
specification. Contributions of any kind welcome!

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-issues-image]:
  https://img.shields.io/github/issues/Xunnamius/unified-utils?style=flat-square
  'Open issues'
[x-badge-issues-link]: https://github.com/Xunnamius/unified-utils/issues?q=
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-pulls-image]:
  https://img.shields.io/github/issues-pr/xunnamius/unified-utils?style=flat-square
  'Open pull requests'
[x-badge-pulls-link]: https://github.com/xunnamius/unified-utils/pulls
[x-badge-repo-link]: https://github.com/xunnamius/unified-utils
[x-badge-semanticrelease-image]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
  'This repo uses semantic-release!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-repo-all-contributors]: https://github.com/all-contributors/all-contributors
[x-repo-all-contributors-emojis]: https://allcontributors.org/docs/en/emoji-key
[x-repo-choose-new-issue]:
  https://github.com/xunnamius/unified-utils/issues/new/choose
[x-repo-contributing]: CONTRIBUTING.md
[x-repo-pr-compare]: https://github.com/xunnamius/unified-utils/compare
[x-repo-support]: .github/SUPPORT.md
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
