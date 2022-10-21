## Table of contents

### Interfaces

- [Hidden][1]

### Functions

- [createHiddenNode][2]
- [hide][3]
- [isHidden][4]
- [reveal][5]
- [visitAndReveal][6]

## Functions

### createHiddenNode

▸ **createHiddenNode**(`children`): [`Hidden`][1]

Returns a new `Hidden` node ready to be inserted into a mdast tree.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `children` | `Content`\[] |

#### Returns

[`Hidden`][1]

#### Defined in

[packages/mdast-util-hidden/src/index.ts:22][7]

---

### hide

▸ **hide**<`Nodes`>(`(destructured)`): `void`

Inserts a `Hidden` node as a child of `parent` at `index`. Any `nodes` passed in
will become the hidden children of this new node.

#### Type parameters

| Name    | Type                 |
| :------ | :------------------- |
| `Nodes` | extends `Content`\[] |

#### Parameters

| Name                         | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :--------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `(destructured)`             | `Object`                         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `({ index })`                | `number`                         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `({ nodes })`                | `Nodes`                          | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `({ parent })`               | `Parent`<`Node`<`Data`>, `Data`> | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `({ replaceChildAtIndex? })` | `boolean`                        | If `replaceChildAtIndex` is `true`, the child node of `parent` at `index` will be replaced by the new `Hidden` node. On the other hand, if `replaceChildAtIndex` is `false`, this function will not remove any nodes from `parent`. In this case, if you do not manually remove the node at `index`, **you must skip two nodes ahead instead of just one when using a visitor or risk an infinite loop!** **`Default`** true **`Example`** `typescript visit(tree, 'heading', (node, index, parent) => { if (index !== null && parent !== null) { hide({ nodes: [node], index, parent, replaceChildAtIndex: false }); return [SKIP, index + 2]; // <- +2 here is IMPORTANT } }); ` |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:41][8]

---

### isHidden

▸ **isHidden**(`node`): node is Hidden

Type guard that returns true if `node` is a well-formed `Hidden` node instance.

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `node` | `Node`<`Data`> |

#### Returns

node is Hidden

#### Defined in

[packages/mdast-util-hidden/src/index.ts:33][9]

---

### reveal

▸ **reveal**<`Nodes`>(`(destructured)`): `void`

Replaces the child node of `parent` at `index` with the hidden children of one
or more `Hidden` `nodes`.

#### Type parameters

| Name    | Type                     |
| :------ | :----------------------- |
| `Nodes` | extends [`Hidden`][1]\[] |

#### Parameters

| Name             | Type                             |
| :--------------- | :------------------------------- |
| `(destructured)` | `Object`                         |
| `({ index })`    | `number`                         |
| `({ nodes })`    | `Nodes`                          |
| `({ parent })`   | `Parent`<`Node`<`Data`>, `Data`> |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:84][10]

---

### visitAndReveal

▸ **visitAndReveal**<`Tree`>(`(destructured)`): `void`

Walks the `tree` using unist-util-visit to search for any `Hidden` nodes. Upon
encountering a `Hidden` node, `reveal` is called, then `visitor` is called if
provided, and finally `[SKIP, index]` is returned _unless `visitor` returns a
defined value_.

#### Type parameters

| Name   | Type                           |
| :----- | :----------------------------- |
| `Tree` | extends `Node`<`Data`, `Tree`> |

#### Parameters

| Name             | Type      | Description         |
| :--------------- | :-------- | :------------------ |
| `(destructured)` | `Object`  | -                   |
| `({ reverse? })` | `boolean` | **`Default`** false |
| `({ tree })`     | `Tree`    | -                   |
| `({ visitor? })` | `Visitor` | -                   |

#### Returns

`void`

#### Defined in

[packages/mdast-util-hidden/src/index.ts:106][11]

[1]: interfaces/Hidden.md
[2]: README.md#createhiddennode
[3]: README.md#hide
[4]: README.md#ishidden
[5]: README.md#reveal
[6]: README.md#visitandreveal
[7]:
  https://github.com/Xunnamius/unified-utils/blob/10df83f/packages/mdast-util-hidden/src/index.ts#L22
[8]:
  https://github.com/Xunnamius/unified-utils/blob/10df83f/packages/mdast-util-hidden/src/index.ts#L41
[9]:
  https://github.com/Xunnamius/unified-utils/blob/10df83f/packages/mdast-util-hidden/src/index.ts#L33
[10]:
  https://github.com/Xunnamius/unified-utils/blob/10df83f/packages/mdast-util-hidden/src/index.ts#L84
[11]:
  https://github.com/Xunnamius/unified-utils/blob/10df83f/packages/mdast-util-hidden/src/index.ts#L106
