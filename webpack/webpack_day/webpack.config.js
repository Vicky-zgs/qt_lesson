const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./index.js",  // 指定打包的入口
  // 指定打包后的资源位置
  output: { 
    // publicPath: "https://cdn.baidu.com",  // 公共路径设置
    path: path.resolve(__dirname, "./build"),  // 打包后的文件路径
    filename: "index.js"      // 打包后的文件命名
  },
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
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      
      {
        test: /\.scss$/,  // loader是有执行顺序的, 从后往前
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      // 该插件将为你生成一个 HTML5 文件
      {
        template: "./index.html", // 指定模板
        title: "标题-自己取的", // 打包后的html文件的title
        filename: "app.html",  // 指定打包后的html文件的名字

      },
    )
  ] 
}