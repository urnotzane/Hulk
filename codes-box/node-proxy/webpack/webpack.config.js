const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      }, ],
      include: path.resolve(__dirname, '../src'),
      exclude: /(node_modules)/,
    }, ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'node服务器搭建'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};