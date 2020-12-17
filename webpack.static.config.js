const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const basePath = path.resolve(__dirname);

module.exports = {
  context: basePath,

  entry: {
    landingApp: "./LandingPageApp.js",
  },

  output: {
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[id].[chunkhash].bundle.js",
    publicPath: "/static/dist/",
    path: __dirname + "/dist",
  },

  resolve: {
    modules: ["node_modules"],
  },

  devtool: "cheap-module-source-map",

  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      filename: "landing_page.html",
      template: "!!prerender-loader?string!landing_page.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              compact: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /.(svg)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.svgin$/,
        use: "svg-inline-loader",
      },
    ],
  },
};
