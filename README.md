<!-- prettier-ignore-start -->
<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![Last commit timestamp][badge-last-commit]][link-repo]
[![Open issues][badge-issues]][link-issues]
[![Pull requests][badge-pulls]][link-pulls]
[![Uses semantic-release][badge-semantic-release]][link-semantic-release]

<!-- badges-end -->
<!-- prettier-ignore-end -->

# unified-utils

This monorepo contains several utilities for working with [unist][1]/[mdast][2]
ASTs, [remark][3] and [remark-lint][4], and the broader [unified ecosystem][5].

---

<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Packages](#packages)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->
<!-- prettier-ignore-end -->

## Packages

- [mdast-util-tight-comments][6] — selectively remove newlines around comment
  nodes during serialization
- [mdast-util-hidden][7] — prevent nodes from being seen by [transformers][8]
- [remark-ignore][9] — use comments to exclude one or more nodes from
  [transformation][8]
- [remark-tight-comments][10] — selectively remove newlines around comments
- [remark-renumber-references][11] — renumber numeric [reference-style link
  ids][12] contiguously starting from `[1]`
- [remark-sort-definitions][13] — reorder [reference-style link definitions][12]
  at the end of a document
- [remark-remove-unused-definitions][14] — removes unused [reference-style link
  definitions][12] from a document

## Related

- [@projectorjs/config-remark][15] — reusable remark presets
- [remark][3] — processor and CLI
- [unified][5] — parser ecosystem
- [mdast][2] — Markdown specification
- [unist][1] — base specification

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

Thanks goes to these wonderful people ([emoji key][16]):

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

This project follows the [all-contributors][17] specification. Contributions of
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
[6]: ./packages/mdast-util-tight-comments
[7]: ./packages/mdast-util-hidden
[8]: https://github.com/unifiedjs/unified#overview
[9]: ./packages/remark-ignore
[10]: ./packages/remark-tight-comments
[11]: ./packages/remark-renumber-references
[12]: https://github.com/remarkjs/remark-reference-links#what-is-this
[13]: ./packages/remark-sort-definitions
[14]: /packages/remark-remove-unused-definitions
[15]: https://github.com/Xunnamius/projector/blob/main/packages/config-remark
[16]: https://allcontributors.org/docs/en/emoji-key
[17]: https://github.com/all-contributors/all-contributors
