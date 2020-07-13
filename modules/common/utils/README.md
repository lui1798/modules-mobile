---
title: utils工具类模块
---

### code：内置常用数据码表映射处理类
配合data/codedata/*使用，过滤筛选所需要的码表对象

##### code.getCodeData(type, item, retValue, product, {value, whereFrom})
按钮点击事件

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|type|码表对象的key值|String|取sex性别的码表对象eg:`code.getCodeData("sex")`|
|item|流程化数据对象|Object|如果接口不是流程化的接口，不传或者传空、`underfined`即可|
|retValue|需要将返回的码表对象赋值在那个对象上，赋值的字段为第一个字段`type`|Object|如果传了item，该参数必传，|
|product|产品引擎对象|Object|如果不是处理产品不需要传|
|{value, whereFrom, ...}|其他可扩展对象|Object|暂时未使用|



### tool：内置常用工具集合
处理常用的业务js逻辑

#### dom.js
请参考<a href="/#/zh-CN/docs/vuecommonattr?anchor=vue%20mixin%20data%20Props">getAllMyVue</a>

#### flatDateStr.js
变幻Date，兼容 iOS

##### flatDateStr(date)
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|date|日期类字符串|String|`2020-02-02`,`2020.02.02`...|

#### Format.js
日期格式化-此处为修改Date.prototype,因此使用的时候直接Date对象掉用即可

#### is.js
check value type-判断数据类型

##### is(type, val)
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|type|数据类型|String|`Object`,`Array`,`Number`,`String`,`Boolean`...|
|val|校验对象|-|-|
|return|返回真假|Boolean|-|

#### isEmpty.js
check value ''-判断是否为空

##### isEmpty(value)
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|value|校验对象|-|-|
|return|返回真假|Boolean|-|

#### trim.js
去除空格

##### trim(value)
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|value|value|-|-|

##### getUrlParams(name, url)
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|name|url中的参数key|-|如果为空时返回所有参数key-value对象|
|url|url地址|-|Url地址非必填（默认取当前window.location）|

##### cosUtils
###### @methord getConfig()
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|待补充|-|-|-|

... 待补充



### 代码演示
<!-- DEMO -->
