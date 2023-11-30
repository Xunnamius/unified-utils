mdast-util-hidden

# mdast-util-hidden

## Table of contents

### Interfaces

- [Hidden](interfaces/Hidden.md)

### Functions

- [createHiddenNode](README.md#createhiddennode)
- [hide](README.md#hide)
- [isHidden](README.md#ishidden)
- [reveal](README.md#reveal)
- [visitAndReveal](README.md#visitandreveal)

## Functions

### createHiddenNode

▸ **createHiddenNode**(`children`): [`Hidden`](interfaces/Hidden.md)

Returns a new `Hidden` node ready to be inserted into a mdast tree.

#### Parameters

| Name | Type |
| :------ | :------ |
| `children` | `RootContent`[] |

#### Returns

[`Hidden`](interfaces/Hidden.md)

#### Defined in

[packages/mdast-util-hidden/src/index.ts:30](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/mdast-util-hidden/src/index.ts#L30)

___

### hide

▸ **hide**\<`Nodes`\>(`«destructured»`): `void`

Inserts a `Hidden` node as a child of `parent` at `index`. Any `nodes` passed
in will become the hidden children of this new node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Nodes` | extends `RootContent`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `index` | `number` | - |
| › `nodes` | `Nodes` | - |
| › `parent` | `Parent` | - |
| › `replaceChildAtIndex?` | `boolean` | If `replaceChildAtIndex` is `true`, the child node of `parent` at `index` will be replaced by the new `Hidden` node. On the other hand, if `replaceChildAtIndex` is `false`, this function will not remove any nodes from `parent`. In this case, if you do not manually remove the node at `index`, **you must skip two nodes ahead instead of just one when using a visitor or risk an infinite loop!** **`Default`** ```ts true ``` **`Example`** ```typescript visit(tree, 'heading', (node, index, parent) => { if (index !== undefined && parent !== undefined) { hide({ nodes: [node], index, parent, replaceChildAtIndex: false }); return [SKIP, index + 2]; // <- +2 here is IMPORTANT } }); ``` |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:49](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/mdast-util-hidden/src/index.ts#L49)

___

### isHidden

▸ **isHidden**(`node`): node is Hidden

Type guard that returns true if `node` is a well-formed `Hidden` node
instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is Hidden

#### Defined in

[packages/mdast-util-hidden/src/index.ts:41](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/mdast-util-hidden/src/index.ts#L41)

___

### reveal

▸ **reveal**\<`Nodes`\>(`«destructured»`): `void`

Replaces the child node of `parent` at `index` with the hidden children of
one or more `Hidden` `nodes`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Nodes` | extends [`Hidden`](interfaces/Hidden.md)[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `index` | `number` |
| › `nodes` | `Nodes` |
| › `parent` | `Parent` |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:92](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/mdast-util-hidden/src/index.ts#L92)

___

### visitAndReveal

▸ **visitAndReveal**\<`Tree`\>(`«destructured»`): `void`

Walks `tree` using unist-util-visit to search for any `Hidden` nodes. Upon
encountering a `Hidden` node, `visitor` is called if provided.

If `visitor` is provided but returns `false`, `reveal` is not called and the
hidden is not revealed. Otherwise, `reveal` will always be called.

If `visitor` is provided and returns a defined value other than `false`, that
value will be passed through to unist-util-visit. If `visitor` is not
provided, or it returns `undefined`, `[SKIP, index]` will be passed through
instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Tree` | extends `Node` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `reverse?` | `boolean` | **`See`** https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse **`Default`** ```ts false ``` |
| › `tree` | `Tree` | **`See`** https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse |
| › `visitor?` | `Visitor` | If `visitor` is provided but returns `false`, `reveal` is not called and the hidden is not revealed. Otherwise, `reveal` will always be called. If `visitor` is provided and returns a defined value other than `false`, that value will be passed through to unist-util-visit. If `visitor` is not provided, or it returns `undefined`, `[SKIP, index]` will be passed through instead. |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:125](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/mdast-util-hidden/src/index.ts#L125)
