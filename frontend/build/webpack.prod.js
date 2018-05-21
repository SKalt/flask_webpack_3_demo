const webpack = require('webpack');
const makeManifestPlugin = require('./make-manifest-plugin');
const ManifestPlugin = makeManifestPlugin('/');
const base = require('./webpack.base.js');
const merge = require('webpack-merge');

module.exports = merge(base, {
  devtool: 'source-map',
  plugins: [
    ManifestPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({ // minify things where possible
      minimize: true,
    }),
  ],
});
