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

# remark-ignore

This is a [unified][23] ([remark][24]) plugin that allows you to specify one or
more sections of a Markdown file that should not be transformed or linted by
remark.

This plugin is to remark what [`<!-- prettier-ignore -->`,
`<!-- prettier-ignore-start -->`, and `<!-- prettier-ignore-end -->` are to
Prettier][10]. In effect, remark-ignore is a more generic version of
[remark-lint's `<!-- lint disable -->`][11].

This plugin is useful for preventing the transformation of auto-generated
content, e.g. [all-contributors][12], [doctoc][1], etc. You might also be
interested in [remark-tight-comments][26], which removes unnecessary newlines
that remark inserts between/around Markdown comments by default. For a live
example of these two plugins in action, `CTRL+F` the source of [this very
README.md file][25] and look for `<!-- remark-ignore -->`,
`<!-- remark-ignore-start -->`, and `<!-- remark-ignore-end -->`. ✨

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

This is useful when dealing with plugins that call [`use`][11] internally, which
might interfere with remark-ignore's default export (`remarkIgnore` in the above
examples) which itself calls `use(ignoreEnd)` internally, or if you want plugins
used before `ignoreStart` and/or after `ignoreEnd` to transform
otherwise-"ignored" nodes.

<!-- remark-ignore -->

### Via [remark-cli](https://github.com/remarkjs/remark/tree/main/packages/remark-cli)

```shell
remark -o --use ignore README.md
```

Or, using the alternative syntax:

```shell
remark -o --use ignore/start --use … --use ignore/end README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md)

In `package.json`:

```json
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

- [remark-tight-comments][26] — remove unnecessary newlines around comments
- [remark-comments][18] — new syntax to ignore things
- [remark-message-control][20] — enable, disable, and ignore messages using
  comments
- [mdast-util-hidden][27] — prevent nodes from being seen by [transformers][28]
- [mdast-comment-marker][21] — parse a comment marker in mdast
- [mdast-zone][22] — treat HTML comments as ranges or markers in mdast

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
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
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
  https://img.shields.io/npm/l/remark-ignore
  "This package's source license"
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-ignore/LICENSE
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-ignore
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/remark-ignore
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[package-json]: package.json
[docs]: docs
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[contributing]: /CONTRIBUTING.md
[support]: /.github/SUPPORT.md
[1]: https://github.com/thlorenz/doctoc
[2]: #remark-ignore
[3]: #install
[4]: #usage
[5]: #api
[6]: #examples
[7]: #related
[8]: #contributing-and-support
[9]: #contributors
[10]: https://prettier.io/docs/en/ignore.html#javascript
[11]: https://github.com/unifiedjs/unified#processoruseplugin-options
[12]: https://github.com/all-contributors/all-contributors
[13]: #via-api
[14]: #via-remark-cli
[15]: #via-unified-configuration
[16]: https://github.com/remarkjs/remark/tree/main/packages/remark-cli
[17]: https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md
[18]:
  https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-comments#readme
[19]:
  https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-disable-tokenizers#readme
[20]: https://github.com/remarkjs/remark-message-control
[21]: https://github.com/syntax-tree/mdast-comment-marker
[22]: https://github.com/syntax-tree/mdast-zone
[23]: https://github.com/unifiedjs/unified
[24]: https://github.com/remarkjs/remark
[25]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-ignore/README.md
[26]: /packages/remark-tight-comments
[27]: /packages/mdast-util-hidden
[28]: https://github.com/unifiedjs/unified#overview
