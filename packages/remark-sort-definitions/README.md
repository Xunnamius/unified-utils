<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/remark-sort-definitions/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->

A remark plugin that reorders reference-style link definitions by id at the end
of a document

<!-- symbiote-template-region-start 2 -->

</p>

<hr />

<div align="center">

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-downloads-link]

</div>

<br />

# remark-sort-definitions

<!-- symbiote-template-region-end -->

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

<!-- symbiote-template-region-start 3 -->

---

<!-- remark-ignore-start -->
<!-- symbiote-template-region-end -->
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
- [Appendix](#appendix)
  - [Published Package Details](#published-package-details)
  - [License](#license)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- symbiote-template-region-start 4 -->
<!-- remark-ignore-end -->

<br />

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

<!-- symbiote-template-region-end -->

To install:

```shell
npm install --save-dev remark-sort-definitions
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

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

<!-- symbiote-template-region-start 5 -->

## Appendix

<!-- symbiote-template-region-end -->

Further documentation can be found under [`docs/`][x-repo-docs].

<!-- TODO: additional appendix sections here -->
<!-- symbiote-template-region-start 6 -->

### Published Package Details

This is an [ESM-only package][x-pkg-esm-wine] built by Babel for use in Node.js
versions that are not end-of-life. For TypeScript users, this package supports
both `"Node10"` and `"Node16"` module resolution strategies.

<!-- symbiote-template-region-end -->
<!-- TODO: additional package details here -->
<!-- symbiote-template-region-start 7 -->

<details><summary>Expand details</summary>

That means ESM source will load this package via `import { ... } from ...` or
`await import(...)` and CJS source will load this package via dynamic
`import()`. This has several benefits, the foremost being: less code
shipped/smaller package size, avoiding [dual package
hazard][x-pkg-dual-package-hazard] entirely, distributables are not
packed/bundled/uglified, and a drastically less complex build process.

The glaring downside, which may or may not be relevant, is that CJS consumers
cannot `require()` this package and can only use `import()` in an asynchronous
context. This means, in effect, CJS consumers may not be able to use this
package at all.

Each entry point (i.e. `ENTRY`) in [`package.json`'s
`exports[ENTRY]`][x-repo-package-json] object includes one or more [export
conditions][x-pkg-exports-conditions]. These entries may or may not include: an
[`exports[ENTRY].types`][x-pkg-exports-types-key] condition pointing to a type
declaration file for TypeScript and IDEs, a
[`exports[ENTRY].module`][x-pkg-exports-module-key] condition pointing to
(usually ESM) source for Webpack/Rollup, a `exports[ENTRY].node` and/or
`exports[ENTRY].default` condition pointing to (usually CJS2) source for Node.js
`require`/`import` and for browsers and other environments, and [other
conditions][x-pkg-exports-conditions] not enumerated here. Check the
[package.json][x-repo-package-json] file to see which export conditions are
supported.

Note that, regardless of the [`{ "type": "..." }`][x-pkg-type] specified in
[`package.json`][x-repo-package-json], any JavaScript files written in ESM
syntax (including distributables) will always have the `.mjs` extension. Note
also that [`package.json`][x-repo-package-json] may include the
[`sideEffects`][x-pkg-side-effects-key] key, which is almost always `false` for
optimal [tree shaking][x-pkg-tree-shaking] where appropriate.

<!-- symbiote-template-region-end -->
<!-- TODO: additional package details here -->
<!-- symbiote-template-region-start 8 -->

</details>

### License

<!-- symbiote-template-region-end -->

See [LICENSE][x-repo-license].

<!-- TODO: additional license information and/or sections here -->
<!-- symbiote-template-region-start 9 -->

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Or [buy
me a beer][x-repo-sponsor], I'd appreciate it. Thank you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

<!-- symbiote-template-region-end -->
<!-- TODO: additional contribution/support sections here -->
<!-- symbiote-template-region-start 10 -->

### Contributors

<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start root-package-only -->
<!-- (section elided by symbiote) -->
<!-- symbiote-template-region-end -->
<!-- symbiote-template-region-start workspace-package-only -->

See the [table of contributors][x-repo-contributors].

<!-- symbiote-template-region-end -->

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_remark-sort-definitions
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-sort-definitions?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/remark-sort-definitions
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-sort-definitions?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-sort-definitions
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/remark-sort-definitions
[x-badge-repo-link]: https://github.com/Xunnamius/unified-utils
[x-badge-semanticrelease-image]:
  https://xunn.at/badge-semantic-release
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-pkg-dual-package-hazard]:
  https://nodejs.org/api/packages.html#dual-package-hazard
[x-pkg-esm-wine]:
  https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#esm-source-and-distribution
[x-pkg-exports-conditions]:
  https://webpack.js.org/guides/package-exports#reference-syntax
[x-pkg-exports-module-key]:
  https://webpack.js.org/guides/package-exports#providing-commonjs-and-esm-version-stateless
[x-pkg-exports-types-key]:
  https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta#packagejson-exports-imports-and-self-referencing
[x-pkg-side-effects-key]:
  https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free
[x-pkg-tree-shaking]: https://webpack.js.org/guides/tree-shaking
[x-pkg-type]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#type
[x-repo-choose-new-issue]:
  https://github.com/Xunnamius/unified-utils/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-contributors]: /README.md#contributors
[x-repo-docs]: docs
[x-repo-license]: ./LICENSE
[x-repo-package-json]: package.json
[x-repo-pr-compare]: https://github.com/Xunnamius/unified-utils/compare
[x-repo-sponsor]: https://github.com/sponsors/Xunnamius
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
