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

# remark-sort-definitions

This is a [unified][23] ([remark][24]) plugin that logically reorders the
reference definitions at the bottom of your document depending on your sorting
preference. Also plays nicely with [GFM footnotes][7] (by completely ignoring
them).

After running this plugin, _all definitions_, both numeric and alphanumeric,
will always be placed at the very bottom of the document.

You might also be interested in [remark-reference-links][2], which transforms
all your inline links into reference-style links, and
[remark-renumber-references][3], which will contiguously renumber numeric
reference-style link ids starting from `[1]`. For a live example of these
plugins in action, check the bottom of [this very README.md file][25]. ✨

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
  - [Options](#options)
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
npm install --save-dev remark-sort-definitions
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkSortDefinitions from 'remark-sort-definitions';

const file = await remark()
  // An options object is NOT required
  .use(remarkSortDefinitions, { algorithm: 'alphanumeric-first' })
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://github.com/remarkjs/remark/tree/main/packages/remark-cli)

```shell
remark -o --use sort-definitions README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-sort-definitions"
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
    ['sort-definitions', { algorithm: 'numeric-first' }]
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkSortDefinitions from 'remark-sort-definitions';

export default {
  plugins: [
    // …
    remarkSortDefinitions
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][docs].

### Options

This plugin recognizes the following options:

#### `algorithm`

Valid values: `numeric-first` | `alphanumeric-first`\
Default: `alphanumeric-first`

This option determines the sorting preference used when reordering definitions.

`numeric-first` will put definitions with purely numeric ids first, sorted from
least (i.e. 1) to greatest, followed by any remaining definitions sorted
[naturally][5].

`alphanumeric-first` will put definitions with alphanumeric ids (i.e. any id
that cannot be parsed into an integer) first, sorted naturally, followed by any
remaining definitions sorted from least (i.e. 1) to greatest.

## Examples

Suppose we have the following Markdown file `example.md`:

```markdown
# Documentation

…

[2nd-half-idiom]: https://meme-link-2
[a-link]: https://a-link
[1st-half-idiom]: https://meme-link-1
[z-link]: https://z-link
[8]: https://npm.im/remark
[1]: https://npm.im/some-package
[5]: #related
[3]: #usage
[6]: #contributing-and-support
[2]: #install
[7]: #contributors
```

Then running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUnusedDefs from 'remark-remove-unused-definitions';

const file = await remark()
  .use(remarkRemoveUnusedDefs)
  // Or:
  //.use(remarkRemoveUnusedDefs, { algorithm: 'alphanumeric-first' })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][4] for tight
references):

```markdown
# Documentation

…

[1st-half-idiom]: https://meme-link-1
[2nd-half-idiom]: https://meme-link-2
[a-link]: https://a-link
[z-link]: https://z-link
[1]: https://npm.im/some-package
[2]: #install
[3]: #usage
[5]: #related
[6]: #contributing-and-support
[7]: #contributors
[8]: https://npm.im/remark
```

Now all the unused definitions have been deleted. Nice!

We could also sort using an algorithm that places definitions with numeric ids
first. Running the follow JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUnusedDefs from 'remark-remove-unused-definitions';

const file = await remark()
  .use(remarkRemoveUnusedDefs, { algorithm: 'numeric-first' })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][4] for tight
references):

```markdown
# Documentation

…

[1]: https://npm.im/some-package
[2]: #install
[3]: #usage
[5]: #related
[6]: #contributing-and-support
[7]: #contributors
[8]: https://npm.im/remark
[1st-half-idiom]: https://meme-link-1
[2nd-half-idiom]: https://meme-link-2
[a-link]: https://a-link
[z-link]: https://z-link
```

Finally, notice how those numeric reference definition ids are not contiguous: a
definition with id `[4]` is missing, throwing off the `[1]` through `[8]`
numbering. Luckily, there exists [a remark plugin][3] that will ensure numeric
reference ids flow through the document in ascending order starting from `[1]`.

## Related

- [remark-reference-links][2] — transform inline links into reference-style
  links
- [remark-renumber-references][3] — contiguously renumber numeric
  reference-style link ids starting from `[1]`
- [remark-remove-unused-definitions][6] — remove unused reference definitions

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
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-sort-definitions
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
  https://img.shields.io/npm/l/remark-sort-definitions
  "This package's source license"
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-sort-definitions/LICENSE
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-sort-definitions
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/remark-sort-definitions
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
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-sort-definitions/README.md
[26]: /packages/remark-ignore
[27]: /packages/mdast-util-sort-definitions/README.md#usage
[28]: https://github.com/unifiedjs/unified#overview
[29]: /packages/mdast-util-sort-definitions
[2]: https://github.com/remarkjs/remark-reference-links
[3]: /packages/remark-renumber-references
[4]: /.remarkrc.mjs
[5]: https://en.wikipedia.org/wiki/Natural_sort_order
[6]: /packages/remark-remove-unused-definitions
[7]: https://github.com/remarkjs/remark-gfm#what-is-this
