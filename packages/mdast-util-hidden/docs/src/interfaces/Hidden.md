[**mdast-util-hidden**](../../README.md)

***

[mdast-util-hidden](../../README.md) / [src](../README.md) / Hidden

# Interface: Hidden

Defined in: [packages/mdast-util-hidden/src/index.ts:21](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/mdast-util-hidden/src/index.ts#L21)

The shape of a `Hidden` mdast node containing mdast content that is hidden
(and thus protected) from transformers.

`Hidden` nodes are always generated, cannot be serialized to markdown, and
cannot be derived from markdown directly.

## Extends

- `Node`

## Properties

### data?

> `optional` **data**: `Data`

Defined in: node\_modules/@types/unist/index.d.ts:95

Info from the ecosystem.

#### Inherited from

`Node.data`

***

### hiddenChildren

> **hiddenChildren**: `RootContent`[]

Defined in: [packages/mdast-util-hidden/src/index.ts:23](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/mdast-util-hidden/src/index.ts#L23)

***

### position?

> `optional` **position**: `Position`

Defined in: node\_modules/@types/unist/index.d.ts:103

Position of a node in a source document.

Nodes that are generated (not in the original source document) must not
have a position.

#### Inherited from

`Node.position`

***

### type

> **type**: `"hidden"`

Defined in: [packages/mdast-util-hidden/src/index.ts:22](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/mdast-util-hidden/src/index.ts#L22)

Node type.

#### Overrides

`Node.type`
