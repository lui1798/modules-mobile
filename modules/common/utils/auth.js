import Cookies from "js-cookie";
import native from "js-native-n22";

const TokenKey = "token";

export function getToken() {
  // return Cookies.get(TokenKey);
  return new Promise(resolve => {
    if (!window.GDIJSBridge) {
      console.log("%c 非ios读取cookies", "color:#00CD00", window.GDIJSBridge);
      resolve(Cookies.get(TokenKey));
    } else {
      console.log("%c ios读取原生token", "color:#00CD00", window.GDIJSBridge);
      native.storage(
        {
          mode: 2,
          key: TokenKey,
        },
        content => {
          console.log(content);
          if (content.value) {
            resolve(content.value);
          } else {
            alert("token获取为空" + JSON.stringify(content));
          }
        },
        error => {
          alert(error);
        },
      );
    }
  });
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
