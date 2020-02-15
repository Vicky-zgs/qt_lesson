const Koa = require('koa')
// const Router = require('koa-router') // 路由
const config = require('./config')

const app = new Koa()
// const router = new Router()

// 路由,    相当于 定义一个接口 为了可读性强 一般不写在这里 写在routes里
// router.get('/index', (ctx, next) => {
//   ctx.body = 'hello world'
// })

// 引入路由
const router = require('./routes')

app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})
