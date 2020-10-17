module.exports = function (source) {
  console.log(this.query) // 对应loader的 option
  return source.replace('abc', this.query.name)
}

/*
// 处理异步
module.exports = function (source) {
  const options = { ...this.query }// 对应loader的 options内容
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace('abc', options.name);
    callback(null,result)
  }, 100);
}
*/

