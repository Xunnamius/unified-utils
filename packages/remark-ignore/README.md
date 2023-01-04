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

# remark-ignore

This is a [unified][1] ([remark][2]) plugin that allows you to specify one or
more sections of a Markdown file that should not be transformed or linted by
remark.

This plugin is to remark what [`<!-- prettier-ignore -->`,
`<!-- prettier-ignore-start -->`, and `<!-- prettier-ignore-end -->` are to
Prettier][3]. In effect, remark-ignore is a more generic version of
[remark-lint's `<!-- lint disable -->`][4].

This plugin is useful for preventing the transformation of auto-generated
content, e.g. [all-contributors][5], [doctoc][6], etc. You might also be
interested in [remark-tight-comments][7], which removes unnecessary newlines
that remark inserts between/around Markdown comments by default. For a live
example of these two plugins in action, check the source of [this very README.md
file][8]. ✨

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
npm install --save-dev remark-ignore
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkIgnore from 'remark-ignore';
import remarkReferenceLinks from 'remark-reference-links';

const file = await remark()
  // remarkIgnore should always be among the first plugins used
  .use(remarkIgnore)
  .use(remarkReferenceLinks)
  .process(await read('example.md'));

console.log(String(file));
```

There is an alternative syntax that allows you more fine-grain control over when
ignored nodes are hidden from transformers (i.e. `ignoreStart`) versus when they
are revealed (i.e. `ignoreEnd`):

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import { ignoreStart, ignoreEnd } from 'remark-ignore';
import remarkReferenceLinks from 'remark-reference-links';

const file = await remark()
  .use(ignoreStart)
  .use(remarkReferenceLinks)
  .use(pluginThatCallsUseInternally)
  .use(ignoreEnd)
  .use(pluginThatWillSeeOtherwiseIgnoredNodes)
  .process(await read('example.md'));

console.log(String(file));
```

This is useful when dealing with plugins that call [`use`][4] internally, which
might interfere with remark-ignore's default export (`remarkIgnore` in the above
examples) which itself calls `use(ignoreEnd)` internally, or if you want plugins
used before `ignoreStart` and/or after `ignoreEnd` to transform
otherwise-"ignored" nodes.

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use ignore README.md
```

Or, using the alternative syntax:

```shell
remark -o --use ignore/start --use … --use ignore/end README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-ignore"
      /* … */
    ]
  },
  /* … */
```

In `.remarkrc.js` (using the alternative syntax):

```javascript
module.exports = {
  plugins: [
    'remark-ignore/start',
    // …
    'remark-ignore/end'
  ]
};
```

In `.remarkrc.mjs` (using the alternative syntax):

```javascript
import { ignoreStart, ignoreEnd } from 'remark-ignore';

export default {
  plugins: [
    ignoreStart,
    // …
    ignoreEnd
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][docs].

## Examples

> Note that `<!-- remark-ignore -->`, `<!-- remark-ignore-start -->`, and
> `<!-- remark-ignore-end -->` must always be top-level nodes. If they are
> nested within other nodes, such as a list item, they will be ignored.

Suppose we have the following Markdown file `example.md`:

```markdown
# Some project

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link](https://example.com)

[Another link](https://example.com)
```

Then running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkIgnore from 'remark-ignore';
import remarkReferenceLinks from 'remark-reference-links';

const file = await remark()
  // remarkIgnore should always be among — if not THE — first plugins used
  .use(remarkIgnore)
  .use(remarkReferenceLinks)
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following:

```markdown
# Some project

[![Build][2]][1]

## Section

[A link][3]

[Another link][3]

[1]: https://github.com/remarkjs/remark-defsplit/actions
[2]: https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg
[3]: https://example.com
```

On the other hand, if `example.md` contained the following:

```markdown
# Some project

<!-- remark-ignore -->

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link](https://example.com)

[Another link](https://example.com)
```

Then running that same JavaScript would output:

```markdown
# Some project

<!-- remark-ignore -->

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link][1]

[Another link][1]

[1]: https://example.com
```

If instead `example.md` contained the following:

```markdown
<!-- remark-ignore-start -->

# Some project

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link](https://example.com)

<!-- remark-ignore-end -->

[Another link](https://example.com)
```

Then running that same JavaScript would output:

```markdown
<!-- remark-ignore-start -->

# Some project

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link](https://example.com)

<!-- remark-ignore-end -->

[Another link][1]

[1]: https://example.com
```

## Related

- [remark-tight-comments][7] — remove unnecessary newlines around comments.
- [remark-comments][9] — new syntax to ignore things.
- [remark-message-control][10] — enable, disable, and ignore messages using
  comments.
- [mdast-util-hidden][11] — prevent nodes from being seen by [transformers][12].
- [mdast-comment-marker][13] — parse a comment marker in mdast.
- [mdast-zone][14] — treat HTML comments as ranges or markers in mdast.

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][15].

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[badge-codecov]:
  https://codecov.io/gh/Xunnamius/unified-utils/branch/main/graph/badge.svg?token=HWRIOBAAPW
  'Is this package well-tested?'
[badge-issues]:
  https://img.shields.io/github/issues/Xunnamius/unified-utils
  'Open issues'
[badge-last-commit]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils
  'Latest commit timestamp'
[badge-license]:
  https://img.shields.io/npm/l/remark-ignore
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2023
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-ignore
  'Install this package using npm or yarn!'
[badge-pulls]:
  https://img.shields.io/github/issues-pr/xunnamius/unified-utils
  'Open pull requests'
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[contributing]: /CONTRIBUTING.md
[docs]: docs
[link-blm]: https://xunn.at/donate-blm
[link-codecov]: https://codecov.io/gh/Xunnamius/unified-utils
[link-issues]: https://github.com/Xunnamius/unified-utils/issues?q=
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-ignore/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-ignore
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: https://prettier.io/docs/en/ignore.html#javascript
[4]: https://github.com/unifiedjs/unified#processoruseplugin-options
[5]: https://github.com/all-contributors/all-contributors
[6]: https://github.com/thlorenz/doctoc
[7]: /packages/remark-tight-comments
[8]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-ignore/README.md
[9]:
  https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-comments#readme
[10]: https://github.com/remarkjs/remark-message-control
[11]: /packages/mdast-util-hidden
[12]: https://github.com/unifiedjs/unified#overview
[13]: https://github.com/syntax-tree/mdast-comment-marker
[14]: https://github.com/syntax-tree/mdast-zone
[15]: /README.md#contributors
