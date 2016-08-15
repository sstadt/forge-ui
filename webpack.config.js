
module.exports = {
  output: {
    filename: "forge-ui.js"
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".es6"]
  }
};
