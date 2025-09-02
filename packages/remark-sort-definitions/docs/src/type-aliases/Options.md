[**remark-sort-definitions**](../../README.md)

***

[remark-sort-definitions](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:16](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-sort-definitions/src/index.ts#L16)

Options type for the remark-sort-definitions plugin.

## Properties

### algorithm?

> `optional` **algorithm**: `"numeric-first"` \| `"alphanumeric-first"`

Defined in: [src/index.ts:31](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-sort-definitions/src/index.ts#L31)

This option determines the sorting preference used when reordering
definitions.

`numeric-first` will put definitions with purely numeric ids first, sorted
from least (i.e. 1) to greatest, followed by any remaining definitions
sorted [naturally][5].

`alphanumeric-first` will put definitions with alphanumeric ids (i.e. any
id that cannot be parsed into an integer) first, sorted naturally, followed
by any remaining definitions sorted from least (i.e. 1) to greatest.

#### Default

```ts
"alphanumeric-first"
```
