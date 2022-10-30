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

Detailed interface information can be found under [`docs/`][docs].

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

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][5].

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
  https://img.shields.io/npm/l/remark-lint-heading-word-length
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-lint-heading-word-length
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-lint-heading-word-length/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-lint-heading-word-length
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-lint-heading-word-length
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/remarkjs/remark-lint
[2]: https://github.com/zerok/remark-lint-heading-length
[3]: https://github.com/remarkjs/remark-lint#configure
[4]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-maximum-heading-length
[5]: /README.md#contributors
