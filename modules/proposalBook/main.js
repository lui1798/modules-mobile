/* eslint-disable */
//创建全局globalConfig对象
import globalConfig from "@@/assets/lib/main/getGlobalConfig.js";
//判定最大版本号=>得到当前系统版本号
import { getV } from "@@/assets/lib/main/getVersion.js";
globalConfig.systemVersion = getV(globalConfig)
window.globalConfig = globalConfig;
console.log(
  "%c window.globalConfig" + window.globalConfig.httpEnvironment + ">>>>",
  "color:green;",
  window.globalConfig
);

import Vue from "vue";
import Navigation from "@/components/navigation";
import App from "./App.vue";
import router from "./routers";
import store from "@m/demo/vuex/";
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
import '@/assets/css/base-translate.scss';

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--导航插件--[保存游览历史的页面数据]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
Vue.use(Navigation, {
  router,
  store,
  moduleName: "navigation",
  keyName: "AL"
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--导航插件--[保存游览历史的页面数据]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--懒加载--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/images/common/sorrow.png"),
  loading: require("@/assets/images/common/loading.png"),
  attempt: 1
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--懒加载--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

Vue.config.productionTip = false;

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--设置全局参数 方法或者变量--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
import myVue from "@@/assets/lib/main/getAllMyVue.js";
Vue.mixin(myVue);
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--设置全局参数 方法或者变量--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/


//此处引入封装的axios，便于项目创建vue实例的时候将vue的this注入
// import axiosHttp from "@@/config/axiosHttp";
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--创建vue--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#proposal-book-app");
// Vue.prototype.axiosHttp = axiosHttp;
// // 挂载http的时候执行引入vue的方法
// Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--创建vue--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
