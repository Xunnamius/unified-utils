<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# remark-lint-heading-word-length

This is a [remark-lint][1] rule to warn when headings have too many or too few
words. Headings are split into words by the regular expression `\s`.

This package is a spiritual fork of the archived [remark-lint-heading-length][2]
package, which has a couple of flaws.

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
  - [`ok.md`](#okmd)
  - [`not-ok.md`](#not-okmd)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-lint-heading-word-length
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { reporter } from 'vfile-reporter';
import { remark } from 'remark';
import remarkLint from 'remark-lint';
import lintHeadingWordLength from 'remark-lint-heading-word-length';

const file = await remark()
  .use(remarkLint)
  .use(lintHeadingWordLength)
  .process(await read('example.md'));

console.log(reporter(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark --use remark-lint --use lint-heading-word-length README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-lint-heading-word-length"
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
    'lint-heading-word-length'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import lintHeadingWordLength from 'remark-lint-heading-word-length';

export default {
  plugins: [
    // …
    lintHeadingWordLength
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Options

This rule supports [standard configuration][3] that all remark lint rules accept
(such as `false` to turn it off or `[1, options]` to configure it).

Additionally, this plugin recognizes the following options:

#### `minimumWords`

Valid values: `false` | `number`\
Default: `1`

The minimum number of words required in a heading.

Set to `false` to prevent minimum word length checks.

#### `maximumWords`

Valid values: `false` | `number`\
Default: `10`

The maximum number of words allowed in a heading.

Set to `false` (or `Infinity`) to prevent maximum word length checks.

## Examples

### `ok.md`

#### In

```markdown
# `options.optionA`

# This right here is essentially a ten (10) word heading
```

#### Out

No messages.

### `not-ok.md`

#### In

```markdown
# This right here is a ten + one (11) word heading

#
```

#### Out

```text
1:1-1:51: Heading must have at most 10 words (current length: 11)
3:1-3:2: Heading must have at least 1 word (current length: 0)
```

## Related

- [remark-lint-heading-length][2] — archived predecessor to this package with a
  couple flaws.
- [remark-lint-maximum-heading-length][4] — warn when headings are too long (too
  many characters).

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
  https://img.shields.io/npm/dm/remark-lint-heading-word-length?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-lint-heading-word-length?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-lint-heading-word-length/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-lint-heading-word-length
  'Install this package using npm or yarn!'
[x-badge-npm-link]:
  https://www.npmjs.com/package/remark-lint-heading-word-length
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-lint-heading-word-length
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
[1]: https://github.com/remarkjs/remark-lint
[2]: https://github.com/zerok/remark-lint-heading-length
[3]: https://github.com/remarkjs/remark-lint#configure
[4]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-maximum-heading-length
