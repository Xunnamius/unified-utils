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

This monorepo contains several utilities for working with [unist][5]/[mdast][6]
ASTs, [remark][7] and [remark-lint][8], and the [unified ecosystem][9].

---

<!-- prettier-ignore-start -->

<!-- remark-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

*   [Packages][1]
*   [Related][2]
*   [Contributing and Support][3]
    *   [Contributors][4]

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- remark-ignore-end -->

<!-- prettier-ignore-end -->

## Packages

- [mdast-util-hidden][10] — prevent nodes from being seen by [transformers][11]
- [remark-ignore][12] — use comments to exclude one or more nodes from
  [transformation][11]
- [remark-renumber-references][13] — renumber numeric [reference-style link
  ids][14] contiguously starting from `[1]`
- [remark-sort-references][15] — reorder [reference-style link definitions][14]
  at the end of a document

## Related

- [@projectorjs/config-remark][16] — reusable remark presets
- [unified][9] — parser ecosystem
- [remark][7] — processor and CLI
- [unist][5] — base specification
- [mdast][6] — Markdown specification

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

<!-- TODO -->

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[link-blm]: https://xunn.at/donate-blm
[link-repo]: https://github.com/xunnamius/unified-utils
[badge-last-commit]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils
  'Latest commit timestamp'
[badge-issues]:
  https://img.shields.io/github/issues/Xunnamius/unified-utils
  'Open issues'
[link-issues]: https://github.com/Xunnamius/unified-utils/issues?q=
[badge-pulls]:
  https://img.shields.io/github/issues-pr/xunnamius/unified-utils
  'Open pull requests'
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo uses semantic-release!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[contributing]: CONTRIBUTING.md
[support]: .github/SUPPORT.md
[1]: #packages
[2]: #related
[3]: #contributing-and-support
[4]: #contributors
[5]: https://github.com/syntax-tree/unist
[6]: https://github.com/syntax-tree/mdast
[7]: https://github.com/remarkjs
[8]: https://github.com/remarkjs/remark-lint
[9]: https://github.com/unifiedjs
[10]: ./packages/mdast-util-hidden
[11]: https://github.com/unifiedjs/unified#overview
[12]: ./packages/remark-ignore
[13]: ./packages/remark-renumber-references
[14]: https://github.com/remarkjs/remark-reference-links#what-is-this
[15]: ./packages/remark-sort-references
[16]: https://github.com/Xunnamius/projector/blob/main/packages/config-remark
