const UA = window.navigator.userAgent.toLowerCase();
// export const isAndroid = UA && UA.indexOf('android') > 0
// export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
const platform = UA && /iphone|ipad|ipod|ios/.test(UA) ? "ios" : "android";

const runningEnvironment = window.cordova
  ? "cordova"
  : window.GDIJSBridge || window.WebViewJavascriptBridge
  ? "N22JSBridge"
  : "web";

export { platform, runningEnvironment };
