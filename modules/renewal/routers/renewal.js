/* eslint-disable */
/*
 * @Author: $desc{author}
 * @Date: $desc{time}
 * @Desc: $desc{moduleDesc}
 * @Last Modified by: $desc{author}
 * @Last Modified time: $desc{time}
 */

/**
 * @功能：此处为异步按需引入js
 * @参数：webpackChunkName webpack打包到一个文件的名字，需要将那几个文件打到一个文件里面，直接定义成同一个webpackChunkName
 * @参数：path 入口文件路径
 */

const renewal = () => import(/* webpackChunkName: "Renewal" */ "@m/renewal/views/Renewal.vue");
const renewalManage = () => import(/* webpackChunkName: "RenewalManage" */ "@m/renewal/views/RenewalManage.vue");
const renewalTask = () => import(/* webpackChunkName: "renewalTask" */ "@m/renewal/views/RenewalTask.vue");
const renewalService = () => import(/* webpackChunkName: "renewalService" */ "@m/renewal/views/RenewalService.vue");
const policyDetails = () => import(/* webpackChunkName: "policyDetails" */ "@m/renewal/views/PolicyDetails.vue");
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
  {
    name: "renewal",
    path: "/renewal",
    component: renewal,
    meta: {
      title: "续期管理", //标题
      login: false, //是否需要登陆权限
      transition: true, //是否滑动切换页面
      footer: false, //是否需要底部footer菜单
      scrollToTop: false, //是否返回顶部
      zoom: false, //是否可缩放
      isquery: false, //是否可被全局search组件搜索到
    },
    children: [
      {
        path: "/renewal",
        redirect: "/renewal/renewalManage",
      },
      {
        name: "renewalRenewalManage",
        path: "renewalManage",
        component: renewalManage,
        meta: {
          title: "续期管理", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "renewalRenewalTask",
        path: "renewalTask",
        component: renewalTask,
        meta: {
          title: "续期任务", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "renewalRenewalService",
        path: "renewalService",
        component: renewalService,
        meta: {
          title: "续期服务", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "renewalPolicyDetails",
        path: "policyDetails",
        component: policyDetails,
        meta: {
          title: "保单详情", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      /* @children<%            {
                name: "${routerName}",
                path: "${viewKebabUpper}",
                component: ${viewKebabUpper},
                meta: {
                    title: "${viewCnName}",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },children%> */
    ],
  },
];
