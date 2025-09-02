[**remark-renumber-references**](../../README.md)

***

[remark-renumber-references](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:23](https://github.com/Xunnamius/unified-utils/blob/db9324f7d85f6c42c409c21112a9a13cb88ca748/packages/remark-renumber-references/src/index.ts#L23)

Options type for the remark-renumber-references plugin.

## Properties

### preserveAlphanumericDefinitions?

> `optional` **preserveAlphanumericDefinitions**: `boolean`

Defined in: [src/index.ts:31](https://github.com/Xunnamius/unified-utils/blob/db9324f7d85f6c42c409c21112a9a13cb88ca748/packages/remark-renumber-references/src/index.ts#L31)

If `true`, alphanumeric definition ids (i.e. any id that cannot be parsed
into an integer) will be spared during the renumbering. If `false`, _all_
definition ids will be deleted and recreated starting from `[1]`.

#### Default

```ts
true
```
