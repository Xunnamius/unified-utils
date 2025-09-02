[**remark-renumber-references**](../../README.md)

***

[remark-renumber-references](../../README.md) / [src](../README.md) / default

# Variable: default

> `const` **default**: `Plugin`\<\[[`Options`](../type-aliases/Options.md)\] \| `never`[], `Root`\>

Defined in: [src/index.ts:41](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-renumber-references/src/index.ts#L41)

A remark plugin that takes a Root node as input and returns the same node
with all reference-style link nodes and their definition nodes renumbered in
ascending order starting from `[1]`.

Links are assigned a numeric reference id as they are encountered.
