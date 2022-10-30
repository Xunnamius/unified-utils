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

# remark-lint-list-item-style

This is a [remark-lint][1] rule to warn when list items violate a given style.
Also comes with full unicode support.

This rule picks up where the abandoned [remark-lint-list-item-punctuation][2]
package left off.

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
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-lint-list-item-style
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { reporter } from 'vfile-reporter';
import { remark } from 'remark';
import remarkLint from 'remark-lint';
import lintFencedCodeFlagCase from 'remark-lint-list-item-style';

const file = await remark()
  .use(remarkLint)
  .use(lintFencedCodeFlagCase)
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
import lintFencedCodeFlagCase from 'remark-lint-list-item-style';

export default {
  plugins: [
    // …
    lintFencedCodeFlagCase
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][docs].

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

```markdown
- Foo?

  Zulu!

  Bar.

- `baz`?

  Zulu 😅

  Qux ✨

- ![image](https://example.com)

  ![image](https://example.com)

  Quuux 🚀

- ![image][1]

  ![image][1]

  ☠️

  Quuux.

[1]: https://example.com
```

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

```markdown
- Foo

  Bar.

- \[Baz]

  Qux.

- Quuux.

  (Quux)
```

#### Out

```text
1:3-1:6: "o" is not allowed to punctuate list item
5:3-5:9: "]" is not allowed to punctuate list item
11:3-11:9: ")" is not allowed to punctuate list item
```

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
- [remark-lint-list-item-bullet-indent][7] — warn when list item bullets are
  indented.
- [remark-lint-list-item-content-indent][8] — warn when the content of a list
  item has mixed indentation.
- [remark-lint-list-item-spacing][9] — warn when list looseness is incorrect.
- [remark-lint-list-item-indent][10] — warn when the spacing between a list
  item’s bullet and its content violates a given style.

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][11].

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
  https://img.shields.io/npm/l/remark-lint-list-item-style
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-lint-list-item-style
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-lint-list-item-style/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-lint-list-item-style
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-lint-list-item-style
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/remarkjs/remark-lint
[2]:
  https://github.com/wemake-services/remark-lint-list-item-punctuation/tree/master
[3]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor
[4]: https://github.com/syntax-tree/mdast-util-to-string
[5]: #checkPunctuation
[6]: https://github.com/syntax-tree/mdast#listitem
[7]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-bullet-indent
[8]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-content-indent
[9]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-spacing
[10]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-list-item-indent
[11]: /README.md#contributors
