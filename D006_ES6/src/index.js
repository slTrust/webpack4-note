import '@babel/polyfill'

const a = 1;
function myAsyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random();
      if (0.5 - num > 0) {
        resolve(num);
      } else {
        reject(num);
      }
    }, 200)
  });
};

myAsyncFunction().then((num) => {
  console.log('success:' + num)
}, (num) => {
  console.log('fail:' + num)
})