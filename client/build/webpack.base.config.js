import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';

export default {
  entry: [
    './client/src/main.js',
  ],

  resolve: {
    root: path.join(__dirname, '..', 'src'),
  },

  output: {
    path: path.join(__dirname, '..', '..', 'server', 'public', 'dist'),
  },

  plugins: [],

  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },

  // PostCSS plugins, used when transforming CSS files.
  postcss: () => [
    precss,
    postcssNesting,
    autoprefixer,
  ],
};
