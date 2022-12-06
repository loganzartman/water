const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  entry: [
    './src/index.tsx',
    // 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
  ],
  experiments: {
    // enable wasm
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/i,
        type: 'webassembly/async',
      },
      {
        test: /\.wgsl$/i,
        use: ['@use-gpu/wgsl-loader'],
      },
    ],
  },
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  watchOptions: {
    poll: 500,
  },
};