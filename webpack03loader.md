# 什么是loader

**不要所有loader都去研究，太多了用不过来**

- 你用到什么随用随查

## 加载图片——`file-loader`

- module 使用，匹配 `.jpg`后缀的文件 采用 file-loader

```
module: {
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        // 可以不设置 options，这样打包后的 文件是随机的hash码+文件后缀
        options: {
          // 以原名打包出来  这个语法叫做 占位符 placeholders
          name: '[name]_[hash].[ext]',
          outputPath: 'images/'
        }
      },
    }
  ]
}
```

### file-loader 和 url-loader区别

- url-loader 会把文件变成 base64的编码写入到js里，这样会减少一次请求时间,url-loader 还可以配置 limit 形成和 file-loader 一样的效果
- file-loader 会把文件单独生成一个文件，这样的话如果是图片就会发请求

### 图片很大的时候用file-loader,图片小的时候用 url-loader

```
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
    }
  ]
},
```

## 处理CSS 

- css-loader
- style-loader

index.js里

```
import './index.css'
```

修改配置文件处理 css文件

```
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
```

### css-loaer作用

假设 `index.css` 里有 `@import 倒入其他的css`

- css-loader 会帮我们分析 css之间的关系。最终合并成一个css文件

### style-loader作用

- css-loader 生成的css内容挂载到页面的 head的 style 里

### scss处理

- index.js 里 引入 index.scss 文件
- index.scss内容如下

```
$h:300px;
$w:300px;
img {
  height: $h;
  width: $w;
}
```

- 安装依赖 `npm i node-sass sass-loader`

```
{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
}
```

**loader调用顺序**：从右往左的执行顺序

### postcss-loader

使用CSS3的一些属性需要加浏览器前缀问题

- 如 transform属性

> 步骤

- 安装 postcss-loader ,`npm i postcss-loader`
- 参考[文档](https://webpack.js.org/loaders/postcss-loader/)

- 项目根目录创建 postcss.config.js

```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

- 安装 `npm i autoprefixer`
- webpack.config.js里添加 postcss-loader

```
{
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
    'postcss-loader'
  ]
}
```

## css打包 loader 深入概念

```
{
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      'postcss-loader'
    ]
}
```

- 当你引入 index.scss ，而 index.scss 内又引入了`@import xxx.scss` 时候，这个 xxx.scss 就不会走 postcss-loader 和 sass-loader
- 解决办法

```
{
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader:'css-loader',
        options:{
          importLoaders:2 // 这里的2 代表他后面的loader个数
        }
      }
      'sass-loader',
      'postcss-loader'
    ]
}
```

### css模块化功能

入口文件 index.js 里引入了一个 index.css 控制 
```
.avatar{
  height:100px;
  width:100px;
}
```

这样会全局都影响

假如你有一个组件里有 img也叫` .avatar` ，那么这个img也会受到影响

#### 如何避免 全局的css 影响组件

- 修改配置 `modules:true`开启css模块打包

```
{
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader:'css-loader',
        options:{
          importLoaders:2 ,// 这里的2 代表他后面的loader个数
          modules:true // 开启css模块打包
        }
      },
      'sass-loader',
      'postcss-loader'
    ]
}
```

index.js里这样修改

```
import style from 'index.css'

// 这样保证里  这个页面的 img 收这个样式影响
img.classList.add(style.avatar);
```

## 处理字体文件

- file-loader

```
{
  test: /\.(eot|ttf|svg)$/,
  use: 'file-loader'
}
```


