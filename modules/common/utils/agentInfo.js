import Cache from "./cache";
import native from "js-native-n22";
import { runningEnvironment } from "../assets/lib/main/getNavigator";

const AgentInfoKey = "agentInfo";

export function getAgentInfo() {
  // return Cache.get(AgentInfoKey);
  return new Promise(resolve => {
    if (runningEnvironment === "web") {
      console.log("%c 非ios读取cookies", "color:#00CD00", window.GDIJSBridge);
      resolve(Cache.get(AgentInfoKey));
    } else {
      console.log("%c ios读取原生token", "color:#00CD00", window.GDIJSBridge);
      native.storage(
        {
          mode: 2,
          key: AgentInfoKey,
        },
        content => {
          console.log(content);
          if (content.object.appLoginUser) {
            Cache.set(AgentInfoKey, content.object.appLoginUser);
            resolve(content.object.appLoginUser);
          } else {
            alert("代理人信息获取为空" + JSON.stringify(content));
          }
        },
        error => {
          alert(error);
        },
      );
    }
  });
}

export function setAgentInfo(info) {
  return Cache.set(AgentInfoKey, info);
}

export function removeAgentInfo() {
  return Cache.remove(AgentInfoKey);
}
