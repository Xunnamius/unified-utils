remark-lint-list-item-style

# remark-lint-list-item-style

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Variables

- [optionsCheckFirstWord](README.md#optionscheckfirstword)
- [optionsCheckListSpread](README.md#optionschecklistspread)

### Functions

- [default](README.md#default)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-lint-list-item-style plugin.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `checkFirstWord?` | typeof [`optionsCheckFirstWord`](README.md#optionscheckfirstword)[`number`] | Checks that the first word of each stringified list item paragraph begins with a non-lowercase character (`"capitalize"`) or a non-uppercase character (`"lowercase"`). List items beginning with a link, image, or inline code block are ignored. **`Default`** "capitalize" |
| `checkListSpread?` | typeof [`optionsCheckListSpread`](README.md#optionschecklistspread)[`number`] | Determines how `checkPunctuation` is applied to list items with spread children. Has no effect when `checkPunctuation` is `false`. **`Default`** "each" |
| `checkPunctuation?` | ``false`` \| (`string` \| `RegExp`)[] | Checks that the final character of each stringified list item matches at least one of the given values. To match all unicode punctuation characters, you could provide `["\p{P}"]` instead of the default, but this will match characters like `)` and `]`. Alternatively, to prevent punctuation, you could provide `["\P{P}"]`. Lines that consist solely of an image are ignored. **`Default`** ["(\\.\|\\?\|;\|,\|!)"] |
| `ignoredFirstWords?` | (`string` \| `RegExp`)[] | Words that would normally be checked with respect to the `checkFirstWord` option will be ignored if they match at least one of the given values. Use this option to prevent false positives (e.g. "iOS", "eBay"). **`Default`** [] |

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:29](https://github.com/Xunnamius/unified-utils/blob/436108b/packages/remark-lint-list-item-style/src/index.ts#L29)

## Variables

### optionsCheckFirstWord

• `Const` **optionsCheckFirstWord**: readonly [``false``, ``"capitalize"``, ``"lowercase"``]

Valid values for the Options.checkFirstWord property.

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:14](https://github.com/Xunnamius/unified-utils/blob/436108b/packages/remark-lint-list-item-style/src/index.ts#L14)

___

### optionsCheckListSpread

• `Const` **optionsCheckListSpread**: readonly [``"first"``, ``"final"``, ``"first-and-final"``, ``"each"``]

Valid values for the Options.checkListSpread property.

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:19](https://github.com/Xunnamius/unified-utils/blob/436108b/packages/remark-lint-list-item-style/src/index.ts#L19)

## Functions

### default

▸ **default**(`this`, `...settings`): `void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to list item style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Node`<`Data`\>, `void`, `void`\> |
| `...settings` | `void`[] \| [`unknown`] \| [`boolean` \| `Label` \| `Severity`, `unknown`] |

#### Returns

`void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

#### Defined in

node_modules/unified/index.d.ts:531
