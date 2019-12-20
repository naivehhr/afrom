const path = require("path")
const srcRoot = "./src"
const HtmlWebpackPlugin = require("html-webpack-plugin") // 生成html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// console.log('??', process.env.NODE_ENV)
module.exports = {
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: "dist",
  //     })
  //   ]
  // },
  module: {
    // 加载器配置
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        use: [{ loader: "babel-loader" }],
        include: path.resolve(srcRoot)
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        include: /node_modules|antd\.css|lib|dist/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        exclude: /node_modules|antd\.css|lib|dist/,
        use: [
          // {
          //   loader: "style-loader"
          // }, // 用 MiniCssExtractPlugin 就不用style-loader了
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // libcss: ''
      filename: path.resolve("./dev/index.html"), // 生成的html文件存放的地址和文件名
      template: path.resolve("./index.html") // 基于index.html模板进行生成html文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  }
}
