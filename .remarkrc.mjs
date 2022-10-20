/**
 * @typedef {{settings?: import('mdast-util-to-markdown').Options, plugins?:
 * import('unified-engine/lib/configuration').PluggableList |
 * import('unified-engine/lib/configuration').PluginIdList}} Config
 */

/**
 * Remark configuration loaded when `NODE_ENV == 'lint'`.
 *
 * @type {Config}
 */
const lintConfig = {
  plugins: [
    'gfm',
    'frontmatter',
    'lint-final-newline',
    'lint-no-auto-link-without-protocol',
    'lint-no-blockquote-without-marker',
    'lint-ordered-list-marker-style',
    'lint-hard-break-spaces',
    'lint-no-duplicate-definitions',
    'lint-no-heading-content-indent',
    'lint-no-inline-padding',
    'lint-no-undefined-references',
    'lint-no-unused-definitions',
    'validate-links'
  ]
};

/**
 * Remark configuration loaded when `NODE_ENV == 'format'`.
 *
 * @type {Config}
 */
const formatConfig = {
  plugins: ['ignore', 'gfm', 'frontmatter', 'reference-links', 'tight-comments']
};

if (!['lint', 'format'].includes(process.env.NODE_ENV)) {
  throw new Error('remark expects NODE_ENV to be one of either: lint, format');
}

/**
 * @type {Config}
 */
export default {
  settings: {
    bullet: '-',
    emphasis: '_',
    fences: true,
    listItemIndent: 'one',
    rule: '-',
    strong: '*',
    tightDefinitions: true,
    ...(process.env.NODE_ENV == 'lint' ? lintConfig.settings : formatConfig.settings)
  },
  plugins: [
    ...(process.env.NODE_ENV == 'lint' ? lintConfig.plugins : formatConfig.plugins)
  ]
};
