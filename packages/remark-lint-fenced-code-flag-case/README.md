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

# remark-lint-fenced-code-flag-case

This is a [remark-lint][1] rule to warn when fenced code blocks have
inconsistent or improperly cased language flags. Also comes with full unicode
support.

This check is useful when using [a tool like prettier that formats fenced code
blocks][2], since such tools do not consistently recognize uppercase or
mixed-case code flags. That is: code fenced with the flag `typescript` or
`markdown` will be formatted while code fenced with the flag `TypeScript` or
`MARKDOWN` may be _silently ignored_, even as syntax highlighting still works,
which results in a false sense of correctness.

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
  - [`ok-missing.md`](#ok-missingmd)
  - [`ok-lower.md`](#ok-lowermd)
  - [`not-ok-mixed.md`](#not-ok-mixedmd)
  - [`not-ok-upper.md`](#not-ok-uppermd)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-lint-fenced-code-flag-case
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import lintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case';

const file = await remark()
  .use(lintFencedCodeFlagCase)
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark --use remark-lint --use lint-fenced-code-flag-case README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-lint-fenced-code-flag-case"
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
    'lint-fenced-code-flag-case'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import lintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case';

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

This rule supports [standard configuration][3] that all remark lint rules accept
(such as `false` to turn it off or `[1, options]` to configure it).

Additionally, this plugin recognizes the following options:

#### `case`

Valid values: `"lower"` | `"upper"` | `"capitalize"`\
Default: `"lower"`

All code fence flags must be of the specified case. Code fences without flags
are ignored.

## Examples

### `ok-missing.md`

#### In

````markdown
# Document

```
Text.
```
````

#### Out

No messages.

### `ok-lower.md`

#### In

````markdown
# Document

```js
const str = 'string';
```

```javascript
const str = 'string';
```
````

#### Out

No messages.

### `not-ok-mixed.md`

#### In

````markdown
# Document

```Js
const str = 'string';
```

```JavaScript
const str = 'string';
```
````

#### Out

```text
3:1-5:4: Code fence flag "Js" should be "js"
7:1-10:5: Code fence flag "JavaScript" should be "javascript"
```

### `not-ok-upper.md`

#### In

````markdown
# Document

```JS
const str = 'string';
```

```JAVASCRIPT
const str = 'string';
```
````

#### Out

```text
3:1-5:4: Code fence flag "JS" should be "js"
7:1-10:5: Code fence flag "JAVASCRIPT" should be "javascript"
```

## Related

- [remark-lint-fenced-code-flag][4] — warn when fenced code blocks occur without
  language flag
- [remark-lint-fenced-code-marker][5] — warn when fenced code markers violate
  the given style

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][6].

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
  https://img.shields.io/npm/l/remark-lint-fenced-code-flag-case
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-lint-fenced-code-flag-case
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-lint-fenced-code-flag-case/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-lint-fenced-code-flag-case
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-lint-fenced-code-flag-case
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/remarkjs/remark-lint
[2]:
  https://prettier.io/blog/2017/11/07/1.8.0.html#support-markdown-2943httpsgithubcomprettierprettierpull2943-by-ikatyanghttpsgithubcomikatyang
[3]: https://github.com/remarkjs/remark-lint#configure
[4]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-flag
[5]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-marker
[6]: /README.md#contributors
