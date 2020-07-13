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

const entry = () => import(/* webpackChunkName: "entry" */ "@m/entry/views/Entry.vue");
const indexView = () => import(/* webpackChunkName: "IndexView" */ "@m/entry/views/IndexView.vue");
const personDetail = () =>
  import(/* webpackChunkName: "entrypersonDetail" */ "@m/entry/views/PersonDetail.vue");
const cardScan = () => import(/* webpackChunkName: "entrycardScan" */ "@m/entry/views/CardScan.vue");
const signContract = () =>
  import(/* webpackChunkName: "entrysignContract" */ "@m/entry/views/SignContract.vue");
const basicInforEntry = () =>
  import(/* webpackChunkName: "entrybasicInforEntry" */ "@m/entry/views/BasicInforEntry.vue");
const basicInforMoreEntry = () =>
  import(/* webpackChunkName: "entrybasicInforMoreEntry" */ "@m/entry/views/BasicInforMoreEntry.vue");
const detailInforEntry = () =>
  import(/* webpackChunkName: "entrydetailInforEntry" */ "@m/entry/views/DetailInforEntry.vue");
const imageUpload = () =>
  import(/* webpackChunkName: "entryimageUpload" */ "@m/entry/views/ImageUpload.vue");
const workExperience = () =>
  import(/* webpackChunkName: "entryworkExperience" */ "@m/entry/views/WorkExperience.vue");
const trainingInformation = () =>
  import(/* webpackChunkName: "entrytrainingInformation" */ "@m/entry/views/TrainingInformation.vue");
const educationBackground = () =>
  import(/* webpackChunkName: "entryeducationBackground" */ "@m/entry/views/EducationBackground.vue");
const entryExplainBook = () => import( /* webpackChunkName: "entryentryExplainBook" */ "@m/entry/views/EntryExplainBook.vue")const occupationPromiseBook = () => import( /* webpackChunkName: "entryoccupationPromiseBook" */ "@m/entry/views/OccupationPromiseBook.vue")/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
  {
    name: "entry",
    path: "/entry",
    component: entry,
    meta: {
      title: "入职管理", //标题
      login: false, //是否需要登陆权限
      transition: true, //是否滑动切换页面
      footer: false, //是否需要底部footer菜单
      scrollToTop: false, //是否返回顶部
      zoom: false, //是否可缩放
      isquery: false, //是否可被全局search组件搜索到
    },
    children: [
      {
        path: "/entry",
        redirect: "/entry/indexView",
      },
      {
        name: "entryIndexView",
        path: "indexView",
        component: indexView,
        meta: {
          title: "入职管理", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryPersonDetail",
        path: "personDetail",
        component: personDetail,
        meta: {
          title: "人员详情", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryCardScan",
        path: "cardScan",
        component: cardScan,
        meta: {
          title: "证件识别", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entrySignContract",
        path: "signContract",
        component: signContract,
        meta: {
          title: "签订电子合同", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryBasicInforEntry",
        path: "basicInforEntry",
        component: basicInforEntry,
        meta: {
          title: "完善个人信息", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryBasicInforMoreEntry",
        path: "basicInforMoreEntry",
        component: basicInforMoreEntry,
        meta: {
          title: "完善个人信息", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryDetailInforEntry",
        path: "detailInforEntry",
        component: detailInforEntry,
        meta: {
          title: "人员详情", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryImageUpload",
        path: "imageUpload",
        component: imageUpload,
        meta: {
          title: "影像上传", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryWorkExperience",
        path: "workExperience",
        component: workExperience,
        meta: {
          title: "修改入司前工作经历", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryTrainingInformation",
        path: "trainingInformation",
        component: trainingInformation,
        meta: {
          title: "修改入司前培训信息", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "entryEducationBackground",
        path: "educationBackground",
        component: educationBackground,
        meta: {
          title: "修改入司前学历信息", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
                  {
                name: "entryEntryExplainBook",
                path: "entryExplainBook",
                component: entryExplainBook,
                meta: {
                    title: "入职声明书",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },            {
                name: "entryOccupationPromiseBook",
                path: "occupationPromiseBook",
                component: occupationPromiseBook,
                meta: {
                    title: "职业行为声明和承诺书",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },/* @children<%            {
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
