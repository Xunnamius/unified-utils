'use strict';

module.exports = {
  restoreMocks: true,
  resetMocks: true,
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  // ? 24h if debugging so MMS and other tools don't choke, otherwise 1m
  testTimeout: 1000 * 60 * (process.env.VSCODE_INSPECTOR_OPTIONS ? 60 * 24 : 1),
  verbose: false,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // ! If changed, also update these aliases in tsconfig.json,
  // ! webpack.config.js, next.config.ts, and .eslintrc.js
  moduleNameMapper: {
    '^universe/(.*)$': '<rootDir>/src/$1',
    '^multiverse/(.*)$': '<rootDir>/lib/$1',
    '^testverse/(.*)$': '<rootDir>/test/$1',
    '^pkgverse/(.*)$': '<rootDir>/packages/$1',
    '^externals/(.*)$': '<rootDir>/external-scripts/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^package$': '<rootDir>/package.json'
  },
  setupFilesAfterEnv: ['./test/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    'lib/**/*.ts?(x)',
    'external-scripts/**/*.ts?(x)',
    'packages/*/src/**/*.ts?(x)'
  ],
  // ? Transform third-party ESM packages into CJS using babel
  transformIgnorePatterns: [],
  // ? Make sure jest-haste-map doesn't try to parse and cache fixtures
  modulePathIgnorePatterns: ['<rootDir>/test/fixtures']
};
