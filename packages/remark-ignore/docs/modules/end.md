[remark-ignore](../README.md) / end

# Module: end

## Table of contents

### Functions

- [default](end.md#default)
- [ignoreEndTransformer](end.md#ignoreendtransformer)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all hidden child nodes revealed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | `void`[] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946

___

### ignoreEndTransformer

▸ **ignoreEndTransformer**(`tree`): `void`

A unified transformer that takes a Root node as input and returns the same
node with all hidden child nodes revealed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | `Root` |

#### Returns

`void`

#### Defined in

[packages/remark-ignore/src/end.ts:18](https://github.com/Xunnamius/unified-utils/blob/cc4d623/packages/remark-ignore/src/end.ts#L18)
