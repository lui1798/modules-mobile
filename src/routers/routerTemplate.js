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

/* @init<#
const #{moduleKebabUpper} = () => import( #{webpackChunkName} "@/views/#{moduleKebabUpper}/#{moduleKebabNameUpper}.vue")
/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@/views/${moduleKebabUpper}/${viewKebabNameUpper}.vue")@import%>
export default [
    {
        name: "#{moduleKebabUpper}",
        path: "/#{moduleKebabUpper}",
        component: #{moduleKebabUpper},
        meta: {
            title: "#{moduleCnName}",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/$firstChildren{moduleKebabUpper}",
                redirect: "/$firstChildren{moduleKebabUpper}/$firstChildren{viewKebabUpper}"
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
            },@children%>
        ]
    },
]
#> */