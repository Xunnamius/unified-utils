remark-lint-fenced-code-flag-case

# remark-lint-fenced-code-flag-case

## Table of contents

### Type Aliases

- [Options](README.md#options)

### Variables

- [optionsCases](README.md#optionscases)

### Functions

- [default](README.md#default)

## Type Aliases

### Options

Ƭ **Options**: `Object`

Options type for the remark-lint-fenced-code-flag-case plugin.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `case?` | typeof [`optionsCases`](README.md#optionscases)[`number`] | All code fence flags must be of the specified case. Code fences without flags are ignored.  **`Default`**  "lower" |

#### Defined in

[packages/remark-lint-fenced-code-flag-case/src/index.ts:17](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/remark-lint-fenced-code-flag-case/src/index.ts#L17)

## Variables

### optionsCases

• `Const` **optionsCases**: readonly [``"lower"``, ``"upper"``, ``"capitalize"``]

Valid values for the Options.case property.

#### Defined in

[packages/remark-lint-fenced-code-flag-case/src/index.ts:12](https://github.com/Xunnamius/unified-utils/blob/3d8a3a5/packages/remark-lint-fenced-code-flag-case/src/index.ts#L12)

## Functions

### default

▸ **default**(`this`, `...settings`): `void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to fenced code flag case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`<`void`, `Node`<`Data`\>, `void`, `void`\> |
| `...settings` | `void`[] \| [`unknown`] \| [`boolean` \| `Label` \| `Severity`, `unknown`] |

#### Returns

`void` \| `Transformer`<`Node`<`Data`\>, `Node`<`Data`\>\>

#### Defined in

node_modules/unified/index.d.ts:531
