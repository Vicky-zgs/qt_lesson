# react
- npm i -g create-react-app 安装react脚手架
- create-react-app learn    创建项目 
- cd learn; -> npm i;   yarn start;/npm start

## Ant Design ： react的ui框架
- npm install antd --save  全局安装
- npm i react-app-rewired  按需引入

- config-overrides.js  按需加载antd需要的react配置文件
- package.json     修改一下(为了看效果，只有一部分功能)
- npm i 
- npm start

# react-router  关于react的路由的使用
  - app.js中引入: import { BrowserRouter as Router, Route, Link } from "react-router-dom"
  这是react最新版本的路由
  - 需要安装  npm i react-router-dom

# react-router-antd  antd的使用
  - npm install antd --save 安装可能失败 可以npm i 然后再安装一次

# blog 使用react + react-router-dom + antd 做一个博客网站
  - npm install antd --save
  - 使用less写样式, react中没有集成less, 所以 npm i less less-loader --save,
    安装完成后还需要配置, 即暴露被隐藏的bebal等配置文件 即 npm run eject,
    然后在config中的webpack.config.js中的38行添加上 |less
    然后85行加上less-loader
  - npm i react-router-dom

  - npm i react-particles-js 登录页面上的满屏小球球效果 还需要两个本地json文件(public中)

  - npm add react-loadable 路由的按需加载, 方便写路由  src/Router/

  - axios 接口请求 ( blog/src/api ) npm i axios 跨域了,接口用不了了, 还是用死数据

# react-hoc  高阶组件hoc的使用方法

# react-hook  hook是一个概念

# react-redux-learn       状态管理  Redux = flux + Reduce
  - npm add antd
  - npm install redux