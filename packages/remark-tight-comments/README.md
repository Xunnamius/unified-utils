<!-- prettier-ignore-start -->
<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![Maintenance status][badge-maintenance]][link-repo]
[![Last commit timestamp][badge-last-commit]][link-repo]
[![Open issues][badge-issues]][link-issues]
[![Pull requests][badge-pulls]][link-pulls]
[![Codecov][badge-codecov]][link-codecov]
[![Source license][badge-license]][link-license]
[![NPM version][badge-npm]][link-npm]
[![Uses Semantic Release!][badge-semantic-release]][link-semantic-release]

<!-- badges-end -->
<!-- prettier-ignore-end -->

# remark-tight-comments

This is a [unified][23] ([remark][24]) plugin that allows you to selectively
remove unnecessary newlines around Markdown comments.

This plugin is useful for preserving the structure of auto-generated content,
e.g. [all-contributors][12], [doctoc][1], etc. You might also be interested in
[remark-ignore][26], which lets you instruct remark not to transform parts of
your Markdown documents. For a live example of these two plugins in action,
check the source of [this very README.md file][25]. ✨

---

<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [Via API](#via-api)
  - [Via remark-cli](#via-remark-cli)
  - [Via unified configuration](#via-unified-configuration)
- [API](#api)
- [Examples](#examples)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->
<!-- prettier-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-tight-comments
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkTightComments from 'remark-tight-comments';

const file = await remark()
  .use(remarkTightComments)
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://github.com/remarkjs/remark/tree/main/packages/remark-cli)

```shell
remark -o --use tight-comments README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-tight-comments"
      /* … */
    ]
  },
  /* … */
```

In `.remarkrc.js`:

```javascript
module.exports = {
  plugins: [
    // …
    'tight-comments'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkTightComments from 'remark-tight-comments';

export default {
  plugins: [
    // …
    remarkTightComments
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][docs].

## Examples

See [mdast-util-tight-comments][27] for example outputs.

## Related

- [remark-ignore][26] — use comments to exclude one or more nodes from
  [transformation][28]
- [mdast-util-tight-comments][29] — selectively remove newlines around comment
  nodes during serialization

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

<!-- TODO: all-contributors here -->

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[link-blm]: https://xunn.at/donate-blm
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-tight-comments
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
[badge-codecov]:
  https://codecov.io/gh/Xunnamius/unified-utils/branch/main/graph/badge.svg?token=HWRIOBAAPW
  'Is this package well-tested?'
[link-codecov]: https://codecov.io/gh/Xunnamius/unified-utils
[badge-license]:
  https://img.shields.io/npm/l/remark-tight-comments
  "This package's source license"
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-tight-comments/LICENSE
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-tight-comments
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/remark-tight-comments
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[docs]: docs
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[contributing]: /CONTRIBUTING.md
[support]: /.github/SUPPORT.md
[1]: https://github.com/thlorenz/doctoc
[12]: https://github.com/all-contributors/all-contributors
[23]: https://github.com/unifiedjs/unified
[24]: https://github.com/remarkjs/remark
[25]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-tight-comments/README.md
[26]: /packages/remark-ignore
[27]: /packages/mdast-util-tight-comments/README.md#usage
[28]: https://github.com/unifiedjs/unified#overview
[29]: /packages/mdast-util-tight-comments
