<!-- prettier-ignore-start -->
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
<!-- prettier-ignore-end -->

# mdast-util-tight-comments

This is a small [mdast][1] utility that extends [mdast-util-to-markdown][26]
allowing for the selective removal of newlines around certain mdast comment
nodes.

This is a low level project used by [remark-tight-comments][27], which is a
companion package to [remark-ignore][28].

---

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

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install mdast-util-tight-comments
```

## Usage

Suppose we have the following Markdown file `example.md`:

```Markdown
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

Note how the `<!-- START doctoc…` and `<!-- DON'T EDIT…` comments are _tightly_
positioned such that there is no newline between them. This is required by
[doctoc][29].

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

Would output the following (assuming remark is [configured][30] for dash bullets
and singular list item indents):

```Markdown
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

Note how the `<!-- START doctoc…` and `<!-- DON'T EDIT…` comments are now
separated by a newline, which will cause erroneous behavior when running doctoc.
~~Additionally, all the unnecessary newlines around the comments are very
ugly.~~

Suppose instead we ran the following JavaScript:

```typescript
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toMarkdown } from 'mdast-util-to-markdown';
import { joinTightComments } from 'mdast-util-hidden';

const doc = fs.readFileSync('example.md');
const tree = unified().use(remarkParse).parse(doc);

console.log(toMarkdown(tree, { join: [joinTightComments] }));
```

Then we would get the following output:

```Markdown
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

```Markdown
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

1. There will never be a newline between it and the next node
2. There will always be a newline between it and the previous node
3. If you're running prettier _after_ remark, #1 is not guaranteed

## API

Detailed interface information can be found under [`docs/`][docs].

## Related

- [remark-tight-comments][31] — remove unnecessary newlines around comments

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

### Contributors

<!-- TODO: all-contributors here -->

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[link-blm]: https://xunn.at/donate-blm
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2022
  'Is this package maintained?'
[link-repo]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/mdast-util-tight-comments
[badge-last-commit]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils
  'Latest commit timestamp'
[badge-issues]:
  https://img.shields.io/github/issues/Xunnamius/unified-utils
  'Open issues'
[link-issues]: https://github.com/Xunnamius/unified-utils/issues?q=
[badge-pulls]:
  https://img.shields.io/github/issues-pr/xunnamius/unified-utils
  'Open pull requests'
[link-pulls]: https://github.com/xunnamius/unified-utils/pulls
[badge-codecov]:
  https://codecov.io/gh/Xunnamius/unified-utils/branch/main/graph/badge.svg?token=HWRIOBAAPW
  'Is this package well-tested?'
[link-codecov]: https://codecov.io/gh/Xunnamius/unified-utils
[badge-license]:
  https://img.shields.io/npm/l/mdast-util-tight-comments
  "This package's source license"
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/mdast-util-tight-comments/LICENSE
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/mdast-util-tight-comments
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/mdast-util-tight-comments
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[package-json]: package.json
[docs]: docs
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[contributing]: /CONTRIBUTING.md
[support]: /.github/SUPPORT.md
[1]: https://github.com/thlorenz/doctoc
[2]: #mdast-util-tight-comments
[3]: #install
[4]: #usage
[5]: #api
[6]: #examples
[7]: #related
[8]: #contributing-and-support
[9]: #contributors
[10]: https://prettier.io/docs/en/ignore.html#javascript
[11]: https://github.com/unifiedjs/unified#processoruseplugin-options
[12]: https://github.com/all-contributors/all-contributors
[13]: #via-api
[14]: #via-remark-cli
[15]: #via-unified-configuration
[16]: https://github.com/remarkjs/remark/tree/main/packages/remark-cli
[17]: https://github.com/unifiedjs/unified-engine/blob/main/doc/configure.md
[18]:
  https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-comments#readme
[19]:
  https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-disable-tokenizers#readme
[20]: https://github.com/remarkjs/remark-message-control
[21]: https://github.com/syntax-tree/mdast-comment-marker
[22]: https://github.com/syntax-tree/mdast-zone
[23]: https://github.com/unifiedjs/unified
[24]: https://github.com/remarkjs/remark
[25]:
  https://raw.githubusercontent.com/Xunnamius/unified-utils/main/packages/mdast-util-tight-comments/README.md
[26]: https://github.com/syntax-tree/mdast-util-to-markdown
[27]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-tight-comments
[28]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
[29]:
  https://github.com/thlorenz/doctoc#update-existing-doctoc-tocs-effortlessly
[30]: /.remarkrc.mjs
[31]: /packages/remark-tight-comments
