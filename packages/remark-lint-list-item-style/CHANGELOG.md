# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## remark-lint-list-item-style[@3.0.0][3] (2025-09-02)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- Add missing dependencies ([1b77082][4])
- **deps:** bump unified-lint-rule from 2.1.2 to 3.0.1 ([9226af5][5])
- **remarkrc:** ensure vendored versions of unified-utils remark plugins are used by symbiote ([82e7a1d][6])

<br />

## remark-lint-list-item-style[@2.0.0][7] (2023-11-30)

### 💥 BREAKING CHANGES 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the \_latest\_ remark/unified packages

### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1 ([150abb4][8])
- Update all plugins to work with unified@>=11 ([fe98b3c][9])

### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][10])

<br />

## remark-lint-list-item-style[@1.1.0][11] (2022-12-22)

### ✨ Features

- **packages/remark-lint-list-item-style:** add ignoreFirstWords option ([1928d8a][12])

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.1.3][13] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][14])

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.1.2][15] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][16])

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.1.1][17] (2022-12-22)

#### ⚙️ Build System

- **packages/remark-lint-list-item-style:** explicitly rebuild distributables ([fe903a6][18])

<br />

## remark-lint-list-item-style[@1.0.0][19] (2022-10-29)

### ✨ Features

- **packages/remark-lint-list-item-style:** add new package ([83d8215][20])

### ⚙️ Build System

- Add all-contributors ([84bff68][21])
- **package:** add doctoc to npm format script ([112d42c][22])
- **package:** defer to jest.config.js for coverage options ([05cd09e][23])
- **package:** fix npm test script jest invocations ([a2ccf80][24])
- **package:** update core npm format script ([c9d61ba][25])
- **package:** use actual test ignore regex pattern ([6358888][26])
- Update core build toolchain ([19243d6][27])
- Update core lint npm script; add lint:all npm script ([bd84d8f][28])

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.0.3][29] (2022-12-21)

#### 🪄 Fixes

- Ensure inline and non-inline spread code blocks are handled properly ([dcdf185][30]) <sup>see [#43][31]</sup>

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.0.2][32] (2022-12-06)

#### 🪄 Fixes

- **packages/remark-lint-list-item-style:** delete typo from origin and url strings ([e2ecc6a][33])
- **packages:** use "remark-lint" as origin scope for comment-level disable/ignore support ([3f15c0f][34])

<br />

### 🏗️ Patch remark-lint-list-item-style[@1.0.1][35] (2022-10-30)

#### 🪄 Fixes

- **packages/remark-lint-list-item-style:** support emoji and multibyte punctuation ([f381113][36])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@2.0.0...remark-lint-list-item-style@3.0.0
[4]: https://github.com/Xunnamius/unified-utils/commit/1b770821fdbbb69487613bf2894f4d926bbfa4ea
[5]: https://github.com/Xunnamius/unified-utils/commit/9226af564dd9642be4f9692ba9c5ad60ce6a1e5f
[6]: https://github.com/Xunnamius/unified-utils/commit/82e7a1d1fac269612b64776bc548f1dafabf37ba
[7]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.3...remark-lint-list-item-style@2.0.0
[8]: https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[9]: https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[10]: https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[11]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.3...remark-lint-list-item-style@1.1.0
[12]: https://github.com/Xunnamius/unified-utils/commit/1928d8afe28ad5d0a187e6791614aa9879d9352b
[13]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.2...remark-lint-list-item-style@1.1.3
[14]: https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[15]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.1...remark-lint-list-item-style@1.1.2
[16]: https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[17]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.1.0...remark-lint-list-item-style@1.1.1
[18]: https://github.com/Xunnamius/unified-utils/commit/fe903a6cabdd526cd0e711ce8c9ad89e87f8ba89
[19]: https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-lint-list-item-style@1.0.0
[20]: https://github.com/Xunnamius/unified-utils/commit/83d82154f670c3154db05f811d0b92b5b17acb26
[21]: https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[22]: https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[23]: https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[24]: https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[25]: https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[26]: https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[27]: https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[28]: https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
[29]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.2...remark-lint-list-item-style@1.0.3
[30]: https://github.com/Xunnamius/unified-utils/commit/dcdf185081bc06d57c69be79f8d5c70e58b9104a
[31]: https://github.com/Xunnamius/unified-utils/issues/43
[32]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.1...remark-lint-list-item-style@1.0.2
[33]: https://github.com/Xunnamius/unified-utils/commit/e2ecc6ad901c37c60a4e2a433d5d5ce974622d06
[34]: https://github.com/Xunnamius/unified-utils/commit/3f15c0fb647157848e323f66cd56eaf74e590141
[35]: https://github.com/Xunnamius/unified-utils/compare/remark-lint-list-item-style@1.0.0...remark-lint-list-item-style@1.0.1
[36]: https://github.com/Xunnamius/unified-utils/commit/f381113996184a45c1795b620189f6c6c2c4cd89
