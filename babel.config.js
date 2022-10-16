'use strict';
// * Every now and then, we adopt best practices from CRA
// * https://tinyurl.com/yakv4ggx

// ? https://nodejs.org/en/about/releases
const NODE_LTS = 'maintained node versions';
const pkgName = require('./package.json').name;
const debug = require('debug')(`${pkgName}:babel-config`);

const generateProductionEsmConfigObject = (mutateConfigFn) => {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          // ? https://babeljs.io/docs/en/babel-preset-env#modules
          modules: false
        }
      ],
      ['@babel/preset-typescript', { allowDeclareFields: true }]
      // ? We don't care about minification
    ],
    plugins: [
      /* // ? Ensure all local imports without extensions now end in .mjs
      ['add-import-extension', { extension: 'mjs' }],
      // ? Fix ESM relative local imports referencing package.json
      [
        'transform-rename-import',
        {
          replacements: [
            { original: '../package.json', replacement: `../../package.json` }
          ]
        }
      ] */
    ]
  };

  if (mutateConfigFn) {
    mutateConfigFn(config);
  }

  return config;
};

debug('NODE_ENV: %O', process.env.NODE_ENV);

module.exports = {
  comments: false,
  parserOpts: { strictMode: true },
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [
      'module-resolver',
      {
        root: '.',
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        // ! If changed, also update these aliases in tsconfig.json,
        // ! webpack.config.js, next.config.ts, eslintrc.js, and jest.config.js
        alias: {
          '^universe/(.*)$': './src/\\1',
          '^multiverse/(.*)$': './lib/\\1',
          '^testverse/(.*)$': './test/\\1',
          '^externals/(.*)$': './external-scripts/\\1',
          '^types/(.*)$': './types/\\1',
          '^package$': `./package.json`
        }
      }
    ]
  ],
  // ? Sub-keys under the "env" config key will augment the above
  // ? configuration depending on the value of NODE_ENV and friends. Default
  // ? is: development
  env: {
    // * Used by Jest and `npm test`
    test: {
      comments: true,
      sourceMaps: 'both',
      presets: [
        ['@babel/preset-env', { targets: { node: true } }],
        ['@babel/preset-typescript', { allowDeclareFields: true }]
        // ? We don't care about minification
      ],
      plugins: [
        // ? Only active when testing, the plugin solves the following problem:
        // ? https://stackoverflow.com/q/40771520/1367414
        'explicit-exports-references'
      ]
    },
    // * Used when NODE_ENV == production
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            // ? https://babeljs.io/docs/en/babel-preset-env#modules
            modules: 'auto',
            targets: NODE_LTS,
            exclude: ['proposal-dynamic-import']
          }
        ],
        ['@babel/preset-typescript', { allowDeclareFields: true }]
        // ? Minification is handled externally (e.g. by webpack)
      ] /* ,
      plugins: [
        // ? Interoperable named CJS imports for free
        [
          'transform-default-named-imports',
          { exclude: [/^next([/?#].+)?/, /^mongodb([/?#].+)?/] }
        ]
      ] */
    },
    // * Used by `npm run build` for compiling ESM to code output in ./dist
    'production-esm': generateProductionEsmConfigObject((config) => {
      config.presets[0][1].targets = NODE_LTS;
    }),
    // * Used by `npm run build-externals` for compiling to ESM code output in
    // * ./external-scripts/bin
    'production-external': generateProductionEsmConfigObject((config) => {
      config.presets[0][1].targets = { node: true };
    })
  }
};

debug('exports: %O', module.exports);
