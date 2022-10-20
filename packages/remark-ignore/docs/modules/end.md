[remark-ignore][1] / end

# Module: end

## Table of contents

### Functions

- [default][2]
- [ignoreEndTransformer][3]

## Functions

### default

▸ **default**(`this`, ...`settings`): `void` | `Transformer`<`Root`, `Root`>

A remark plugin that takes a Root node as input and returns the same node with
all hidden child nodes revealed.

#### Parameters

| Name          | Type                                        |
| :------------ | :------------------------------------------ |
| `this`        | `Processor`<`void`, `Root`, `void`, `void`> |
| `...settings` | `void`\[]                                   |

#### Returns

`void` | `Transformer`<`Root`, `Root`>

#### Defined in

node_modules/unified/index.d.ts:531

---

### ignoreEndTransformer

▸ **ignoreEndTransformer**(`tree`): `void`

A unified transformer that takes a Root node as input and returns the same node
with all hidden child nodes revealed.

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `tree` | `Root` |

#### Returns

`void`

#### Defined in

packages/remark-ignore/src/end.ts:18

[1]: ../README.md
[2]: end.md#default
[3]: end.md#ignoreendtransformer
