/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import store from "@m/homeTest/vuex";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

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
        return "homeTest";
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
        store.state.fromRouter +
        "跳转到这>>>" +
        store.state.toRouter,
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

    // 如果是微信 修改顶部标题
    if (window.globalConfig.platform === "wechat" && to.meta.title) {
      window.document.title = to.meta.title;
    }
    NProgress.start();
    next();
  }
});
router.afterEach((to, from) => {
  NProgress.done();
});

function callback() {
  require([
    "./homeTest"
  ], (
    homeTest
  ) => {
    router.addRoutes([
      ...homeTest.default
    ]);
    router.addRoutes([{ path: "*", redirect: "/404", hidden: true }]);
  }).catch(err => {
    console.log(err.message);
  });
}

//https://router.vuejs.org/zh/api/#router-addroutes
router.onReady(callback);

export default router;
