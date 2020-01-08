"use strict";
const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.config");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  entry: {
    docs: "./docs/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: "/"
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: './dist',
    open:'http://localhost:8085',
    port: 8085,
    publicPath: "/",
    noInfo: true
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "cheap-module-eval-source-map",
  // these devServer options should be customized in /config/index.js
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./docs/index.html"
    })
  ]
});

module.exports = devWebpackConfig;
