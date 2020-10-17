# 优化打包速度

## 如何提升webpack打包速度

- 提升 node版本
- 尽可能少的让你的模块使用 loader
  - loaders里使用 inclued 或者  `exclude: '/node_modules/',`
- 尽可能使用 plugin 
  - OptimizeCSSAssetsPlugins 对CSS压缩

### resolve 参数

```
//webpack.config.js里
resolve:{
  extensions:['.js','.jsx']
  // 别名
  alias:{
    abc:path.resolve(__dirname,'./src/a/b/c')
  }
}

// 代码里可以这样
import xx from './common/xx'
// 先去寻找 xx.js 然后在找 xx.jsx


import abc from 'abc' // 匹配别名里的路径
```