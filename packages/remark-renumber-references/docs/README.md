## Table of contents

### Type Aliases

- [Options][1]

### Functions

- [default][2]

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-renumber-references plugin.

#### Type declaration

| Name                              | Type      | Description                                                                                                                                                                                                                              |
| :-------------------------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preserveAlphanumericDefinitions` | `boolean` | If `true`, alphanumeric definition ids (i.e. any id that cannot be parsed into an integer) will be spared during the renumbering. If `false`, _all_ definition ids will be deleted and recreated starting from `[1]`. **`Default`** true |

#### Defined in

[packages/remark-renumber-references/src/index.ts:16][3]

## Functions

### default

▸ **default**(`this`, ...`settings`): `void` | `Transformer`<`Root`, `Root`>

A remark plugin that takes a Root node as input and returns the same node with
all reference-style link nodes and their definition nodes renumbered in
ascending order starting from `[1]`.

Links are assigned a numeric reference id as they are encountered.

#### Parameters

| Name          | Type                                        |
| :------------ | :------------------------------------------ |
| `this`        | `Processor`<`void`, `Root`, `void`, `void`> |
| `...settings` | \[options: Options] \| `void`\[]            |

#### Returns

`void` | `Transformer`<`Root`, `Root`>

#### Defined in

node_modules/unified/index.d.ts:531

[1]: README.md#options
[2]: README.md#default
[3]:
  https://github.com/Xunnamius/unified-utils/blob/89c7e12/packages/remark-renumber-references/src/index.ts#L16