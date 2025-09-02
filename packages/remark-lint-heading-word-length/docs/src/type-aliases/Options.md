[**remark-lint-heading-word-length**](../../README.md)

***

[remark-lint-heading-word-length](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:16](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-lint-heading-word-length/src/index.ts#L16)

Options type for the remark-lint-heading-word-length plugin.

## Properties

### maximumWords?

> `optional` **maximumWords**: `false` \| `number`

Defined in: [src/index.ts:33](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-lint-heading-word-length/src/index.ts#L33)

The maximum number of words allowed in a heading.

Set to `false` (or `Infinity`) to prevent maximum word length checks.

#### Default

```ts
10
```

***

### minimumWords?

> `optional` **minimumWords**: `false` \| `number`

Defined in: [src/index.ts:24](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-lint-heading-word-length/src/index.ts#L24)

The minimum number of words required in a heading.

Set to `false` to prevent minimum word length checks.

#### Default

```ts
1
```
