class CopyRightWebpackPlugin {
  constructor() {
    console.log('插件被使用了')
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
      console.log(123);
      // 往打包目录 添加 copyright.txt
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright by hjx'
        },
        size: function () {
          return 16
        }
      }
      cb();
    })
  }
}

module.exports = CopyRightWebpackPlugin