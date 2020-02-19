# 使用mpvue、koa框架和sql开发小程序(使用vue的语法)
  ## mpvue-shop
    - 创建一个文件夹，根据mpvue官网(5分钟上手)中的命令创建一个项目
    - npm i 
    - npm run dev
    - 出现一个dist文件夹 导入微信开发者工具可看效果
    - npm install less less-loader --save 安装less并配置文件
    - 获取地理位置：amap-wx网站 需要下载amap-wx.js放在utils里面
  ## mpvue-node
    - 使用Koa做后台的数据请求和接口的建设，提供数据给前端小程序使用
    - npm init 
    - npm i koa
    - npm i koa-router

# other
## 1-5集(前端)
  - store文件夹中装的是vuex,存放数据,store中的index.js定义了vuex后要在main.js中引入
    使用vuex时需要引入:  import { mapMutations } from 'vuex', 然后在methods中解构
    若在主页面中想取数据用 需要 : import { mapState } from 'vuex',再在computed中解构:...mapState(['cityName'])
  - 方便起见，需要在utils中的index.js中封装请求，以便数据的请求，需要请求时需import

## 后端
- npm install nodemon -D  -> nodemon app.js  后端项目自动刷新
  - app.js 简单搭建
  - routes/app.js 接口(路由)
  - controllers   控制层(控制不同功能需要用到的代码) 其中的index.js中的方法用来获取各种文件的绝对路径
  - mysql准备： 
    - 进入mysql server/bin中打开cmd,输入mysql -u root -p,输入密码
    - show databases;
    - create database nodemysql;  创建数据库
    - use nodemysql;  使用数据库
    - source F:/******;    导入数据库
    - vscode/mpvue-shop-node中
      - 创建mysql.js  设置基础配置  (knex.js: npm i knex) 
      - 创建config.js 设置启动端口
