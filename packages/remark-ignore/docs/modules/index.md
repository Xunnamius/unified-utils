[remark-ignore][1] / index

# Module: index

## Table of contents

### References

- [ignoreEnd][2]
- [ignoreStart][3]

### Functions

- [default][4]

## References

### ignoreEnd

Renames and re-exports [default][5]

---

### ignoreStart

Renames and re-exports [default][6]

## Functions

### default

▸ **default**(`this`, ...`settings`): `void` | `Transformer`<`Root`, `Root`>

A remark plugin that takes a Root node as input and returns the same node with
all child nodes following an ignore command having been hidden. After all
registered other plugins are run, this plugin visits the each hidden child and
reveals them.

In this way, nodes hidden by this plugin are unaffected by transformations from
other plugins until said nodes are revealed.

#### Parameters

| Name          | Type                                        |
| :------------ | :------------------------------------------ |
| `this`        | `Processor`<`void`, `Root`, `void`, `void`> |
| `...settings` | `void`\[]                                   |

#### Returns

`void` | `Transformer`<`Root`, `Root`>

#### Defined in

node_modules/unified/index.d.ts:531

[1]: ../README.md
[2]: index.md#ignoreend
[3]: index.md#ignorestart
[4]: index.md#default
[5]: end.md#default
[6]: start.md#default
