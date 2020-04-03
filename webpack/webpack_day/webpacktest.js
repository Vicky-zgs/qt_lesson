const path = require('path')

module.exports = {
  entry: "./index.js",  // 指定打包的入口
  output: { // 指定打包后的资源位置
    path: path.resolve(__dirname, "./build"),  // 打包后的文件路径
    filename: "lm.js"      // 打包后的文件命名
  }
}