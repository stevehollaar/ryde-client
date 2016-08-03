import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import base from './webpack.base.config';

// This is used as both a plugin and a loader. Together, it packages every imported CSS file into a
// single CSS bundle.
const extractCss = new ExtractTextPlugin('main.css', {
  allChunks: true,
});

export default {
  ...base,

  output: {
    ...base.output,
    filename: '[name].js',
    publicPath: '/public/dist/',
  },

  plugins: [
    ...base.plugins,

    // Minify JS bundles.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // Uglify makes a bunch of noise otherwise.
      },
      sourceMap: false,
    }),

    // Make sure to build React in production mode.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),

    extractCss,

    // Generate a manifest of hashed bundle files, to be used when rendering the app template.
    // TODO
    // new AssetsPlugin({
    //   path: path.join(__dirname, '..', 'dist'),
    // }),
  ],

  module: {
    ...base.module,
    loaders: [
      ...base.module.loaders,
      {
        test: /\.css$/,
        loader: extractCss.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
        ),
      },
    ],
  },
};
