<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

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

Detailed interface information can be found under [`docs/`][x-repo-docs].

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
  https://img.shields.io/npm/dm/remark-sort-definitions?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-sort-definitions?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-sort-definitions/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-sort-definitions
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/remark-sort-definitions
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-sort-definitions
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
[3]: https://github.com/remarkjs/remark-gfm#what-is-this
[4]: https://github.com/remarkjs/remark-reference-links
[5]: /packages/remark-renumber-references
[6]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-sort-definitions/README.md
[7]: https://en.wikipedia.org/wiki/Natural_sort_order
[8]: /.remarkrc.mjs
[9]: /packages/remark-remove-unused-definitions
