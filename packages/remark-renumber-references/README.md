<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# remark-renumber-references

This is a [unified][1] ([remark][2]) plugin that renumbers numeric
reference-style link ids contiguously starting from `[1]` and counting up. Also
plays nicely with [GFM footnotes][3] (by completely ignoring them), and comes
with full unicode support.

After running this plugin, _all definitions_, both numeric and alphanumeric,
will always be placed at the very bottom of the document.

**This plugin is a drop-in replacement for [remark-reference-links][4].** If you
want to preserve some inline links (e.g. for generated content), check out
[remark-ignore][5]. You might also be interested in
[remark-sort-definitions][6], which will logically reorder the reference
definitions at the bottom of your document. For a live example of these plugins
in action, check the source of [this very README.md file][7]. ✨

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
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install --save-dev remark-renumber-references
```

## Usage

### Via API

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkRenumberReferences from 'remark-renumber-references';

const file = await remark()
  // An options object is NOT required
  .use(remarkRenumberReferences, { preserveAlphanumericDefinitions: false })
  .process(await read('example.md'));

console.log(String(file));
```

<!-- remark-ignore -->

### Via [remark-cli](https://xunn.at/docs-remark-cli)

```shell
remark -o --use renumber-references README.md
```

<!-- remark-ignore -->

### Via [unified configuration](https://xunn.at/docs-unified-configuration)

In `package.json`:

```javascript
  /* … */
  "remarkConfig": {
    "plugins": [
      "remark-renumber-references"
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
    ['renumber-references', { preserveAlphanumericDefinitions: false }]
  ]
};
```

In `.remarkrc.mjs`:

```javascript
import remarkRenumberReferences from 'remark-renumber-references';

export default {
  plugins: [
    // …
    remarkRenumberReferences
  ]
};
```

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Options

This plugin recognizes the following options:

#### `preserveAlphanumericDefinitions`

Valid values: `true` | `false`\
Default: `true`

If `true`, alphanumeric definition ids (i.e. any id that cannot be parsed into
an integer) will be spared during the renumbering. If `false`, _all_ definition
ids will be deleted and recreated starting from `[1]`.

## Examples

Suppose we have the following Markdown file `example.md`:

```markdown
# Documentation

This [package](https://npm.im/some-package) is [more than][2nd-half-idiom] meets
the eye.

- [Install remark](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

## Install [remark](https://npm.im/remark)

…

[2nd-half-idiom]: https://meme-link-2
```

Then running the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkReferenceLinks from 'remark-reference-links';

const file = await remark()
  .use(remarkReferenceLinks)
  .process(await read('example.md'));

console.log(String(file));
```

Would output the following (assuming remark is [configured][8] for tight
references, dash bullets, and singular list item indents):

```markdown
# Documentation

This [package][1] is [more than][2nd-half-idiom] meets the eye.

- [Install remark][2]
- [Usage][3]
- [API][4]
- [Related][5]
- [Contributing and Support][6]
  - [Contributors][7]

## Install [remark][8]

…

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

Later on, we rewrite sections of `example.md` and remove others (using
[remark-remove-unused-definitions][9] to clear out the unused reference
definitions).

<!--? prettier screws up this quote for some reason -->
<!-- prettier-ignore -->
> Note that, while a side-effect of running this plugin is that unused numeric
> reference definitions are removed during renumbering, this behavior is not
> guaranteed and hence should not be relied upon. To ensure all unused reference
> definitions are always removed, use [remark-remove-unused-definitions][9]
> _before_ this plugin.

Rerunning the above JavaScript leaves us with the following output:

<!-- prettier-ignore -->
```markdown
# Documentation

> Warning: [something][2] to pay attention to.

This [package][1] is [more than][2nd-half-idiom] [meets the eye][1st-half-idiom].

- [Install unified][4]
- [Usage][3]
- [Related][5]
- [Contributing and Support][6]
  - [Maintainers][8]
  - [Contributors][7]

## Install [unified][9]

…

[2nd-half-idiom]: https://meme-link-2
[1]: https://npm.im/some-package
[3]: #usage
[5]: #related
[6]: #contributing-and-support
[7]: #contributors
[1st-half-idiom]: https://meme-link-1
[2]: https://something-or-other
[4]: #install
[8]: #maintainers
[9]: https://npm.im/unified
```

This might be good enough when run through a Markdown renderer where the end
user is not exposed to the reference numbers, but what about the humans reading
the plain text document itself?

In the words of one of Markdown's creators:

> Markdown allows you to write using an _easy-to-read_, easy-to-write _plain
> text_ format … The overriding design goal for Markdown’s formatting syntax is
> to _make it as readable as possible_.

What's "easy to read" is subjective. For those who find it bothersome or
distracting reading Markdown documents containing reference links with integer
ids that hop around in a random order, this is the plugin for you.

Suppose instead we ran the following JavaScript:

```typescript
import { read } from 'to-vfile';
import { remark } from 'remark';
import remarkReferenceLinks from 'remark-reference-links';
import remarkRenumberReferences from 'remark-renumber-references';

const file = await remark()
  .use(remarkReferenceLinks)
  // It is important that this plugin is loaded AFTER any plugins that
  // *manipulate* or *remove* links, reference definitions, and/or their ids
  .use(remarkRenumberReferences)
  // However, this plugin should be loaded BEFORE any plugins that *sort*
  // reference definitions
  .process(await read('example.md'));

console.log(String(file));
```

Then we would get the following output:

<!-- prettier-ignore -->
```markdown
# Documentation

> Warning: [something][1] to pay attention to.

This [package][2] is [more than][2nd-half-idiom] [meets the eye][1st-half-idiom].

- [Install unified][3]
- [Usage][4]
- [Related][5]
- [Contributing and Support][6]
  - [Maintainers][7]
  - [Contributors][8]

## Install [unified][9]

…

[2nd-half-idiom]: https://meme-link-2
[1st-half-idiom]: https://meme-link-1
[1]: https://something-or-other
[2]: https://npm.im/some-package
[3]: #install
[4]: #usage
[5]: #related
[6]: #contributing-and-support
[7]: #maintainers
[8]: #contributors
[9]: https://npm.im/unified
```

Now all the numeric reference ids flow through the document in ascending order
starting from `[1]`. Nice!

Finally, notice how those reference definitions at the end (specifically the
alphanumeric ids) are unordered. Luckily, there exists [a remark plugin][6] that
will sort all your definitions in whatever order you choose.

## Related

- [remark-reference-links][4] — transform inline links into reference-style
  links.
- [remark-sort-definitions][6] — logically reorder reference definitions at the
  bottom of your document.
- [remark-remove-unused-definitions][9] — remove unused reference definitions.

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
  https://img.shields.io/npm/dm/remark-renumber-references?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/remark-renumber-references?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/remark-renumber-references/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/remark-renumber-references
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npmtrends.com/remark-renumber-references
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-renumber-references
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
[3]: https://github.com/remarkjs/remark-gfm#what-is-this
[4]: https://github.com/remarkjs/remark-reference-links
[5]: /packages/remark-ignore
[6]: /packages/remark-sort-definitions
[7]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/remark-renumber-references/README.md
[8]: /.remarkrc.mjs
[9]: /packages/remark-remove-unused-definitions
