/* eslint-disable no-lone-blocks */
'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// 分析包内容
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = 9528 // dev port
// 当不是生产服的时候要把测试服的地址填写到 VUE_APP_BASE_API_URL里
if (process.env.npm_lifecycle_script === 'vue-cli-service build') {
  process.env.VUE_APP_BASE_API_URL = ''
}
// console.log(process.env)
// console.log(process.env.npm_lifecycle_script)
const Version = new Date().getTime()
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */

  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/variable.styl')
      ]
    }
  },
  devServer: {
    port: port,
    disableHostCheck: true,
    compress: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dev-api': {
        secure: true,
        proxyTimeout: 10 * 60 * 1000,
        timeout: 10 * 60 * 1000,
        target: 'http://mapi.jiaao.ltd/exterminate-dalek',
        // target: 'http://mapi.jiaao.ltd/alice',
        // target: 'http://192.168.1.19:7001', //任
        // target: 'http://192.168.1.121:17061', //熊超
        // target: 'http://192.168.1.14:7001', //大蒙
        // target: 'http://192.168.1.103:10068', //帅举

        // target: 'http://192.168.1.218:8080', //星宇
        // target: 'http://192.168.1.9:6973/', //吴东

        // target: 'http://192.168.1.121:17061', // 超
        // target: 'http://192.168.1.40:6973', // 叶
        // target: 'http://192.168.1.14:7800', // 蒙 资讯本地
        // target: 'http://gapi.jiaao.ltd', // 蒙 资讯测试
        // target: 'http://mapi.jiaao.ltd/flag', // 蒙 标签测试
        // target: 'http://192.168.1.14:10088', // 蒙 标签本地
        // target: 'http://192.168.1.181:8000/alice', // 星宇
        // target: 'http://192.168.1.218:8080', // 星宇
        // target: 'http://aliceapi.bbc.cn:6973/', // 帅
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/dev-api': ''
        }
      }

    }
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'Alice',
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-source-map' : 'source-map',
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: `static/js/[name].${Version}.js`,
      chunkFilename: `static/js/[name].${Version}.js`
    },
    plugins: [
      new MiniCssExtractPlugin({
        // 修改打包后css文件名
        filename: `static/css/[name].${Version}.css`,
        chunkFilename: `static/css/[name].${Version}.css`
      })
      // new BundleAnalyzerPlugin()
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ]
    },
    resolve: {
      alias: {
        // vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src')

      }
    }
  },
  chainWebpack(config) {
    {
      {
        [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              // presets: ['es2015']
              'presets': [
                [
                  '@babel/env',
                  {
                    'modules': 'commonjs', // 设置ES6 模块转译的模块格式 默认是 commonjs
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
            }
          }
        ]
      }
    }
  }
}
