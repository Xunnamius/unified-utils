<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/remark-remove-url-trailing-slash/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->

A remark plugin that removes trailing slashes from the ends of all URLs

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

# remark-remove-url-trailing-slash

<!-- symbiote-template-region-end -->

This is a [unified][1] ([remark][2]) plugin that removes trailing slashes from
the ends of all URL paths (not query strings or hashes).

Since this is not always a purely cosmetic change, you might also be interested
in [remark-ignore][3], which lets you instruct remark not to transform parts of
your Markdown documents (such as a link).

See also the [`onlyConsiderHostUrls`][4] option.

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
  - [Using `onlyConsiderHostUrls`](#using-onlyconsiderhosturls)
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
npm install --save-dev remark-remove-url-trailing-slash
```

## Usage

For maximum flexibility, there are several ways this plugin can be invoked.

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';

const file = await remark()
  .use(remarkRemoveUrlTrailingSlash)
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use remove-url-trailing-slash README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-remove-url-trailing-slash"
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
    'remove-url-trailing-slash'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';

export default {
  plugins: [
    // …
    remarkRemoveUrlTrailingSlash
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Options

This plugin recognizes the following options:

#### `onlyConsiderHostUrls`

Valid values: `boolean`\
Default: `false`

Trailing slashes will be removed from all URL paths by default, including
single-character `/` paths (i.e. "empty" paths).

If this option is `true`, trailing slashes will only be removed from
non-relative URLs with empty paths, e.g.
`https://example.com/#readme => https://example.com#readme`.

## Examples

Suppose we have the following Markdown file `example.md`:

```markdown
[link 1](https://example.com)  
[link 2](https://example.com/)  
[link 3](https://example.com/some/path/)  
[link 4](https://example.com/#readme)  
[link 5](https://example.com/some/path/#readme)  
[link 6](https://example.com/some/path/#readme/)  
[link 7][1]

[1]: https://www.youtube.com/watch/?v=dFs4yX4V7NQ/
```

### Using the Default Configuration

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';

const file = await remark()
  .use(remarkRemoveUrlTrailingSlash)
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following:

```markdown
[link 1](https://example.com)  
[link 2](https://example.com)  
[link 3](https://example.com/some/path)  
[link 4](https://example.com#readme)  
[link 5](https://example.com/some/path#readme)  
[link 6](https://example.com/some/path#readme/)  
[link 7][1]

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ/
```

### Using `onlyConsiderHostUrls`

Running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUrlTrailingSlash from 'remark-remove-url-trailing-slash';

const file = await remark()
  .use(remarkRemoveUrlTrailingSlash, {
    // Do not change URLs with paths
    excludeHeadingLevel: { onlyConsiderHostUrls: true }
  })
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following:

```markdown
[link 1](https://example.com)  
[link 2](https://example.com)  
[link 3](https://example.com/some/path/)  
[link 4](https://example.com#readme)  
[link 5](https://example.com/some/path/#readme)  
[link 6](https://example.com/some/path/#readme/)  
[link 7][1]

[1]: https://www.youtube.com/watch/?v=dFs4yX4V7NQ/
```

## Related

- [remark-lint-no-url-trailing-slash][5] — the [remark-lint][6] version of and
  inspiration for this package.
- [remark-ignore][7] — use comments to exclude one or more nodes from
  [transformation][8].

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
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_remark-remove-url-trailing-slas
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/remark-remove-url-trailing-slash?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/remark-remove-url-trailing-slash
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-remove-url-trailing-slash?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-remove-url-trailing-slash
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/remark-remove-url-trailing-slash
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
[3]: /packages/remark-renumber-references
[4]: #onlyConsiderHostUrls
[5]: https://github.com/vhf/remark-lint-no-url-trailing-slash
[6]: https://github.com/remarkjs/remark-lint
[7]: /packages/remark-ignore
[8]: https://github.com/unifiedjs/unified#overview
