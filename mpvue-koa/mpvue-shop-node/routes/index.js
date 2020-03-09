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

// 首页相关的接口
// controllers是个对象 这样可以拿到home中的index.js的绝对路径
router.get('/index/index', controllers.home.index)

// 搜索相关的接口
// 获取搜索历史和热门搜索的接口
router.get('/search/indexaction', controllers.search.index.indexAction)
// 将当前搜索内容存入数据库中的接口
router.post('/search/addhistoryaction', controllers.search.index.addHistoryAction)
// 清除历史记录的接口
router.post('/search/clearhistoryAction', controllers.search.index.clearHistoryAction)
// 搜索提示接口
router.get('/search/helperaction', controllers.search.index.helperAction)

module.exports = router