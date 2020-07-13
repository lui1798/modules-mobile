// const linkSupported = ref => {
//   const link = document.createElement("link");
//   const relList = link.relList;
//   if (!relList || !relList.supports) return false;
//   return relList.supports(ref);
// };
// alert(`当前运行环境是否支持preload: ${linkSupported("preload")}, 浏览器是否支持prefetch: ${linkSupported("prefetch")}`);
//处理Cordova的特殊加载
// import { platform } from "@@/assets/lib/main/getNavigator";
// // eslint-disable-next-line no-unused-vars
// import native from "js-native-n22";
// if (platform === "ios" && !(window.GDIJSBridge || window.WebViewJavascriptBridge)) {
//   import("@g/public/static/platform_www_ios/cordova.js")
//     .then(module => {
//       console.log(module.default);
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// } else {
//   // import("@g/public/static/platform_www_android/cordova.js")
//   //   .then(module => {
//   //     console.log(module.default);
//   //   })
//   //   .catch(err => {
//   //     console.log(err.message);
//   //   });
// }
//创建全局globalConfig对象-004
import globalConfig from "@@/assets/lib/main/getGlobalConfig.js";
globalConfig.isDebug = false;
if (globalConfig.httpEnvironment === "local") {
  globalConfig.signKey = ""; // 接口数据交互加密key
  globalConfig.comId = "N2O2O20180912"; // 保险公司编码--保险公司IdN2O2O20180912
  globalConfig.caChannel = "999999"; //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  // globalConfig.rootUrl = "http://follow.com:9000/api"; //process.env.VUE_APP_ROOTURL
  // globalConfig.rootUrl = "http://3f0566757y.51vip.biz/api"; //process.env.VUE_APP_ROOTURL
  globalConfig.rootUrl = "https://mitphone.sunlife-everbright.com/api"; //process.env.VUE_APP_ROOTURL
  // globalConfig.rootFileUrl = 'http://ydpt-int.boc-samsunglife.cn/fileservice/int'; //文件上传地址
  globalConfig.rootFileUrl = "http://show.n22.com.cn:8787/fileservice"; //文件上传地址
  globalConfig.wechatUrl = "http://show.n22.com.cn:8783";
}
if (process.env.VUE_APP_ENV === "local") {
  //导入mockdebug数据
  import("./mock/getMock")
    .then(module => {
      console.log("%c module", "color:green;", module);
      module.mockXHR();
    })
    .catch(err => {
      console.log(err.message);
    });
}
//判定最大版本号=>得到当前系统版本号
import { getV } from "@@/assets/lib/main/getVersion.js";
globalConfig.systemVersion = getV(globalConfig);
window.globalConfig = globalConfig;
let ua = navigator.userAgent.toLowerCase();
let u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (ua.match(/MicroMessenger/i) == "micromessenger" && !!u) {
  window.globalConfig.platform = "web";
  window.globalConfig.isWechat = true;
}
console.log(
  "%c window.globalConfig" + window.globalConfig.httpEnvironment + ">>>>",
  "color:green;",
  window.globalConfig,
);

import Vue from "vue";
import Navigation from "@/components/navigation";
import App from "./App.vue";
import router from "./routers";
import store from "@m/proposalBook/vuex/";
import utils from "@@/utils";
//注册全局utils
window.utils = utils;

import * as filters from "@@/filters"; // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("@m/proposalBook/assets/icons", false, /\.svg$/);
requireAll(req);

// if (true) {
//浏览器标题处理
Vue.use(require("vue-wechat-title"));
// }

//自定义组件库全局样式
import "@/assets/css/base.scss";
import "@/assets/css/normalize.css";
import "@/assets/css/base-translate.scss";

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--导航插件--[保存游览历史的页面数据]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
Vue.use(Navigation, {
  router,
  store,
  moduleName: "navigation",
  keyName: "AL",
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--导航插件--[保存游览历史的页面数据]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--懒加载--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/images/common/sorrow.png"),
  loading: require("@/assets/images/common/loading.png"),
  attempt: 1,
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--懒加载--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

const __getUrlParams = require("@t/getUrlParams");
/*↓↓↓↓↓↓↓↓--浏览器日志显示debug模式--[配置window.globalConfig.isDebug]--↓↓↓↓↓↓↓↓↓*/
if ((process.env.NODE_ENV != "production" && window.globalConfig.isDebug) || __getUrlParams("log") == 8) {
  import("eruda")
    .then(module => {
      // console.log(module.default);
      var el = document.createElement("div");
      document.body.appendChild(el);
      module.default.init({
        container: el,
        // tool: ['console', 'elements']
      });
    })
    .catch(err => {
      console.log(err.message);
    });
}
/*↑↑↑↑↑↑↑↑↑--浏览器日志显示debug模式--[配置window.globalConfig.isDebug]--↑↑↑↑↑↑↑↑↑↑↑*/
console.log("%c window.preformace", "color:green;", window.performance);
// require("@m/proposalBook/assets/lib/sa/autotrack.js");

window.document.addEventListener(
  "blur",
  function() {
    console.log("%c 全局监听input输入框--blur", "color:green;", "全局监听input输入框xxxxxxx");
    if (ua.match(/MicroMessenger/i) == "micromessenger" || window.GDIJSBridge) {
      setTimeout(() => {
        // let ua = navigator.userAgent.toLowerCase();
        // let u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (window.globalConfig.isWechat || window.GDIJSBridge) {
          //在iphone 微信中
          let currentPosition, timer;
          let speed = 1; //页面滚动距离
          timer = setInterval(function() {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= speed;
            window.scrollTo(0, currentPosition); //页面向上滚动
            clearInterval(timer);
          }, 1);
        }
      }, 200);
    }
  },
  true,
);

Vue.config.productionTip = false;

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--设置全局参数 方法或者变量--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
import myVue from "@@/assets/lib/main/getAllMyVue.js";
Vue.mixin(myVue);
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--设置全局参数 方法或者变量--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

// import { getAgentInfo } from "@@/utils/agentInfo";
//此处引入封装的axios，便于项目创建vue实例的时候将vue的this注入
import axiosHttp from "@@/config/axiosHttp";
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--创建vue--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
// eslint-disable-next-line no-unused-vars
// getAgentInfo()
//   .then(() => {
let vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#proposal-book-app");
Vue.prototype.axiosHttp = axiosHttp;
// // 挂载http的时候执行引入vue的方法
Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
// })
// .catch(error => {
//   console.log("%c 注入获取agentInfo信息失败", "color:red;", "失败原因如下：");
//   console.error(error);
//   let vue = new Vue({
//     router,
//     store,
//     render: h => h(App),
//   }).$mount("#proposal-book-app");
//   Vue.prototype.axiosHttp = axiosHttp;
//   // // 挂载http的时候执行引入vue的方法
//   Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
// });
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--创建vue--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
