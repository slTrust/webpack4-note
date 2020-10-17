# plugins

## html-webpack-plugin

- 安装依赖 `npm i html-webpack-plugin`
- 在 webpack.config.js 里

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
     // ...
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

### 作用

- 帮我们在 dist目录生成 index.html,而且会把打包的js引入进来

### 配置我们自己的 index.html 模版

```
plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
],
```

## clean-webpack-plugin 

- 我们希望打包的时候先把 dist目录都清除

```
npm i clean-webpack-plugin 
```

使用

```
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


...

 plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
```