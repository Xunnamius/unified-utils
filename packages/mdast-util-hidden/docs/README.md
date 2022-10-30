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
| `children` | `Content`[] |

#### Returns

[`Hidden`](interfaces/Hidden.md)

#### Defined in

[packages/mdast-util-hidden/src/index.ts:23](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/mdast-util-hidden/src/index.ts#L23)

___

### hide

▸ **hide**<`Nodes`\>(`«destructured»`): `void`

Inserts a `Hidden` node as a child of `parent` at `index`. Any `nodes` passed
in will become the hidden children of this new node.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Nodes` | extends `Content`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `index` | `number` | - |
| › `nodes` | `Nodes` | - |
| › `parent` | `Parent`<`Node`<`Data`\>, `Data`\> | - |
| › `replaceChildAtIndex?` | `boolean` | If `replaceChildAtIndex` is `true`, the child node of `parent` at `index` will be replaced by the new `Hidden` node.  On the other hand, if `replaceChildAtIndex` is `false`, this function will not remove any nodes from `parent`. In this case, if you do not manually remove the node at `index`, **you must skip two nodes ahead instead of just one when using a visitor or risk an infinite loop!**  **`Default`**  true  **`Example`**  ```typescript visit(tree, 'heading', (node, index, parent) => {   if (index !== null && parent !== null) {     hide({       nodes: [node],       index,       parent,       replaceChildAtIndex: false     });     return [SKIP, index + 2]; // <- +2 here is IMPORTANT   } }); ``` |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:42](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/mdast-util-hidden/src/index.ts#L42)

___

### isHidden

▸ **isHidden**(`node`): node is Hidden

Type guard that returns true if `node` is a well-formed `Hidden` node
instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node`<`Data`\> |

#### Returns

node is Hidden

#### Defined in

[packages/mdast-util-hidden/src/index.ts:34](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/mdast-util-hidden/src/index.ts#L34)

___

### reveal

▸ **reveal**<`Nodes`\>(`«destructured»`): `void`

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
| › `parent` | `Parent`<`Node`<`Data`\>, `Data`\> |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:85](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/mdast-util-hidden/src/index.ts#L85)

___

### visitAndReveal

▸ **visitAndReveal**<`Tree`\>(`«destructured»`): `void`

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
| `Tree` | extends `Node`<`Data`, `Tree`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `reverse?` | `boolean` | **`See`**  https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse  **`Default`**  false |
| › `tree` | `Tree` | **`See`**  https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse |
| › `visitor?` | `Visitor` | If `visitor` is provided but returns `false`, `reveal` is not called and the hidden is not revealed. Otherwise, `reveal` will always be called.  If `visitor` is provided and returns a defined value other than `false`, that value will be passed through to unist-util-visit. If `visitor` is not provided, or it returns `undefined`, `[SKIP, index]` will be passed through instead. |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:113](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/mdast-util-hidden/src/index.ts#L113)
