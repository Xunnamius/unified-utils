<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

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
import { reporter } from 'vfile-reporter';
import { remark } from 'remark';
import remarkLint from 'remark-lint';
import lintFencedCodeFlagCase from 'remark-lint-fenced-code-flag-case';

const file = await remark()
  .use(remarkLint)
  .use(lintFencedCodeFlagCase)
  .process(await read('example.md'));

console.log(reporter(file));
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

Detailed interface information can be found under [`docs/`][x-repo-docs].

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
  language flag.
- [remark-lint-fenced-code-marker][5] — warn when fenced code markers violate
  the given style.

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
  https://img.shields.io/npm/dm/remark-lint-fenced-code-flag-case?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-lint-fenced-code-flag-case?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-lint-fenced-code-flag-case/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-lint-fenced-code-flag-case
  'Install this package using npm or yarn!'
[x-badge-npm-link]:
  https://www.npmjs.com/package/remark-lint-fenced-code-flag-case
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-lint-fenced-code-flag-case
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
[2]:
  https://prettier.io/blog/2017/11/07/1.8.0.html#support-markdown-2943httpsgithubcomprettierprettierpull2943-by-ikatyanghttpsgithubcomikatyang
[3]: https://github.com/remarkjs/remark-lint#configure
[4]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-flag
[5]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-marker
