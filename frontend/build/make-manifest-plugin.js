const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function makeManifest(publicPath) {
  return new ManifestPlugin({
    generate: (seed, files) => {
      const assets = files.reduce(
        (manifest, {name, path}) => ({...manifest, [name]: path}), seed
      );
    console.log({assets, publicPath});
    return {assets, publicPath};
  },
    //  {
    //   return {
    //     publicPath,
    //     assets: files.reduce(
    //       (manifest, {name, path}) => {
    //         console.log(manifest);
    //         return Object.assign({}, manifest, {...manifest, [name]: path});
    //       }
    //     ),
    //   };
    // },
  });
};
