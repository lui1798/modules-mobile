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

const brokerageKpi = () => import(/* webpackChunkName: "BrokerageKpi" */ "@m/brokerageKpi/views/BrokerageKpi.vue");
const examineWarning = () =>
  import(/* webpackChunkName: "ExamineWarning" */ "@m/brokerageKpi/views/ExamineWarning.vue");
const myExamine = () => import(/* webpackChunkName: "brokerageKpimyExamine" */ "@m/brokerageKpi/views/MyExamine.vue");
const brokerageWarning = () =>
  import(/* webpackChunkName: "brokerageKpibrokerageWarning" */ "@m/brokerageKpi/views/BrokerageWarning.vue");
const historicalIncome = () =>
  import(/* webpackChunkName: "brokerageKpihistoricalIncome" */ "@m/brokerageKpi/views/HistoricalIncome.vue");
const directCommissionDetails = () =>
  import(
    /* webpackChunkName: "brokerageKpidirectCommissionDetails" */ "@m/brokerageKpi/views/DirectCommissionDetails.vue"
  );
const historyDetails = () =>
  import(/* webpackChunkName: "brokerageKpihistoryDetails" */ "@m/brokerageKpi/views/HistoryDetails.vue");
const newcomerAllowance = () =>
  import(/* webpackChunkName: "brokerageKpinewcomerAllowance" */ "@m/brokerageKpi/views/NewcomerAllowance.vue");
const quarterlyExhibitionAward = () =>
  import(
    /* webpackChunkName: "brokerageKpiquarterlyExhibitionAward" */ "@m/brokerageKpi/views/QuarterlyExhibitionAward.vue"
  );
const administrationAllowance = () =>
  import(
    /* webpackChunkName: "brokerageKpiadministrationAllowance" */ "@m/brokerageKpi/views/AdministrationAllowance.vue"
  );
const staffCoachingAward = () =>
  import(/* webpackChunkName: "brokerageKpistaffCoachingAward" */ "@m/brokerageKpi/views/StaffCoachingAward.vue");
const formalExamine = () =>
  import(/* webpackChunkName: "brokerageKpiformalExamine" */ "@m/brokerageKpi/views/FormalExamine.vue");
const myTeam = () => import(/* webpackChunkName: "brokerageKpimyTeam" */ "@m/brokerageKpi/views/MyTeam.vue");
const hisExamine = () =>
  import(/* webpackChunkName: "brokerageKpihisExamine" */ "@m/brokerageKpi/views/HisExamine.vue");
const myFormalExamine = () =>
  import(/* webpackChunkName: "brokerageKpimyFormalExamine" */ "@m/brokerageKpi/views/MyFormalExamine.vue");
const myFormalExamineDetails = () =>
  import(
    /* webpackChunkName: "brokerageKpimyFormalExamineDetails" */ "@m/brokerageKpi/views/MyFormalExamineDetails.vue"
  );
const myFormalTeam = () =>
  import(/* webpackChunkName: "brokerageKpimyFormalTeam" */ "@m/brokerageKpi/views/MyFormalTeam.vue");
const hisFormalExamine = () =>
  import(/* webpackChunkName: "brokerageKpihisFormalExamine" */ "@m/brokerageKpi/views/HisFormalExamine.vue");
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
  {
    name: "brokerageKpi",
    path: "/brokerageKpi",
    component: brokerageKpi,
    meta: {
      title: "佣金考核", //标题
      login: false, //是否需要登陆权限
      transition: true, //是否滑动切换页面
      footer: false, //是否需要底部footer菜单
      scrollToTop: false, //是否返回顶部
      zoom: false, //是否可缩放
      isquery: false, //是否可被全局search组件搜索到
    },
    children: [
      {
        path: "/brokerageKpi",
        redirect: "/brokerageKpi/examineWarning",
      },
      {
        name: "brokerageKpiExamineWarning",
        path: "examineWarning",
        component: examineWarning,
        meta: {
          title: "考核预警", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiMyExamine",
        path: "myExamine",
        component: myExamine,
        meta: {
          title: "我的考核", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiBrokerageWarning",
        path: "brokerageWarning",
        component: brokerageWarning,
        meta: {
          title: "佣金预警", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiHistoricalIncome",
        path: "historicalIncome",
        component: historicalIncome,
        meta: {
          title: "历史收入", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiDirectCommissionDetails",
        path: "directCommissionDetails",
        component: directCommissionDetails,
        meta: {
          title: "直接佣金明细", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiHistoryDetails",
        path: "historyDetails",
        component: historyDetails,
        meta: {
          title: "历史明细", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiNewcomerAllowance",
        path: "newcomerAllowance",
        component: newcomerAllowance,
        meta: {
          title: "新人津贴", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiQuarterlyExhibitionAward",
        path: "quarterlyExhibitionAward",
        component: quarterlyExhibitionAward,
        meta: {
          title: "季度展业奖", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiAdministrationAllowance",
        path: "administrationAllowance",
        component: administrationAllowance,
        meta: {
          title: "直辖组管理津贴", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiStaffCoachingAward",
        path: "staffCoachingAward",
        component: staffCoachingAward,
        meta: {
          title: "属员辅导奖", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiFormalExamine",
        path: "formalExamine",
        component: formalExamine,
        meta: {
          title: "正式考核", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiMyTeam",
        path: "myTeam",
        component: myTeam,
        meta: {
          title: "我的团队", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiHisExamine",
        path: "hisExamine",
        component: hisExamine,
        meta: {
          title: "TA的考核", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiMyFormalExamine",
        path: "myFormalExamine",
        component: myFormalExamine,
        meta: {
          title: "我的正式考核", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiMyFormalExamineDetails",
        path: "myFormalExamineDetails",
        component: myFormalExamineDetails,
        meta: {
          title: "我的正式考核详情", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiMyFormalTeam",
        path: "myFormalTeam",
        component: myFormalTeam,
        meta: {
          title: "我的团队正式考核", //标题
          login: true, //是否需要登陆权限
          transition: true, //是否滑动切换页面
          footer: false, //是否需要底部footer菜单
          scrollToTop: false, //是否返回顶部
          zoom: false, //是否可缩放
          isquery: false, //是否可被全局search组件搜索到
        },
      },
      {
        name: "brokerageKpiHisFormalExamine",
        path: "hisFormalExamine",
        component: hisFormalExamine,
        meta: {
          title: "Ta的正式考核", //标题
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
