# 模块common

[简介:内置公共基础模块]

## 更新日志

`2020-06-10`
- Feat
  - 全局`base.scss`修改body的overflow，由auto改为hidden（解决ios底部回弹效果会覆盖fixed布局问题）。其他模块及页面如果有问题及时提出

`2020-05-23`
- Feat
  - `/utils/tool`新增获取url参数的`getUrlParams`模块。
- Fix
  - `/components/move`修复`z-index`,更改为`99`，防止部分页面被遮盖。




## 注意⚠️
此模块为公共基础使用模块，更改前，要做好相关日志记录
