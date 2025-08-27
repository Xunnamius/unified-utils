<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/remark-capitalize-headings/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->
remark plugin that selectively transforms headings using vercel's title package
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

# remark-capitalize-headings

<!-- symbiote-template-region-end -->

This is a [unified][1] ([remark][2]) plugin that selectively transforms headings
using [vercel's title package][3], which adheres to [The Chicago Manual of
Style][4]. Comes with full unicode support (reducible to [title][3]'s unicode
support) too.

While you can get a similar effect by using remark-capitalize (this plugin's
abandoned? inspiration), remark-capitalize-headings comes with the following
changes:

- Does not capitalize inline code blocks or links.
- [Doesn't erroneously trim whitespace between nodes][5].
- Allows for a [deeper level of customization][6], letting you to easily ignore
  individual words, headings by level, or even entire sections.

The end result is a less bothersome experience, where you're more likely to use
a single simple configuration across your projects without constant tweaking.

You might also be interested in [remark-ignore][7], which lets you instruct
remark not to transform parts of your Markdown documents. It can be used as a
last resort to ignore individual headers when [this plugin's options][6] just
will not do.

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
  - [Using `excludeHeadingLevel`](#using-excludeheadinglevel)
  - [Using `excludeHeadingText`](#using-excludeheadingtext)
  - [Using `excludeSectionRegExp`](#using-excludesectionregexp)
  - [Using `replaceHeadingRegExp`](#using-replaceheadingregexp)
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
npm install --save-dev remark-capitalize-headings
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings)
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use capitalize-headings README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-capitalize-headings"
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
    'capitalize-headings'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

export default {
  plugins: [
    // …
    remarkCapitalizeHeadings
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Options

> All "RegExp" values below are assumed to be _strings_, and will be transformed
> into regular expression objects via the following expression:
> [`RegExp(value, 'gu')`][8].

This plugin recognizes the following options:

#### `excludeHeadingLevel`

Valid values: `{ [level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"]: boolean }`\
Default: `{}`

Headings of the specified `level` in `{ [level]: true }` will be excluded from
capitalization entirely, where `h1` corresponds to `<h1>…</h1>`/`# …`, `h2` to
`<h2>…</h2>`/`## …`, etc.

> Excludes with `false` values are treated as if they were commented out.

#### `excludeSectionRegExp`

Valid values: `[RegExp]`\
Default: `[]`

Entire sections with a [stringified][9] heading matching at least one of the
given regular expression strings will be excluded from capitalization entirely.

#### `replaceHeadingRegExp`

Valid values: `{ [regExp: RegExp]: string }`\
Default: `{ "(?<=\\s)a(?=\\p{P})": "A" }`

This option lets you manipulate non-excluded headers in their [stringified][9]
form _after_ they've been transformed by [title][3]. This extra context is
useful for tasks like capitalizing a word only if it appears at the end of a
heading, or as part of a phrase, or to prevent a word from being capitalized.
This option also supports using [matching groups during replacement][10].

The only limitation is that **any manipulations must not change the length of
the (stringified) header**. If they do, an error will be thrown. Since this
plugin is meant for capitalization, there isn't much reason to add or remove
characters anyway.

By default, `a` is replaced with `A` when it appears alone before a single
punctuation character; e.g., `# Section a: Raised By Wolves` becomes
`# Section A: Raised By Wolves`. This diverges from [title][3]'s default
behavior at time of writing but is compliant with the CMOS.

For example: in the title
`# Evaluating the Notation of the Associated Press and the Style of the New York Times`,
you may want to capitalize the `the` that occurs before `Associated Press` and
before `New York Times`, but not anywhere else. This could be achieved with the
following:

```js
{
  replaceHeadingRegExp: {
    'the Associated Press': 'The Associated Press',
    'the New York Times': 'The New York Times',
  }
}
```

Which would yield:
`# Evaluating the Notation of The Associated Press and the Style of The New York Times`.

## Examples

Suppose we have the following Markdown file `example.md`:

```markdown
# my documentation

## Section 1 is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

## section 2 is the test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

## Section 3 has the rest {#section-three}

### Subsection [a][1]

#### Sci-fi title generator

##### children of celeste

##### the bionic oblivion

##### snows Of arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

### Using the Default Configuration

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings)
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following compared to `example.md`:

```diff
-# my documentation
+# My Documentation

-## Section 1 is [the best](https://google.com)
+## Section 1 Is [the best](https://google.com)

-### Subsection a
+### Subsection A

-### Subsection _a_
+### Subsection _A_

### Subsection \_a

-### Subsection a: be see
+### Subsection A: Be See

-### Subsection b
+### Subsection B

### Subsection C

-## section 2 is the test
+## Section 2 Is the Test

-### subsection 1
+### Subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

-#### Additional option: `options.opt3`
+#### Additional Option: `options.opt3`

-## Section 3 has the rest {#section-three}
+## Section 3 Has the Rest {#section-Three}

### Subsection [a][1]

-#### Sci-fi title generator
+#### Sci-Fi Title Generator

-##### children of celeste
+##### Children of Celeste

-##### the bionic oblivion
+##### The Bionic Oblivion

-##### snows Of arrakis
+##### Snows of Arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

### Using `excludeHeadingLevel`

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings, {
    // Do not capitalize any H3 and H4 headings
    excludeHeadingLevel: { h3: true, h4: true }
  })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following compared to `example.md`:

```diff
-# my documentation
+# My Documentation

-## Section 1 is [the best](https://google.com)
+## Section 1 Is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

-## section 2 is the test
+## Section 2 Is the Test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

-## Section 3 has the rest {#section-three}
+## Section 3 Has the Rest {#section-Three}

### Subsection [a][1]

#### Sci-fi title generator

-##### children of celeste
+##### Children of Celeste

-##### the bionic oblivion
+##### The Bionic Oblivion

-##### snows Of arrakis
+##### Snows of Arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

### Using `excludeHeadingText`

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings, {
    // Don't mess with {#custom-headers} from remark-heading-id
    // See: https://github.com/Xunnamius/unified-utils/issues/95
    excludeHeadingText: ['\\{\\s*#.*?\\}\\s*$']
  })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following compared to `example.md`:

```diff
-# my documentation
+# My Documentation

-## Section 1 is [the best](https://google.com)
+## Section 1 Is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

-## section 2 is the test
+## Section 2 Is the Test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

-## Section 3 has the rest {#section-three}
+## Section 3 Has the Rest {#section-three}

### Subsection [a][1]

#### Sci-fi title generator

-##### children of celeste
+##### Children of Celeste

-##### the bionic oblivion
+##### The Bionic Oblivion

-##### snows Of arrakis
+##### Snows of Arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

### Using `excludeSectionRegExp`

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings, {
    // Do not capitalize headings with "subsection" in their text, nor any of the
    // headings below them
    excludeSectionRegExp: ['(s|S)ubsection']
  })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following compared to `example.md`:

```diff
-# my documentation
+# My Documentation

-## Section 1 is [the best](https://google.com)
+## Section 1 Is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

-## section 2 is the test
+## Section 2 Is the Test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

-## Section 3 has the rest {#section-three}
+## Section 3 Has the Rest {#section-Three}

### Subsection [a][1]

#### Sci-fi title generator

##### children of celeste

##### the bionic oblivion

##### snows Of arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

### Using `replaceHeadingRegExp`

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkCapitalizeHeadings from 'remark-capitalize-headings';

const file = await remark()
  .use(remarkCapitalizeHeadings, {
    // Make some last-minute adjustments
    replaceHeadingRegExp: {
      '\\s(_?)(a|A)$': ' $1Y',
      'Has the Rest': 'Has The Rest'
    }
  })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following compared to `example.md`:

```diff
-# my documentation
+# My Documentation

-## Section 1 is [the best](https://google.com)
+## Section 1 Is [the best](https://google.com)

-### Subsection a
+### Subsection Y

-### Subsection _a_
+### Subsection _Y_

-### Subsection \_a
+### Subsection \_Y

-### Subsection a: be see
+### Subsection a: Be See

-### Subsection b
+### Subsection B

### Subsection C

-## section 2 is the test
+## Section 2 Is the Test

-### subsection 1
+### Subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

-#### Additional option: `options.opt3`
+#### Additional Option: `options.opt3`

-## Section 3 has the rest {#section-three}
+## Section 3 Has The Rest {#section-Three}

### Subsection [a][1]

-#### Sci-fi title generator
+#### Sci-Fi Title Generator

-##### children of celeste
+##### Children of Celeste

-##### the bionic oblivion
+##### The Bionic Oblivion

-##### snows Of arrakis
+##### Snows of Arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

## Related

- [remark-capitalize][11] — predecessor to this package.
- [remark-ignore][12] — use comments to exclude one or more nodes from
  [transformation][13].

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
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_remark-capitalize-headings
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-capitalize-headings?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/remark-capitalize-headings
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-capitalize-headings?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-capitalize-headings
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/remark-capitalize-headings
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
[3]: https://github.com/vercel/title
[4]: https://en.wikipedia.org/wiki/The_Chicago_Manual_of_Style
[5]: #using-the-default-configuration
[6]: #options
[7]: /packages/remark-renumber-references
[8]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor
[9]: https://github.com/syntax-tree/mdast-util-to-string
[10]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#using_a_regular_expression_to_change_data_format
[11]: https://github.com/vercel/remark-capitalize
[12]: /packages/remark-ignore
[13]: https://github.com/unifiedjs/unified#overview
