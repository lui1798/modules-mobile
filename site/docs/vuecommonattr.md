---
title: vue内置相关常用属性
---

统一规范话以及简化开发

### 使用
直接在.vue文件中使用this掉用

### 代码演示
<!-- DEMO -->
js中this直接掉用
```
this.screenWidth
```
html中直接取值
```
{{screenWidth}}
```


### API
[传送门]./modules/common/assets/lib/main/getAllMyVue.js

#### vue mixin data Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|$native|原生对象| Object | js-native-n22 | - |
|screenWidth|dom屏幕宽度| Number | document.documentElement.clientWidth | - |
|screenHeight|dom屏幕高度| Number | document.documentElement.clientHeight | - |
|allHeadTopPx|顶部处理距离高度| Number | - | 主要是用来区分android、ios顶部高度相差20px再加上预留的顶部导航44px，以及ios刘海的高度处理。 |
|allHeadTopPxVideo|顶部处理距离高度| Number | - | 主要是用来video中不显示导航栏时具体看代码。 |
|dealPxToVw|将px像素转为项目的适配vw单位| Number | - | - |
|stringToNum|将字符串转Number| String | - | - |
|os|当前运行平台环境| String | `android` | - |
|platform|当前运行打包的模式| String | `phoneweb` | 可选`web`、`native`、`phoneweb` |
|runningEnvironment|js-native运行环境| String | `N22JSBridge` | 可选`cordova`、`AlipayJSBridge` |
|transitionTime|全局动画时长，配合css中全局变量的动画时长| Number | `300` | - |
|isVirtualKeyboardProduct|产品组件区是否开启自定义虚拟键盘| Boolean | `true` | - |

#### vue mixin methods Props

##### @go(url, params, type, module)
按钮点击事件

|属性 | 说明 | 类型 | 备注 ｜
|----|-----|------|------|
|url|页面跳转路径|String| - ｜
|params|页面跳转参数|Object| - ｜
|type|页面跳转属性|String| 目前只支持`push`或者`underfined` ｜
|module|页面跳转模块|String| - |

###### 说明
go方法的掉用基本跟vue-router的push掉用类似
```
// 1、字符串(此处的url最前面不能加`/`)
不带参数
this.go(`proposalBook/dataEntry`)
带参数
this.go(`proposalBook/dataEntry?insuredName=${this.insuredName}&holedName=${this.holedName}`)

// 2、对象
router.push({ path: 'home' })

// 3、命名的路由(此处是基于路由传参数，因此路由里面path参数要配置需要传递的参数对象。如下)
this.go("proposalBook/dataEntry", { userId: '123', userName: '哈哈' }})
{
    name: "proposalBookDataEntry",
    path: "dataEntry/:userId/:userName",
    component: dataEntry,
    meta: {
        title: "信息录入",//建议书信息录入页面
        ...
    }
},

// 4、带查询参数，(此方法为1的更明了写法，不用直接拼接字符串，最终变成 /proposalBook/dataEntry?plan=private)
//注意，此方法相比于1，多了个params参数，同时url的参数第一位要加`/`
this.go( "/proposalBook/dataEntry", { plan: 'private' })
```

##### @timeoutToLogin()
注入全局超时退出登录逻辑
