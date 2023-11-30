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
| `case?` | typeof [`optionsCases`](README.md#optionscases)[`number`] | All code fence flags must be of the specified case. Code fences without flags are ignored. **`Default`** ```ts "lower" ``` |

#### Defined in

[packages/remark-lint-fenced-code-flag-case/src/index.ts:18](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/remark-lint-fenced-code-flag-case/src/index.ts#L18)

## Variables

### optionsCases

• `Const` **optionsCases**: readonly [``"lower"``, ``"upper"``, ``"capitalize"``]

Valid values for the Options.case property.

#### Defined in

[packages/remark-lint-fenced-code-flag-case/src/index.ts:13](https://github.com/Xunnamius/unified-utils/blob/8264348/packages/remark-lint-fenced-code-flag-case/src/index.ts#L13)

## Functions

### default

▸ **default**(`this`, `...parameters`): `undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

A remark-lint rule that takes a Root node as input and attaches any error
messages to the resulting virtual file pertaining to fenced code flag case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Processor`\<`undefined`, `undefined`, `undefined`, `undefined`, `undefined`\> |
| `...parameters` | [[`Options`](README.md#options)] \| [] |

#### Returns

`undefined` \| `void` \| `Transformer`\<`Node`, `Node`\>

#### Defined in

node_modules/unified/lib/index.d.ts:946
