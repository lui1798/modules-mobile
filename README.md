---
title: mobile h5项目开发及规范
---

# 前言

## 项目基于vue cli3(vue2.x + webpack4.x)
已经升级维护到最新版本2.6.11
[vue版本更新记录](https://github.com/vuejs/vue/releases)
```
npm install -g @vue/cli
```
##### 注node版本需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。

### nvm常用命令
查看当前安装的版本
```
nvm ls
```
使用已经安装的版本
```
nvm use v8.14.0
```


### 浏览器(系统)支持
现代浏览器

iOS 6+

Android 4.4+（vw适配单位4.4+）

*******************************************************************************************

# vscode插件

## 插件集成
- vscode应用商城搜索`al-mobile-vscode-helper`插件并安装
## 代码提示补全使用
- html中输入`<`会自动提示`al-mobile`相关组件
- 标签属性直接空格会直接提示该标签组件的属性字段
- 标签属性的值，删除双引号，再自己输入双引号会提示出改标签属性的可选值
- js中`dialog`跟`toast`也可直接自动带出模板
## 项目运行
- 在项目的任意文件中右击出现`N22运行`，pc项目直接运行oms客户端。
- 在项目的任意文件中右击出现`N22运行`，app项目顶部弹出当前文件夹项目可运行的模块，点击需要运行的相关模块即可运行相应模块的终端。
- 在项目的任意文件中也可以直接点击右下角 ![document](https://vue-mobile.gitee.io/static/image/run.jpg) 按钮直接运行



*******************************************************************************************

# 运行
## 启动模块项目
```
npm run dev -m-demo
```
## 启动并运行文档
```
npm run dev -m-demo --site
```
[ 传送门 ]( ./#/zh-CN/docs/command )

*******************************************************************************************

# 发布
app端直接使用定制壳子进行原生发布
h5端部署到后台服务器--参考发布解决方案[传送门](https://www.cnblogs.com/koleyang/p/4816853.html)

*******************************************************************************************


# 项目结构
[ 传送门 ]( ./#/zh-CN/docs/catalog )

*******************************************************************************************

# 规范化
[ 传送门 ]( ./docs/rules.md )

*******************************************************************************************

# 相关网址
http://www.alloyteam.com/nav/
https://lanhuapp.com/web/#/item/project/board
http://show.n22.com.cn:8784/swagger-ui.html#!/auth45controller/loginUsingPOST
https://m.ccode.live/lentoo/list/9

*******************************************************************************************

# fastclick功能描述
//300ms延迟去除(如果不想启用次功能-则需要在相应的dom标签上加上class='needsclick')
```
import FastClick from 'fastclick'
FastClick.attach(document.body)
```
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
[ 传送门 ]( ./docs/PROCSS.md )

*******************************************************************************************

#### 目前使用的骨架屏方案
```
npm install vue-content-loader --save
```
*******************************************************************************************

# vuelidate - 为Vue.js进行简单，轻量级的基于模型的验证
[ 传送门 ]( https://monterail.github.io/vuelidate/ )

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

# 项目内置vue属性
[ 传送门 ]( ./docs/VUECOMMONATTR.md )

*******************************************************************************************

# 后序
1、demo.vue中启动最新的ts以及vue3倡导的写法从而更贴合TypeScript
2、[al-mobile]https://aliangxu.github.io/al-mobile
2、[al-mobile]http://vue-mobile.gitee.io/al-mobile

*******************************************************************************************
