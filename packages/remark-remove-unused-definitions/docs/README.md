remark-remove-unused-definitions

# remark-remove-unused-definitions

## Table of contents

### Functions

- [default](README.md#default)

## Functions

### default

▸ **default**(`this`, `...settings`): `void` \| `Transformer`<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all unused definition nodes deleted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Root`, `void`, `void`\> |
| `...settings` | `void`[] |

#### Returns

`void` \| `Transformer`<`Root`, `Root`\>

#### Defined in

node_modules/unified/index.d.ts:531
