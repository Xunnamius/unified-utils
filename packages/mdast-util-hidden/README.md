<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# mdast-util-hidden

This is a small [mdast][1] utility for hiding nodes from transformers by mapping
them to [Hidden][2] pseudo-node instances.

This is a low level project used by [remark-ignore][3] and
[remark-renumber-references][4].

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [Additional Considerations](#additional-considerations)
- [API](#api)
  - [Ast Nodes](#ast-nodes)
- [Related](#related)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

> Due to the nature of the unified ecosystem, this package is ESM only and
> cannot be `require`'d.

```bash
npm install mdast-util-hidden
```

## Usage

Suppose we have the following Markdown file `example.md`:

```markdown
# Hello

Some _emphasis_, **importance**, and `code`.

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
  if (index !== undefined && parent !== undefined) {
    // … Other stuff
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

> Note that the elements of `hiddenChildren` will, if later [revealed][5], have
> their `position` data stripped off using [unist-util-remove-position][6]
> (making them [generated nodes][7]). This is because `position` data can be
> invalidated at any time due to it being [impossible][8] to know how later
> plugins will manipulate the AST. Missing `position` data will not crash any
> remark plugins that properly follow the [unist spec][9].

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
  if (index !== undefined && parent !== undefined) {
    hide({ nodes: [node], index, parent });
    return [SKIP, index + 1];
  }
});

// LATER:

visit(tree, 'hidden', (node, index, parent) => {
  if (index !== undefined && parent !== undefined) {
    reveal({ nodes: [node], index, parent });
    // … Other stuff
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
    // … Other stuff
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

### Additional Considerations

When using mdast-util-hidden in your own remark plugin, it's generally a good
idea to mark your `Hidden` nodes with a unique symbol and ensure that you only
call [`reveal`][10] and [`visitAndReveal`][11] on the `Hidden` nodes marked with
said symbol. Otherwise, if someone is using your plugin and [remark-ignore][12]
concurrently, it could be the case that your plugin accidentally reveals nodes
that were hidden by remark-ignore, causing erroneous transformations against the
user's wishes.

An example of using a unique symbol to mark ownership of `Hidden` nodes can be
found in [the remark-renumber-references source code][13].

## API

Detailed interface information can be found under [`docs/`][x-repo-docs].

### Ast Nodes

#### `Hidden`

```typescript
interface Hidden extends Node {
  type: 'hidden';
  hiddenChildren: MdastContent[];
}
```

**Hidden ([Node][9])** represents an abstract interface in mdast containing
[mdast content][14] that is hidden (and thus protected) from other
[transformers][15].

Hidden nodes are always [generated][7], cannot be serialized [to markdown][16],
and cannot be derived [from markdown][17] directly.

## Related

- [remark-ignore][3] — use comments to exclude one or more nodes from
  transformation.
- [remark-renumber-references][4] — renumber numeric reference-style link ids
  contiguously starting from `[1]`.
- [rehype-ignore][18] — ignore content display via HTML comments.

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
  https://img.shields.io/npm/dm/mdast-util-hidden?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/mdast-util-hidden?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/packages/mdast-util-hidden/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/mdast-util-hidden
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/mdast-util-hidden
[x-badge-repo-link]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/mdast-util-hidden
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
[1]: https://github.com/syntax-tree/mdast
[2]: #hidden
[3]: https://github.com/xunnamius/unified-utils/blob/main/packages/remark-ignore
[4]:
  https://github.com/xunnamius/unified-utils/blob/main/packages/remark-renumber-references
[5]: #api
[6]: https://github.com/syntax-tree/unist-util-remove-position
[7]: https://github.com/syntax-tree/unist#generated
[8]: https://github.com/remarkjs/remark-gfm/issues/16#issuecomment-841200438
[9]: https://github.com/syntax-tree/unist#node
[10]: ./docs/README.md#reveal
[11]: ./docs/README.md#visitandreveal
[12]: /packages/remark-ignore
[13]: /packages/remark-renumber-references/src/index.ts
[14]: https://github.com/syntax-tree/mdast#content-model
[15]: https://github.com/unifiedjs/unified#function-transformertree-file-next
[16]: https://github.com/syntax-tree/mdast-util-to-markdown
[17]: https://github.com/syntax-tree/mdast-util-from-markdown
[18]: https://npm.im/rehype-ignore
