<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# remark-tight-comments

This is a [unified][1] ([remark][2]) plugin that allows you to selectively
remove unnecessary newlines around Markdown comments.

This plugin is useful for preserving the structure of auto-generated content,
e.g. [all-contributors][3], [doctoc][4], etc. You might also be interested in
[remark-ignore][5], which lets you instruct remark not to transform parts of
your Markdown documents. For a live example of these two plugins in action,
check the source of [this very README.md file][6]. ✨

---

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

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use tight-comments README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

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

Detailed interface information can be found under [`docs/`][x-repo-docs].

## Examples

See [mdast-util-tight-comments][7] for example outputs.

## Related

- [remark-ignore][5] — use comments to exclude one or more nodes from
  [transformation][8].
- [mdast-util-tight-comments][9] — selectively remove newlines around comment
  nodes during serialization.

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Thank
you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

### Contributors

See the [table of contributors][x-repo-contributors].

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-tight-comments?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-tight-comments?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-tight-comments/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-tight-comments
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/remark-tight-comments
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-tight-comments
[x-badge-semanticrelease-image]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-repo-choose-new-issue]:
  https://github.com/xunnamius/unified-utils/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-contributors]: /README.md#contributors
[x-repo-docs]: docs
[x-repo-pr-compare]: https://github.com/xunnamius/unified-utils/compare
[x-repo-support]: /.github/SUPPORT.md
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: https://github.com/all-contributors/all-contributors
[4]: https://github.com/thlorenz/doctoc
[5]: /packages/remark-ignore
[6]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-tight-comments/README.md
[7]: /packages/mdast-util-tight-comments/README.md#usage
[8]: https://github.com/unifiedjs/unified#overview
[9]: /packages/mdast-util-tight-comments
