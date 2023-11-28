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
| `maximumWords?` | ``false`` \| `number` | The maximum number of words allowed in a heading. Set to `false` (or `Infinity`) to prevent maximum word length checks. **`Default`** ```ts 10 ``` |
| `minimumWords?` | ``false`` \| `number` | The minimum number of words required in a heading. Set to `false` to prevent minimum word length checks. **`Default`** ```ts 1 ``` |

#### Defined in

[packages/remark-lint-heading-word-length/src/index.ts:15](https://github.com/Xunnamius/unified-utils/blob/7833113/packages/remark-lint-heading-word-length/src/index.ts#L15)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to fenced code flag case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | [[`Options`](README.md#options)] \| [] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946
