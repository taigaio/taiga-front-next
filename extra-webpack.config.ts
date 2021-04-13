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
