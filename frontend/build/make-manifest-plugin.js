const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function makeManifest(publicPath) {
  return new ManifestPlugin({
    generate(seed, files) {
      return {
        publicPath,
        assets: files.reduce(
          (manifest, {name, path}) => {
            return {...manifest, [name]: path};
          }
        ),
      };
    },
  });
};
