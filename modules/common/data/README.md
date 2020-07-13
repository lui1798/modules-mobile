---
title: data 静态数据
---

### codedata：内置常用数据码表
目前码表的数据封装在一个出口，如果模块需要使用该码表数据，需要在html主页面中注入
```
<script src="<%= BASE_URL %>static/codedata/codedata.js"></script>
```
如果新增了码表数据--需要运行,重新编译生成新的码表js文件
```
npm run build:codedata
```

#### 注意
尽量不要将大的码表json文件，导入到index.js，否则在全局加载的时候，码表文件会过大，导致首屏加载过慢
大的json码表尽量单独按需引入


### error：错误码表对象