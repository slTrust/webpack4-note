const path = require('path')
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        options: {
          name: 'my-gulu'
        }
      }
    ]
  },
  plugins: [
    new CopyRightWebpackPlugin()
  ],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}