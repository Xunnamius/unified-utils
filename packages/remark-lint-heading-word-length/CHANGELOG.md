# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1]; this project adheres to
[Semantic Versioning][2].

## [2.0.0][3] (2023-11-30)

### 💥 Breaking Changes 💥

- End-of-life node versions (14 and 16) are no longer supported

- These packages are only guaranteed to work with the _latest_ remark/unified
  packages

#### ⚙️ Build System

- **package:** add strip-ansi devdep; force update of unified-args to 11.0.1
  ([150abb4][4])
- Update all plugins to work with unified@>=11 ([fe98b3c][5])

#### 🧙🏿 Refactored

- **package:** bumped minimum node version to maintained ([364aced][6])

### [1.0.3][7] (2023-01-29)

#### ⚙️ Build System

- Stabilize build process ([6994784][8])

### [1.0.2][9] (2023-01-04)

#### ⚙️ Build System

- **packages:** update maintainence badge ([4cbf746][10])

#### 🔥 Reverted

- _"test: replace remark-remove-comments with
  @xunnamius/remark-remove-comments"_ ([2395903][11])

### [1.0.1][12] (2022-12-06)

#### 🪄 Fixes

- **packages:** use "remark-lint" as origin scope for comment-level
  disable/ignore support ([3f15c0f][13])

## [1.0.0][14] (2022-10-30)

#### ✨ Features

- **packages/remark-lint-heading-word-length:** add new package ([c1ae1b2][15])

#### ⚙️ Build System

- Add all-contributors ([84bff68][16])
- **lint-staged:** add doctoc to pre-commit build process ([fa4f9ee][17])
- **package:** add doctoc to npm format script ([112d42c][18])
- **package:** defer to jest.config.js for coverage options ([05cd09e][19])
- **package:** fix npm test script jest invocations ([a2ccf80][20])
- **package:** update core npm format script ([c9d61ba][21])
- **package:** use actual test ignore regex pattern ([6358888][22])
- Update core build toolchain ([19243d6][23])
- Update core lint npm script; add lint:all npm script ([bd84d8f][24])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-heading-word-length@1.0.3...remark-lint-heading-word-length@2.0.0
[4]:
  https://github.com/Xunnamius/unified-utils/commit/150abb424fd30e84336ddf8b1f443d75a04c30a1
[5]:
  https://github.com/Xunnamius/unified-utils/commit/fe98b3c7f06f4356bed713d2edb7d6f7f749617b
[6]:
  https://github.com/Xunnamius/unified-utils/commit/364aced3f0c8d4e56df8cde24419d13f568cb68f
[7]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-heading-word-length@1.0.2...remark-lint-heading-word-length@1.0.3
[8]:
  https://github.com/Xunnamius/unified-utils/commit/69947844f42e618f336aeeb9af1d6c9f4ee1e82b
[9]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-heading-word-length@1.0.1...remark-lint-heading-word-length@1.0.2
[10]:
  https://github.com/Xunnamius/unified-utils/commit/4cbf746b78c3bb369c3b27228ec582c3a3e47c54
[11]:
  https://github.com/Xunnamius/unified-utils/commit/23959035752e76f19ec4440cd762b4594fdb93bf
[12]:
  https://github.com/Xunnamius/unified-utils/compare/remark-lint-heading-word-length@1.0.0...remark-lint-heading-word-length@1.0.1
[13]:
  https://github.com/Xunnamius/unified-utils/commit/3f15c0fb647157848e323f66cd56eaf74e590141
[14]:
  https://github.com/Xunnamius/unified-utils/compare/05cd09e0cf13f18fa56f6156516bcf546b1238e6...remark-lint-heading-word-length@1.0.0
[15]:
  https://github.com/Xunnamius/unified-utils/commit/c1ae1b281111232a8017f02b8aac2a1f99a4a159
[16]:
  https://github.com/Xunnamius/unified-utils/commit/84bff68339c7a742c104c0f2545fe62b28c8b473
[17]:
  https://github.com/Xunnamius/unified-utils/commit/fa4f9ee3f9cd922875cf077f6d8b74105f0ba55e
[18]:
  https://github.com/Xunnamius/unified-utils/commit/112d42c6999f758ff618f4e116eb7cf38c09f77c
[19]:
  https://github.com/Xunnamius/unified-utils/commit/05cd09e0cf13f18fa56f6156516bcf546b1238e6
[20]:
  https://github.com/Xunnamius/unified-utils/commit/a2ccf801276c84e54d3fc1afaad574f78408d86f
[21]:
  https://github.com/Xunnamius/unified-utils/commit/c9d61bacbd52bc76b05abd3426474bf0176c3cd9
[22]:
  https://github.com/Xunnamius/unified-utils/commit/63588887a7377f3ee7488b19c87f1f2bf1faa811
[23]:
  https://github.com/Xunnamius/unified-utils/commit/19243d623ba14cfd629c5e4632e6a75de508592b
[24]:
  https://github.com/Xunnamius/unified-utils/commit/bd84d8fc1fb5c4d1828a16a47214a6730f34899a
