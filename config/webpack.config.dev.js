const path = require("path")
const merge = require("webpack-merge")
const commonConfig = require("./common")
module.exports = merge(commonConfig, {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  // 输出配置
  output: {
    path: path.resolve(__dirname, "../dev"),
    filename: "[name].js"
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // 配置webpack-dev-server， 在本地启动一个服务器运行
    host: "localhost", // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 8088, // 端口
  }
})
