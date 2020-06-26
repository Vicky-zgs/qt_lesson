// 启动一个koa后端服务, 同时启动next服务 (相当于把next变成koa的中间件)
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'  // 获得当前的环境(开发环境)
const app = next({ dev })
const handle = app.getRequestHandler()  // 可以处理http请求

// app.prepare().then(() => {  // prepare执行后也就是react中的组件都编译好了, 然后再创建koa的服务
  const server = new Koa()
  const router = new Router()

  router.get('/test/:id', (ctx) => {
    // ctx.body = `<p>request /test ${ctx.params.id}</p>`
    ctx.body = { success: true }
    ctx.set('Content-Type', 'application/json') // 告诉浏览器我传的是json
  })

  server.use(async (ctx, next) => {
    // const path = ctx.path  // 请求路径
    // const method = ctx.method   // GET/POST,默认是GET
    // ctx.body = `<span>Koa Render ${method} ${path}</span>`
    await next()   // 不执行next() 后面的中间件也不会执行
  })

  // 
  server.use(router.routes())

  // server.use(async (ctx, next) => {
  //   ctx.body = '<span>Koa Render2</span>'
  // })

  // server.use(async(ctx, next) => { // 中间件就是一个函数
  //   await handle(ctx.req, ctx.res)
  //   ctx.respond = false
  // })

  server.listen(3000, () =>{
    console.log('koa server listening on 3000')
  })
// })