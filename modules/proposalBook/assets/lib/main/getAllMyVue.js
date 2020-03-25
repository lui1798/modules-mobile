export default {
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      allHeadTopPx:
        window.utils.ui.isIPhoneX ||
        window.utils.ui.isIPhoneXSMax ||
        window.utils.ui.isIPhoneXR
          ? 88
          : window.navigator.platform === "iPhone" &&
            (window.cordova || window.globalConfig.platform == "phoneWeb")
          ? 64
          : 44,
      allHeadTopPxVideo:
        window.utils.ui.isIPhoneX ||
        window.utils.ui.isIPhoneXSMax ||
        window.utils.ui.isIPhoneXR
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
    go(url, params, type, module = "") {
      const json = require("@g/build/assets/modules.json");
      if (module) {
        let runType = process.env.VUE_APP_ENV;
        for (let moi = 0; moi < json[1].list.length; moi++) {
          const mol = json[1].list[moi];
          if (module === mol.name) {
            if (runType === "local") {
              window.location.href = `${window.location.protocol}//${window.location.hostname}:${mol.port}/#/${url}/`;
            } else {
              window.location.href = `${window.location.origin}/${module}/#/${url}/`;
            }
          }
        }
      } else {
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
};
