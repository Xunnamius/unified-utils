# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1]; this project adheres to
[Semantic Versioning][2].

### [1.0.6][3] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][4])

### [1.0.5][5] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][6])

#### 🔥 Reverted

- _"test: replace remark-remove-comments with
  @xunnamius/remark-remove-comments"_ ([2395903][7])

### [1.0.4][8] (2022-12-23)

#### ⚙️ Build System

- **packages/remark-tight-comments:** bump mdast-util-tight-comments to 1.0.4
  ([d7bc49a][9])

### [1.0.3][10] (2022-10-28)

#### ⚙️ Build System

- **packages/remark-tight-comments:** update dependency
  mdast-util-tight-comments to 1.0.3 ([fcf9402][11])
- **package:** update core npm format script ([c9d61ba][12])

### [1.0.2][13] (2022-10-22)

#### 🪄 Fixes

- **packages:** fix broken tables of contents in various readme files
  ([f666393][14])

#### ⚙️ Build System

- Add all-contributors ([84bff68][15])
- **packages/remark-tight-comments:** update dependency
  mdast-util-tight-comments to 1.0.2 ([0cab1e6][16])

### [1.0.1][17] (2022-10-22)

#### 🪄 Fixes

- **packages/remark-tight-comments:** ensure structure is consistent across
  remark packages ([9b0af07][18])
- **packages/remark-tight-comments:** remove erroneous typesVersions exports
  ([6a1dc4a][19])

#### ⚙️ Build System

- **package:** fix npm test script jest invocations ([a2ccf80][20])
- **packages/remark-tight-comments:** update dependency
  mdast-util-tight-comments to 1.0.1 ([0da0d8d][21])

## [1.0.0][22] (2022-10-21)

#### ⚙️ Build System

- **lint-staged:** add doctoc to pre-commit build process ([fa4f9ee][23])
- **package:** add doctoc to npm format script ([112d42c][24])
- **package:** defer to jest.config.js for coverage options ([05cd09e][25])
- **package:** use actual test ignore regex pattern ([6358888][26])
- Update core build toolchain ([19243d6][27])
- Update core lint npm script; add lint:all npm script ([bd84d8f][28])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.5...remark-tight-comments@1.0.6
[4]:
  https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[5]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.4...remark-tight-comments@1.0.5
[6]:
  https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[7]:
  https://github.com/Xunnamius/unified-utils/commit/23959035752e76f19ec4440cd762b4594fdb93bf
[8]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.3...remark-tight-comments@1.0.4
[9]:
  https://github.com/Xunnamius/unified-utils/commit/d7bc49a9cbc5837dd37585c3f19371ae871550d4
[10]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.2...remark-tight-comments@1.0.3
[11]:
  https://github.com/Xunnamius/unified-utils/commit/fcf94024c5be59f2e6f3e09bdd1b4d70b9a5d93b
[12]:
  https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[13]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.1...remark-tight-comments@1.0.2
[14]:
  https://github.com/Xunnamius/unified-utils/commit/f6663933fe4a7d577956527efe752e18607262ba
[15]:
  https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[16]:
  https://github.com/Xunnamius/unified-utils/commit/0cab1e6e89c2f6c51fb72b42f79d59d2b7f94e61
[17]:
  https://github.com/Xunnamius/unified-utils/compare/remark-tight-comments@1.0.0...remark-tight-comments@1.0.1
[18]:
  https://github.com/Xunnamius/unified-utils/commit/9b0af07b6f119bbbe6ac2da42d9dadb9ca2a999b
[19]:
  https://github.com/Xunnamius/unified-utils/commit/6a1dc4a17e89f296ac67837ba175512877a0aa07
[20]:
  https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[21]:
  https://github.com/Xunnamius/unified-utils/commit/0da0d8d3dc8aabed621d7fd6d4883aa772bf77e6
[22]:
  https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-tight-comments@1.0.0
[23]:
  https://github.com/Xunnamius/unified-utils/commit/fa4f9ee3f9cd922875cf077f6d8b74105f0ba55e
[24]:
  https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[25]:
  https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[26]:
  https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[27]:
  https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[28]:
  https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
