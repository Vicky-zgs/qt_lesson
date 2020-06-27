# 使用 next.js 写github  (参考next.js官网)  手动创建项目
  - React, Next.js, koa2, 同构项目, toc(面向所有人), OAuth(授权体系), React Hooks, koa, redis(非关系数据库)
- npm init 
- npm i react react-dom next  安装react、react-dom、next
- 在package.json中添加几行代码 
- npm run dev / yarn dev
- yarn add koa-router

ps: next.js不支持css
- 创建next.config.js
- yarn add @zeit/next-css  让next.js可以支持css的引入

- yarn add antd
- yarn add babel-plugin-import   使用babel按需加载要使用到的antd组件
- 创建pages/_app.js 将antd引入


- next.js的页面必须都放在pages文件夹里

server1.js (koa使用示例) :
  - 启动一个koa后端服务, 同时启动next服务 (相当于把next变成koa的中间件)
  - 然后修改一下package.json中的"dev": "next" , 使用yarn dev/node server.js 启动项目 即启动server.js


# nextjs中的文件夹
- pages 文件夹
  每个js文件夹都会自动生成一个页面
- components 文件夹
  多个页面可复用的组件
- lib 文件夹
  公用代码 例如防抖节流的功能型代码
- static 文件夹
  公用的静态资源(图片之类的)
- next.config.js 配置文件

# 路由跳转
  (父组件引入)
  - import Link from 'next/link'  例如pages/index.js, 直接点击跳转
    nextjs的Link标签和react不一样 Link标签不能放空也不能放兄弟组件
  - import Router from 'next/router'  自定义路由跳转
  ## 动态路由(跳转页面并且传递参数)
  - 只能通过query传参
  - (子组件引入 用来接收参数)
    import { withRouter } from 'next/router' , 例如pages/a.js
    withRouter 会将 router 以参数形式传递给组件，router上就有父组件传来的数据,例如router.query.id
  - 需要传值的路由跳转可以进行路由映射，使得显示的路由地址更友好，但这样重新刷新会报404，要在KOA中处理这个问题

# Router 钩子
  - history跳转执行的钩子
    routeChangeStart
    routeChangeComplete
    routeChangeError
    beforeHistoryChange
  
  - 哈希路由跳转执行的钩子
    hashChangeStart
    hashChangeComplete

# getInitialProps 挂在组件上的一个静态方法，主要用来数据获取
  - 只有在pages文件夹中的文件使用这个方法才有效, 在其他文件夹写无效
  - 在页面上点击 检查->Network->1->Preview 如果Preview中有数据，说明是服务器端页面渲染（不是前端请求数据）
  - 使用了getInitialProps方法的话，拿到数据后才会进行页面跳转

# 自定义app
  - _app.js
    使用静态方法getInitialProps, 并且要获取子组件中getInitialProps获取的数据, 然后当作自己的数据传给子组件

# document    css-in-js
  - 通常是服务端渲染时使用

# Hooks  让函数组件具有类组件的能力
