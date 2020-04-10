const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    // 给前端返回一个json数据
    name: '旅梦',
    age: '5',
    msg: '欢迎来到旅梦全栈课程'
  })
})

app.listen("3000")