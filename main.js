/* eslint-disable */
var httpEnvironment = process.env.VUE_APP_ENV || "local"; // local、int、uat
window.globalConfig = {
  AppName: process.env.VUE_APP_NAME,
  rootUrl: "", // 接口请求服务器地址
  rootFileUrl: "", // 图片服务器地址
  wechatUrl: "", // 微信安全域名
  shareReplaceStr: "n22", // 微信分享的时候将/替换成此字符串
  isDebug: false, // 是否开启接口debug模式
  isMock: process.env.VUE_APP_DEBUG_MOCK == 2, // mock模式
  // @a_init<#  platform: "web",// web、native、wechat、phoneWeb /* @init<%    "./${platform}",%> */ // @a_end#>
  runningEnvironment: window.cordova
    ? "cordova"
    : window.AlipayJSBridge
    ? "AlipayJSBridge"
    : "N22JSBridge",
  os: "ios", // 操作系统 ios:苹果操作系统 android:安卓系统 window:电脑
  timeout: 1000 * 30, // 默认http请求超时时间30秒
  animation: true,
  loginType: "extraExtCheck", // 登录方式--extraExtCheck
  from: "N22", // header--from
  signKey: process.env.VUE_APP_signKey, // 接口数据交互加密key
  comId: process.env.VUE_APP_comId, // 保险公司编码--保险公司IdN2O2O20180912
  caChannel: process.env.VUE_APP_caChannel, //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  systemVersion: "", // 系统版本
  version: {
    //本地保存的版本号会不会被更新掉 vXX.XX.XX 第一个表示大版本升级 第二个是小版本升级 第三个是bug修复的
    native: process.env.VUE_APP_VERSION_NATIVE_ANDROID, // 原生门户INT V1.001.002  UAT V1.001.002
    plist: process.env.VUE_APP_VERSION_NATIVE_IOS, // iOS原生门户INT V1.001.004  UAT V1.001.001
    all: process.env.VUE_APP_VERSION_H5 // H5升级INT V1.001.014  UAT V1.001.009
  },
  httpEnvironment: httpEnvironment,
  downloadApp_Android: "",
  downloadApp_iOS: "",
  logSave: false,
  //默认初始化需要加载的模块--打包的配置文件中会需要配置打包的模块--因此开发新增模块需要在此数组中添加数组名
  moduleListDefaul: [
    "demo",
    "test",
    "login",
    "home",
    "center",
    "insured",
    "message",
    "train"
  ],
  manageCahcheNeed: ["token", "userInfo", "AL_MOBILE_PALETTE"], //全局不想被一键清除的localStorage数据
  serviceUrl: "http://172.20.10.2:8080", //cordova InAppBrowser调外链URL前缀
  mapKey: "Na3rfA24G0mF8pZrkDpnsBSTD1QdHNH6",
  uploadFileGetTokenConfigId: `ifp-train-service-config-${
    httpEnvironment == "local" ? "int" : httpEnvironment || "int"
  }`,
  keyboardDescription: process.env.VUE_APP_NAME + "专属安全键盘"
};
//@module模块占位符
if (httpEnvironment === "local") {
  window.globalConfig.isDebug = false;
  window.globalConfig.signKey = "N2APPINTERFACE2018#@!%99"; // 接口数据交互加密key
  window.globalConfig.comId = "N2O2O20180912"; // 保险公司编码--保险公司IdN2O2O20180912
  window.globalConfig.caChannel = "999999"; //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  window.globalConfig.rootUrl = "http://show.n22.com.cn:8785/api/@module/int"; //process.env.VUE_APP_ROOTURL
  // window.globalConfig.rootFileUrl = 'http://ydpt-int.boc-samsunglife.cn/fileservice/int'; //文件上传地址
  window.globalConfig.rootFileUrl = "http://show.n22.com.cn:8787/fileservice"; //文件上传地址
  window.globalConfig.wechatUrl = "http://show.n22.com.cn:8783";
} else {
  window.globalConfig.isDebug = true;
  window.globalConfig.rootUrl = process.env.VUE_APP_rootUrl;
  window.globalConfig.rootFileUrl = process.env.VUE_APP_rootFileUrl;
  window.globalConfig.downloadApp_Android =
    process.env.VUE_APP_downloadApp_Android;
  window.globalConfig.downloadApp_iOS = process.env.VUE_APP_downloadApp_iOS;
  window.globalConfig.wechatUrl = process.env.VUE_APP_wechatUrl;
}
//判定最大版本号=>得到当前系统版本号
if (
  window.globalConfig.version &&
  window.globalConfig.version.native &&
  window.globalConfig.version.plist &&
  window.globalConfig.version.all
) {
  const nativels = parseInt(
    window.globalConfig.version.native.replace("V", "").replace(/\./g, "")
  );
  const plistls = parseInt(
    window.globalConfig.version.plist.replace("V", "").replace(/\./g, "")
  );
  const allls = parseInt(
    window.globalConfig.version.all.replace("V", "").replace(/\./g, "")
  );
  const verMax = Math.max(nativels, plistls, allls) + "";
  let versionMax = "V";
  verMax.split("").forEach((el, i) => {
    if (i === 1 || i === 4) {
      versionMax += "." + el;
    } else {
      versionMax += el;
    }
  });
  window.globalConfig.systemVersion = versionMax;
}
console.log(
  "%c window.globalConfig" + httpEnvironment + ">>>>",
  "color:green;",
  window.globalConfig
);

