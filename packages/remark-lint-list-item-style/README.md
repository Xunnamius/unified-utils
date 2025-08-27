<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/remark-lint-list-item-style/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->

A remark-lint rule to warn when list items violate a given style

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

# remark-lint-list-item-style

<!-- symbiote-template-region-end -->

This is a [remark-lint][1] rule to warn when list items violate a given
capitalization or punctuation style. Also comes with full unicode support.

This rule picks up where the abandoned [remark-lint-list-item-punctuation][2]
package left off.

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
  - [`ok-punctuation.md`](#ok-punctuationmd)
  - [`ok-first-word.md`](#ok-first-wordmd)
  - [`ok-spread-each.md`](#ok-spread-eachmd)
  - [`ok-spread-paragraph.md`](#ok-spread-paragraphmd)
  - [`ok-spread-final.md`](#ok-spread-finalmd)
  - [`not-ok-punctuation.md`](#not-ok-punctuationmd)
  - [`not-ok-first-word.md`](#not-ok-first-wordmd)
  - [`not-ok-spread-each.md`](#not-ok-spread-eachmd)
  - [`not-ok-first-word-spread.md`](#not-ok-first-word-spreadmd)
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
npm install --save-dev remark-lint-list-item-style
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

### Via API

```typescript
import { read } from 'to-vfile';
import { reporter } from 'vfile-reporter';
import { remark } from 'remark';
import remarkLint from 'remark-lint';
import remarkLintListItemStyle from 'remark-lint-list-item-style';

const file = await remark()
  .use(remarkLint)
  .use(remarkLintListItemStyle)
  .process(await read('example.md'));

console.log(reporter(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark --use remark-lint --use lint-list-item-style README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-lint-list-item-style"
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
    'lint-list-item-style'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkLintListItemStyle from 'remark-lint-list-item-style';

export default {
  plugins: [
    // …
    remarkLintListItemStyle
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Options

> All "RegExp" values below are assumed to be _strings_, and will be transformed
> into regular expression objects via the following expression:
> [`RegExp(value, 'gu')`][3].

This plugin recognizes the following options:

#### `checkPunctuation`

Valid values: `false` | `RegExp[]`\
Default: `["(\\.|\\?|;|,|!|\\p{Emoji}\uFE0F|\\p{Emoji_Presentation})"]`

Checks that the final character of each [stringified][4] list item matches at
least one of the given values, including emojis.

To match all unicode punctuation characters, you could provide `["\p{P}"]`
instead of the default, but this will match characters like `)` and `]`.

Alternatively, to prevent punctuation, you could provide `["\P{P}"]`.

Lines that consist solely of an image are ignored.

#### `checkFirstWord`

Valid values: `false` | `"capitalize"` | `"lowercase"`\
Default: `"capitalize"`

Checks that the first word of each [stringified][4] list item paragraph begins
with a non-lowercase character (`"capitalize"`) or a non-uppercase character
(`"lowercase"`).

List items beginning with a link, image, checkbox, or inline code block are
ignored.

#### `ignoredFirstWords`

Valid values: `RegExp[]`\
Default: `[]`

Words that would normally be checked with respect to the `checkFirstWord` option
will be ignored if they match at least one of the given values. Use this option
to prevent false positives (e.g. "iOS", "eBay").

List items beginning with a link, image, checkbox, or inline code block are
already ignored and do not need to be specified here.

#### `checkListSpread`

Valid values: `"first"` | `"final"` | `"first-and-final"` | `"each"`\
Default: `"each"`

Determines how [`checkPunctuation`][5] is applied to list items with [spread
children][6]. Has no effect when `checkPunctuation` is `false`.

## Examples

### `ok-punctuation.md`

#### In

```markdown
Please get:

- A.
- B?
- C!
```

#### Out

No messages.

### `ok-first-word.md`

#### In

<!-- prettier-ignore -->
```markdown
Please get:

*   Milk;
*   Eggs;
*   Coffee.
```

#### Out

No messages.

### `ok-spread-each.md`

#### In

<!-- prettier-ignore-start -->

````markdown
- Foo?

  Zulu!

  Bar.

- `baz`?

  Zulu 😅

  Qux ✨

- ![image](https://example.com)

  ![image](https://example.com)

  Quuux 🚀

- B.

  C.

  D.

- Nested.

  - Items.

    - That.

      - Are nested.

- ![image][1]

  ![i][1]

  ☠️

  Quuux.

1. Run this script in your browser to prevent 'AAA' masking from effecting your
   local session.

   ```javascript
   window._uxa = window._uxa || [];
   window._uxa.push(['trackConsentGranted']);
   ```

2. `do` something else.

   ```javascript
   console.log('ok');
   ```

   ```javascript
   c;
   ```

3. D.

   An example of that something would be as follows.

   ```javascript
   console.log('ok');
   ```

4. Even more.

   ```javascript
   console.log('ok');
   ```

   An example of that something would be as follows.

[1]: https://example.com
````

<!-- prettier-ignore-end -->

#### Out

No messages.

### `ok-spread-paragraph.md`

#### In

```markdown
- Foo  
  Zulu  
  Bar.

- Baz  
  Zulu  
  Qux.

- Quux  
  Zulu  
  Quuux.
```

#### Out

No messages.

### `ok-spread-final.md`

When configured with `{ checkListSpread: 'final' }`.

#### In

```markdown
- `foo`

  Zulu

  Bar.

- [baz](https://google.com)

  Zulu

  Qux.

- Quux

  Zulu

  Quuux.
```

#### Out

No messages.

### `not-ok-punctuation.md`

#### In

```markdown
- Alpha
- Beta
- Delta
-
```

#### Out

```text
1:3-1:8: "a" is not allowed to punctuate list item
2:3-2:7: "a" is not allowed to punctuate list item
3:3-3:8: "a" is not allowed to punctuate list item
4:1-4:2: empty list item without punctuation is not allowed
```

### `not-ok-first-word.md`

#### In

```markdown
- not [free](https://example.com),
- ![image](https://example.com).
- ![image][1].
- FREE!
- [free](https://example.com).
- [free][1].
- `free`.
- Free.
- [ ] free.
- [x] free.

[1]: https://example.com
```

#### Out

```text
1:3-1:35: Inconsistent list item capitalization: "n" should be "N"
```

Notice how only the first line triggers a warning while the others do not.

### `not-ok-spread-each.md`

#### In

<!-- prettier-ignore-start -->

````markdown
- Foo

  Bar.

- \[Baz]

  Qux.

- Quuux.

  (Quux)

- Nested.

  - Items.

    - That.

      - Are nested

1. Run this script in your browser to prevent 'AAA' masking from effecting your
   local session

   ```javascript
   window._uxa = window._uxa || [];
   window._uxa.push(['trackConsentGranted']);
   ```

2. `do` something else

   ```javascript
   console.log('ok');
   ```

   ```javascript
   c;
   ```

3. D.

   An example of that something would be as follows

   ```javascript
   console.log('ok');
   ```

4. Even more.

   ```javascript
   console.log('ok');
   ```

   An example of that something would be the aforesaid

5. `this is a tricky one because the punctuation is contained within the quotes.`
````

<!-- prettier-ignore-end -->

#### Out

```text
1:3-1:6: "o" is not allowed to punctuate list item
5:3-5:9: "]" is not allowed to punctuate list item
11:3-11:9: ")" is not allowed to punctuate list item
19:9-19:19: "d" is not allowed to punctuate list item
21:4-22:17: "n" is not allowed to punctuate list item
29:4-29:23: "e" is not allowed to punctuate list item
41:4-41:52: "s" is not allowed to punctuate list item
53:4-53:55: "d" is not allowed to punctuate list item
55:4-55:76: "​" is not allowed to punctuate list item
```

Note the final error, which only occurs when a list item containing single
[inline code node][7] runs afoul of the punctuation configuration.

### `not-ok-first-word-spread.md`

#### In

```markdown
- Foo.

  bar.

- Baz.

  qux.

- Quux.

  quuux.
```

#### Out

```text
3:3-3:7 Inconsistent list item capitalization: "b" should be "B"
7:3-7:7 Inconsistent list item capitalization: "q" should be "Q"
11:3-11:9 Inconsistent list item capitalization: "q" should be "Q"
```

## Related

- [remark-lint-list-item-punctuation][2] — the abandoned predecessor to this
  package.
- [remark-lint-list-item-bullet-indent][8] — warn when list item bullets are
  indented.
- [remark-lint-list-item-content-indent][9] — warn when the content of a list
  item has mixed indentation.
- [remark-lint-list-item-spacing][10] — warn when list looseness is incorrect.
- [remark-lint-list-item-indent][11] — warn when the spacing between a list
  item’s bullet and its content violates a given style.

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
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_remark-lint-list-item-style
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-lint-list-item-style?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/remark-lint-list-item-style
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-lint-list-item-style?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-lint-list-item-style
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/remark-lint-list-item-style
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
[1]: https://github.com/remarkjs/remark-lint
[2]:
  https://github.com/wemake-services/remark-lint-list-item-punctuation/tree/master
[3]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor
[4]: https://github.com/syntax-tree/mdast-util-to-string
[5]: #checkPunctuation
[6]: https://github.com/syntax-tree/mdast#listitem
[7]: https://github.com/syntax-tree/mdast#inlinecode
[8]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-bullet-indent
[9]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-content-indent
[10]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-spacing
[11]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-indent
