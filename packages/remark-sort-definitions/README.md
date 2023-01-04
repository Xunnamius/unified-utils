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

# remark-sort-definitions

This is a [unified][1] ([remark][2]) plugin that logically reorders the
reference definitions at the bottom of your document depending on your sorting
preference. Also plays nicely with [GFM footnotes][3] (by completely ignoring
them), and comes with full unicode support.

After running this plugin, _all definitions_, both numeric and alphanumeric,
will always be placed at the very bottom of the document.

You might also be interested in [remark-reference-links][4], which transforms
all your inline links into reference-style links, and
[remark-renumber-references][5], which will contiguously renumber numeric
reference-style link ids starting from `[1]`. For a live example of these
plugins in action, check the bottom of [this very README.md file][6]. ✨

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
  - [Options](#options)
- [Examples](#examples)
  - [Using the Default Configuration](#using-the-default-configuration)
  - [Using `algorithm`](#using-algorithm)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

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

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use sort-definitions README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

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

Valid values: `"numeric-first"` | `"alphanumeric-first"`\
Default: `"alphanumeric-first"`

This option determines the sorting preference used when reordering definitions.

`numeric-first` will put definitions with purely numeric ids first, sorted from
least (i.e. 1) to greatest, followed by any remaining definitions sorted
[naturally][7].

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

### Using the Default Configuration

Then running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkSortDefinitions from 'remark-sort-definitions';

const file = await remark()
  .use(remarkSortDefinitions)
  // Or:
  //.use(remarkSortDefinitions, { algorithm: 'alphanumeric-first' })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][8] for tight
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

Now all the definitions have been sorted. Nice!

### Using `algorithm`

We could also sort using an algorithm that places definitions with numeric ids
first. Running the follow JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkSortDefinitions from 'remark-sort-definitions';

const file = await remark()
  .use(remarkSortDefinitions, { algorithm: 'numeric-first' })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][8] for tight
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
numbering. Luckily, there exists [a remark plugin][5] that will ensure numeric
reference ids flow through the document in ascending order starting from `[1]`.

## Related

- [remark-reference-links][4] — transform inline links into reference-style
  links.
- [remark-remove-unused-definitions][9] — remove unused reference definitions.
- [remark-renumber-references][5] — contiguously renumber numeric
  reference-style link ids starting from `[1]`.

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][10].

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
  https://img.shields.io/npm/l/remark-sort-definitions
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2023
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-sort-definitions
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-sort-definitions/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-sort-definitions
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-sort-definitions
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: https://github.com/remarkjs/remark-gfm#what-is-this
[4]: https://github.com/remarkjs/remark-reference-links
[5]: /packages/remark-renumber-references
[6]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-sort-definitions/README.md
[7]: https://en.wikipedia.org/wiki/Natural_sort_order
[8]: /.remarkrc.mjs
[9]: /packages/remark-remove-unused-definitions
[10]: /README.md#contributors
