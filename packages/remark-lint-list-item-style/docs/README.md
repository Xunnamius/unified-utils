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
| `checkFirstWord?` | typeof [`optionsCheckFirstWord`](README.md#optionscheckfirstword)[`number`] | Checks that the first word of each stringified list item paragraph begins with a non-lowercase character (`"capitalize"`) or a non-uppercase character (`"lowercase"`). List items beginning with a link, image, or inline code block are ignored. **`Default`** ```ts "capitalize" ``` |
| `checkListSpread?` | typeof [`optionsCheckListSpread`](README.md#optionschecklistspread)[`number`] | Determines how `checkPunctuation` is applied to list items with spread children. Has no effect when `checkPunctuation` is `false`. **`Default`** ```ts "each" ``` |
| `checkPunctuation?` | ``false`` \| (`string` \| `RegExp`)[] | Checks that the final character of each stringified list item matches at least one of the given values. To match all unicode punctuation characters, you could provide `["\p{P}"]` instead of the default, but this will match characters like `)` and `]`. Alternatively, to prevent punctuation, you could provide `["\P{P}"]`. Lines that consist solely of an image are ignored. **`Default`** ```ts ["(\\.\|\\?\|;\|,\|!)"] ``` |
| `ignoredFirstWords?` | (`string` \| `RegExp`)[] | Words that would normally be checked with respect to the `checkFirstWord` option will be ignored if they match at least one of the given values. Use this option to prevent false positives (e.g. "iOS", "eBay"). **`Default`** ```ts [] ``` |

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:30](https://github.com/Xunnamius/unified-utils/blob/7833113/packages/remark-lint-list-item-style/src/index.ts#L30)

## Variables

### optionsCheckFirstWord

• `Const` **optionsCheckFirstWord**: readonly [``false``, ``"capitalize"``, ``"lowercase"``]

Valid values for the Options.checkFirstWord property.

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:15](https://github.com/Xunnamius/unified-utils/blob/7833113/packages/remark-lint-list-item-style/src/index.ts#L15)

___

### optionsCheckListSpread

• `Const` **optionsCheckListSpread**: readonly [``"first"``, ``"final"``, ``"first-and-final"``, ``"each"``]

Valid values for the Options.checkListSpread property.

#### Defined in

[packages/remark-lint-list-item-style/src/index.ts:20](https://github.com/Xunnamius/unified-utils/blob/7833113/packages/remark-lint-list-item-style/src/index.ts#L20)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to list item style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | [[`Options`](README.md#options)] \| [] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946
