# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## remark-tight-comments[@3.0.0][3] (2025-09-02)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- Add missing dependencies ([1b77082][4])
- **deps:** bump @types/mdast from 4.0.3 to 4.0.4 ([d8ea14f][5])
- **deps:** bump internal monorepo interdependencies to latest versions ([015a109][6])
- **deps:** bump mdast-util-tight-comments from 1.0.6 to 2.0.0 ([e8926ad][7])
- **deps:** bump unified from 11.0.4 to 11.0.5 ([46e0e6c][8])
- **remarkrc:** ensure vendored versions of unified-utils remark plugins are used by symbiote ([82e7a1d][9])

<br />

## remark-tight-comments[@2.0.0][10] (2023-11-30)

### 💥 BREAKING CHANGES 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the \_latest\_ remark/unified packages

### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1 ([150abb4][11])
- Update all plugins to work with unified@>=11 ([fe98b3c][12])

### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][13])

<br />

## remark-tight-comments[@1.0.0][14] (2022-10-21)

### ⚙️ Build System

- **package:** add doctoc to npm format script ([112d42c][15])
- **package:** defer to jest.config.js for coverage options ([05cd09e][16])
- **package:** use actual test ignore regex pattern ([6358888][17])
- Update core build toolchain ([19243d6][18])
- Update core lint npm script; add lint:all npm script ([bd84d8f][19])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.6][20] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][21])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.5][22] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][23])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.4][24] (2022-12-23)

#### ⚙️ Build System

- **packages/remark-tight-comments:** bump mdast-util-tight-comments to 1.0.4 ([d7bc49a][25])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.3][26] (2022-10-28)

#### ⚙️ Build System

- **packages/remark-tight-comments:** update dependency mdast-util-tight-comments to 1.0.3 ([fcf9402][27])
- **package:** update core npm format script ([c9d61ba][28])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.2][29] (2022-10-22)

#### 🪄 Fixes

- **packages:** fix broken tables of contents in various readme files ([f666393][30])

#### ⚙️ Build System

- Add all-contributors ([84bff68][31])
- **packages/remark-tight-comments:** update dependency mdast-util-tight-comments to 1.0.2 ([0cab1e6][32])

<br />

### 🏗️ Patch remark-tight-comments[@1.0.1][33] (2022-10-22)

#### 🪄 Fixes

- **packages/remark-tight-comments:** ensure structure is consistent across remark packages ([9b0af07][34])
- **packages/remark-tight-comments:** remove erroneous typesVersions exports ([6a1dc4a][35])

#### ⚙️ Build System

- **package:** fix npm test script jest invocations ([a2ccf80][36])
- **packages/remark-tight-comments:** update dependency mdast-util-tight-comments to 1.0.1 ([0da0d8d][37])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@2.0.0...remark-tight-comments@3.0.0
[4]: https://github.com/Xunnamius/unified-utils/commit/1b770821fdbbb69487613bf2894f4d926bbfa4ea
[5]: https://github.com/Xunnamius/unified-utils/commit/d8ea14f030fbb6d87fa751b806300f77b6912b39
[6]: https://github.com/Xunnamius/unified-utils/commit/015a1099b31946bcd171e27124323f129a84c4cd
[7]: https://github.com/Xunnamius/unified-utils/commit/e8926ad5d308f63ed05fa6935a3732f5fa4e9f43
[8]: https://github.com/Xunnamius/unified-utils/commit/46e0e6c455cbeed61afd0d0b9664aafe147e6fcc
[9]: https://github.com/Xunnamius/unified-utils/commit/82e7a1d1fac269612b64776bc548f1dafabf37ba
[10]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.6...remark-tight-comments@2.0.0
[11]: https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[12]: https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[13]: https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[14]: https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-tight-comments@1.0.0
[15]: https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[16]: https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[17]: https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[18]: https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[19]: https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
[20]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.5...remark-tight-comments@1.0.6
[21]: https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[22]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.4...remark-tight-comments@1.0.5
[23]: https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[24]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.3...remark-tight-comments@1.0.4
[25]: https://github.com/Xunnamius/unified-utils/commit/d7bc49a9cbc5837dd37585c3f19371ae871550d4
[26]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.2...remark-tight-comments@1.0.3
[27]: https://github.com/Xunnamius/unified-utils/commit/fcf94024c5be59f2e6f3e09bdd1b4d70b9a5d93b
[28]: https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[29]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.1...remark-tight-comments@1.0.2
[30]: https://github.com/Xunnamius/unified-utils/commit/f6663933fe4a7d577956527efe752e18607262ba
[31]: https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[32]: https://github.com/Xunnamius/unified-utils/commit/0cab1e6e89c2f6c51fb72b42f79d59d2b7f94e61
[33]: https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.0...remark-tight-comments@1.0.1
[34]: https://github.com/Xunnamius/unified-utils/commit/9b0af07b6f119bbbe6ac2da42d9dadb9ca2a999b
[35]: https://github.com/Xunnamius/unified-utils/commit/6a1dc4a17e89f296ac67837ba175512877a0aa07
[36]: https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[37]: https://github.com/Xunnamius/unified-utils/commit/0da0d8d3dc8aabed621d7fd6d4883aa772bf77e6
