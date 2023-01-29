# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1]; this project adheres to
[Semantic Versioning][2].

### [1.1.3][3] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][4])

### [1.1.2][5] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][6])

#### 🔥 Reverted

- _"test: replace remark-remove-comments with
  @xunnamius/remark-remove-comments"_ ([2395903][7])

### [1.1.1][8] (2022-12-22)

#### ⚙️ Build System

- **packages/remark-lint-list-item-style:** explicitly rebuild distributables
  ([fe903a6][9])

## [1.1.0][10] (2022-12-22)

#### ✨ Features

- **packages/remark-lint-list-item-style:** add ignoreFirstWords option
  ([1928d8a][11])

### [1.0.3][12] (2022-12-21)

#### 🪄 Fixes

- Ensure inline and non-inline spread code blocks are handled properly
  ([dcdf185][13]) <sup>closes [#43][14]</sup>

### [1.0.2][15] (2022-12-06)

#### 🪄 Fixes

- **packages/remark-lint-list-item-style:** delete typo from origin and url
  strings ([e2ecc6a][16])
- **packages:** use "remark-lint" as origin scope for comment-level
  disable/ignore support ([3f15c0f][17])

### [1.0.1][18] (2022-10-30)

#### 🪄 Fixes

- **packages/remark-lint-list-item-style:** support emoji and multibyte
  punctuation ([f381113][19])

## [1.0.0][20] (2022-10-29)

#### ✨ Features

- **packages/remark-lint-list-item-style:** add new package ([83d8215][21])

#### ⚙️ Build System

- Add all-contributors ([84bff68][22])
- **lint-staged:** add doctoc to pre-commit build process ([fa4f9ee][23])
- **package:** add doctoc to npm format script ([112d42c][24])
- **package:** defer to jest.config.js for coverage options ([05cd09e][25])
- **package:** fix npm test script jest invocations ([a2ccf80][26])
- **package:** update core npm format script ([c9d61ba][27])
- **package:** use actual test ignore regex pattern ([6358888][28])
- Update core build toolchain ([19243d6][29])
- Update core lint npm script; add lint:all npm script ([bd84d8f][30])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.2...remark-lint-list-item-style@1.1.3
[4]:
  https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[5]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.1...remark-lint-list-item-style@1.1.2
[6]:
  https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[7]:
  https://github.com/Xunnamius/unified-utils/commit/23959035752e76f19ec4440cd762b4594fdb93bf
[8]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.0...remark-lint-list-item-style@1.1.1
[9]:
  https://github.com/Xunnamius/unified-utils/commit/fe903a6cabdd526cd0e711ce8c9ad89e87f8ba89
[10]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.3...remark-lint-list-item-style@1.1.0
[11]:
  https://github.com/Xunnamius/unified-utils/commit/1928d8afe28ad5d0a187e6791614aa9879d9352b
[12]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.2...remark-lint-list-item-style@1.0.3
[13]:
  https://github.com/Xunnamius/unified-utils/commit/dcdf185081bc06d57c69be79f8d5c70e58b9104a
[14]: https://github.com/Xunnamius/unified-utils/issues/43
[15]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.1...remark-lint-list-item-style@1.0.2
[16]:
  https://github.com/Xunnamius/unified-utils/commit/e2ecc6ad901c37c60a4e2a433d5d5ce974622d06
[17]:
  https://github.com/Xunnamius/unified-utils/commit/3f15c0fb647157848e323f66cd56eaf74e590141
[18]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.0...remark-lint-list-item-style@1.0.1
[19]:
  https://github.com/Xunnamius/unified-utils/commit/f381113996184a45c1795b620189f6c6c2c4cd89
[20]:
  https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-lint-list-item-style@1.0.0
[21]:
  https://github.com/Xunnamius/unified-utils/commit/83d82154f670c3154db05f811d0b92b5b17acb26
[22]:
  https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[23]:
  https://github.com/Xunnamius/unified-utils/commit/fa4f9ee3f9cd922875cf077f6d8b74105f0ba55e
[24]:
  https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[25]:
  https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[26]:
  https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[27]:
  https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[28]:
  https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[29]:
  https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[30]:
  https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
