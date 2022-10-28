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

# remark-capitalize-headings

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
  - [Using `excludeHeadingLevel`](#using-excludeheadinglevel)
  - [Using `excludeSectionRegExp`](#using-excludesectionregexp)
  - [Using `replaceHeadingRegExp`](#using-replaceheadingregexp)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-capitalize-headings
```

## Usage

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

Detailed interface information can be found under [`docs/`][docs].

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
Default: `{ "(?<=\s)a(?=\p{P})": "A" }`

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

## Section 3 has the rest

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

Would output the following:

```markdown
# My Documentation

## Section 1 Is [the best](https://google.com)

### Subsection A

### Subsection _A_

### Subsection \_a

### Subsection A: Be See

### Subsection B

### Subsection C

## Section 2 Is the Test

### Subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional Option: `options.opt3`

## Section 3 Has the Rest

### Subsection [a][1]

#### Sci-Fi Title Generator

##### Children of Celeste

##### The Bionic Oblivion

##### Snows of Arrakis

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

Would output the following:

```markdown
# My Documentation

## Section 1 Is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

## Section 2 Is the Test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

## Section 3 Has the Rest

### Subsection [a][1]

#### Sci-fi title generator

##### Children of Celeste

##### The Bionic Oblivion

##### Snows of Arrakis

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

Would output the following:

```markdown
# My Documentation

## Section 1 Is [the best](https://google.com)

### Subsection a

### Subsection _a_

### Subsection \_a

### Subsection a: be see

### Subsection b

### Subsection C

## Section 2 Is the Test

### subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional option: `options.opt3`

## Section 3 Has the Rest

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

Would output the following:

```markdown
# My Documentation

## Section 1 Is [the best](https://google.com)

### Subsection Y

### Subsection _Y_

### Subsection \_Y

### Subsection a: Be See

### Subsection B

### Subsection C

## Section 2 Is the Test

### Subsection 1

### Subsection 2

#### `options.opt1`

#### `options.opt2`

#### Additional Option: `options.opt3`

## Section 3 Has The Rest

### Subsection [a][1]

#### Sci-Fi Title Generator

##### Children of Celeste

##### The Bionic Oblivion

##### Snows of Arrakis

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
```

## Related

- [remark-capitalize][11] — predecessor to this package
- [remark-ignore][12] — use comments to exclude one or more nodes from
  [transformation][13]

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][14].

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
  https://img.shields.io/npm/l/remark-capitalize-headings
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-capitalize-headings
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-capitalize-headings/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-capitalize-headings
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-capitalize-headings
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
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
[14]: /README.md#contributors
