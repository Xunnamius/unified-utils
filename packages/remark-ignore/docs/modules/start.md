[remark-ignore](../README.md) / start

# Module: start

## Table of contents

### Functions

- [default](start.md#default)
- [ignoreStartTransformer](start.md#ignorestarttransformer)

## Functions

### default

▸ **default**(`this`, ...`settings`): `void` \| `Transformer`<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all child nodes following an ignore command having been hidden.

In this way, nodes hidden by this plugin are unaffected by transformations
from other plugins until said nodes are revealed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Root`, `void`, `void`\> |
| `...settings` | `void`[] |

#### Returns

`void` \| `Transformer`<`Root`, `Root`\>

#### Defined in

node_modules/unified/index.d.ts:531

___

### ignoreStartTransformer

▸ **ignoreStartTransformer**(`tree`): `void`

A unified transformer that takes a Root node as input and returns the same
node with all child nodes following an ignore command having been hidden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | `Root` |

#### Returns

`void`

#### Defined in

[packages/remark-ignore/src/start.ts:23](https://github.com/Xunnamius/unified-utils/blob/2e163cd/packages/remark-ignore/src/start.ts#L23)
