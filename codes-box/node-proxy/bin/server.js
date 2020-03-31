const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const webpackHotMiddleware = require("webpack-hot-middleware");

const getMyIp = require('./getIp');
const config = require('../webpack/webpack.config.js');

const app = express();
const compiler = webpack(config);
const webpackDevServer = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': true,
  },
});

app.use(historyApiFallback({ verbose: false }));
app.use(webpackDevServer);
app.use(webpackHotMiddleware(compiler));

app.listen(3000, '0.0.0.0', function () {
  console.log(`Your app running at http://0.0.0.0:3000\n or http://${getMyIp()}:3000\n`);
});