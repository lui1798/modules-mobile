---
title: 兼容性
---

### popup-在微信中的焦点错位
解决微信浏览器bug-微信打开网页键盘弹起后页面上滑，导致弹框里的按钮响应区域错位
需要通过一下代码进行解决
```
setTimeout(function(){
    window.scrollTo(0, 0)
},100)
```

*******************************************************************************************

### 微信获取焦点导致页面底部有一块灰色区域问题
需要通过一下代码进行解决
```
window.document.addEventListener(
  "blur",
  function() {
    console.log("%c 全局监听input输入框--blur", "color:green;", "全局监听input输入框xxxxxxx");
    if (ua.match(/MicroMessenger/i) == "micromessenger" || window.GDIJSBridge) {
      setTimeout(() => {
        // let ua = navigator.userAgent.toLowerCase();
        // let u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (window.globalConfig.isWechat || window.GDIJSBridge) {
          //在iphone 微信中
          let currentPosition, timer;
          let speed = 1; //页面滚动距离
          timer = setInterval(function() {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= speed;
            window.scrollTo(0, currentPosition); //页面向上滚动
            clearInterval(timer);
          }, 1);
        }
      }, 200);
    }
  },
  true,
);
```
*******************************************************************************************