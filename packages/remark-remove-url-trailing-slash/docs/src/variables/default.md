[**remark-remove-url-trailing-slash**](../../README.md)

***

[remark-remove-url-trailing-slash](../../README.md) / [src](../README.md) / default

# Variable: default

> `const` **default**: `Plugin`\<\[[`Options`](../type-aliases/Options.md)\] \| `never`[], `Root`\>

Defined in: [src/index.ts:37](https://github.com/Xunnamius/unified-utils/blob/736909e03965b3109414849e468ee9e3802d6ad2/packages/remark-remove-url-trailing-slash/src/index.ts#L37)

A remark plugin that takes a Root node as input and returns the same node
with all Link, Image, and Definition node `url` paths stripped of
trialing slashes.
