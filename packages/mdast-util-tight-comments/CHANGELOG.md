# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## mdast-util-tight-comments[@3.0.0][3] (2025-09-02)

### 💥 BREAKING CHANGES 💥

- Minimum supported node version is now 20.18.0

### ⚙️ Build System

- **deps:** bump mdast-util-to-markdown from 2.1.0 to 2.1.2 ([cf39525][4])
- **packages/mdast-util-tight-comments:** add missing dependencies ([528477a][5])
- **remarkrc:** ensure vendored versions of unified-utils remark plugins are used by symbiote ([82e7a1d][6])

<br />

## mdast-util-tight-comments[@2.0.0][7] (2023-11-30)

### 💥 BREAKING CHANGES 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the \_latest\_ remark/unified packages

### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1 ([150abb4][8])
- Update all plugins to work with unified@>=11 ([fe98b3c][9])

### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][10])

<br />

## mdast-util-tight-comments[@1.0.0][11] (2022-10-21)

### ⚙️ Build System

- **package:** add doctoc to npm format script ([112d42c][12])
- **package:** defer to jest.config.js for coverage options ([05cd09e][13])
- **package:** use actual test ignore regex pattern ([6358888][14])
- Update core build toolchain ([19243d6][15])
- Update core lint npm script; add lint:all npm script ([bd84d8f][16])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.6][17] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][18])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.5][19] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][20])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.4][21] (2022-12-21)

#### ⚙️ Build System

- **packages/mdast-util-tight-comments:** bump mdast-util-to-markdown to 1.4.0 ([2ec7a78][22])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.3][23] (2022-10-28)

#### ⚙️ Build System

- **package:** update core npm format script ([c9d61ba][24])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.2][25] (2022-10-22)

#### ⚙️ Build System

- Add all-contributors ([84bff68][26])

<br />

### 🏗️ Patch mdast-util-tight-comments[@1.0.1][27] (2022-10-22)

#### ⚙️ Build System

- **package:** fix npm test script jest invocations ([a2ccf80][28])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@2.0.0...mdast-util-tight-comments@3.0.0
[4]: https://github.com/Xunnamius/unified-utils/commit/cf39525a99f4d9d466be2bedfb68ce7f190ecfa6
[5]: https://github.com/Xunnamius/unified-utils/commit/528477aa8b86e10b12dabd8029ecb054e5e7d2c3
[6]: https://github.com/Xunnamius/unified-utils/commit/82e7a1d1fac269612b64776bc548f1dafabf37ba
[7]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.6...mdast-util-tight-comments@2.0.0
[8]: https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[9]: https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[10]: https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[11]: https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...mdast-util-tight-comments@1.0.0
[12]: https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[13]: https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[14]: https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[15]: https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[16]: https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
[17]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.5...mdast-util-tight-comments@1.0.6
[18]: https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[19]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.4...mdast-util-tight-comments@1.0.5
[20]: https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[21]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.3...mdast-util-tight-comments@1.0.4
[22]: https://github.com/Xunnamius/unified-utils/commit/2ec7a785354cb80aedc16e671d01e9220b6f84aa
[23]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.2...mdast-util-tight-comments@1.0.3
[24]: https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[25]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.1...mdast-util-tight-comments@1.0.2
[26]: https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[27]: https://github.com/Xunnamius/unified-utils/compare/mdast-util-tight-comments@1.0.0...mdast-util-tight-comments@1.0.1
[28]: https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
