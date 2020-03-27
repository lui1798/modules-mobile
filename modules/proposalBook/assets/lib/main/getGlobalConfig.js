let httpEnvironment = process.env.VUE_APP_ENV || "local"; // local、int、uat
let globalConfig = {
  AppName: process.env.VUE_APP_NAME,
  rootUrl: "", // 接口请求服务器地址
  rootFileUrl: "", // 图片服务器地址
  isDebug: false, // 是否开启接口debug模式
  animation: true, // 页面切换动画
  isMock: process.env.VUE_APP_DEBUG_MOCK == 2, // mock模式
  platform: "web", // web、native、wechat、phoneWeb
  runningEnvironment: window.cordova ? "cordova" : window.AlipayJSBridge ? "AlipayJSBridge" : "N22JSBridge",
  timeout: 1000 * 30, // 默认http请求超时时间30秒
  loginType: "extraExtCheck", // 登录方式--extraExtCheck
  from: "N22", // header--from
  signKey: process.env.VUE_APP_signKey, // 接口数据交互加密key
  comId: process.env.VUE_APP_comId, // 保险公司编码--保险公司IdN2O2O20180912
  caChannel: process.env.VUE_APP_caChannel, //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  systemVersion: "V0.0.1", // 系统版本
  version: {
    //本地保存的版本号会不会被更新掉 vXX.XX.XX 第一个表示大版本升级 第二个是小版本升级 第三个是bug修复的
    native: process.env.VUE_APP_VERSION_NATIVE_ANDROID, // 原生门户INT V1.001.002  UAT V1.001.002
    plist: process.env.VUE_APP_VERSION_NATIVE_IOS, // iOS原生门户INT V1.001.004  UAT V1.001.001
    all: process.env.VUE_APP_VERSION_H5, // H5升级INT V1.001.014  UAT V1.001.009
  },
  httpEnvironment: httpEnvironment,
  downloadApp_Android: "",
  downloadApp_iOS: "",
  logSave: false,
  manageCahcheNeed: ["token", "userInfo", "AL_MOBILE_PALETTE"], //全局不想被一键清除的localStorage数据
  serviceUrl: "http://172.20.10.2:8080", //cordova InAppBrowser调外链URL前缀
  uploadFileGetTokenConfigId: `ifp-train-service-config-${
    httpEnvironment == "local" ? "int" : httpEnvironment || "int"
  }`,
  keyboardDescription: process.env.VUE_APP_NAME + "专属安全键盘",
};
//@module模块占位符
if (httpEnvironment === "local") {
  globalConfig.isDebug = false;
  globalConfig.signKey = "N2APPINTERFACE2018#@!%99"; // 接口数据交互加密key
  globalConfig.comId = "N2O2O20180912"; // 保险公司编码--保险公司IdN2O2O20180912
  globalConfig.caChannel = "999999"; //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  globalConfig.rootUrl = "http://show.n22.com.cn:8785/api/@module/int"; //process.env.VUE_APP_ROOTURL
  // globalConfig.rootFileUrl = 'http://ydpt-int.boc-samsunglife.cn/fileservice/int'; //文件上传地址
  globalConfig.rootFileUrl = "http://show.n22.com.cn:8787/fileservice"; //文件上传地址
  globalConfig.wechatUrl = "http://show.n22.com.cn:8783";
} else {
  globalConfig.isDebug = true;
  globalConfig.rootUrl = process.env.VUE_APP_rootUrl;
  globalConfig.rootFileUrl = process.env.VUE_APP_rootFileUrl;
  globalConfig.downloadApp_Android = process.env.VUE_APP_downloadApp_Android;
  globalConfig.downloadApp_iOS = process.env.VUE_APP_downloadApp_iOS;
  globalConfig.wechatUrl = process.env.VUE_APP_wechatUrl;
}

export default globalConfig;
