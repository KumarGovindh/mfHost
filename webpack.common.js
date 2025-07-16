const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
 entry: './src/index.js',
 output: {
    publicPath: 'auto',
 },
 devtool: 'source-map',
 resolve: {
  extensions: ['.js','.jsx'],
 },
 optimization: {
    minimize: false
 },
 module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
  ],
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './public/index.html',
  }),
  new ModuleFederationPlugin({
   name: 'mfHost',
   remotes: {
        mfHeader: 'mfHeader@http://localhost:3001/remoteEntry.js',
        mfFooter: 'mfFooter@http://localhost:3002/remoteEntry.js',
   },
   shared: {
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
    'styled-components': { singleton: true, requiredVersion: deps['styled-components'] }
   },
  }),
 ]
};