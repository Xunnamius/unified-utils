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

# mdast-util-hidden

This is a small [mdast][1] utility for hiding nodes from transformers by mapping
them to [Hidden][2] pseudo-node instances.

This is a low level project used by [remark-ignore][3] and
[remark-renumber-references][4].

---

<!-- prettier-ignore-start -->
<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [AST Nodes](#ast-nodes)
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
npm install mdast-util-hidden
```

## Usage

Suppose we have the following Markdown file `example.md`:

```Markdown
# Hello

Some *emphasis*, **importance**, and `code`.

# Goodbye
```

Represented by the following AST (with `position` data omitted for brevity):

```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [{ "type": "text", "value": "Hello" }]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "Some " },
        {
          "type": "emphasis",
          "children": [{ "type": "text", "value": "emphasis" }]
        },
        { "type": "text", "value": ", " },
        {
          "type": "strong",
          "children": [{ "type": "text", "value": "importance" }]
        },
        { "type": "text", "value": ", and " },
        { "type": "inlineCode", "value": "code" },
        { "type": "text", "value": "." }
      ]
    },
    {
      "type": "heading",
      "depth": 1,
      "children": [{ "type": "text", "value": "Goodbye" }]
    }
  ]
}
```

Then running the following JavaScript:

```typescript
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit, SKIP } from 'unist-util-visit';
import { hide } from 'mdast-util-hidden';

const doc = fs.readFileSync('example.md');
const tree = unified().use(remarkParse).parse(doc);

visit(tree, 'heading', (node, index, parent) => {
  if (index !== null && parent !== null) {
    // ... Other stuff
    hide({ nodes: [node], index, parent });
    // Do not traverse node, continue with the next node at index + 1
    return [SKIP, index + 1];
  }
});

console.dir(tree, { depth: null });
```

Yields:

```json
{
  "type": "root",
  "children": [
    {
      "type": "hidden",
      "hiddenChildren": [
        {
          "type": "heading",
          "depth": 1,
          "children": [{ "type": "text", "value": "Hello" }]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "Some " },
        {
          "type": "emphasis",
          "children": [{ "type": "text", "value": "emphasis" }]
        },
        { "type": "text", "value": ", " },
        {
          "type": "strong",
          "children": [{ "type": "text", "value": "importance" }]
        },
        { "type": "text", "value": ", and " },
        { "type": "inlineCode", "value": "code" },
        { "type": "text", "value": "." }
      ]
    },
    {
      "type": "hidden",
      "hiddenChildren": [
        {
          "type": "heading",
          "depth": 1,
          "children": [{ "type": "text", "value": "Goodbye" }]
        }
      ]
    }
  ]
}
```

> Note that the elements of `hiddenChildren` will, if later [revealed][7], have
> their `position` data stripped off using [unist-util-remove-position][13]
> (making them [generated nodes][14]). This is because `position` data can be
> invalidated at any time due to it being [impossible][15] to know how later
> plugins will manipulate the AST. Missing `position` data will not crash any
> remark plugins that properly follow the [unist spec][16].

And running the following JavaScript:

```typescript
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit, SKIP } from 'unist-util-visit';
import { hide, visitAndReveal, reveal } from 'mdast-util-hidden';

const doc = fs.readFileSync('example.md');
const tree = unified().use(remarkParse).parse(doc);

visit(tree, 'heading', (node, index, parent) => {
  if (index !== null && parent !== null) {
    hide({ nodes: [node], index, parent });
    return [SKIP, index + 1];
  }
});

// LATER:

visit(tree, 'hidden', (node, index, parent) => {
  if (index !== null && parent !== null) {
    reveal({ nodes: [node], index, parent });
    // ... Other stuff
    // Do not traverse node, continue with the node now at index (NOT index + 1)
    return [SKIP, index];
  }
});
// OR:
visitAndReveal({ tree });
// OR:
visitAndReveal({
  tree,
  visitor: (node, index, parent) => {
    // reveal is called for you
    // ... Other stuff
    // returns [SKIP, index] unless this function returns a defined value
  }
});

console.dir(tree, { depth: null });
```

Yields the original AST with the hidden headings restored (but stripped of their
`position` data):

```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [{ "type": "text", "value": "Hello" }]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "Some " },
        {
          "type": "emphasis",
          "children": [{ "type": "text", "value": "emphasis" }]
        },
        { "type": "text", "value": ", " },
        {
          "type": "strong",
          "children": [{ "type": "text", "value": "importance" }]
        },
        { "type": "text", "value": ", and " },
        { "type": "inlineCode", "value": "code" },
        { "type": "text", "value": "." }
      ]
    },
    {
      "type": "heading",
      "depth": 1,
      "children": [{ "type": "text", "value": "Goodbye" }]
    }
  ]
}
```

## API

Detailed interface information can be found under [`docs/`][docs].

### AST Nodes

#### `Hidden`

```typescript
interface Hidden extends Node {
  type: 'hidden';
  hiddenChildren: MdastContent[];
}
```

**Hidden ([Node][16])** represents an abstract interface in mdast containing
[mdast content][18] that is hidden (and thus protected) from other
[transformers][19].

Hidden nodes are always [generated][14], cannot be serialized [to markdown][20],
and cannot be derived [from markdown][21] directly.

## Related

- [remark-ignore][3]
- [remark-renumber-references][4]
- [rehype-ignore][22]

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
  https://github.com/xunnamius/unified-utils/blob/main/packages/mdast-util-hidden
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
  https://img.shields.io/npm/l/mdast-util-hidden
  "This package's source license"
[link-license]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/mdast-util-hidden/LICENSE
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/mdast-util-hidden
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/mdast-util-hidden
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[docs]: docs
[choose-new-issue]: https://github.com/xunnamius/unified-utils/issues/new/choose
[pr-compare]: https://github.com/xunnamius/unified-utils/compare
[contributing]: /CONTRIBUTING.md
[support]: /.github/SUPPORT.md
[1]: https://github.com/syntax-tree/mdast
[2]: #hidden
[3]: https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
[4]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-renumber-references
[5]: #install
[6]: #usage
[7]: #api
[8]: #ast-nodes
[10]: #related
[11]: #contributing-and-support
[12]: #contributors
[13]: https://github.com/syntax-tree/unist-util-remove-position
[14]: https://github.com/syntax-tree/unist#generated
[15]: https://github.com/remarkjs/remark-gfm/issues/16#issuecomment-841200438
[16]: https://github.com/syntax-tree/unist#node
[18]: https://github.com/syntax-tree/mdast#content-model
[19]: https://github.com/unifiedjs/unified#function-transformertree-file-next
[20]: https://github.com/syntax-tree/mdast-util-to-markdown
[21]: https://github.com/syntax-tree/mdast-util-from-markdown
[22]: https://npm.im/rehype-ignore
