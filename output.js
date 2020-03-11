{
  mode: 'development',
  context: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/www',
    filename: 'assets/js/[name].js',
    publicPath: '',
    chunkFilename: 'assets/js/[name].js'
  },
  resolve: {
    alias: {
      '@': '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules',
      '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules',
      '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/.cache/vue-loader',
              cacheIdentifier: '40be8a3a'
            }
          },
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/.cache/vue-loader',
              cacheIdentifier: '40be8a3a'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'assets/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'assets/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/i,
        exclude: [
          '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/icons'
        ],
        use: [
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'assets/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                '
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                '
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                ',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                ',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                ',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.26.2\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.1\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    },
                    cli_pkg_main_0_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    }
                  },
                  prependData: '\n                    @import "~@/assets/css/mixin.scss";\n                    @import "~@/assets/css/vars.scss";\n                ',
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/stylus-loader/index.js',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  'import': [
                    '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/css/theme/n22-mobile'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/stylus-loader/index.js',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  'import': [
                    '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/css/theme/n22-mobile'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/stylus-loader/index.js',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  'import': [
                    '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/css/theme/n22-mobile'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/stylus-loader/index.js',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack',
                  'import': [
                    '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/css/theme/n22-mobile'
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/.cache/babel-loader',
              cacheIdentifier: '23089009'
            }
          },
          {
            loader: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/node_modules/babel-loader/lib/index.js'
          }
        ]
      },
      /* config.module.rule('svg-sprite-loader') */
      {
        test: /\.svg$/,
        include: [
          '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/src/assets/icons'
        ],
        use: [
          {
            loader: 'svg-sprite-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_NAME: '"N22-local"',
          VUE_APP_ENV: '"local"',
          VUE_APP_VERSION_NATIVE_ANDROID: '"V1.001.002"',
          VUE_APP_VERSION_NATIVE_IOS: '"V1.000.001"',
          VUE_APP_VERSION_H5: '"V1.000.001"',
          VUE_APP_CHECK_VERSION: '"2"',
          VUE_APP_rootUrl: '"http://show.n22.com.cn:8785/api/@module/uat"',
          VUE_APP_rootFileUrl: '"http://show.n22.com.cn:8787"',
          VUE_APP_downloadApp_Android: '"https://www.pgyer.com/jx_sit"',
          VUE_APP_downloadApp_iOS: '"https://www.pgyer.com/jx_iOS_INT"',
          VUE_APP_wechatUrl: '"http://show.n22.com.cn:8783"',
          VUE_APP_signKey: '"N2APPINTERFACE2018#@!%99"',
          VUE_APP_comId: '"N2O2O20180912"',
          VUE_APP_caChannel: '"999999"',
          VUE_APP_DEBUG_MOCK: '"1"',
          VUE_APP_MODULE_moduleListDefaul: '"[\\"demo\\",\\"test\\",\\"login\\",\\"home\\",\\"center\\",\\"insured\\",\\"messageNoti\\",\\"train\\",\\"entry\\",\\"customerManage\\",\\"insurance\\",\\"common\\",\\"poster\\",\\"demo\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"home\\",\\"demo\\"]"',
          BASE_URL: '""'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'n22-mobile-vue-mpaas',
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/public/index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/n22-mobile-vue-mpaas/public',
          to: '/Users/xuyuanliang/Public/web/xm/n22-vue-mpaas/client/www',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    {
      options: {
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      },
      checkIgnore: function () { [native code] }
    },
    {
      definitions: {
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      }
    },
    {
      profile: false,
      handler: (percent, message, ...details) => {
        this.updateProgress(percent, message, details);
      },
      modulesCount: 500,
      showEntries: false,
      showModules: true,
      showActiveModules: true,
      options: {
        name: 'n22-prd',
        color: 'green',
        reporters: [
          'basic'
        ],
        reporter: null
      },
      reporters: [
        {}
      ]
    }
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  },
  externals: {
    allCodeData: 'allCodeData',
    jquery: 'jQuery',
    'vue-': 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
  }
}
