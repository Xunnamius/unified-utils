# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## mdast-util-hidden[@3.0.0][3] (2025-09-02)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- **deps:** bump @types/mdast from 4.0.3 to 4.0.4 ([fce2171][4])
- **deps:** bump @types/unist from 3.0.2 to 3.0.3 ([f280e74][5])
- **packages/mdast-util-hidden:** add missing dependencies ([c281faf][6])
- **remarkrc:** ensure vendored versions of unified-utils remark plugins are used by symbiote ([82e7a1d][7])

<br />

## mdast-util-hidden[@2.0.0][8] (2023-11-30)

### 💥 BREAKING CHANGES 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the \_latest\_ remark/unified packages

### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1 ([150abb4][9])
- Update all plugins to work with unified@>=11 ([fe98b3c][10])

### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][11])

<br />

## mdast-util-hidden[@1.1.0][12] (2022-10-22)

### ✨ Features

- **packages/mdast-util-hidden:** allow visitAndReveal to bail out of `false` is returned ([b8d34ed][13])

<br />

### 🏗️ Patch mdast-util-hidden[@1.1.4][14] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][15])

<br />

### 🏗️ Patch mdast-util-hidden[@1.1.3][16] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][17])

<br />

### 🏗️ Patch mdast-util-hidden[@1.1.2][18] (2022-10-28)

#### ⚙️ Build System

- **package:** update core npm format script ([c9d61ba][19])

<br />

### 🏗️ Patch mdast-util-hidden[@1.1.1][20] (2022-10-22)

#### ⚙️ Build System

- Add all-contributors ([84bff68][21])

<br />

## mdast-util-hidden[@1.0.0][22] (2022-10-16)

### ⚙️ Build System

- **package:** defer to jest.config.js for coverage options ([05cd09e][23])
- **packages/mdast-util-hidden:** update build process for this package ([946e4ce][24])
- **packages:** add node export condition to packages ([cfa7557][25])
- **package:** use actual test ignore regex pattern ([6358888][26])

<br />

### 🏗️ Patch mdast-util-hidden[@1.0.2][27] (2022-10-22)

#### 🪄 Fixes

- **packages/mdast-util-hidden:** replace error throwing with asserts ([3e22f63][28])

#### ⚙️ Build System

- **package:** fix npm test script jest invocations ([a2ccf80][29])

<br />

### 🏗️ Patch mdast-util-hidden[@1.0.1][30] (2022-10-21)

#### ⚙️ Build System

- **package:** add doctoc to npm format script ([112d42c][31])
- Update core build toolchain ([19243d6][32])
- Update core lint npm script; add lint:all npm script ([bd84d8f][33])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@2.0.0...mdast-util-hidden@3.0.0
[4]: https://github.com/Xunnamius/unified-utils/commit/fce2171dcb3fc929462f000868fb645d55c9039c
[5]: https://github.com/Xunnamius/unified-utils/commit/f280e740aa46d1a3e73774fb7bf6ac1c705df811
[6]: https://github.com/Xunnamius/unified-utils/commit/c281fafda36f321ae76fa5db6da0fb989d2a910d
[7]: https://github.com/Xunnamius/unified-utils/commit/82e7a1d1fac269612b64776bc548f1dafabf37ba
[8]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.1.4...mdast-util-hidden@2.0.0
[9]: https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[10]: https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[11]: https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[12]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.0.2...mdast-util-hidden@1.1.0
[13]: https://github.com/Xunnamius/unified-utils/commit/b8d34ed4ed19491067b64ad45a4d1d3171cbb0e9
[14]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.1.3...mdast-util-hidden@1.1.4
[15]: https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[16]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.1.2...mdast-util-hidden@1.1.3
[17]: https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[18]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.1.1...mdast-util-hidden@1.1.2
[19]: https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[20]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.1.0...mdast-util-hidden@1.1.1
[21]: https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[22]: https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...mdast-util-hidden@1.0.0
[23]: https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[24]: https://github.com/Xunnamius/unified-utils/commit/946e4cea9ad076b444e56006db825174e34f2fc1
[25]: https://github.com/Xunnamius/unified-utils/commit/cfa755794380abeda2748bb0a86f99b0bb136198
[26]: https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[27]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.0.1...mdast-util-hidden@1.0.2
[28]: https://github.com/Xunnamius/unified-utils/commit/3e22f63406102a4242eec502ccfff9b9e017d399
[29]: https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[30]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-hidden@1.0.0...mdast-util-hidden@1.0.1
[31]: https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[32]: https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[33]: https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
