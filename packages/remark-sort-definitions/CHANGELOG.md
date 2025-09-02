# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## remark-sort-definitions[@3.0.0][3] (2025-09-02)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- Add missing dependencies ([1b77082][4])
- **deps:** bump @types/mdast from 4.0.3 to 4.0.4 ([0428595][5])
- **deps:** bump unified from 11.0.4 to 11.0.5 ([d7d7d28][6])
- **remarkrc:** ensure vendored versions of unified-utils remark plugins are used by symbiote ([82e7a1d][7])

<br />

## remark-sort-definitions[@2.0.0][8] (2023-11-30)

### 💥 BREAKING CHANGES 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the \_latest\_ remark/unified packages

### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1 ([150abb4][9])
- Update all plugins to work with unified@>=11 ([fe98b3c][10])

### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][11])

<br />

## remark-sort-definitions[@1.0.0][12] (2022-10-22)

### ✨ Features

- **packages/remark-sort-definitions:** add remark-sort-definitions package ([22f0818][13])

### ⚙️ Build System

- **package:** add doctoc to npm format script ([112d42c][14])
- **package:** defer to jest.config.js for coverage options ([05cd09e][15])
- **package:** fix npm test script jest invocations ([a2ccf80][16])
- **package:** use actual test ignore regex pattern ([6358888][17])
- Update core build toolchain ([19243d6][18])
- Update core lint npm script; add lint:all npm script ([bd84d8f][19])

<br />

### 🏗️ Patch remark-sort-definitions[@1.0.5][20] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][21])

<br />

### 🏗️ Patch remark-sort-definitions[@1.0.4][22] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][23])

<br />

### 🏗️ Patch remark-sort-definitions[@1.0.3][24] (2022-10-30)

#### 🪄 Fixes

- **packages/remark-sort-definitions:** fix README.md examples ([d279dee][25])

<br />

### 🏗️ Patch remark-sort-definitions[@1.0.2][26] (2022-10-28)

#### 🪄 Fixes

- **packages:** ensure Options properties are optional ([48478e8][27])

#### ⚙️ Build System

- **package:** update core npm format script ([c9d61ba][28])

<br />

### 🏗️ Patch remark-sort-definitions[@1.0.1][29] (2022-10-22)

#### 🪄 Fixes

- **packages:** fix broken tables of contents in various readme files ([f666393][30])

#### ⚙️ Build System

- Add all-contributors ([84bff68][31])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@2.0.0...remark-sort-definitions@3.0.0
[4]: https://github.com/Xunnamius/unified-utils/commit/1b770821fdbbb69487613bf2894f4d926bbfa4ea
[5]: https://github.com/Xunnamius/unified-utils/commit/04285956b8f1ca5ff40f8749cfcd7ec306a34715
[6]: https://github.com/Xunnamius/unified-utils/commit/d7d7d28ce0f8413199bbacae92e8cca2eb1d65f2
[7]: https://github.com/Xunnamius/unified-utils/commit/82e7a1d1fac269612b64776bc548f1dafabf37ba
[8]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.5...remark-sort-definitions@2.0.0
[9]: https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[10]: https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[11]: https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[12]: https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-sort-definitions@1.0.0
[13]: https://github.com/Xunnamius/unified-utils/commit/22f08182701455c6ed489a180335150a895071d7
[14]: https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[15]: https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[16]: https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[17]: https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[18]: https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[19]: https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
[20]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.4...remark-sort-definitions@1.0.5
[21]: https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[22]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.3...remark-sort-definitions@1.0.4
[23]: https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[24]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.2...remark-sort-definitions@1.0.3
[25]: https://github.com/Xunnamius/unified-utils/commit/d279dee5d5bda2e96cbe40d1974c91c997586196
[26]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.1...remark-sort-definitions@1.0.2
[27]: https://github.com/Xunnamius/unified-utils/commit/48478e8ea592171aadc86fe719310b50a2e6007e
[28]: https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[29]: https://github.com/Xunnamius/unified-utils/compare/remark-sort-definitions@1.0.0...remark-sort-definitions@1.0.1
[30]: https://github.com/Xunnamius/unified-utils/commit/f6663933fe4a7d577956527efe752e18607262ba
[31]: https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
