/* eslint-disable */
require('babel-register');
const webpack = require('webpack');
const config = require('./webpack.prod.config');

webpack(config).run((error, stats) => {
  if (error) throw new Error(error);

  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true,
  }));
});
