remark-lint-heading-word-length

# remark-lint-heading-word-length

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Functions

- [default](README.md#default)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-lint-heading-word-length plugin.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `maximumWords?` | ``false`` \| `number` | The maximum number of words allowed in a heading. Set to `false` (or `Infinity`) to prevent maximum word length checks. **`Default`** 10 |
| `minimumWords?` | ``false`` \| `number` | The minimum number of words required in a heading. Set to `false` to prevent minimum word length checks. **`Default`** 1 |

#### Defined in

[packages/remark-lint-heading-word-length/src/index.ts:14](https://github.com/Xunnamius/unified-utils/blob/1d6f92d/packages/remark-lint-heading-word-length/src/index.ts#L14)

## Functions

### default

▸ **default**(`this`, `...settings`): `void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to fenced code flag case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Node`<`Data`\>, `void`, `void`\> |
| `...settings` | `void`[] \| [`unknown`] \| [`boolean` \| `Label` \| `Severity`, `unknown`] |

#### Returns

`void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

#### Defined in

node_modules/unified/index.d.ts:531
