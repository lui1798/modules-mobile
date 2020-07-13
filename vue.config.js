/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 压缩
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const resolve = file => path.resolve(__dirname, file)

function resolves(dir) {
    return path.join(__dirname, '.', dir)
}

delete require.cache[require.resolve('./build/lib/auto-modules')];
const { getPages, getOutputDir, dealHtmlCdn } = require('./build/lib/auto-modules') //获取打包命令

module.exports = {
    configureWebpack: config => {
        // console.log("%c config","color:#00CD00",process)
        let plugins = [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            }),
            new WebpackBar({
                name: 'n22-prd',
                // color: '#4091FB'
             }),
        ];
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            //警告 webpack 的性能提示
            config.performance = {
                hints:'warning',
                //入口起点的最大体积--目前设置为1024KB
                maxEntrypointSize: 1024*1024,
                //生成文件的最大体积--目前设置为1024KB
                maxAssetSize: 1024*1024,
            };
            config.externals = {//提高首屏加载速度--使用cdn加载，不将以下库打入chunk-vendors文件。从而减小chunk-vendors文件大小。
                'allCodeData': 'AllCodeData',
                'jquery': 'jQuery',
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                // 'moment': 'moment'
            };
            let myTerserPlugin = new TerserPlugin({
                // cache: true,
                // parallel: true,
                // sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,//console
                        drop_debugger: false,
                        pure_funcs: ['console.log']//移除console
                    }
                }
            });
            let myCompressionPlugin = new CompressionPlugin({
                test:/\.js$|\.html$|\.css/,//匹配正则
                threshold: 10240, //超过大小进行压缩
                deleteOriginalAssets: false //是否删除原文件
            })
            if(process.env.npm_config_report){
                plugins.push(new BundleAnalyzerPlugin());
            }
            plugins.push(myTerserPlugin);
            plugins.push(myCompressionPlugin);
            return {
                plugins: plugins
            }
        } else {
            // 为开发环境修改配置...
            config.externals = {//提高首屏加载速度--使用cdn加载，不将以下库打入chunk-vendors文件。从而减小chunk-vendors文件大小。
                'allCodeData': 'AllCodeData',
                'jquery': 'jQuery',
            };
            return {
                plugins: plugins
            }
        }
    },
    transpileDependencies: [
        'fuse.js',
        'js-native-n22',
        'al-mobile',
    ],
    pages: getPages(),
    //----默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    //跨域设置
    devServer: {
        // 设置代理
        proxy: {
            '/apn': {
                target: 'http://3f0566757y.51vip.biz/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/apn': '/'
                }
            },
        },
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
    },
    //css-loader
    //eslint
    lintOnSave: true,
    //svg图标处理
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        // const svgRule = config.module.rule('svg')
        // svgRule.uses.clear()
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include.add(resolves('src/assets/icons')) //处理svg目录--只处理自定义的svg库
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            // .options({
            //     symbolId: '[name]'
            // })
        // const fontsRule = config.module.rule('fonts')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        // fontsRule.uses.clear()
        config.module
            .rule('fonts')
            .test(/\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/i)
            .exclude.add(resolves('src/assets/icons')) //处理svg目录--排除自定义svg库
        config.resolve.alias
            .set('@g', resolve('./'));
        config.resolve.alias
            .set('@', resolve('src'));
        config.resolve.alias
            .set('@@', resolve('modules/common'));
        config.resolve.alias
            .set('@t', resolve('modules/common/utils/tool'));
        config.resolve.alias
            .set('@m', resolve('modules'));

        //进行处理html中挂在的cdn--创建模块的时候会进行询问是否挂载cdn-默认是挂载
        dealHtmlCdn(config);
    },
    // ...other vue-cli plugin options...
    // baseUrl: './',//从 Vue CLI 3.3 起已弃用，请使用publicPath
    publicPath: './',
    outputDir: getOutputDir() || '../www', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: {
        //定制化的主题样式
        loaderOptions: {
            sass: {
                // @import "~@/assets/css/base.scss";--2019-06-18移除base至main.js加载（防止base.scss加载重复问题）
                prependData: `
                    @import "~@/assets/css/mixin.scss";
                    @import "~@/assets/css/vars.scss";
                `
            },
            stylus: {
                import: [
                    resolve('./src/assets/css/theme/n22-mobile')
                ]
                //stylus此处使用data不生效，使用官网建议resolve(暂时使用resolve)
                // data: `
                //     @import "@/assets/css/theme/n22-mobile.styl";
                // `
            },
        }
    },
}
