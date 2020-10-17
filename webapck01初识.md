# webapck4

## 版本依赖

```
webpack@4.25.1
webpack-cli@3.1.2
```

### 模块打包工具

打包例子参考 D001 代码

- abc.js模块

```
function Abc(){}
// 导出模块
export default Abc;
```

- index.js 入口文件

```
// 倒入 Abc 模块
import Abc from 'abc.js'
```

- 打包 `npx webpack index.js`

### 模块规范

- ES Moudule 规范
- CommonJS
- CMD
- AMD

> CommonJS 引入模块方式

- abc.js

```
function Abc(){}
// 导出模块
module.exports =  Abc;
```

- index.js 

```
var Abc = require('abc.js')
```

**webpack 是一个模块打包工具**,随着发展除了js，现在 svg\img\css 都可以打包


#### 参考阅读

- [webpack官网Modules章节](https://webpack.js.org/concepts/modules/)
