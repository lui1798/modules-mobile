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

const homeTest = () => import( /* webpackChunkName: "HomeTest" */ "@m/homeTest/views/HomeTest.vue")
const myView = () => import( /* webpackChunkName: "MyView" */ "@m/homeTest/views/MyView.vue")
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")@import%> */
export default [
    {
        name: "homeTest",
        path: "/homeTest",
        component: homeTest,
        meta: {
            title: "模块测试",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/homeTest",
                redirect: "/homeTest/myView"
            },
            {
                name: "homeTestMyView",
                path: "myView",
                component: myView,
                meta: {
                    title: "第一个页面测试",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
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
            },@children%> */
        ]
    },
]
