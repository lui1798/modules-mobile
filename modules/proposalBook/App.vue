<template>
  <div id="proposal-book-app" ref="app" class="proposal-book-app nprogress-wrap app_class" :class="_module">
    <!-- <al-all-head
      v-if="common.isShowRouterView && transitionName === 'slide-in'"
      :headBottom="false"
      :zIndex="5"
      :title="$route.meta.title"
    /> -->
    <transition :name="transitionName">
      <navigation>
        <router-view
          v-if="isRouterAlive"
          v-wechat-title="$route.meta.title"
          :key="activeDate"
          class="router-view"
          id="router-view"
          ref="appChildren"
        ></router-view>
      </navigation>
    </transition>
    <transition name="n22-base-fade">
      <div class="app_login_popup" v-if="showlogin">
        <login v-if="httpEnvironment === 'local' || $route.query.isLogin == 8"></login>
        <n22-invalid-html v-else></n22-invalid-html>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { AllHead } from "al-mobile";
const __isEmpty = require("@t/isEmpty");
import { getToken } from "@@/utils/auth";
import Login from "@@/views/Login";
import Invalid from "@@/views/errorPage/Invalid";
import __getUrlParams from "@t/getUrlParams";

export default {
  name: "proposal-book",
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    [AllHead.name]: AllHead,
    [Login.name]: Login,
    [Invalid.name]: Invalid,
  },
  data() {
    return {
      httpEnvironment: window.globalConfig.httpEnvironment,
      showlogin: false,
      isShowFooter: false,
      transitionName: "",
      searchTransitionName: "n22-base-fade",
      isRouterAlive: true,
      activeDate: "",
    };
  },
  created() {
    // console.log("%c this.$store.state", "color:green;", this.$store.state);
    console.log("%c App-router", "color:green;", this.$route.query);
    //判断是否分享挂载token
    if (this.$route && this.$route.query && this.$route.query.isShare == "2") {
      // window.utils.cache.set("token", this.$route.query.token);
      window.globalConfig.platform = "web";
    }
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "USER_INFO",
    ]),
    //页面重载--用于页面不做跳转但是需要重渲染页面的情况（实现原理：利用v-if重新渲染）
    reload() {
      console.log("%c reload", "color:green;", "reload");
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    ...mapState(["common"]),
    getshowlogin() {
      return this.common.showlogin;
    },
    getisRouterAlive() {
      return this.common.isRouterAlive;
    },
    getTransition() {
      return this.toRouter.meta.transition;
    },
    _module: {
      get: function() {
        if (
          (window.utils.ui.isIPhoneX || window.utils.ui.isIPhoneXSMax || window.utils.ui.isIPhoneXR) &&
          window.globalConfig.platform === "native"
        ) {
          return "platform-ios-x";
        } else if (
          (window.utils.ui.isIPhoneX || window.utils.ui.isIPhoneXSMax || window.utils.ui.isIPhoneXR) &&
          window.globalConfig.platform == "phoneWeb"
        ) {
          return "platform-ios-x-phoneWeb";
        } else if (
          window.navigator.platform === "iPhone" &&
          (window.globalConfig.platform === "native" || window.globalConfig.platform == "phoneWeb")
        ) {
          return "platform-ios";
        } else {
          return "platform-android";
        }
      },
    },
  },
  async mounted() {
    if (__isEmpty(await getToken()) && __getUrlParams("isShare") != 2) {
      this.showlogin = true;
    }
    setTimeout(() => {
      window.StatusBar && window.StatusBar.styleDefault();
    }, 3000);
    console.log("%c this.$route", "color:green;", this.$route);
    this.$navigation.on("forward", (to, from) => {
      console.log("%c window.performance--TO", "color:green;", window.performance);
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
      console.log("%c window.performance--BACK", "color:green;", window.performance);
      console.log("%c back", "color:green;", to);
      console.log("%c back", "color:green;", from);
      let toTra = to.route.meta.transition;
      let fromTra = from.route.meta.transition;
      window.globalConfig.animation && (toTra || fromTra) && typeof fromTra == "boolean"
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
      this.showlogin = value;
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
    "common.routers.to.meta.transition"(newval) {
      console.log("%c 监听到 getTransition 改变xxxx", "color:#FF00FF;", newval);
      if (newval && typeof newval == "string") {
        this.transitionName = newval;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./App";
.proposal-book-app {
  ::v-deep .n22-icon-back {
    color: #ffba03;
  }
  ::v-deep .n22-nav-bar {
    background-color: #ffffff;
  }
  ::v-deep .n22-nav-bar__title {
    color: #333333;
    font-size: 19px;
  }
  ::v-deep .size-xs span {
    font-weight: 400;
  }
}
</style>
