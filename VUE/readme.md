# 安装VUE
  1. 全局(cmd)
  - npm -v
  - npm install -g vue-cli
  - vue -V  (2.9.6)
  2. 在VUE文件夹中打开cmd
  - vue init webpack vue-router
  - 选择 Y N N N 
  3. 在刚建立的vue-router文件夹中
  - cd vue-router
  - npm run dev
  4. 在浏览器输入 localhost:8080 会出现vue页面

# 写VUE时注意事项
  - 写子路由前的配置: 在router中的index.js中import相关路由,再在下面配置;
                    在APP.vue用<router-link to="/ratings">