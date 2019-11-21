const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.config");
const path = require("path");
module.exports = merge(baseWebpackConfig, {
  mode: "production",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "blueui.js",
    library: "blue-ui",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "postcss-loader",
            options: {
              options: {}
            }
          },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css"
    })
  ]
});
