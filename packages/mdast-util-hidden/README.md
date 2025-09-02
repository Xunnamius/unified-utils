<!-- symbiote-template-region-start 1 -->

<p align="center" width="100%">
  <img width="300" src="https://raw.githubusercontent.com/Xunnamius/unified-utils/refs/heads/main/packages/mdast-util-hidden/logo.png">
</p>

<p align="center" width="100%">
<!-- symbiote-template-region-end -->
mdast utility to selectively hide and reveal mdast nodes
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

# mdast-util-hidden

<!-- symbiote-template-region-end -->

This is a small [mdast][1] utility for hiding nodes from transformers by mapping
them to [Hidden][2] pseudo-node instances.

This is a low level project used by [remark-ignore][3] and
[remark-renumber-references][4].

<!-- symbiote-template-region-start 3 -->

---

<!-- remark-ignore-start -->
<!-- symbiote-template-region-end -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [Additional Considerations](#additional-considerations)
- [API](#api)
  - [Ast Nodes](#ast-nodes)
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

> [!NOTE]
>
> The elements of `hiddenChildren` will, if later [revealed][5], have their
> `position` data stripped off using [unist-util-remove-position][6] (making
> them [generated nodes][7]). This is because `position` data can be invalidated
> at any time due to it being [impossible][8] to know how later plugins will
> manipulate the AST. Missing `position` data will not crash any remark plugins
> that properly follow the [unist spec][9].

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
  https://img.shields.io/codecov/c/github/Xunnamius/unified-utils/main?style=flat-square&token=HWRIOBAAPW&flag=package.main_mdast-util-hidden
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/unified-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/mdast-util-hidden?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-downloads-link]: https://npmtrends.com/mdast-util-hidden
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/Xunnamius/unified-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/mdast-util-hidden?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/unified-utils/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/mdast-util-hidden
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://npm.im/mdast-util-hidden
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
