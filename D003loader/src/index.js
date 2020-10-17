import './index.scss';

// 除了可以这样
// var avatar = require('./1.jpg');
// 还可以这样
import avatar from './1.jpg';

var img = new Image();
img.src = avatar;
console.log(avatar)

var root = document.getElementById('root')
root.append(img);