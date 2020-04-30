# egg
  - mkdir egg-example && cd egg-example
  - npm init egg --type=simple
  - npm i
  - npm run dev 启动项目
  - npm i egg-cors  解决跨域

  ## controller/user.js
    - index()中通过ctx.query获取参数, 是直接在浏览器的url后写/user?username=蜗牛
    - getId()中通过ctx.params获取参数, 要在配置路由的router.js写/:id,然后url后写 /123
  
  