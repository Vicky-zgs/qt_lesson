// 这个入口文件中的代码最终都会被打包到build/index.js中

import a from './a'
import b from './b'
import pic from './img/touxiang.jpg'
import './index.css'

import axios from 'axios'

var img = new Image()
img.src = pic
img.classList.add('pic')
var root = document.getElementById('root')
root.append(img)

// consle.logs(pic)    // 测试devtool的调试作用

// 既然webpack默认只认识js模块, 那么遇到非js模块该怎么办?
// loader
a()
b()

// 本来会出现跨域问题(浏览器的同源策略)
// 因为前端的代码请求的是8081服务器上的数据, 但这个服务器上没有数据
// 但是服务器之间没有同源策略, 所以使用代理(devServer配置中的proxy属性)
// webpack会帮你请求localhost:3000端口上的数据再提供给前端的服务器
axios.get('/api/info').then((res) => {
  console.log(res)
})

function lm() {
  console.log('welcome to lm')
}

lm()