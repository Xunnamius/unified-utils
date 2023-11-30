remark-remove-url-trailing-slash

# remark-remove-url-trailing-slash

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
| `onlyConsiderHostUrls?` | `boolean` | If this option is `false`, trailing slashes will be removed from all URL paths, including single-character `/` paths (i.e. "empty" paths). If this option is `true`, trailing slashes will only be removed from non-relative URLs with empty paths, e.g. `https://example.com/ => https://example.com`. **`Default`** ```ts false ``` |

#### Defined in

[packages/remark-remove-url-trailing-slash/src/index.ts:11](https://github.com/Xunnamius/unified-utils/blob/cc4d623/packages/remark-remove-url-trailing-slash/src/index.ts#L11)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all Link, Image, and Definition node `url` paths stripped of
trialing slashes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | [options: Options] \| `void`[] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946
