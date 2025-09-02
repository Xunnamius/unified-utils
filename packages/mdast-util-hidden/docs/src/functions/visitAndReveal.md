[**mdast-util-hidden**](../../README.md)

***

[mdast-util-hidden](../../README.md) / [src](../README.md) / visitAndReveal

# Function: visitAndReveal()

> **visitAndReveal**(`__namedParameters`): `void`

Defined in: [packages/mdast-util-hidden/src/index.ts:131](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/mdast-util-hidden/src/index.ts#L131)

Walks `tree` using unist-util-visit to search for any `Hidden` nodes. Upon
encountering a `Hidden` node, `visitor` is called if provided.

If `visitor` is provided but returns `false`, `reveal` is not called and the
hidden is not revealed. Otherwise, `reveal` will always be called.

If `visitor` is provided and returns a defined value other than `false`, that
value will be passed through to unist-util-visit. If `visitor` is not
provided, or it returns `undefined`, `[SKIP, index]` will be passed through
instead.

## Parameters

### \_\_namedParameters

#### reverse?

`boolean` = `false`

**See**

https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse

**Default**

```ts
false
```

#### tree

`Node`

**See**

https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse

#### visitor?

`Visitor`

If `visitor` is provided but returns `false`, `reveal` is not called and the
hidden is not revealed. Otherwise, `reveal` will always be called.

If `visitor` is provided and returns a defined value other than `false`, that
value will be passed through to unist-util-visit. If `visitor` is not
provided, or it returns `undefined`, `[SKIP, index]` will be passed through
instead.

## Returns

`void`
