import { platform, runningEnvironment } from "./getNavigator";
import native from "js-native-n22";
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用

export default {
  computed: {
    ...mapState(["proposalBook"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  data() {
    return {
      native: native,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      allHeadTopPx:
        window.utils.ui.isIPhoneX || window.utils.ui.isIPhoneXSMax || window.utils.ui.isIPhoneXR
          ? 88
          : window.navigator.platform === "iPhone" &&
            (window.cordova || window.globalConfig.platform == "web" || window.globalConfig.platform == "phoneWeb")
          ? 64
          : 44,
      allHeadTopPxVideo:
        window.utils.ui.isIPhoneX || window.utils.ui.isIPhoneXSMax || window.utils.ui.isIPhoneXR
          ? 0
          : window.navigator.platform === "iPhone" && (window.cordova || window.globalConfig.platform == "phoneWeb")
          ? 20
          : 0,
      dealPxToVw: px => {
        return px * 0.266;
      },
      stringToNum: str => {
        return Number(str);
      },
      // 定义常量 用于页面判断 @待修改
      os: platform,
      platform: platform,
      runningEnvironment: runningEnvironment,
      routeParams: this.getRouteParams(),
      transitionTime: 300,
      isVirtualKeyboardProduct: true, //产品组件区是否开启自定义虚拟键盘
    };
  },
  methods: {
    go(url, params, type, module = "") {
      console.log("%c minix", "color:#00CD00", url);
      window.globalConfig.isHistoryBack = false;
      if (module) {
        const json = require("@g/build/assets/modules.json");
        let runType = process.env.VUE_APP_ENV;
        for (let moi = 0; moi < json[1].list.length; moi++) {
          const mol = json[1].list[moi];
          if (module === mol.name) {
            if (runType === "local") {
              window.location.href = `${window.location.protocol}//${window.location.hostname}:${mol.port}/#/${url}`;
            } else {
              window.location.href = `${window.location.origin}${window.globalConfig.modulePrefix}/${module}/#/${url}`;
            }
          } else if (moi === json[1].list.length - 1) {
            console.error(`>>>>模块/build/assets/module.json配置中,不存在当前${module}模块，请检查！！！`);
            this.$router.push(`/404`).catch(err => {
              console.error(err);
            });
          }
        }
      } else {
        console.log("%c getAllMyVue>>>proposalBook", "color:green;", this.proposalBook);
        if (params) {
          let wordShow = "";
          if (this.proposalBook && this.proposalBook.wordShow) {
            wordShow = this.proposalBook.wordShow;
          }
          if (params.isPdf) {
            console.log("%c runningEnvironment", "color:green;", runningEnvironment);
            // alert(runningEnvironment);
            if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
              native.openPDF(
                {
                  title: wordShow.title,
                  url: wordShow.url.indexOf("http") > -1 ? wordShow.url : `https:${wordShow.url}`,
                  isShowShare: params.canShare ? "1" : "0", //0显示隐藏，1显示分享
                  shareMessage: params.shareMessage || "",
                },
                content => {
                  console.log("%c content", "color:green;", content);
                },
                error => {
                  this.$toast({
                    content: error,
                    position: "string",
                    confirmText: "确定",
                    duration: 3000,
                  });
                },
              );
            } else {
              if (platform !== "ios") {
                window.open("./static/lib/pdfjs-2.3.200-dist/web/viewer.html?file=" + wordShow.url, "PDF");
              } else {
                window.location.href = wordShow.url;
                // window.open(wordShow.url);
              }
            }
            return;
          }
          for (let key in params) {
            if (typeof params[key] !== "string") {
              params[key] = JSON.stringify(params[key]);
            }
          }
          if (url.startsWith("/")) {
            this.$router.push({ path: url, query: params }).catch(err => {
              console.error(err);
            });
          } else {
            this.$router.push({ name: url, params: params }).catch(err => {
              console.error(err);
            });
          }
        } else {
          if (url.indexOf("/") > -1 || type === "push") {
            this.$router.push(`${url.startsWith("/") ? "" : "/"}${url}`).catch(err => {
              console.log(err);
            });
          } else {
            this.$router.push({ name: url }).catch(err => {
              console.error(err);
            });
          }
        }
      }
    },
    back(urlName, moduleList, fullUrl, type) {
      console.log("点击返回=", urlName);
      if (urlName && urlName === "hybrid-back") {
        try {
          if (platform === "ios" && !(window.GDIJSBridge || window.WebViewJavascriptBridge)) {
            var hybrid = `hybrid://MAJumpModule:401/invoke?${JSON.stringify({
              url: "",
              type: "99",
            })}`;
            console.log("hybrid", hybrid);
            console.log(window.MAPlugin);
            window.MAPlugin && window.MAPlugin.hybridCallAction(hybrid, null, null);
          } else {
            native.close(
              content => {
                console.log("%c native-content", "color:#00CD00", content);
              },
              error => {
                console.log("%c native-error", "color:red", error);
              },
            );
          }
        } catch (error) {
          console.log("%c error", "color:red", error);
        }
        return;
      }
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
                  console.log("%c 找出最近的位置-并跳转到位置", "color:green;", "");
                  return false;
                }
              } else {
                this.$router.go(-i);
                console.log("%c 找出最近的位置-并跳转到位置", "color:green;", "");
                return false;
              }
              return false;
            }
          }
          console.log("进入push");
          // 如果不存在则 跳转到对应的路由
          if (fullUrl) {
            window.globalConfig.isHistoryBack = false;
            this.$router[type ? type : "push"](fullUrl);
          } else {
            this.go(urlName, "", type);
            // this.$router.push({ name: urlName });
          }
        } else {
          window.globalConfig.isHistoryBack = false;
          this.$router.push(urlName).catch(err => {
            console.error(err);
          });
        }
      } else {
        console.log("%c window.history", "color:green;", window.history);
        window.globalConfig.isHistoryBack = true;
        if (this.$route.query && this.$route.query.isModulesGo && this.$route.query.isModulesGo == 1) {
          native.close();
        } else {
          window.history.back();
        }
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
    },
    timeoutToLogin() {
      if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
        native.loginOperation(
          {
            loginFlag: "1", //登录
          },
          content => {
            console.log("%c loginOperation-content", "color:green;", content);
          },
          error => {
            alert(error);
          },
        );
      } else {
        if (this.$store.state.common.showlogin) {
          this.$store.state.common.showlogin = false;
          setTimeout(() => {
            this.$store.state.common.showlogin = true;
          }, 100);
        } else {
          this.$store.state.common.showlogin = true;
        }
      }
    },
  },
};