import Vue from "vue";
import Navigation from "@/components/navigation";
import App from "./App.vue";
import router from "./routers";
import store from "@/vuex/";
import utils from "@/utils";
//注册全局utils
window.utils = utils;

//svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("@/assets/icons", false, /\.svg$/);
requireAll(req);

if (process.env.VUE_APP_DEBUG_MOCK == "2") {
  require("./utils/mock");
}
// if (true) {
//浏览器标题处理
Vue.use(require("vue-wechat-title"));
// }

//自定义组件库全局样式
import "@/assets/css/base.scss";
import "@/assets/css/normalize.css";

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
Vue.mixin({
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      allHeadTopPx:
        utils.ui.isIPhoneX || utils.ui.isIPhoneXSMax || utils.ui.isIPhoneXR
          ? 88
          : window.navigator.platform === "iPhone" &&
            (window.cordova || window.globalConfig.platform == "phoneWeb")
          ? 64
          : 44,
      allHeadTopPxVideo:
        utils.ui.isIPhoneX || utils.ui.isIPhoneXSMax || utils.ui.isIPhoneXR
          ? 0
          : window.navigator.platform === "iPhone" &&
            (window.cordova || window.globalConfig.platform == "phoneWeb")
          ? 20
          : 0,
      dealPxToVw: px => {
        return px * 0.266;
      },
      stringToNum: str => {
        return Number(str);
      },
      // 定义常量 用于页面判断 @待修改
      os: window.navigator.platform === "iPhone" ? "ios" : "android",
      platform: window.globalConfig.platform,
      runningEnvironment: window.globalConfig.runningEnvironment,
      routeParams: this.getRouteParams(),
      transitionTime: 300,
      isVirtualKeyboardProduct: true //产品组件区是否开启自定义虚拟键盘
    };
  },
  methods: {
    go(url, params, type) {
      if (params) {
        for (let key in params) {
          if (typeof params[key] !== "string") {
            params[key] = JSON.stringify(params[key]);
          }
        }
        this.$router.push({ name: url, params: params });
      } else {
        if (url.startsWith("/") || url.indexOf("/") > -1 || type === "push") {
          this.$router.push(`/${url}`);
        } else {
          this.$router.push({ name: url });
        }
      }
    },
    back(urlName, moduleList, fullUrl, type) {
      console.log("点击返回=", urlName);
      // utils.ui.closeLoadding()
      // 如果url存在 则跳转到对应的位置
      if (typeof urlName === "string" && urlName) {
        let routerList = this.$navigation.getRoutes().reverse();
        console.log("routerList=", routerList);
        if (!urlName.startsWith("/")) {
          for (let i = 0; i < routerList.length; i++) {
            if (routerList[i].indexOf(urlName) >= 0) {
              if (moduleList && moduleList.lenght > 0) {
                if (moduleList.indexOf(routerList[i])) {
                  this.$router.go(routerList[i]);
                  console.log(
                    "%c 找出最近的位置-并跳转到位置",
                    "color:green;",
                    ""
                  );
                  return false;
                }
              } else {
                this.$router.go(-i);
                console.log(
                  "%c 找出最近的位置-并跳转到位置",
                  "color:green;",
                  ""
                );
                return false;
              }
              return false;
            }
          }
          console.log("进入push");
          // 如果不存在则 跳转到对应的路由
          if (fullUrl) {
            this.$router[type ? type : "push"](fullUrl);
          } else {
            this.go(urlName, "", type);
            // this.$router.push({ name: urlName });
          }
        } else {
          this.$router.push(urlName);
        }
      } else {
        console.log("%c window.history", "color:green;", window.history);
        window.history.back();
      }
    },
    getRouteParams() {
      if (this.$route && this.$route.params != undefined) {
        let params = this.$route.params;
        for (let key in params) {
          if (typeof params[key] == "string") {
            let temp = params[key];
            try {
              params[key] = JSON.parse(params[key]);
            } catch (e) {
              params[key] = temp;
            }
          }
        }
        return params;
      } else {
        return "";
      }
    }
  }
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--设置全局参数 方法或者变量--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

//此处引入封装的axios，便于项目创建vue实例的时候将vue的this注入
import axiosHttp from "@/config/axiosHttp";
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--创建vue--[]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
if (window.globalConfig.platform === "native") {
  window.document.addEventListener(
    "deviceready",
    function() {
      let vue = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount("#app");
      window.navigator.splashscreen.hide();

      Vue.prototype.axiosHttp = axiosHttp;
      //挂载http的时候执行引入vue的方法
      Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
    },
    false
  );
} else {
  let vue = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  Vue.prototype.axiosHttp = axiosHttp;
  //挂载http的时候执行引入vue的方法
  Vue.prototype.axiosHttp.initContext(vue); // 传入vue实例
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--创建vue--[]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
