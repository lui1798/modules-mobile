<template>
  <div
    id="demo-app"
    ref="app"
    class="nprogress-wrap app_class"
    :class="_module"
  >
    <transition :name="transitionName">
      <navigation>
        <router-view
          v-if="isRouterAlive"
          v-wechat-title="$route.meta.title"
          :key="activeDate"
          @dealResponseData="dealResponseData"
          class="router-view"
          ref="appChildren"
        ></router-view>
      </navigation>
    </transition>
    <!-- 底部foot -->
    <al-foot
      style="z-index:9999;"
      :isShowFooter="$route.meta.footer"
      :dataList="footList"
      @gotoAddress="gotoAddress"
    ></al-foot>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { AllHead, Foot } from "al-mobile";

export default {
  name: "DemoApp",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    [AllHead.name]: AllHead,
    [Foot.name]: Foot
  },
  data() {
    return {
      footList: [
        {
          title: "首页",
          titlee: "footMenu.home",
          icon: "首页",
          go: "home",
          normal: require("@/assets/images/home/home.png"),
          active: require("@/assets/images/home/home_active.png")
        },
        {
          title: "例子",
          titlee: "footMenu.demo",
          icon: "首页",
          go: "demo",
          normal: require("@/assets/images/home/insurance.png"),
          active: require("@/assets/images/home/insurance_active.png")
        },
        {
          title: "消息中心",
          titlee: "footMenu.message",
          icon: "首页",
          go: "/messageNoti",
          normal: require("@/assets/images/home/message.png"),
          active: require("@/assets/images/home/message_active.png")
        },
        {
          title: "我的",
          titlee: "footMenu.center",
          icon: "首页",
          go: "/centerHome",
          normal: require("@/assets/images/home/user.png"),
          active: require("@/assets/images/home/user_active.png")
        }
      ],
      showlogin: false,
      showsearch: false,
      isShowFooter: false,
      transitionName: "",
      transitionNameOld: "",
      searchTransitionName: "n22-base-fade",
      isRouterAlive: true,
      searchValue: "",
      activeDate: "",
      isShowBg: false,
      hotSearchListProp: [
        { desc: "保险营销技巧" },
        { desc: "意外险" },
        { desc: "客户指南与粘度" }
      ]
    };
  },
  created() {
    console.log("%c this.$store.state", "color:green;", this.$store.state);
    console.log("%c App-router", "color:green;", this.$route.query);
    if (this.$route && this.$route.query && this.$route.query.token) {
      window.utils.cache.set("token", this.$route.query.token);
    }
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "SHOWSEARCH",
      "USER_INFO"
    ]),
    gotoAddress(item) {
      this.back(item.go, "", "", "push");
    },
    /**
     * @name 网络连接(cordova-plugin-network-information)
     * @description 获取当前网络连接的状态
     * @url http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html
     */
    checkConnection() {
      if (window.cordova) {
        var networkState = navigator.connection.type;
        var states = {};
        states[window.Connection.UNKNOWN] = "Unknown connection";
        states[window.Connection.ETHERNET] = "Ethernet connection";
        states[window.Connection.WIFI] = "WiFi connection";
        states[window.Connection.CELL_2G] = "Cell 2G connection";
        states[window.Connection.CELL_3G] = "Cell 3G connection";
        states[window.Connection.CELL_4G] = "Cell 4G connection";
        states[window.Connection.CELL] = "Cell generic connection";
        states[window.Connection.NONE] = "No network connection";
        alert("Connection type: " + states[networkState]);
      } else {
        console.log("%c navigator", "color:green;", navigator);
      }
    },
    //页面重载--用于页面不做跳转但是需要重渲染页面的情况（实现原理：利用v-if重新渲染）
    reload() {
      console.log("%c reload", "color:green;", "reload");
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    onSearch() {
      console.log(
        "%c 要搜索的内容逻辑--待完善！！！",
        "color:yellow;",
        "要搜索的内容逻辑--待完善！！！" + this.searchValue
      );
      //测试存入历史数据
      let searchHistoryList = window.utils.cache.get("searchHistoryList") || [];
      if (searchHistoryList.length == 0) {
        searchHistoryList.unshift({ desc: this.searchValue });
      }
      searchHistoryList.forEach(item => {
        item.desc == this.searchValue
          ? ""
          : this.searchValue
          ? searchHistoryList.unshift({ desc: this.searchValue })
          : "";
      });
      if (searchHistoryList.length > 5) {
        searchHistoryList.pop(6);
      }
      window.utils.cache.set("searchHistoryList", searchHistoryList);
      //可以在各自的页面内实现onSearch方法处理各自的搜索逻辑
      if (this.$refs.appChildren.onSearch) {
        this.$refs.appChildren.onSearch();
      }
    },
    searchClose() {
      this.searchValue = "";
      window.utils.cache.set("searchHistoryList", []);
      // this.SHOWSEARCH(false);
    },
    changeshowlogin(b) {
      this.showlogin = b;
    },
    //处理业务接口返回code的0-1000码值处理
    dealResponseData(response, successCallback, errorCallback) {
      const res = response.response;
      if (res && res.responseCode && res.responseCode == 0) {
        successCallback && successCallback(res.responseData);
      } else if (res && res.responseCode && res.responseCode == 1000) {
        errorCallback && errorCallback({ message: res.responseMsg });
      } else {
        console.log("%c res  responseCode数据有问题", "color:red;", res);
      }
    }
  },
  computed: {
    ...mapState(["common"]),
    getUserInfo() {
      return this.$store.state.common.userInfo;
    },
    getshowlogin() {
      return this.$store.state.common.showlogin;
    },
    getisRouterAlive() {
      return this.$store.state.common.isRouterAlive;
    },
    getshowsearch() {
      return this.$store.state.common.showsearch;
    },
    getTransition() {
      return this.$store.state.toRouter.meta.transition;
    },
    getNavigatorConnectionE() {
      return this.$store.state.common.navigatorConnectionEffectiveType;
    },
    _module: {
      get: function() {
        if (
          (window.utils.ui.isIPhoneX ||
            window.utils.ui.isIPhoneXSMax ||
            window.utils.ui.isIPhoneXR) &&
          window.globalConfig.platform === "native"
        ) {
          return "platform-ios-x";
        } else if (
          (window.utils.ui.isIPhoneX ||
            window.utils.ui.isIPhoneXSMax ||
            window.utils.ui.isIPhoneXR) &&
          window.globalConfig.platform == "phoneWeb"
        ) {
          return "platform-ios-x-phoneWeb";
        } else if (
          window.navigator.platform === "iPhone" &&
          (window.globalConfig.platform === "native" ||
            window.globalConfig.platform == "phoneWeb")
        ) {
          return "platform-ios";
        } else {
          return "platform-android";
        }
      }
    }
  },
  mounted() {
    console.log(
      "%c window.navigator.platform",
      "color:green;",
      window.navigator.platform
    );
    console.log("%c this.$route", "color:green;", this.$route);
    this.$navigation.on("forward", (to, from) => {
      console.log(
        "%c window.performance--TO",
        "color:green;",
        window.performance
      );
      // let aaaaa = {};
      // for (const key in window.performance.timing) {
      //   const aaaa = window.performance.timing[key];
      //   aaaaa[key] = window.utils.utilsPlugin.formatDateTime(
      //     aaaa,
      //     "yyyy-MM-dd hh:mm:ss"
      //   );
      // }
      // console.log("%c window.performance222", "color:green;", aaaaa);
      console.log("%c forward", "color:green;", to);
      console.log("%c forward", "color:green;", from);
      let toTra = to.route.meta.transition;
      let fromTra = from.route.meta.transition;
      window.globalConfig.animation &&
        (toTra || fromTra) &&
        typeof toTra == "boolean" &&
        (this.transitionName = "slide-in");
    });
    this.$navigation.on("back", (to, from) => {
      console.log(
        "%c window.performance--BACK",
        "color:green;",
        window.performance
      );
      console.log("%c back", "color:green;", to);
      console.log("%c back", "color:green;", from);
      let toTra = to.route.meta.transition;
      let fromTra = from.route.meta.transition;
      window.globalConfig.animation &&
      (toTra || fromTra) &&
      typeof fromTra == "boolean"
        ? (this.transitionName = "slide-out")
        : (this.transitionName = "n22-base-slide-down");
    });
    this.$navigation.on("refresh", (to, from) => {
      console.log("%c refresh", "color:green;", to);
      console.log("%c back", "color:green;", from);
    });
    this.$navigation.on("reset", (to, from) => {
      console.log("%c reset", "color:green;", to);
      console.log("%c back", "color:green;", from);
    });
    console.log("%c appvue", "color:green;", "appvue");
  },
  watch: {
    // '$route' (value){
    //   const cvalue = value
    //   console.log('%c 监听到router改变xxxx','color:#FF00FF;',cvalue)
    // 	if (this.common&&window.utils.utilsPlugin.isEmptyObject(this.common.userInfo)&&this.$route.meta.login) {
    //     this.showlogin = true
    //   }
    // },
    getshowlogin(value) {
      console.log("%c 监听到getshowlogin改变xxxx", "color:#FF00FF;", value);
      // if (this.common&&window.utils.utilsPlugin.isEmptyObject(this.common.userInfo)&&this.$route.meta.login) {
      this.showlogin = value;
      // }
    },
    getisRouterAlive(value) {
      console.log("%c 监听到getisRouterAlive改变xxxx", "color:#FF00FF;", value);
      // this.isRouterAlive = false;
      this.$nextTick(function() {
        // this.isRouterAlive = true;
        this.transitionName = "";
        this.activeDate = new Date().getTime();
      });
    },
    getshowsearch(value) {
      console.log("%c 监听到getshowsearch改变xxxx", "color:#FF00FF;", value);
      console.log(
        "%c 监听到getshowsearch改变xxxx",
        "color:#FF00FF;",
        this.searchTransitionName
      );
      this.showsearch = value;
      if (!value) {
        this.searchTransitionName = "n22-base-fade";
      }
    },
    "$store.state.common.routers.to.meta.transition"(newval) {
      console.log("%c 监听到 getTransition 改变xxxx", "color:#FF00FF;", newval);
      // this.transitionNameOld = oldval;
      if (newval && typeof newval == "string") {
        this.transitionName = newval;
      }
    },
    getUserInfo(value) {
      console.log("%c 监听到 getUserInfo 改变xxxx", "color:#FF00FF;", value);
      if (!window.utils.utilsPlugin.isEmptyObject(value)) {
        this.showlogin = false;
      }
    },
    getNavigatorConnectionE: {
      //深度监听，可监听到对象、数组的变化
      handler(value) {
        console.log(
          "%c 监听到 getNavigatorConnection 改变xxxx",
          "color:#FF00FF;",
          value
        );
        window.utils.ui.toast({
          message: `当前网络连接${value}`,
          position: "bottom",
          duration: 3000
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./App";
</style>
