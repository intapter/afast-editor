const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.af",
  mode: "development",
  output:{
    path: path.resolve(__dirname, "../artifact/src"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      'afast-boot': 'D:/linqin.zhong/Desktop/workspace/afast-project/packages/afast-boot'
    },
  },
  devtool: "source-map",
  devServer: {
    static: "dist",
    port: 6600,
    historyApiFallback: {
      rewrites: [
        {
          from: /.+/,
          to: '/'
        },
      ]
    },
    proxy:[
      {
       context: ['/api'],
       target: 'http://localhost:6645',
       pathRewrite: {
        '^/api': ''
       }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.module.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              esModule: false
            },
          },
          "less-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              esModule: false
            },
          },
          {
            loader: "sass-loader"
          },
          "postcss-loader",
        ],
        sideEffects: true,
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.af$/,
        use: "D:/linqin.zhong/Desktop/workspace/afast-project/packages/afast-loader-react",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
