[**remark-lint-list-item-style**](../../README.md)

***

[remark-lint-list-item-style](../../README.md) / [src](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [src/index.ts:32](https://github.com/Xunnamius/unified-utils/blob/b2723966a6905f77dbf9ba637a766f1216f9f0bc/packages/remark-lint-list-item-style/src/index.ts#L32)

Options type for the remark-lint-list-item-style plugin.

## Properties

### checkFirstWord?

> `optional` **checkFirstWord**: *typeof* [`optionsCheckFirstWord`](../variables/optionsCheckFirstWord.md)\[`number`\]

Defined in: [src/index.ts:56](https://github.com/Xunnamius/unified-utils/blob/b2723966a6905f77dbf9ba637a766f1216f9f0bc/packages/remark-lint-list-item-style/src/index.ts#L56)

Checks that the first word of each stringified list item paragraph begins
with a non-lowercase character (`"capitalize"`) or a non-uppercase
character (`"lowercase"`).

List items beginning with a link, image, or inline code block are ignored.

#### Default

```ts
"capitalize"
```

***

### checkListSpread?

> `optional` **checkListSpread**: *typeof* [`optionsCheckListSpread`](../variables/optionsCheckListSpread.md)\[`number`\]

Defined in: [src/index.ts:72](https://github.com/Xunnamius/unified-utils/blob/b2723966a6905f77dbf9ba637a766f1216f9f0bc/packages/remark-lint-list-item-style/src/index.ts#L72)

Determines how `checkPunctuation` is applied to list items with spread
children. Has no effect when `checkPunctuation` is `false`.

#### Default

```ts
"each"
```

***

### checkPunctuation?

> `optional` **checkPunctuation**: `false` \| (`string` \| `RegExp`)[]

Defined in: [src/index.ts:46](https://github.com/Xunnamius/unified-utils/blob/b2723966a6905f77dbf9ba637a766f1216f9f0bc/packages/remark-lint-list-item-style/src/index.ts#L46)

Checks that the final character of each stringified list item matches at
least one of the given values.

To match all unicode punctuation characters, you could provide `["\p{P}"]`
instead of the default, but this will match characters like `)` and `]`.

Alternatively, to prevent punctuation, you could provide `["\P{P}"]`.

Lines that consist solely of an image are ignored.

#### Default

```ts
["(\\.|\\?|;|,|!)"]
```

***

### ignoredFirstWords?

> `optional` **ignoredFirstWords**: (`string` \| `RegExp`)[]

Defined in: [src/index.ts:65](https://github.com/Xunnamius/unified-utils/blob/b2723966a6905f77dbf9ba637a766f1216f9f0bc/packages/remark-lint-list-item-style/src/index.ts#L65)

Words that would normally be checked with respect to the `checkFirstWord`
option will be ignored if they match at least one of the given values.

Use this option to prevent false positives (e.g. "iOS", "eBay").

#### Default

```ts
[]
```
