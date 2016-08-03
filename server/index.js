import webpackDevConfig from '../client/build/webpack.dev.config';

import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const {
  PORT = 9000,
  NODE_ENV,
} = process.env;
const IS_DEV = NODE_ENV === 'development';

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(compression()); // gzip middleware.
app.use(favicon(`${__dirname}/public/favicon.ico`)); // Handle favicon before logging
app.use(morgan('combined')); // HTTP logging middleware.

if (IS_DEV) {
  const wepbackDevCompiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(wepbackDevCompiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      chunks: false, // Makes the build much quieter
      colors: true,
    },
  }));

  app.use(webpackHotMiddleware(wepbackDevCompiler, {
    log: console.log, // eslint-disable-line no-console
  }));
}

app.use('/public', express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
  res.render('index');
});

const server = app.listen(PORT, () => {
  const { port } = server.address();

  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
