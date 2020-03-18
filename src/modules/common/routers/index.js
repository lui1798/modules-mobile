/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import store from "@@/vuex";
import NProgress from "nprogress";
//导入错误码表数据
import errorCode from "@@/data/error/errorCode";
NProgress.configure({ showSpinner: false });

// import quicklink from "quicklink/dist/quicklink.mjs";

Vue.use(Router);
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior,
  routes: [
    {
      path: "/",
      name: "base",
      redirect: () => {
        // 为非app情况下 则重定向到登陆页面
        // if (window.globalConfig.platform !== 'native') {
        //   return window.globalConfig.platform === 'wechat' ? 'register' : 'login'
        // }
        // var build = process.env.VUE_APP_MODULE_LIST || ""
        // build = build.split(",") || []
        console.log(
          "%c routes=>base",
          "color:blue;",
          window.globalConfig.platform
        );
        return "home";
      },
      meta: {
        title: "保险商城测试",
        login: false,
        footer: true,
        tabIndex: "1"
      }
    },
    {
      name: "invalid",
      path: "/invalid",
      component: () => import("@@/views/errorPage/Invalid"),
      hidden: true,
      meta: {
        title: "404",
        login: false,
        transition: true,
        footer: false,
        isquery: true,
        hidden: true
      }
    },
    {
      name: "404",
      path: "/404",
      component: () => import("@@/views/errorPage/404"),
      hidden: true,
      meta: {
        title: "404",
        login: false,
        transition: true,
        footer: false,
        isquery: true,
        hidden: true
      }
    }
  ]
});
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[解决-发到服务器导致文件加载失败的情况-暂未验证]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
router.onError(error => {
  errorCode.LoadingChunkERROR00001.error = error;
  console.error(errorCode.LoadingChunkERROR00001);
  const pattern = /Loading chunk (.*) failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  } else {
    console.error(error);
  }
});
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[解决-发到服务器导致文件加载失败的情况-暂未验证]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
console.log("%c router", "color:green;", router);
// 监听路由变化
router.beforeEach((to, from, next) => {
  if (!to.query["AL"]) {
    next();
  } else {
    store.state.toRouter = to;
    store.state.fromRouter = from;
    let routersvuex = {
      to: to,
      from: from
    };
    store.commit("ROUTERS", routersvuex);
    console.log(
      "%c 我从这>>>" +
        store.state.common.routers.from.name +
        "跳转到这>>>" +
        store.state.common.routers.to.name,
      "color:#C0FF3E",
      "store"
    );
    // 配置微信的信息
    try {
      window.utils.wechat.hideAllNonBaseMenuItem();
    } catch (error) {
      console.log("微信配置失败", "error");
    }
    // 关闭loadding
    // window.utils.ui.closeLoadding()
    // 底部导航是否显示
    store.commit("SHOW_FOOTER", to.meta.footer);
    if (to.meta.tabIndex) {
      store.commit("TAB_SELECTED", to.meta.tabIndex);
    }

    // 是否可以缩放
    //   if (to.meta.zoom) {
    //     document.querySelector('meta[name=viewport]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=3.0, user-scalable=yes')
    //   } else {
    //     document.querySelector('meta[name=viewport]').setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no')
    //   }

    // 如果是微信 修改顶部标题
    if (window.globalConfig.platform === "wechat" && to.meta.title) {
      window.document.title = to.meta.title;
    }
    // 是否登录
    if (to.meta && to.meta.title && to.meta.login !== false) {
      console.log(JSON.stringify(to.meta));
      // 如果是微信的情况则跳转到注册页面
      store.commit("ISLOGINGO", to);
      store.commit("SHOWLOGIN", true);
    } else {
      store.commit("ISLOGINGO", to);
      setTimeout(() => {
        store.commit("IS_SHOW_ROUTER_VIEW", false);
      }, 600);
      NProgress.start();
      next();
    }
  }
});
// import sensors from'sa-sdk-javascript';
router.afterEach((to, from) => {
  if (window.globalConfig.logSave) {
    console.log(
      "%c router.afterEach",
      "color:blue;",
      store.state.common.viewStartTime
    );
    if (
      store.state.common.viewStartTime &&
      !window.utils.utilsPlugin.isEmptyObject(store.state.common.viewStartTime)
    ) {
      var start = store.state.common.viewStartTime;
      var end = new Date();
      // 如果用户一直不关闭页面，可能出现超大值，可以根据业务需要处理，例如设置一个上限
      var duration = (end.getTime() - start.getTime()) / 1000;
      // 定义一个记录页面停留时间的事件pageView,并且保存需要的属性(停留时间和当前页面的地址)
      console.log("%c 上一页面停留时间>>>>>>>>>>", "color:green;", duration);
      window.utils.sensors.track("pageclose", {
        pageStayTime: duration,
        pageUrl: from.name
      });
    }
    store.commit("VIEW_START_TIME", new Date());
  }

  NProgress.done();
  setTimeout(() => {
    store.commit("IS_SHOW_ROUTER_VIEW", true);
  }, 10);
  // if(store.state.common.isShowRouterView){
  //    setTimeout(() => {
  //       //   !to.meta.isCloseShowRouterView&&store.commit('IS_SHOW_ROUTER_VIEW', false);
  //       store.commit('IS_SHOW_ROUTER_VIEW', false);
  //    }, 300);
  // }
  // quicklink();
  // Vue.nextTick(() => {
  //   utils.sensors.quick("autoTrackSinglePage");
  // });
});

function callback() {
  // demo,test,login,home,center,insured,messageNoti,train
  //注：search组件中引入了train的路由，所以train模块此处有点特殊。
  require([
    // @a_init<#    "./demo",    "./home",/* @init<%    "./${moduleKebabUpper}",%> */// @a_end#>
  ], (
    // @b_init<#      demo,      home,/* @init<%      ${moduleKebabUpper},%> */// @b_end#>
  ) => {
    console.log("%c >>>>>>>>>>", "color:orange;", demo);
    router.addRoutes([
      // @c_init<#        ...demo.default,        ...home.default,/* @init<%        ...${moduleKebabUpper}.default,%> */// @c_end#>
    ]);
    router.addRoutes([{ path: "*", redirect: "/404", hidden: true }]);
  }).catch(err => {
    console.log(err.message);
  });
}
/* eslint-disable */

//https://router.vuejs.org/zh/api/#router-addroutes
router.onReady(callback);

export default router;
