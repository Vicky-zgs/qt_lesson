const router = require('koa-router')({ // 路由
  // 加路由前缀  http://localhost:5757/lm
  prefix: '/lm'
})
// const router = new Router()

// 发送数据给前端的这部分代码写到控制器controllers里
// router.get('/index/index', (ctx, next) => {
//   ctx.body = 'hello world'
//   // 从数据库获取数据返回给前端 
// })

// 这个controllers拿到的是index.js中的函数返回的一个对象
const controllers = require('../controllers/index')

// controllers是个对象 这样可以拿到home中的index.js的绝对路径
router.get('/index/index', controllers.home.index)

module.exports = router