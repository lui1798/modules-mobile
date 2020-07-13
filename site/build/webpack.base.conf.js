'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { mbConfig } = require('./bin/utils')

// const publicPath = '/docs/';
const publicPath = './';

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const htmlPluginOption = {
  template: `index.html`,
  title: mbConfig.title,
  subtitle: mbConfig.subtitle,
  logo: mbConfig.favicon,
  chunksSortMode: 'dependency'
}

module.exports = {
  entry: {
    app: [`${mbConfig.output}/config.js`, `./theme/${mbConfig.theme}/main.js`],
  },
  externals: {//提高首屏加载速度--使用cdn加载，不将以下库打入chunk-vendors文件。从而减小chunk-vendors文件大小。
    'allCodeData': 'allCodeData',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? config.build.assetsPublicPath
    //   : process.env.NODE_ENV === 'testing'
    //     ? '/mand-mobile/'
    //     : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '@examples': resolve('../examples'),
      '@theme': resolve('./theme'),
      '@g': resolve('../'),
      '@': resolve('../src'),
      '@@': resolve('../modules/common'),
      '@t': resolve('../modules/common/utils/tool'),
      '@m': resolve('../modules'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('theme'), mbConfig.output]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-sprite-loader',
      //   include: [resolve('../examples/assets/images')]
      // },
      { //2、把地下这个对象添加进去
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('../src/assets/icons')],
        options: {
          symbolId: '[name]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(Object.assign({}, htmlPluginOption, {
      filename: 'index.html',
      publicPath: publicPath,
    })),
    new HtmlWebpackPlugin(Object.assign({}, htmlPluginOption, {
      filename: 'index.gitee.html',
      publicPath: publicPath,
    })),
  ]
}
