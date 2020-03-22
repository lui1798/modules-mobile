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

const demo = () => import( /* webpackChunkName: "Demo" */ "@m/demo/views/Demo.vue")
const allDemo = () => import( /* webpackChunkName: "AllDemo" */ "@m/demo/views/AllDemo.vue")
const demoDetail = () => import( /* webpackChunkName: "demodemoDetail" */ '@m/demo/views/DemoDetail.vue')
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
    {
        name: "demo",
        path: "/demo",
        component: demo,
        meta: {
            title: "例子",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/demo",
                redirect: "/demo/allDemo"
            },
            {
                name: "demoAllDemo",
                path: "allDemo",
                component: allDemo,
                meta: {
                    title: "demo入口",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: true,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },
            {
                name: "demoDemoDetail",
                path: "demoDetail",
                component: demoDetail,
                meta: {
                    title: "demo详情展示页面",//标题
                    login: false, //是否需要登陆权限
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
            },children%> */
        ]
    },
]
