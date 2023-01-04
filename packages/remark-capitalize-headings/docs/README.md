remark-capitalize-headings

# remark-capitalize-headings

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Functions

- [default](README.md#default)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-remove-url-trailing-slash plugin.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `excludeHeadingLevel?` | { [level in "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"]?: boolean } | Headings of the specified `level` in `{ [level]: true }` will be excluded from capitalization entirely, where `h1` corresponds to `<h1>…</h1>`/`# …`, `h2` to `<h2>…</h2>`/`## …`, etc. > Excludes with `false` values are treated as if they were commented out. **`Default`** |
| `excludeSectionRegExp?` | (`string` \| `RegExp`)[] | Entire sections with a stringified heading matching at least one of the given regular expression strings will be excluded from capitalization entirely. **`Default`** [] |
| `replaceHeadingRegExp?` | { `[regExp: string]`: `string`;  } | This option lets you manipulate non-excluded headers in their stringified form _after they've been transformed by title_ by leveraging mdast position data. This extra context is useful for tasks like capitalizing a word only if it appears at the end of a heading, or as part of a phrase, or to prevent a word from being capitalized. This option also supports using matching groups in during replacement. **`Default`** |

#### Defined in

[packages/remark-capitalize-headings/src/index.ts:12](https://github.com/Xunnamius/unified-utils/blob/34702e4/packages/remark-capitalize-headings/src/index.ts#L12)

## Functions

### default

▸ **default**(`this`, `...settings`): `void` \| `Transformer`<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all heading nodes capitalized using Vercel's `title` package.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Root`, `void`, `void`\> |
| `...settings` | [options: Options] \| `void`[] |

#### Returns

`void` \| `Transformer`<`Root`, `Root`\>

#### Defined in

node_modules/unified/index.d.ts:531
