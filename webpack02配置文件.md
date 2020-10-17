# webpack配置文件

## 默认文件为webpack.config.js

```
npx webpack 的时候默认会读取 webpack.config.js 里的内容
```

指定打包用那个配置

```
npx webpack --config webpack.dev.config.js
```

### 一个简单的配置文件

```
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

### 执行 npx webpack 的内容解释

```
npx webpack
Hash: 4ab1f7dafc94ca662205
Version: webpack 4.44.2
Time: 177ms
Built at: 2020-10-16 22:14:37
   Asset       Size  Chunks             Chunk Names
build.js  956 bytes       0  [emitted]  main
Entrypoint main = build.js
[0] ./src/index.js 26 bytes {0} [built]
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

- Chunk Names 代表的意思是 entry 虽然 配置里`entry:'./src/idnex.js'`

等价于

```
entry:{
  main:'./src/index.js'
}
```

- 后面的 WARNING 是提示你没有提供 mode参数
  - 默认 mode 是 production，即压缩后的代码
  - mode:'development' 代码就是不压缩的
