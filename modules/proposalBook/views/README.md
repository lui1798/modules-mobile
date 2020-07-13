---
title: 业务页面
---
建议书所有流程主页面说明


## DataEntry

### DataEntry data
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|maxDate|日期下拉最大选择值|Date|请参考`drop-select-item`组件文档|
|errorMessage|页面内容区错误显示值|String|请参考`content`组件文档|
|tabs|-|Array|请参考`content`组件文档|
|proposalId|建议书id|String|-|
|productCode|当前第一主险code|String|-|
|insured|被保人对象|Object|-|
|holder|投保人对象|Object|-|
|selectDefaultValue|日期组件默认弹出选中的值|Object|请参考`drop-select-item`组件文档|
|isPopupShowWork|光大原有职业组件是否显示|Boolearn|-|
|workObject|光大原有职业组件封装对象|Object|-|
|relationOptions|关系下拉组件码表|Array|请参考`drop-select-item`组件文档|
|sexOptions|性别下拉组件码表|Array|请参考`drop-select-item`组件文档|
|socialOptions|社保下拉组件码表|Array|请参考`drop-select-item`组件文档|
|ageOptions|年龄下拉组件码表|Array|请参考`drop-select-item`组件文档|
|firstProObj|第一主险险种对象|Object|-|
|masterProData|单主险录入信息及附加险录入信息合并集合--险种录入弹框双向绑定数组|Array|-|
|masterProShowData|多主险及录入信息及附加险录入信息合并集合--计算保费参数|Array|-|
|masterProRetShowData|多主险及录入信息及附加险录入信息合并集合--保费成功返回|Array|-|
|allPremium|首年总保费|Number|`0`|
|calculateLoading|保费试算loading|Boolearn|-|
|buttonArray|底部按钮组|Array|请参考`action-bar`组件文档|
|proTypeList|主险险种类别数组|Array|固定死的下面`mainSelectType`对应的险种类别数组对象|
|proTypeSelectList|主险险种选择弹框列表显示数组|Array|-|
|proTypeSelectListSearchData|主险险种选择弹框搜索基础数组|Array|-|
|isPopupShowMainList|主险险种选择弹框是否显示标识|Boolearn|默认`false`|
|isPopupShowProEntry|险种参数录入弹框是否显示标识|Boolearn|默认`false`|
|isShowConfirm|暂时不使用|Number|原用于处理ios弹出框顶部导航遮罩层不遮罩问题|
|isPopupShowTk|文件弹出框是否显示|Boolearn|默认`false`|
|isPopupShowTkType|文件弹出框类别|Number|`1`为条款,`2`为说明书|
|mainSelectType|主险类型列表类型下标|Number|主险所划分的险种类别，`0`为`全部`,`1`为`寿险`,`2`为`健康险`,`3`为`意外险`,`4`为`年金保险`|
|searchProName|主险弹出框搜索input字段|String|`input-item`组件|
|rulesDialog|dialog内嵌组件对象|Object|请参考`dialog`组件文档|

#### insured（holder）
|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|name|姓名|String|-|
|birthday|出生日期|String|-|
|sex|性别|String|-|
|age|年龄|String|-|
|occupationCode|职业code|String|-|
|occupationLevel|职业类别|String|-|
|sameInsurant|是否同一人|Boolearn|-|
|relation|关系|String|-|

### DataEntry methods

#### @wordShowClick(type)
文件查看点击

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|type|文档类型|Number|`1`为条款,`2`为产品说明书|

#### @workClick(type)
职业点击

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|type|人员类别|String|`holder`为投保人,`insured`为被保人|

#### @selectedWork(item)
职业弹出框选中点击组件回调

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|item|所点击职业的对象|Object|对应码表中的对象|

#### @searchChange(item)
主险险种搜索（使用`lodash`节流函数，`fuse`搜索引擎）

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|val|搜索内容|String|-|

#### @$_changeData({ name, isCalculate }, val, oldval, isHand, type, key)

|属性 | 说明 | 类型 | 备注 |
|----|-----|------|------|
|isCalculate|是否进行保费试算|Boolear|默认`false`|
其他参考`al-mobile`各个组件的回调参数
