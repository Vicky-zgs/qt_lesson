var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-type": "text/html"})
  const myreadstream = fs.createReadStream(__dirname + '/views/http_demo.html', 'utf-8')
  myreadstream.pipe(res)
})

var io = require('socket.io')(server)

io.on("connection", function (socket) {
  console.info('一个socket连接成功了')
  socket.on('link_to_server', function (msg) {
    console.info(`我收到一个问题${msg}`)
    // 发送给客户端
    // socket.emit('link_to_client', 'of course')
    io.emit('link_to_client', msg)
  })
})

server.listen(8888)
console.log('server is running...')