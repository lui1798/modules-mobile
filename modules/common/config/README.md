---
title: config-axios请求模块
---
统一接口请求方法

### 引入
使用直接导入请求模块
```
import axiosHttp from "@@/config/axiosHttp";
```

### axiosHttp methods

#### @request(url, { data, config, method }, debug, module, promiseCancel = true)
get post请求合并方法

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|url|请求url参数|String|最终url会被拼接成`window.globalConfig.rootUrl + "/" + module + url`|
|params|请求参数集合对象|Object|请求参数对象见下，|
|debug|是否开启mock请求加载|Boolean|默认不开启|
|module|当前请求参数模块|String|`/service/.`中配置的module，配合url参数、globalConfig.rootUrl，拼接最终的请求地址|
|promiseCancel|多次同时掉用同一个接口，是否只保留一层|Boolean|默认开启，只保留一次请求|

##### request params

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|data|请求接口所需对象|String、Object、Array...|*必须项*|
|config|请求相关配置对象|Object|请求参数对象见下|
|method|请求method|String|非必须字段，可没有次字段，如果`params`对象没有`method`字段，则默认请求为`post`|
|isParams|get请求是否在接口地址后面拼接？参数|Boolearn|非必须字段，可没有次字段，默认拼接，如果不想将data数据拼接在后面给`false`值|
| - | - | - | 可扩充字段 |

##### request params -> config

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|isLoadding|是否开启接口加载loadding|Boolean|不需要可以不加次字段，默认无加载|
|loaddingText|开启接口加载loadding后的提示文本|String|不需要可以不加次字段|
|isDealError|是否自行处理错误|Boolean|不需要可以不加次字段，默认统一处理错误，有次字段，并且设置为true时，会直接返回错误对象，没有任何提示，需自行在回掉中处理错误|
| - | - | - | 可扩充字段 |



### 完整请求实例

#### service中
```
import axiosHttp from "@@/config/axiosHttp";

const module = "sercrity";
export const dataService = {
  login: "/login", //login
};
export const getData = dataService;

/**
 * 登陆并获取用户信息
 * @param {*} 获取用户信息
 */
export const login = params => axiosHttp.request(dataService.login, params, localStorage.getItem(module + "Debug"), module);
```

#### 页面中

1、有loading-get
```
const axiosParams = {
    isLoadding: true,
    loaddingText: "数据请求中...",
};
let testlogin = {
    number: "",
};
login({ data: testlogin, config: axiosParams, method: "get" }).then(
    data => {
        console.log("%c data--demo", "color:#00CD00", data);
    },
    error => {
        console.log("%c error-demo", "color:#00CD00", error);
    },
);
```
2、无loading-post
```
let testlogin = {
    number: "",
};
login({ data: testlogin }).then(
    data => {
        console.log("%c data--demo", "color:#00CD00", data);
    },
    error => {
        console.log("%c error-demo", "color:#00CD00", error);
    },
);
```
3、自行处理错误返回
```
const axiosParams = {
    isDealError: true,
};
let testlogin = {
    number: "",
};
login({ data: testlogin, config: axiosParams, method: "get" }).then(
    data => {
        console.log("%c data--demo", "color:#00CD00", data);
    },
    error => {
        console.log("%c error-demo", "color:#00CD00", error);
        if (error.status === 400) {
           Toast(error.message)
        }
    },
);
```

