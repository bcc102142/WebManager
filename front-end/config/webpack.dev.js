

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'none',
  entry: {
    index: './src/javascripts/index.js',
    admin: './src/javascripts/admin.js',
    changePassword: './src/javascripts/changePassword.js'
  },
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].js'
  },
  devServer: {  //服务器配置 wbpack-dev-server
    port: 8000,
    host: '',
    proxy: {
      '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
      }
  }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'static', to: 'static'
    }]),
    new HtmlWebpackPlugin({
      template: './src/index.html',//html文件的入口
      filename: 'index.html',//输出文件
      chunks: ['index'],// 引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入

    }),
    new HtmlWebpackPlugin({
      template: './src/admin.html',//html文件的入口
      filename: 'admin.html',//输出文件
      chunks: ['admin'],// 引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入

    }),
    new HtmlWebpackPlugin({
      template: './src/changePassword.html',//html文件的入口
      filename: 'changePassword.html',//输出文件
      chunks: ['changePassword'],// 引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入

    })
  ],
  module: {
    rules: [
      // loader的使用是从后向前的
      {
        test: /.(css|scss)$/,
        use: [
          'style-loader',// 把它拿出去
          'css-loader', // 找到引入的这些css代码
          'sass-loader' // 将引入的scss代码编译成css代码
        ]
      },
      {
        test: /.html$/,
        use: ['string-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?optional=runtime',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
        "@": path.resolve(__dirname, '../src'),
        "@controllers": path.resolve(__dirname, '../src/javascripts/controllers'),
        "@modules": path.resolve(__dirname, '../src/javascripts/modules'),
        "@api": path.resolve(__dirname, '../src/javascripts/api'),
        "@models": path.resolve(__dirname, '../src/javascripts/models'),
        "@utils": path.resolve(__dirname, '../src/javascripts/utils'),
        "@views": path.resolve(__dirname, '../src/javascripts/views'),
        "@assets": path.resolve(__dirname, '../src/assets'),
        "@styles": path.resolve(__dirname, '../src/stylesheets'),
        "@router": path.resolve(__dirname, '../src/javascripts/router'),
    }
}

}