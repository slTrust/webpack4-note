const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          // 可以不设置 options，这样打包后的 文件是随机的hash码+文件后缀
          options: {
            // 以原名打包出来  这个语法叫做 占位符 placeholders
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048 // 大于2K变成文件，否则变成 base64
          }
        },
      },
      // 单纯处理css的时候
      /*
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      */
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 这里的2 代表他后面的loader个数
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }

}