[**remark-renumber-references**](../../README.md)

***

[remark-renumber-references](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:23](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-renumber-references/src/index.ts#L23)

Options type for the remark-renumber-references plugin.

## Properties

### preserveAlphanumericDefinitions?

> `optional` **preserveAlphanumericDefinitions**: `boolean`

Defined in: [src/index.ts:31](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-renumber-references/src/index.ts#L31)

If `true`, alphanumeric definition ids (i.e. any id that cannot be parsed
into an integer) will be spared during the renumbering. If `false`, _all_
definition ids will be deleted and recreated starting from `[1]`.

#### Default

```ts
true
```
