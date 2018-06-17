/* env node */
const path = require('path');
const webpack = require('webpack');
const {spawn} = require('child_process');
const publicPath = '/dist';
const makeManifestPlugin = require('./make-manifest-plugin');
const ManifestPlugin = makeManifestPlugin(`//localhost:5001`);
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const startFlaskServer = (function closure() {
  let started = false;
  return () => {
    if (started) return;
    // else
    let app = spawn(
      'python', ['./backend/app.py'], {
        env: {
          /*
          You'll need to be operating in a python environment with Flask.
          Assigning PATH below uses any currently active virtual/conda env path
          modifications in the spawned process.
          */
          'PATH': process.env.PATH,
          'FLASK_DEBUG': 1,
        },
      });
    app.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    app.stderr.on('data', (data) => console.log(`stderr: ${data}`));

    app.on('close', (code) => {
      console.log(`flask app exited with code ${code}`);
    });
    started = true;
  };
})();

const contentBase = path.resolve(__dirname, '../');
// https://webpack.js.org/configuration/dev-server/#devserver-contentbase
module.exports = merge(base, {
  output: {
    filename: '[name].js',
  },
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
    after() {
      startFlaskServer();
    },
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
