[mdast-util-hidden][1] / Hidden

# Interface: Hidden

The shape of a `Hidden` mdast node containing mdast content that is hidden (and
thus protected) from transformers.

`Hidden` nodes are always generated, cannot be serialized to markdown, and
cannot be derived from markdown directly.

## Hierarchy

- `Node`

  ↳ **`Hidden`**

## Table of contents

### Properties

- [data][2]
- [hiddenChildren][3]
- [position][4]
- [type][5]

## Properties

### data

• `Optional` **data**: `Data`

Information from the ecosystem.

#### Inherited from

Node.data

#### Defined in

node_modules/@types/unist/index.d.ts:27

---

### hiddenChildren

• **hiddenChildren**: `Content`\[]

#### Defined in

[packages/mdast-util-hidden/src/index.ts:17][6]

---

### position

• `Optional` **position**: `Position`

Location of a node in a source document. Must not be present if a node is
generated.

#### Inherited from

Node.position

#### Defined in

node_modules/@types/unist/index.d.ts:33

---

### type

• **type**: `"hidden"`

#### Overrides

Node.type

#### Defined in

[packages/mdast-util-hidden/src/index.ts:16][7]

[1]: ../README.md
[2]: Hidden.md#data
[3]: Hidden.md#hiddenchildren
[4]: Hidden.md#position
[5]: Hidden.md#type
[6]:
  https://github.com/Xunnamius/unified-utils/blob/82f20c7/packages/mdast-util-hidden/src/index.ts#L17
[7]:
  https://github.com/Xunnamius/unified-utils/blob/82f20c7/packages/mdast-util-hidden/src/index.ts#L16
