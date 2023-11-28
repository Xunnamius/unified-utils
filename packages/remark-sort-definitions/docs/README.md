remark-sort-definitions

# remark-sort-definitions

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Functions

- [default](README.md#default)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-sort-definitions plugin.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `algorithm?` | ``"numeric-first"`` \| ``"alphanumeric-first"`` | This option determines the sorting preference used when reordering definitions. `numeric-first` will put definitions with purely numeric ids first, sorted from least (i.e. 1) to greatest, followed by any remaining definitions sorted [naturally][5]. `alphanumeric-first` will put definitions with alphanumeric ids (i.e. any id that cannot be parsed into an integer) first, sorted naturally, followed by any remaining definitions sorted from least (i.e. 1) to greatest. **`Default`** ```ts "alphanumeric-first" ``` |

#### Defined in

[packages/remark-sort-definitions/src/index.ts:12](https://github.com/Xunnamius/unified-utils/blob/7833113/packages/remark-sort-definitions/src/index.ts#L12)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

A remark plugin that takes a Root node as input and returns the same node
with all definition nodes ordered with respect to the chosen
`Options.algorithm`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | [options: Options] \| `void`[] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Root`, `Root`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946
