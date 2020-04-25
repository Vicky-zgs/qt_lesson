// 开发环境和生产环境的共同配置

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require("webpack-merge")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")

const commonConfig = {
  entry: {
    // lodash: "./lodash.js",
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jp?g|gif)$/,
        use: {
          loader: "url-loader", 
          options: {
            name: "[name]_[hash].[ext]", 
            outputPath: "images/",
            limit: 73730
          }
        }
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },

      {
        test: /\.scss$/,  
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", 
      title: "标题-自己取的",
      filename: "index.html",
    }),
    new CleanWebpackPlugin()
  ],
}

// 如果是生产环境就合并生产环境的配置和公共配置，反之亦然
module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}