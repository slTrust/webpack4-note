# 其他配置

## Entry和output

### webpack.config.js

```
entry:{'./src/index.js'}
# 如果不设置 output 的 name 打包后的js默认会是 main.js
```

### 配置output的输出name

```
entry:{
  main:'./src/index.js',
  sub:'./src/sub.js'
},
output:{
  filename:'[name].js',
  path: path.resolve(__dirname, 'dist')
}

// 会打包成 main.js 和 sub.js
// 会同时打包进 index.html里
```

### 假设我们要 index.html里的js携带域名

- publicPath

```
entry:{
  main:'./src/index.js',
  sub:'./src/sub.js'
},
output:{
  publicPath:'http://你的域名',
  filename:'[name].js',
  path: path.resolve(__dirname, 'dist')
}
```

## SourceMap配置

- 解决的是，代码写错的定位问题，不要定位到打包后的文件错误行，而是源文件

```
SourceMap 它是一个映射关系 他知道 dist目录下 build.js 文件xx行的错误，实际是对应 src/index.js 文件的 yy行
```

### 如何使用 SourceMap功能

```
{
  devtool:'source-map'
}
```

注意 source-map 会影响打包速度，因为要构建映射关系

[文档](https://webpack.js.org/configuration/devtool/)

> 几个模式分析

- source-map 会生成一个映射文件
- inline-source-map 帮你精确到行和列，把映射关系生成到打包后的js里
- cheap-source-map 帮你精确到行 
- cheap-module-source-map 不仅要管你自己的业务代码还要处理 loader 和其他模块里的代码
- eval 速度最快

**开发模式推荐：cheap-module-eval-source-map** 提示全，打包快
**线上模式推荐：cheap-module-source-map** mode为 production

## WebpackDevServer 提高开发效率

- 边开发边改代码，看运行效果 你只能这样 `webpack --watch`
- 这样损耗性能

**webpack里内置里这样的功能 WebpackDevServer，但需要安装依赖**

- `npm i webpack-dev-server@3.1.10`

```
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool:'cheap-module-eval-source-map',
  devServer:{
    // 服务器根路径 
    contentBase:''
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

## HMR 功能

- Hot Module Replace 

```
// 第一步
const webpack = require('webpack')

module.exports = {
  devServer: {
    contentBase: './dist',
    // 第二步
    // 开启 hot module replace 模式 ，用于处理 一顿操作后，你修改代码，浏览器刷新了，你又需要一顿操作
    hot: true,
    hotOnly: true, // 即使 hot 配置不生效，浏览器也不自动刷新，可加可不加
    
  },
  plugins: [
    // ...
    // 第三步
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

完成以上步骤，你的部分操作可以保留。这样更改局部模块的时候，就不用从头来过

**原理就是**

```
import x form './x'
import y from './y'

x();
y();

if(module.hot){
  module.hot.replace('./x',()=>{
    // 把你 js 操作的节点删除
    // 重新执行你的函数
    x();
  })
}
```

## Babel 转译 ES6代码

```
npm i babel-loader @babel/core
```

- 配置文件里添加这个规则

```
{
  test: /\.js$/,
  exclude: '/node_modules/',
  use: 'babel-loader'
}
```

- 安装preset-env

```
npm i @babel/preset-env
```

- 新建`.babelrc`

```
{
  "presets":["@babel/preset-env"]
}
```

仅仅这样还是不行的，只会把 const , 箭头函数做转化，但是 Promise 和 map 函数都没处理，在一些浏览器还是有问题

#### pollfill

抹平不同浏览器的差异，把落后浏览器不具备的一些特性实现

```
# 安装依赖
npm i @babel/polyfill

# 入口文件首行引入
import '@babel/polyfill'
```

- 这样之后 打包的代码变大了
- 但是我们可能代码里就用了一部分 polyfill 填充的函数

> 修改配置

- 把我们代码里用到的一些 需要填充的特性，打包进来(按需打包)
- `{ useBuiltIns: 'usage' }`
- 可以减少代码体积

```
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              { useBuiltIns: 'usage' }
            ]
          ]
        }
      }
    ]
  },
}
```

**这种方式的缺陷是，polyfill会污染全局，如果你做类库的时候应该避免**

#### 开发类库的常见如何配置？

- 参考 [babel 的 transform-runtime章节](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

```
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime

# 修改配置

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          "plugins": [
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": 2, 
                // 需要额外安装 @babel/runtime-corejs2
                "helpers": true,
                "regenerator": true,
                "useESModules": false,
              }
            ]
          ]
        }
      }
    ]
  },
}
```

这个可以解决 polyfill会污染全局

#### 简化代码为 配置文件 

- `.babelrc`

```
{
  /*
  // 开发业务使用
  presets: [
    [
      '@babel/preset-env',
      { useBuiltIns: 'usage' }
    ]
  ]
  */
  // 开发类库使用
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
      }
    ]
  ]
}
```

