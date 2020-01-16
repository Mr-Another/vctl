const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.config");
const path = require("path");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  entry: {
    docs: "./docs/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/pro/"
  },
  module: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./docs/index.html"
    })
  ]
});
