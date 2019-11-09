const http = require('http')

http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.writeHead(200, {
    'content-type': 'application/json',
    // 设置响应头
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-auth, content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    // 允许 cookie 传输的
    'Access-Control-Allow-Credentials': true 
  })
  // res.end(JSON.stringify({
  //   bookName: 'php'
  // }));

  // jsonP风格返回字符串
  res.end(`
    getBook(${JSON.stringify({bookName: 'php'})})
  `)
})
.listen(3000, () => {
  console.log('server is running');
})