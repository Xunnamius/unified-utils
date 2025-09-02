[**remark-ignore**](../../README.md)

***

[remark-ignore](../../README.md) / [src](../README.md) / ignoreStart

# Variable: ignoreStart

> `const` **ignoreStart**: `Plugin`\<`never`[], `Root`\>

Defined in: [src/start.ts:17](https://github.com/Xunnamius/unified-utils/blob/a4f71008c0749e4915e4bdc7b10c0735df17a6c6/packages/remark-ignore/src/start.ts#L17)

A remark plugin that takes a Root node as input and returns the same node
with all child nodes following an ignore command having been hidden.

In this way, nodes hidden by this plugin are unaffected by transformations
from other plugins until said nodes are revealed.
