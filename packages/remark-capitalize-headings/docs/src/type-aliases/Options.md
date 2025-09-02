[**remark-capitalize-headings**](../../README.md)

***

[remark-capitalize-headings](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:15](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-capitalize-headings/src/index.ts#L15)

Options type for the remark-remove-url-trailing-slash plugin.

## Properties

### excludeHeadingLevel?

> `optional` **excludeHeadingLevel**: \{ \[level in "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"\]?: boolean \}

Defined in: [src/index.ts:25](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-capitalize-headings/src/index.ts#L25)

Headings of the specified `level` in `{ [level]: true }` will be excluded
from capitalization entirely, where `h1` corresponds to `<h1>…</h1>`/`# …`,
`h2` to `<h2>…</h2>`/`## …`, etc.

> Excludes with `false` values are treated as if they were commented out.

#### Default

```ts
{}
```

***

### excludeHeadingText?

> `optional` **excludeHeadingText**: `string`[]

Defined in: [src/index.ts:54](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-capitalize-headings/src/index.ts#L54)

This option lets you avoid transforming specific parts of the header's text
_before they've been transformed by title_.

#### Default

```ts
[]
```

***

### excludeSectionRegExp?

> `optional` **excludeSectionRegExp**: (`string` \| `RegExp`)[]

Defined in: [src/index.ts:33](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-capitalize-headings/src/index.ts#L33)

Entire sections with a stringified heading matching at least one of
the given regular expression strings will be excluded from capitalization
entirely.

#### Default

```ts
[]
```

***

### replaceHeadingRegExp?

> `optional` **replaceHeadingRegExp**: `object`

Defined in: [src/index.ts:47](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-capitalize-headings/src/index.ts#L47)

This option lets you manipulate non-excluded headers in their stringified
form _after they've been transformed by title_ by leveraging mdast position
data.

This extra context is useful for tasks like capitalizing a word only if it
appears at the end of a heading, or as part of a phrase, or to prevent a
word from being capitalized.

This option also supports using matching groups in during replacement.

#### Index Signature

\[`regExp`: `string`\]: `string`

#### Default

```ts
{ "(?<=\\s)a(?=\\p{P})": "A" }
```
