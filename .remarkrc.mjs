// @ts-check
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

import { toAbsolutePath } from '@-xun/fs';
import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/.remarkrc.mjs';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: 'symbiote:config:remarkrc' });

const config = deepMergeConfig(moduleExport(await assertEnvironment()), {
  // Any custom configs here will be deep merged with moduleExport
});

// ? The following is required to ensure symbiote doesn't try to use the dev
// ? versions of unified-utils's remark packages, which may not be built yet!

assert(!config.plugins || Array.isArray(config.plugins));

const ourRemarkPlugins = (await readdir('./packages', { withFileTypes: true }))
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);

config.plugins = config.plugins?.map((pluginDefinition) => {
  const isString = typeof pluginDefinition === 'string';
  const isArray =
    Array.isArray(pluginDefinition) && typeof pluginDefinition[0] === 'string';

  assert(
    isString || isArray,
    'expected "plugins" property to be an array of strings or arrays with strings as the first element'
  );

  const pluginName = isString
    ? pluginDefinition
    : /** @type {string} */ (pluginDefinition[0]);
  const pluginNameWithRemark = pluginName.startsWith('remark-')
    ? pluginName
    : `remark-${pluginName}`;

  if (ourRemarkPlugins.includes(pluginNameWithRemark)) {
    const pluginPath = toAbsolutePath(
      import.meta.dirname,
      'node_modules/@-xun/symbiote/node_modules',
      pluginNameWithRemark
    );

    /**
     * @type {string}
     */
    const entryPoint = JSON.parse(
      readFileSync(toAbsolutePath(pluginPath, 'package.json'), 'utf8')
    ).exports['.'].default;
    const completePluginPath = toAbsolutePath(pluginPath, entryPoint);

    return isString
      ? completePluginPath
      : /** @type {typeof pluginDefinition} */ ([
          completePluginPath,
          ...pluginDefinition.slice(1)
        ]);
  }

  return pluginDefinition;
});

export default config;

debug('exported config: %O', config);
