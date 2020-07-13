---
title: 内置样式css
---

默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 1px 边框
为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="n22-hairline--top"></div>
<!-- 下边框 -->
<div class="n22-hairline--bottom"></div>
<!-- 左边框 -->
<div class="n22-hairline--left"></div>
<!-- 右边框 -->
<div class="n22-hairline--right"></div>
<!-- 上下边框 -->
<div class="n22-hairline--top-bottom"></div>
<!-- 全边框 -->
<div class="n22-hairline--surround"></div>
```
### 动画
可以通过 `transition` 组件使用内置的动画

```html
<!-- 淡入 -->
<transition name="n22-base-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- 下滑 -->
<transition name="n22-base-slide-bottom">
  <div v-show="visible">Fade</div>
</transition>

```

#### 项目内注入自带-可在 `src/assets/css/base-translate.scss`修改
- `n22-base-fade`
- `n22-base-rotate`
- `n22-base-scale`
- `n22-base-slide-left`
- `n22-base-slide-right`
- `n22-base-slide-up`
- `n22-base-slide-down`

#### 组件内自带
- `n22-fade`
- `n22-fade-up`
- `n22-fade-down`
- `n22-fade-left`
- `n22-fade-right`
- `n22-slide-up`
- `n22-slide-down`
- `n22-slide-left`
- `n22-slide-right`
- `n22-bounce`
- `n22-punch`
- `n22-zoom`

*******************************************************************************************