# webpack 是模块化的打包机制, 默认只能实现js模块, 所以需要集成额外功能, 引用不同的 loader实现不同的打包模块的功能
  - npm init -y
  - npm i webpack webpack-cli --save-dev
  - npx webpack -v   (4.42.1)
  - npm info webpack  (查看现在装的webpack的信息)

  # index.js  入口文件 
    - 所有其他文件都要在index.js中引入 这样才能将这些文件都打包, 默认打包到dist文件夹中的main.js
      - 打包命令： npx webpack index.js
  # webpack.config.js  默认的配置文件
    - 手动创建, 自己额外添加配置
    - 必须遵从CommonJS规范
    - 有了这个配置文件后 打包命令： npm webpack
    # webpacktest.js  自定义名字的配置文件
      - 也可以写配置, 不过这样打包时的命令为:
        npx webpack --config webpacktest.js
  # 修改package.json中的scripts为bundle
    - 那么使用命令npm run bundle也可以成功打包
  # npm i file-loader -D 打包不认识的模块时需要下载各自的loader
    
  # 各种loader
    - file-loader 将文件发送到输出文件夹，并返回（相对）URL
    - url-loader  功能类似于 file-loader,但是在文件大小（单位 byte）低于指定的限制时,可以返回一个 DataURL
      例如配置文件中limit可以限制可转换为base64的图片大小, 若转换了则不会生成images文件夹
    - css-loader , style-loader
    - sass-loader 
      - 执行命令npm install sass-loader node-sass -D时一直报错
        - 解决方法：
          1. 切换国内镜像npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
          2. 安装npm install sass-loader node-sass -D
          3. 再次安装依赖npm i
          4. 重新打包npm run bundle
    - postcss-loader 相当于css的框架
      - 本来用了这个就可以不写css-loader, 但如果要在css文件中使用@import, 那么在配置文件中use里要加上css-loader
      - postcss.config.js 专门的配置文件
      - 使用postcss可能还需要安装别的东西,例如npm i autoprefixer -D

# plugins
  相当于生命周期的概念, 在webpack构建的过程中(某一个特定的时间段),通过plugins这个属性往webpack中植入某个插件的逻辑(扩展的逻辑), 以改变我们的构建结果 
  - HtmlWebpackPlugin 简化了HTML文件的创建，以便为你的webpack包提供服务
    - 会帮我们在打包后创建一个html文件,并且把打包后的模板自动引入这个html文件,
      也可以使用 template 配置使用自己的模板(例根目录下的index.html为模板) 
  - title, 需要将模板index.html中的title改成 <%= htmlWebpackPlugin.options.title %>, 这样配置的title名才会在打包后的index.html中显示