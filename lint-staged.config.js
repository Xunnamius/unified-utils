'use strict';

module.exports = {
  '*.md': 'npx remark --output --frail',
  'package.json': 'sort-package-json',
  '*': 'prettier --write --ignore-unknown'
};
