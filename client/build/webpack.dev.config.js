import webpack from 'webpack';
import base from './webpack.base.config';
import path from 'path';

export default {
  ...base,

  entry: [
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client',
    './client/src/dev.js',
    ...base.entry,
  ],

  output: {
    ...base.output,
    publicPath: 'http://localhost:9000/public/dist/',
    filename: '[name].js',
  },

  // This is much faster than 'source-map'
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    ...base.module,
    loaders: [
      ...base.module.loaders,
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, '..', 'src'),
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
      },
    ],
  },
};
