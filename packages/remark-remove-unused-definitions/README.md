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

# remark-remove-unused-definitions

This is a [unified][1] ([remark][2]) plugin that removes unused reference
definitions from a document. Also removes unused [GFM footnotes][3] definitions.

While you can get a similar effect by running something like the following:

```shell
remark -o --use inline-links --use reference-links your-markdown-file.md
```

Such a naive approach will _destroy_ all of your carefully considered
alphanumeric reference ids (e.g. the "alphanumeric-id" in
`[text][alphanumeric-id]`)! This plugin only elides _unused_ reference
definitions, leaving the rest intact.

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
- [Examples](#examples)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-remove-unused-definitions
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUnusedDefs from 'remark-remove-unused-definitions';

const file = await remark()
  .use(remarkRemoveUnusedDefs)
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use remove-unused-definitions README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-remove-unused-definitions"
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
    'remove-unused-definitions'
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkRemoveUnusedDefs from 'remark-remove-unused-definitions';

export default {
  plugins: [
    // …
    remarkRemoveUnusedDefs
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][docs].

## Examples

Suppose we have the following Markdown file `example.md`:

```markdown
# Documentation

This [package][1] is [more than][2nd-half-idiom] meets the eye.

## Install [remark][8]

…

[1st-half-idiom]: https://meme-link-1
[2nd-half-idiom]: https://meme-link-2
[1]: https://npm.im/some-package
[2]: #install
[3]: #usage
[4]: #api
[5]: #related
[6]: #contributing-and-support
[7]: #contributors
[8]: https://npm.im/remark
```

Then running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRemoveUnusedDefs from 'remark-remove-unused-definitions';

const file = await remark()
  .use(remarkRemoveUnusedDefs)
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][4] for tight
references):

```markdown
# Documentation

This [package][1] is [more than][2nd-half-idiom] meets the eye.

## Install [remark][8]

…

[2nd-half-idiom]: https://meme-link-2
[1]: https://npm.im/some-package
[8]: https://npm.im/remark
```

Now all the unused definitions have been deleted. Nice!

Finally, notice how those numeric reference definition ids are not contiguous:
instead of `[1]` and `[2]` it's `[1]` and `[8]`. Luckily, there exists [a remark
plugin][5] that will ensure numeric reference ids flow through the document in
ascending order starting from `[1]`.

## Related

- [remark-reference-links][6] — transform inline links into reference-style
  links.
- [remark-renumber-references][5] — contiguously renumber numeric
  reference-style link ids starting from `[1]`.
- [remark-sort-definitions][7] — logically reorder reference definitions at the
  bottom of your document.

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

See the [table of contributors][8].

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
  https://img.shields.io/npm/l/remark-remove-unused-definitions
  "This package's source license"
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2023
  'Is this package maintained?'
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/remark-remove-unused-definitions
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
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-remove-unused-definitions/LICENSE
[link-npm]: https://www.npmjs.com/package/remark-remove-unused-definitions
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-remove-unused-definitions
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[support]: /.github/SUPPORT.md
[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/remarkjs/remark
[3]: https://github.com/remarkjs/remark-gfm#what-is-this
[4]: /.remarkrc.mjs
[5]: /packages/remark-renumber-references
[6]: https://github.com/remarkjs/remark-reference-links
[7]: /packages/remark-sort-definitions
[8]: /README.md#contributors
