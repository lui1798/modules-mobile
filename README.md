# mobile h5项目开发及规范


# 前言

## 项目基于vue cli3(vue2.x + webpack4.x)
已经升级维护到最新版本2.6.11
[vue版本更新记录](https://github.com/vuejs/vue/releases)
```
npm install -g @vue/cli
```
##### 注node版本需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。

### 浏览器(系统)支持
现代浏览器

iOS 6+

Android 4.4+（vw适配单位4.4+）

*******************************************************************************************

#发布
app端直接使用cordova的定制壳子进行原生发布
h5端部署到后台服务器--参考发布解决方案[传送门](https://www.cnblogs.com/koleyang/p/4816853.html)

# 运行
## Project setup
```
npm install

npm install --registry=https://registry.npm.taobao.org
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production

#### 生产打包build（其他环境int/uat/sta。例如打包int命令为：npm run int）
1、配置不同环境的文件.env.int===具体内容见文件内部
注：打包环境需要根据process.env.VUE_APP_ENV在main.js里面配置不同环境的参数
```
npm run build
```
### Run your tests 运行测试
```
npm run test
```
### Lints and fixes files
```
npm run lint
```
### Run your end-to-end tests
```
npm run test:e2e
```
### Run your unit tests
```
npm run test:unit
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


*******************************************************************************************


# 项目结构
[ 传送门 ]( ./doc/Directory.md )

*******************************************************************************************


# 规范化
[ 传送门 ]( ./doc/PRORULES.md )


*******************************************************************************************


# 相关网址
http://www.alloyteam.com/nav/
https://lanhuapp.com/web/#/item/project/board
http://show.n22.com.cn:8784/swagger-ui.html#!/auth45controller/loginUsingPOST
https://m.ccode.live/lentoo/list/9


*******************************************************************************************


# 自动化（模块新增、组件新增、.vue页面新增）
[ 传送门 ]( ./doc/AUTOCREATE.md )


*******************************************************************************************


# 国际化 I18n
[ 传送门 ]( ./doc/INTERNATIONAL.md )


*******************************************************************************************


# npm 包
[ 传送门 ]( ./doc/NPMPACKAGE.md )


*******************************************************************************************


# console日志级别
配合vscode快捷键 console.log('%c $1','color:green;','$2')
接口级别       red-yellow-green
router级别     


*******************************************************************************************


# fastclick功能描述
//300ms延迟去除(如果不想启用次功能-则需要在相应的dom标签上加上class='needsclick')
```
import FastClick from 'fastclick'
FastClick.attach(document.body)
```


*******************************************************************************************

# 自定义svg图标使用
1、将svg文件放入assets/icons根目录下
2、eg：
```
<svg-icon icon-class="left_button"></svg-icon> 
```
  -- icon-class即为你的svg文件名字


*******************************************************************************************


# 移动端适配方案 -- vw适配方案
link(https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
### 需要npm的插件
```
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S
```
### cssnano的额外补充插件
```
npm i --save-dev cssnano-preset-advanced
```

1vw=3.75px
1px=0.266vw
谷歌浏览器看到的vw单位目前乘以当前调试手机宽度除以100就是实际代码中写的px单位
eg：我调试的是iPhone6/7/8为375x667，谷歌中看到的6vw即为6vw*375%100=22.5px

注：更新说明（2018-11-02）: 经过一段时间项目的验证，在我们团队已经开始不引用Polyfill。也可以把postcss-viewport-units不安装引用，以及去除对应的viewport-units-buggyfill。
所以新的npm为
npm i --save-dev postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext cssnano


*******************************************************************************************


# 内置css
[ 传送门 ]( ./doc/PROCSS.md )


*******************************************************************************************


### 参考组件
#### 骨架屏svg  https://github.com/michalsnik/vue-content-placeholders(使用第二个npm)
```
npm install vue-content-placeholders --save
npm install --save-dev page-skeleton-webpack-plugin
npm install --save-dev html-webpack-plugin
```
表单验证   https://github.com/baianat/vee-validate
专场特效参考不使用https://github.com/jaweii/vueg.git

#### 目前使用的骨架屏方案
```
npm install vue-content-loader --save
```


*******************************************************************************************


# 兼容性
[ 传送门 ]( ./doc/COMPATIBLE.md )


*******************************************************************************************


# vuelidate - 为Vue.js进行简单，轻量级的基于模型的验证
[ 传送门 ]( https://monterail.github.io/vuelidate/ )


*******************************************************************************************


# cordova相关文档
[ 传送门 ]( ./doc/CORDOVA.md )


*******************************************************************************************


# ios端视频默认全屏解决办法
deplay 默认情况下加入了下面两个属性
### Fix fullscreen problem on IOS 8 and 9
```
this.videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
```
### Fix fullscreen problem on IOS 10
```
this.videoElement.setAttribute('playsinline', 'playsinline'); 
```

### 如果项目基于cordova构建，还需在config.xml加如下属性（应用访问类似iframe外部链接）
```
<preference name="AllowInlineMediaPlayback" value="true" />
```



*******************************************************************************************


# 数据采集相关文档
[ 传送门 ]( ./doc/SCADA.md )


*******************************************************************************************


# npm audit fix的相关介绍(npm漏洞相关)。

npm audit ： npm@5.10.0 & npm@6，允许开发人员分析复杂的代码，并查明特定的漏洞和缺陷。
npm audit fix ：npm@6.1.0,  检测项目依赖中的漏洞并自动安装需要更新的有漏洞的依赖，而不必再自己进行跟踪和修复。

1. 运行audit fix，但是只更新pkglock， 不更新node_modules：
```
$ npm audit fix --package-lock-only
```
2. 只更新dependencies中安装的包，跳过devDependencies中的包：
```
$ npm audit fix --only=prod
```
3.运行命令，得到audit fix将会更新的内容，并且输出json格式的安装信息，但是并不真的安装更新：
```
$ npm audit fix --dry-run --json
```
4. 得到json格式的详细检测报告
```
$ npm audit --json
```


*******************************************************************************************


# quicklink 
谷歌开源的预加载api
1、主要用于提高页面的展示时间，提高预加载速度
2、具体描述见 QUICKLINK.md
[传送门](https://github.com/GoogleChromeLabs/quicklink/tree/master/translations/zh-cn)


*******************************************************************************************


# 项目更新日志
[ 传送门 ]( ./CHANGELOG.md )


*******************************************************************************************


# 后序
1、demo.vue中启动最新的ts以及vue3倡导的写法从而更贴合TypeScript


*******************************************************************************************


# 查看vue cli3最终的配置文件
vue inspect > output.js

