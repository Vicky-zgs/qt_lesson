// entry： 入口文件
// module：模块，webpack里一切皆模块，一个模块对应一个文件
// chunk：代码块，对应多个module。
// loader：模块转换器，用于模块内容的转换。
// plugin：插件，在构建流程中监听特定的事件来做一些处理。

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  mode: "development",
  // mode: "production",
  entry: "./lodash.js",  // 指定打包的入口
  // 指定打包后的资源位置
  output: {
    // publicPath: "https://cdn.baidu.com",  // 公共路径设置
    path: path.resolve(__dirname, "./dist"),  // 打包后的文件路径
    filename: "index.js"      // 打包后的文件命名
  },
  devtool: "cheap-module-eval-source-map", // 开发环境
  // devtool: "cheap-module-source-map", // 线上环境
  module: {
    // 遇到不认识的模块, 就在这里找loader
    rules: [
      {
        test: /\.(png|jp?g|gif)$/,
        use: {
          loader: "url-loader", // file-loader就是把模块, 放在了另外一个目录里面, 并且把位置给我们返回过来
          options: {
            // name 是打包前模块的名称, ext是打包前的模块格式
            name: "[name]_[hash].[ext]",   // touxiang.jpg
            outputPath: "images/",     // 打包的内容放这个文件夹下
            // url-loader可以限定模块的体积, 根据体积判断是否需要转换base64, 减少http请求
            limit: 73730
          }
        }
      },

      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader", "postcss-loader"]
        // 如果用mini-css-extract-plugin 就不需要style-loader了, 如下
        // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        use: ["style-loader", "css-loader", "postcss-loader"]
      },

      {
        test: /\.scss$/,  // loader是有执行顺序的, 从后往前
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        // 使用babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,   // 检测时排除掉依赖里的js
        use: {
          loader: "babel-loader",
          // options: {
          //   // "presets": [
          //   //   [
          //   //     "@babel/preset-env",
          //   //     {
          //   //       useBuiltIns: "usage", // 按需加载
          //   //       corejs: 2
          //   //     }
          //   //   ],
          //   // ],
          //   "plugins": [["@babel/plugin-transform-runtime"]]
          // }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 该插件将为你生成一个 HTML5 文件
      template: "./index.html", // 指定模板
      title: "标题-自己取的", // 打包后的html文件的title
      filename: "index.html",  // 指定打包后的html文件的名字
    }),
    // 在打包前 先把上次生成的目录删除
    new CleanWebpackPlugin(),
    // 将项目中的css抽离出来打包, 还要把style-loader改成MiniCssExtractPlugin.loader
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // })
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 实时更新
    contentBase: "./dist",
    open: true, // 自动打开浏览器
    hot: true,  // 模块热替换
    hotOnly: true,  // 即使热替换不生效, 浏览器也不自动刷新
    port: "8081",
    // 跨域代理
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  optimization: {
    usedExports: true
  }
}