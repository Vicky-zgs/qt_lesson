// 在node中,  tcp协议,  基于net模块来实现 : 
// 服务端

const net = require('net')
const fs = require('fs')

// 创建一个服务器
// 1. 监听地址和端口 
// 2. 处理发送到当前监听地址以及端口的数据
// 3. 返回(发送) 数据到连接的客户端

// function createServer() {
//   let s = new net.Server()
//   s.on('connection', callback)
//   return s
// }
// 相当于：
const server = net.createServer(() => {
  // 这个函数其实就是connection事件绑定的函数
})

// 有客户端连接的时候触发
server.on('connection', (socket) => {
  // socket 当前连接的socket对象
  console.log('有人连接了')

  // 传数据
  // 发送图片
  let data2 = fs.readFileSync('./server/cat.jpg')
  console.log(data2)
  socket.write(data2)
  socket.end() // 数据接收完成(客户端)

  // 接收数据
  socket.on('data', data => {
    // socket.write('show me the money')
  })
})

// 监听地址及端口
// server.listen(12345, '192.168.2.100')
server.listen(1234, '127.0.0.1')  // 通配