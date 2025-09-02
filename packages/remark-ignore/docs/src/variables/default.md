[**remark-ignore**](../../README.md)

***

[remark-ignore](../../README.md) / [src](../README.md) / default

# Variable: default

> `const` **default**: `Plugin`\<`never`[], `Root`\>

Defined in: [src/index.ts:20](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-ignore/src/index.ts#L20)

A remark plugin that takes a Root node as input and returns the same node
with all child nodes following an ignore command having been hidden. After
all registered other plugins are run, this plugin visits the each hidden
child and reveals them.

In this way, nodes hidden by this plugin are unaffected by transformations
from other plugins until said nodes are revealed.
