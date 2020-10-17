## TreeShaking

- 把你代码里引入的部分加入打包，未用到的不参与打包
- 只支持 ES Module 的引入方式
  - import 是静态引入
  - CommonJS是动态引入所以不支持(require)

### 配置 TreeShaking

> 如果 mode 是 dev环境

webpack.config.js里

```
// 添加参数
optimization:{
  usedExports:true
}
```


> **如下场景要适配**

- xxx.js里

```
import '@babel/polyfill'
// 本质是 window.Promise = xxx ,全局变量绑定一些内容
// Tree Shaking 会把它忽略

import {add} from '.math.js'

add(1,2);
```

package.json 里，添加白名单

```
"sideEffects":["@babel/polly-fill"]
// tree shaking 一般会在你模块 js里 忽略到 css文件
"sideEffects":["*.css"]


// 默认为 false
```

#### 注意事项

在 mode为 development 时，即使设置了

```
optimization:{
  usedExports:true
}
```

生成的文件里依然包含 引入模块的所有代码，但是会标记出哪些是 使用的

- 因为 开发模式要做一些调试，所以 TreeShaking 会保留哪些代码
- production 模式可以不设置 optimization ，默认的

## develoment 和 production 模式区分打包

### webpack-merge 模块

- webpack配置合并功能
- 参考D008dev_prod代码

## Code Splitting

- 代码分割

> 场景

```
import _ form 'lodash' // 1mb

// 业务逻辑 1mb 代码

// 此时打包文件会 很大 2MB,页面加载会变慢
```

### 添加配置(同步代码分割)

```
optimization:{
  splitChunks:{
    chunks:'all'
  }
}
```

### 异步的代码分割

- 会把异步加载的文件单独生成一个js

```
function xx(){
  return import('loadsh').then(({default:_})=>{
    console.log(_.join(['a','b'],'-'))
  })
}

xx.then(()=>{
  console.log('aaa')
})
```

- import 这个异步方式导入需要一个插件

```
npm i babel-plugin-dynamic-import-webpack
```

- 配置这个插件`.babelrc`

```
{
  presets:[],
  plugins:["dynamic-import-webpack"]
}
```

### splitChunks

```
// 这样写，会有一个默认的 splitChunks 配置 参考 webpack文档
optimization:{
  splitChunks:{
    chunks:'all'
  }
}
```

## Lazy Loading 懒加载和 chunk是什么？

- 懒加载就是类似 import 这种异步加载

> chunk 就是

- 代码分割后的没一个js文件就是 chunk

### Preloading设置

```
function xx(){
  return import(/* webpackPrefetch:true */'loadsh').then(({default:_})=>{
    console.log(_.join(['a','b'],'-'))
  })
}

loginBtn.addEventListener('click',()=>{
  xx();
})
```

> 场景，某网站登录按钮会出现弹出窗口

- 这个弹出窗口 如果是异步 import 就会点击按钮的时候 触发加载,这样会慢
- 如果加上`webpackPrefetch:true` 代表 页面其他资源都加载后在加载



