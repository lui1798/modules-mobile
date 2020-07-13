import { Toast } from "al-mobile";

const ui = {
  // iPhone X、iPhone XS
  isIPhoneX:
    /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio &&
    (window.devicePixelRatio === 2 || window.devicePixelRatio === 3) &&
    window.screen.width === 375 &&
    window.screen.height === 812,
  // iPhone XS Max
  isIPhoneXSMax:
    /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 414 &&
    window.screen.height === 896,
  // iPhone XR
  isIPhoneXR:
    /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 2 &&
    window.screen.width === 414 &&
    window.screen.height === 896,
  screenWidthR(num, fixed) {
    const numR = document.documentElement.clientWidth * (num / 375);
    return parseFloat(numR.toFixed(fixed ? fixed : 3));
  },
  screenHeightR(num, fixed) {
    const numR = document.documentElement.clientHeight * (num / 667);
    return parseFloat(numR.toFixed(fixed ? fixed : 3));
  },
  // 弹出提示
  toast(msg) {
    if (msg) {
      if (msg.message) {
        msg.content = msg.message;
        Toast(msg);
      } else {
        msg.content = `错误！！！`;
        Toast(msg);
      }
    } else {
      Toast.info(msg);
    }
  },
  toastMiddle(msg) {
    Toast({
      message: msg,
      position: "middle",
      duration: 3000,
    });
  },
};

export default ui;
