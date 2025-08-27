<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/remark-lint-fenced-code-flag-case/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->
remark-lint rule to warn when fenced code blocks have an inconsistently-cased language flag
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

# remark-lint-fenced-code-flag-case

<!-- symbiote-template-region-end -->

This is a [remark-lint][1] rule to warn when fenced code blocks have
inconsistent or improperly cased language flags. Also comes with full unicode
support.

This check is useful when using [a tool like prettier that formats fenced code
blocks][2], since such tools do not consistently recognize uppercase or
mixed-case code flags. That is: code fenced with the flag `typescript` or
`markdown` will be formatted while code fenced with the flag `TypeScript` or
`MARKDOWN` may be _silently ignored_, even as syntax highlighting still works,
which results in a false sense of correctness.

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
  - [`ok-missing.md`](#ok-missingmd)
  - [`ok-lower.md`](#ok-lowermd)
  - [`not-ok-mixed.md`](#not-ok-mixedmd)
  - [`not-ok-upper.md`](#not-ok-uppermd)
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
npm install --save-dev remark-lint-fenced-code-flag-case
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

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
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_remark-lint-fenced-code-flag-ca
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-lint-fenced-code-flag-case?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]:
  https://npmtrends.com/remark-lint-fenced-code-flag-case
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-lint-fenced-code-flag-case?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-lint-fenced-code-flag-case
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/remark-lint-fenced-code-flag-case
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
  https://prettier.io/blog/2017/11/07/1.8.0.html#support-markdown-2943httpsgithubcomprettierprettierpull2943-by-ikatyanghttpsgithubcomikatyang
[3]: https://github.com/remarkjs/remark-lint#configure
[4]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-flag
[5]:
  https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-marker
