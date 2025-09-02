[**remark-renumber-references**](../../README.md)

***

[remark-renumber-references](../../README.md) / [src](../README.md) / default

# Variable: default

> `const` **default**: `Plugin`\<\[[`Options`](../type-aliases/Options.md)\] \| `never`[], `Root`\>

Defined in: [src/index.ts:41](https://github.com/Xunnamius/unified-utils/blob/db9324f7d85f6c42c409c21112a9a13cb88ca748/packages/remark-renumber-references/src/index.ts#L41)

A remark plugin that takes a Root node as input and returns the same node
with all reference-style link nodes and their definition nodes renumbered in
ascending order starting from `[1]`.

Links are assigned a numeric reference id as they are encountered.
