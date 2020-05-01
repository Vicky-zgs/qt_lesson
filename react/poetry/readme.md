# 古诗词前端
- npm install antd --save
- npm i react-router-dom
- npm i less less-loader --save
- npm i react-particles-js
- npm install react-loadable

 (4.25)
- npm i axios 接口请求
(4.29)
- npm i redux
- npm i --save react-redux
- npm i immutable

# pages
  admin中的页面与用户相关, web是网页
  - admin/login 登录页面
  - web/layout 主页面
  - web/list   主页面中的展示列表组件


5.1 记录
- 接下来要写管理员的管理页面，写个table组件，放到管理组件的content里，然后每次点击不同的submenu就改变当前页面的state中的url，传不同的url接口给table，就可以传回来不同的数据