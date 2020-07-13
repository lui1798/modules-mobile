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

const riskAssess = () => import( /* webpackChunkName: "RiskAssess" */ "@m/riskAssess/views/RiskAssess.vue")
const dataEntry = () => import( /* webpackChunkName: "DataEntry" */ "@m/riskAssess/views/DataEntry.vue")
const description = () => import( /* webpackChunkName: "riskAssessdescription" */ "@m/riskAssess/views/Description.vue")
const dataPerfect = () => import( /* webpackChunkName: "riskAssessdataPerfect" */ "@m/riskAssess/views/DataPerfect.vue")
const dataMoney = () => import( /* webpackChunkName: "riskAssessdataMoney" */ "@m/riskAssess/views/DataMoney.vue")
const result = () => import( /* webpackChunkName: "riskAssessresult" */ "@m/riskAssess/views/Result.vue")const ensurePlan = () => import( /* webpackChunkName: "riskAssessensurePlan" */ "@m/riskAssess/views/EnsurePlan.vue")const test = () => import( /* webpackChunkName: "riskAssesstest" */ "@m/riskAssess/views/Test.vue")/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
    {
        name: "riskAssess",
        path: "/riskAssess",
        component: riskAssess,
        meta: {
            title: "风险评估",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/riskAssess",
                redirect: "/riskAssess/dataEntry"
            },
            {
                name: "riskAssessDataEntry",
                path: "dataEntry",
                component: dataEntry,
                meta: {
                    title: "提交评估",//标题-信息录入
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },
            {
                name: "riskAssessDescription",
                path: "description",
                component: description,
                meta: {
                    title: "风险等级评估",//标题-评估说明
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },
            {
                name: "riskAssessDataPerfect",
                path: "dataPerfect",
                component: dataPerfect,
                meta: {
                    title: "风险等级评估", //标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },
            {
                name: "riskAssessDataMoney",
                path: "dataMoney",
                component: dataMoney,
                meta: {
                    title: "风险等级评估", //标题-资产录入
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },
            {
                name: "riskAssessResult",
                path: "result",
                component: result,
                meta: {
                    title: "风险等级评估结果",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },            {
                name: "riskAssessEnsurePlan",
                path: "ensurePlan",
                component: ensurePlan,
                meta: {
                    title: "全生命周期保障方案",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },            {
                name: "riskAssessTest",
                path: "test",
                component: test,
                meta: {
                    title: "s",//标题
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
        ]
    },
]
