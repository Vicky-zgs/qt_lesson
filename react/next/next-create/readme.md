# nextjs-GitHub 手动创建项目
# 当前文件夹： npx创建next.js项目 写一个github网站
  - npm i -g create-next-app  全局安装脚手架
  - npx create-next-app next-create   创建项目
  - yarn add next react react-dom
  - yarn dev

# nextjs 作为koa的中间件使用
  nextjs是react进行服务端渲染的一个工具，默认以根目录下的pages为渲染路由
  数据接口、数据库的连接、session状态 是nextjs无法解决的 => 使用koa