/* env node */
const path = require('path');
const webpack = require('webpack');
const publicPath = '/dist';
const makeManifestPlugin = require('./make-manifest-plugin');
const ManifestPlugin = makeManifestPlugin(`//localhost:5001`);
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const contentBase = path.resolve(__dirname, '../')
// https://webpack.js.org/configuration/dev-server/#devserver-contentbase
module.exports = merge(base, {
  devServer: { // https://webpack.js.org/configuration/dev-server/
    historyApiFallback: true, // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
    noInfo: true,
    overlay: true,
    contentBase, // watch all front-end source/bundles for changes
    // host by default is localhost,
    port: 5001,
    hot: !!'heck yes', // true; enable hot module replacement https://webpack.js.org/configuration/dev-server/#devserver-hot
    allowedHosts: ['localhost'],
    compress: true,
    publicPath, // the url under which to serve the bundles
    // https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
    // watch: {
    //   poll: true,
    //   ignored: /node_modules/
    // },
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  plugins: [
    ManifestPlugin,
    new webpack.DefinePlugin({ // replace in the JS source text
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
});
