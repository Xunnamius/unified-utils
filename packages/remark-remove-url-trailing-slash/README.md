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

# remark-remove-url-trailing-slash

This is a [unified][1] ([remark][2]) plugin that removes trailing slashes from
the ends of all URL paths.

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
  - [Using the default configuration](#using-the-default-configuration)
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

Detailed interface information can be found under [`docs/`][docs].

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
[link 6][1]

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ/
```

### Using the default configuration

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
[link 6][1]

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ
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
[link 6][1]

[1]: https://www.youtube.com/watch?v=dFs4yX4V7NQ/
```

## Related

- [remark-lint-remove-url-trailing-slash][5] — the [remark-lint][6] version of
  and inspiration for this package
- [remark-ignore][7] — use comments to exclude one or more nodes from
  [transformation][8]

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][9].

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
  https://img.shields.io/npm/l/remark-remove-url-trailing-slash
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-remove-url-trailing-slash
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-remove-url-trailing-slash/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-remove-url-trailing-slash
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-remove-url-trailing-slash
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: /packages/remark-renumber-references
[4]: #onlyConsiderHostUrls
[5]: https://github.com/vercel/remark-capitalize
[6]: https://github.com/remarkjs/remark-lint
[7]: /packages/remark-ignore
[8]: https://github.com/unifiedjs/unified#overview
[9]: /README.md#contributors
