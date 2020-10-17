const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 服务器根路径 
    contentBase: './dist',
    open: true,// 自动打开浏览器
    port: 8080,
    // 开启 hot module replace 模式 ，用于处理 一顿操作后，你修改代码，浏览器刷新了，你又需要一顿操作
    hot: true,
    // hotOnly: true, // 即使 hot 配置不生效，浏览器也不自动刷新
    proxy: {
      // 跨域请求的代理
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}