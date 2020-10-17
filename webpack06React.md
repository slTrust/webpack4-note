# webpack配置React

## 预设 

- Babel官网里选择  Presets 下的 React

```
npm install --save-dev @babel/preset-react 
```

修改 `.babelrc`

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets":{
          chrome:"67"
        },
        // 如果你设置里这个，入口js文件里 可以不引入 polyfill,它会自动引入
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}
```

- presets里的代码转化顺序也是 从右往左，从下到上
- 安装 依赖

```
npm i react react-dom
```

index.js

```
import React, { Component } from 'react';
import ReactDom from 'react-dom'
class App extends Component {
  render() {
    return <div>hello world</div>
  }
}

ReactDom.render(<App />, document.getElementById('root'))
```

webpack.config.js

```
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
    hotOnly: true, // 即使 hot 配置不生效，浏览器也不自动刷新
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
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```