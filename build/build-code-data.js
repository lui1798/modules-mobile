/* eslint-disable */
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development", //打包为开发模式
  entry: "./modules/common/data/codedata/index.js", //入口文件,从项目根目录指定
  output: {
    //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
    // libraryTarget: 'window',
    library: "AllCodeData",
    // libraryTarget: 'commonjs2',
    // libraryTarget: 'amd',
    libraryTarget: "umd",
    path: path.resolve(__dirname, "../public/static/codedata"), //将js文件打包到public/static/codedata的目录
    filename: "codedata.min.js"
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        use: "bable-loader"
      }
    ]
  },
  plugins: [
    new TerserPlugin({
      // cache: true,
      // parallel: true,
      // sourceMap: true, // Must be set to true if using source-maps in production
      terserOptions: {
        compress: {
          warnings: false,
          drop_console: true, //console
          drop_debugger: false,
          pure_funcs: ["console.log"] //移除console
        }
      }
    }) //压缩js
  ]
};
