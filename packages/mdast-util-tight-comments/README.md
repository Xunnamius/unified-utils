<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# mdast-util-tight-comments

This is a small [mdast][1] utility that extends [mdast-util-to-markdown][2]
allowing for the selective removal of newlines around certain mdast comment
nodes.

This is a low level project used by [remark-tight-comments][3], which is a
companion package to [remark-ignore][4].

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install mdast-util-tight-comments
```

## Usage

Suppose we have the following Markdown file `example.md`:

```markdown
<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install remark](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->
<!-- prettier-ignore-end -->

<!-- Begin the documentation section -->

<!-- TODO: add another section here -->

<!-- remark-ignore -->

# Install [remark](https://npm.im/remark)
```

Notice how the `<!-- START doctoc…` and `<!-- DON'T EDIT…` comments are
_tightly_ positioned such that there is no newline between them. This is
required by [doctoc][5].

Now, running the following JavaScript:

```typescript
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toMarkdown } from 'mdast-util-to-markdown';

const doc = fs.readFileSync('example.md');
const tree = unified().use(remarkParse).parse(doc);

console.log(toMarkdown(tree));
```

Would output the following (assuming remark is [configured][6] for dash bullets
and singular list item indents):

```markdown
<!-- prettier-ignore-start -->

<!-- remark-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install remark](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- remark-ignore-end -->

<!-- prettier-ignore-end -->

<!-- Begin the documentation section -->

<!-- TODO: add another section here -->

<!-- remark-ignore -->

# Install [remark](https://npm.im/remark)
```

Notice how the `<!-- START doctoc…` and `<!-- DON'T EDIT…` comments are now
separated by a newline, which will cause erroneous behavior when running doctoc.
~~Additionally, all the unnecessary newlines around the comments are very
ugly.~~

Suppose instead we ran the following JavaScript:

```typescript
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toMarkdown } from 'mdast-util-to-markdown';
import { joinTightComments } from 'mdast-util-tight-comments';

const doc = fs.readFileSync('example.md');
const tree = unified().use(remarkParse).parse(doc);

console.log(toMarkdown(tree, { join: [joinTightComments] }));
```

Then we would get the following output:

```markdown
<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->
<!-- prettier-ignore-end -->

<!-- Begin the documentation section -->
<!-- TODO: add another section here -->

<!-- remark-ignore -->

# Install [remark](https://npm.im/remark)
```

That's better! But not perfect. What if we want to preserve the default spacing
around the `<!-- Begin the…` comment? Specifically, we want to maintain the
newline _before_ and _after_ this comment.

To preserve newlines before a comment, affix the opening tag with a `|`. To
preserve newlines after a comment, prefix the closing tag with a `|`. These can
be combined to preserve a newline both before and after a comment.

For example, suppose we edited `example.md` to contain the following:

```markdown
<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install remark](#install)
- [Usage](#usage)
- [API](#api)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->
<!-- prettier-ignore-end -->

<!--| Begin the documentation section |-->

<!-- TODO: add another section here -->

<!-- remark-ignore -->

# Install [remark](https://npm.im/remark)
```

Notice the `<!--| Begin the documentation section |-->` line. Since there aren't
any other remark plugins being used, running the above JavaScript with this new
`readme.md` file would output the contents of the file unchanged.

Also notice the `<!-- remark-ignore -->` line. This specific comment receives
special consideration in that:

1. There will never be a newline between it and the next node.
2. There will always be a newline between it and the previous node.

> If you're running prettier _after_ remark, you must surround the comments
> around which you want to preserve tightened spacing with
> `<!-- prettier-ignore-start -->` and `<!-- prettier-ignore-end -->`.

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

## Related

- [remark-tight-comments][7] — remove unnecessary newlines around comments.

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
  https://img.shields.io/codecov/c/github/xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/mdast-util-tight-comments?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/mdast-util-tight-comments?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/mdast-util-tight-comments/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/mdast-util-tight-comments
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/mdast-util-tight-comments
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/mdast-util-tight-comments
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
[1]: https://github.com/thlorenz/doctoc
[2]: https://github.com/syntax-tree/mdast-util-to-markdown
[3]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-tight-comments
[4]: https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
[5]: https://github.com/thlorenz/doctoc#update-existing-doctoc-tocs-effortlessly
[6]: /.remarkrc.mjs
[7]: /packages/remark-tight-comments
