// 开发环境的配置

const webpack = require('webpack')
// const merge = require('webpack-merge')
// const commonConfig = require("./webpack.common")

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    open: true, 
    hot: true,
    hotOnly: true,
    port: "8081",
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      // 代码分割
      chunks: "all",
      minChunks: 2,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: "lodash.js",
          priority: -10   // 优先级  数字越大, 优先级越高
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

// module.exports = merge(commonConfig, devConfig)
module.exports = devConfig