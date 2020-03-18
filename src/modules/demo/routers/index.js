/* eslint-disable */
/*
 * @Author: aliang
 * @Date: 2018-11-19 17:21:00
 * @Last Modified by: liwenbin
 * @Last Modified time: 2019-12-30 19:07:40
 */

import Vue from "vue";
import Router from "vue-router";
import store from "@m/demo/vuex";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

// import quicklink from "quicklink/dist/quicklink.mjs";

console.log("%c 开始配置路由》》》》》》》》","color:#00CD00",)
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
        return "demo";
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
  // demo,test,login,home,center,insured,messageNoti,train
  //注：search组件中引入了train的路由，所以train模块此处有点特殊。
  require([
    // @a_init<#
    "./demo",
/* @init<%    "./${moduleKebabUpper}",%> */
// @a_end#>
  ], (
    // @b_init<#
      demo,
/* @init<%      ${moduleKebabUpper},%> */
// @b_end#>
  ) => {
    console.log("%c >>>>>>>>>>", "color:orange;", demo);
    router.addRoutes([
      // @c_init<#
        ...demo.default,
/* @init<%        ...${moduleKebabUpper}.default,%> */
// @c_end#>
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
