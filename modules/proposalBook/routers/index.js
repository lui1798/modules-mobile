/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import store from "@m/proposalBook/vuex";
// import NProgress from "nprogress";
import NProgress from "@@/components/nprogress/nprogress.js";
NProgress.configure({
  showSpinner: false,
});

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
        console.log(
          "%c routes=>base",
          "color:blue;",
          window.globalConfig.platform
        );
        return "proposalBook";
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
router.onError((error) => {
  console.error(error);
  const pattern = /Loading chunk (.*) failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }else{
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
        store.state.fromRouter.name +
        "跳转到这>>>" +
        store.state.toRouter.name,
      "color:#C0FF3E;background-color:black;",
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

    // 如果是微信 修改顶部标题
    if (window.globalConfig.platform === "wechat" && to.meta.title) {
      window.document.title = to.meta.title;
    }
    setTimeout(() => {
      store.commit("IS_SHOW_ROUTER_VIEW", false);
    }, 600);
    NProgress.start(window.globalConfig.isHistoryBack);
    // $('#loading-head').css('display', 'block');
    setTimeout(() => {
      next();
    }, 100);
  }
});
router.afterEach((to, from) => {
  NProgress.done();
  // $('#loading-head').css('display', 'none');
  if (to.name!==null && from.name!==null) {
    setTimeout(() => {
      store.commit("IS_SHOW_ROUTER_VIEW", true);
    }, 10);
  }
});

function callback() {
  require([
    "./proposalBook"
  ], (
    proposalBook
  ) => {
    router.addRoutes([
      ...proposalBook.default
    ]);
    router.addRoutes([{ path: "*", redirect: "/404", hidden: true }]);
  }).catch(err => {
    console.log(err.message);
  });
}

//https://router.vuejs.org/zh/api/#router-addroutes
router.onReady(callback);

export default router;
