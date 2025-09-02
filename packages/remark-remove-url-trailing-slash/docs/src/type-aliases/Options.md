[**remark-remove-url-trailing-slash**](../../README.md)

***

[remark-remove-url-trailing-slash](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:18](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-remove-url-trailing-slash/src/index.ts#L18)

Options type for the remark-remove-url-trailing-slash plugin.

## Properties

### onlyConsiderHostUrls?

> `optional` **onlyConsiderHostUrls**: `boolean`

Defined in: [src/index.ts:29](https://github.com/Xunnamius/unified-utils/blob/cb7fc64dac3d9c7f331f6a8a6d41a910a5dc8019/packages/remark-remove-url-trailing-slash/src/index.ts#L29)

If this option is `false`, trailing slashes will be removed from all URL
paths, including single-character `/` paths (i.e. "empty" paths).

If this option is `true`, trailing slashes will only be removed from
non-relative URLs with empty paths, e.g. `https://example.com/ =>
https://example.com`.

#### Default

```ts
false
```
