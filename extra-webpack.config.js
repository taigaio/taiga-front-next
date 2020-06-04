module.exports = (config) => {
  config.module.rules.push(
    {
      test   : /\.css$/,
      loader : 'postcss-loader'
    }
  );

  return config;
};
