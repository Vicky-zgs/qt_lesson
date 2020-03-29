// 客户端

const net = require('net')

// 创建客户端与udp不同
// net.Socket
// 1. new net.Socket()
// 2. net.createConnection()

// 要连接的目标主机的地址与端口号
const clientSocket = net.createConnection(1234, '127.0.0.1')

// 监听数据传输 (服务端传过来 或 传过去)

clientSocket.on('data', data => {
  // 接收
  // console.log('服务器返回：' + data)
  console.log('数据：' + data)

  // 传数据
  // clientSocket.write('get money')
})

// 当数据接收完成的时候触发
clientSocket.on('end', () => {
  console.log('数据包接收完成')
  
  // 把接收到的数据组合起来
  
})