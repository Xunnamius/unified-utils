[**mdast-util-hidden**](../../README.md)

***

[mdast-util-hidden](../../README.md) / [src](../README.md) / hide

# Function: hide()

> **hide**(`__namedParameters`): `void`

Defined in: [packages/mdast-util-hidden/src/index.ts:55](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/mdast-util-hidden/src/index.ts#L55)

Inserts a `Hidden` node as a child of `parent` at `index`. Any `nodes` passed
in will become the hidden children of this new node.

## Parameters

### \_\_namedParameters

#### index

`number`

#### nodes

`RootContent`[]

#### parent

`Parent`

#### replaceChildAtIndex?

`boolean` = `true`

If `replaceChildAtIndex` is `true`, the child node of `parent` at `index`
will be replaced by the new `Hidden` node.

On the other hand, if `replaceChildAtIndex` is `false`, this function will
not remove any nodes from `parent`. In this case, if you do not manually
remove the node at `index`, **you must skip two nodes ahead instead of just
one when using a visitor or risk an infinite loop!**

**Default**

```ts
true
```

**Example**

```typescript
visit(tree, 'heading', (node, index, parent) => {
  if (index !== undefined && parent !== undefined) {
    hide({
      nodes: [node],
      index,
      parent,
      replaceChildAtIndex: false
    });
    return [SKIP, index + 2]; // <- +2 here is IMPORTANT
  }
});
```

## Returns

`void`
