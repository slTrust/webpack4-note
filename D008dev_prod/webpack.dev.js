const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')


const devConfig = {
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

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)