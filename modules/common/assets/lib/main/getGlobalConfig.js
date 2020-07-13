//注入ipone是否预留顶部导航栏20px高度，沉浸式开发（根据苹果原生是否有顶部导航更改，如果顶部没有原生导航则为phone，如果有则置空
window.ALIOSHEAD = "phone";

let httpEnvironment = process.env.VUE_APP_ENV || "local"; // local、int、uat
let globalConfig = {
  AppName: process.env.VUE_APP_NAME,
  rootUrl: "", // 接口请求服务器地址
  modulePrefix: "/app", // 各个模块公共url前缀
  rootFileUrl: "", // 图片服务器地址
  isDebug: false, // 是否开启接口debug模式
  isReportError: true, // 是否开启错误自动上报
  animation: true, // 页面切换动画
  isMock: process.env.VUE_APP_DEBUG_MOCK == 2, // mock模式
  platform: "phoneWeb", // web、native、wechat、phoneWeb
  isWechat: false, // web、native、wechat、phoneWeb
  runningEnvironment: "",
  timeout: 1000 * 30, // 默认http请求超时时间30秒
  loginType: "extraExtCheck", // 登录方式--extraExtCheck
  from: "N22", // header--from
  signKey: process.env.VUE_APP_signKey, // 接口数据交互加密key
  comId: process.env.VUE_APP_comId, // 保险公司编码--保险公司IdN2O2O20180912
  caChannel: process.env.VUE_APP_caChannel, //2018-07-16新增额外渠道--测试账号为99999--生产账户为30010320
  userInfoCacheKey: "agentInfo", //代理人信息缓存key
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

//动态获取配置文件env中的环境变量
globalConfig.isDebug = false;
globalConfig.rootUrl = process.env.VUE_APP_rootUrl;
globalConfig.rootFileUrl = process.env.VUE_APP_rootFileUrl;
globalConfig.downloadApp_Android = process.env.VUE_APP_downloadApp_Android;
globalConfig.downloadApp_iOS = process.env.VUE_APP_downloadApp_iOS;
globalConfig.wechatUrl = process.env.VUE_APP_wechatUrl;

//是否开启错误自动上报
if (globalConfig.isReportError && process.env.VUE_APP_ENV === "local") {
  // console.log("%c isReportError", "color:green;", "");
  // import("alloylever")
  //   .then(a => {
  //     a.default.config({
  //       cdn: "//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js", //vconsole的CDN地址
  //       reportUrl: "http://aqqq.qq.com", //错误上报地址
  //       reportPrefix: "qun", //错误上报msg前缀，一般用于标识业务类型
  //       reportKey: "msg", //错误上报msg前缀的key，用户上报系统接收存储msg
  //       otherReport: {
  //         //需要上报的其他信息
  //         uin: 491862102,
  //       },
  //       entry: "#entry", //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
}

export default globalConfig;
