[mdast-util-hidden](../README.md) / Hidden

# Interface: Hidden

The shape of a `Hidden` mdast node containing mdast content that is hidden
(and thus protected) from transformers.

`Hidden` nodes are always generated, cannot be serialized to markdown, and
cannot be derived from markdown directly.

## Hierarchy

- `Node`

  ↳ **`Hidden`**

## Table of contents

### Properties

- [data](Hidden.md#data)
- [hiddenChildren](Hidden.md#hiddenchildren)
- [position](Hidden.md#position)
- [type](Hidden.md#type)

## Properties

### data

• `Optional` **data**: `Data`

Info from the ecosystem.

#### Inherited from

Node.data

#### Defined in

node_modules/@types/unist/index.d.ts:95

___

### hiddenChildren

• **hiddenChildren**: `RootContent`[]

#### Defined in

[packages/mdast-util-hidden/src/index.ts:17](https://github.com/Xunnamius/unified-utils/blob/cc4d623/packages/mdast-util-hidden/src/index.ts#L17)

___

### position

• `Optional` **position**: `Position`

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

Node.position

#### Defined in

node_modules/@types/unist/index.d.ts:103

___

### type

• **type**: ``"hidden"``

#### Overrides

Node.type

#### Defined in

[packages/mdast-util-hidden/src/index.ts:16](https://github.com/Xunnamius/unified-utils/blob/cc4d623/packages/mdast-util-hidden/src/index.ts#L16)
