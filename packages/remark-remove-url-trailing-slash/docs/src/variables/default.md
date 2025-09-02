[**remark-remove-url-trailing-slash**](../../README.md)

***

[remark-remove-url-trailing-slash](../../README.md) / [src](../README.md) / default

# Variable: default

> `const` **default**: `Plugin`\<\[[`Options`](../type-aliases/Options.md)\] \| `never`[], `Root`\>

Defined in: [src/index.ts:37](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-remove-url-trailing-slash/src/index.ts#L37)

A remark plugin that takes a Root node as input and returns the same node
with all Link, Image, and Definition node `url` paths stripped of
trialing slashes.
