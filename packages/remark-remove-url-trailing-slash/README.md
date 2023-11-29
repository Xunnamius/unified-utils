<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# remark-remove-url-trailing-slash

This is a [unified][1] ([remark][2]) plugin that removes trailing slashes from
the ends of all URL paths (not query strings or hashes).

Since this is not always a purely cosmetic change, you might also be interested
in [remark-ignore][3], which lets you instruct remark not to transform parts of
your Markdown documents (such as a link).

See also the [`onlyConsiderHostUrls`][4] option.

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
  - [Using `onlyConsiderHostUrls`](#using-onlyconsiderhosturls)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-remove-url-trailing-slash
```

## Usage

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
  https://img.shields.io/npm/dm/remark-remove-url-trailing-slash?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-remove-url-trailing-slash?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-remove-url-trailing-slash/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-remove-url-trailing-slash
  'Install this package using npm or yarn!'
[x-badge-npm-link]:
  https://www.npmjs.com/package/remark-remove-url-trailing-slash
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-remove-url-trailing-slash
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
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: /packages/remark-renumber-references
[4]: #onlyConsiderHostUrls
[5]: https://github.com/vhf/remark-lint-no-url-trailing-slash
[6]: https://github.com/remarkjs/remark-lint
[7]: /packages/remark-ignore
[8]: https://github.com/unifiedjs/unified#overview
