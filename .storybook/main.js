/*
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

const path = require('path');
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

// https://github.com/webpack/webpack/issues/7378
// https://github.com/TypeStrong/ts-loader/issues/653
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
      const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/
      function doneHook(stats) {
          stats.compilation.warnings = stats.compilation.warnings.filter(function(warn) {
              if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
                  return false
              }
              return true;
          })
      }
      if (compiler.hooks) {
          compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook)
      } else {
          compiler.plugin("done", doneHook)
      }
  }
}

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../src/**/*.stories.ts'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test   : /\.css$/,
      loader : 'postcss-loader',
      include: path.resolve(__dirname, "../")
    });

    config.plugins.push(new IgnoreNotFoundExportPlugin());

    // Return the altered config
    return config;
  },
};
