// 这个入口文件中的代码最终都会被打包到build/index.js中

import a from './a'
import b from './b'
import pic from './img/touxiang.jpg'
import './index.css'

var img = new Image()
img.src = pic
img.classList.add('pic')
var root = document.getElementById('root')
root.append(img)

console.log(pic)

// 既然webpack默认只认识js模块, 那么遇到非js模块该怎么办?
// loader
a()
b()

function lm() {
  console.log('welcome to lm')
}

lm()