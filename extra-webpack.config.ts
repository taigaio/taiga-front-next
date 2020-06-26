/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
import * as webpack from 'webpack';

export default function(config: webpack.Configuration) {
  if (config.module) {
    config.module.rules.push(
      {
        test   : /\.css$/,
        loader : 'postcss-loader',
      }
    );
  }

  return config;
}
