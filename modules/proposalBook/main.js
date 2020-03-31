//创建全局globalConfig对象
import globalConfig from "@@/assets/lib/main/getGlobalConfig.js";
//判定最大版本号=>得到当前系统版本号
import { getV } from "@@/assets/lib/main/getVersion.js";
globalConfig.systemVersion = getV(globalConfig);
globalConfig.isDebug = true;
window.globalConfig = globalConfig;
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

/*↓↓↓↓↓↓↓↓--浏览器日志显示debug模式--[配置window.globalConfig.isDebug]--↓↓↓↓↓↓↓↓↓*/
if (process.env.NODE_ENV != "production" && window.globalConfig.isDebug) {
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

var ua = window.navigator.userAgent.toLowerCase(); // 获取判断用的对象
window.document.addEventListener(
  "blur",
  function() {
    console.log("%c 全局监听input输入框--blur", "color:green;", "全局监听input输入框xxxxxxx");
    if (!window.cordova && ua.match(/MicroMessenger/i) == "micromessenger") {
      setTimeout(() => {
        let ua = navigator.userAgent.toLowerCase();
        let u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (ua.match(/MicroMessenger/i) == "micromessenger" && !!u) {
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

//此处引入封装的axios，便于项目创建vue实例的时候将vue的this注入
// import axiosHttp from "@@/config/axiosHttp";
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--创建vue--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
// eslint-disable-next-line no-unused-vars
let vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#proposal-book-app");
// Vue.prototype.axiosHttp = axiosHttp;
// // 挂载http的时候执行引入vue的方法
// Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--创建vue--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
