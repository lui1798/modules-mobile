/* eslint-disable */
/*
 * @Author: aliang
 * @Date: 2020年03月10日
 * @Desc: 首页模块
 * @Last Modified by: aliang
 * @Last Modified time: 2020年03月10日
 */

/**
 * @功能：此处为异步按需引入js
 * @参数：webpackChunkName webpack打包到一个文件的名字，需要将那几个文件打到一个文件里面，直接定义成同一个webpackChunkName
 * @参数：path 入口文件路径 
 */

const home = () => import( /* webpackChunkName: "home" */ "@/views/home/Home.vue")
const homeFish = () => import( /* webpackChunkName: "homehomeFish" */ "@/views/home/HomeFish.vue")
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} '@/views/${moduleKebabUpper}/${viewKebabNameUpper}.vue')%> */
export default [
    {
        name: "home",
        path: "/home",
        component: home,
        meta: {
            title: "首页",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/home",
                redirect: "/home/homeFish"
            },
            {
                name: "homeHomeFish",
                path: "homeFish",
                component: homeFish,
                meta: {
                    title: "首页",//标题
                    login: false, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: true,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
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
        ]
    },
]