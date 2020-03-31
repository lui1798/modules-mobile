import code from "@@/utils/code/";

const handler = {
  /** deprecated 拍照相册，跟iOS统一，用npm仓库插件 */
  capturePhoto(reqData, callback, callbackFail) {
    var str = "hybrid://CameraPlugin:201/showCameraViewWithInfo?" + JSON.stringify(reqData);
    window.EntryPlugin.hybridCallAction(str, callback, callbackFail);
  },
  /**
   * @name 打开相机
   * @param opt配置地址:https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions
   * @desc https://github.com/apache/cordova-plugin-camera
   */
  getPicture(opt = {}) {
    window.utils.ui.loadding();
    // 设置操作对象数据
    let options = Object.assign(
      {
        quality: 50,
        destinationType: window.Camera && window.Camera.DestinationType.DATA_URL, // 默认base64编码格式
        sourceType: window.Camera && window.Camera.PictureSourceType.CAMERA, // 默认打开拍照功能
        targetWidth: 1560,
        targetHeight: 2104,
      },
      opt,
    );
    // 设置返回函数
    let promise = new Promise(function(resolve, reject) {
      if (window.cordova) {
        // 调用cordova 相机插件
        navigator.camera.getPicture(
          function success(imgUrl) {
            window.utils.ui.closeLoadding();
            resolve(imgUrl);
          },
          function error(error) {
            window.utils.ui.closeLoadding();
            reject(error);
          },
          options,
        );
      } else {
        if (window.globalConfig.platform !== "native") {
          window.utils.ui.closeLoadding();
          resolve(
            "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",
          );
        }
        // reject({error: '相机-请在App内调用'})
      }
    });
    return promise;
  },

  /**
   * @name 微信分享
   * @link https://github.com/xu-li/cordova-plugin-wechat
   */
  wechatShare(opt = {}) {
    window.utils.ui.loadding();
    setTimeout(() => {
      window.utils.ui.closeLoadding();
    }, 3000);
    let option = Object.assign(
      {
        scene: !window.Wechat ? "" : window.Wechat.Scene.TIMELINE,
      },
      opt,
    );
    console.log(option);
    let promise = new Promise(function(resolve, reject) {
      if (window.cordova) {
        window.globalConfig.resumeSilence = true;
        // 调用微信分享插件
        window.Wechat.share(
          option,
          function(result) {
            window.utils.ui.closeLoadding();
            window.globalConfig.resumeSilence = false;
            window.globalConfig.pluginToResume = true;
            resolve(result);
          },
          function(reason) {
            window.utils.ui.closeLoadding();
            window.globalConfig.resumeSilence = false;
            window.globalConfig.pluginToResume = true;
            reject(reason);
          },
        );
      } else {
        window.utils.ui.closeLoadding();
        reject("微信分享,请在App内调用");
      }
    });
    return promise;
  },

  /**
   * 发送短信
   * @param number 手机号码
   * @param message 消息内容
   * @param options 其他配置
   * @returns {Promise}
   */
  smsSend(number, message, options) {
    let promise = new Promise(function(resolve, reject) {
      if (window.sms) {
        window.sms.send(
          number,
          message,
          options,
          function(resp) {
            resolve(resp);
          },
          function(error) {
            reject(error);
          },
        );
      } else {
        reject({ error: "请在App内调用" });
      }
    });
    return promise;
  },

  /**
   * 获取通讯录
   * @returns {Promise}
   */
  getContacts() {
    let promise = new Promise(function(resolve, reject) {
      var contactFileds = ["displayName", "name", "phoneNumbers", "emails", "address"];
      // filter制定为空或不指定返回所有联系人列表
      var options = { filter: "", multiple: true };
      if (navigator && navigator.contacts) {
        navigator.contacts.find(
          contactFileds,
          function(contacts) {
            // contacts = contacts.splice(0, 10)
            console.log(contacts);
            resolve(contacts);
          },
          function(err) {
            console.log(JSON.stringify(err));
            reject(err);
          },
          options,
        );
      } else {
        reject({ error: "请在App内调用" });
      }
    });
    return promise;
  },
  /**
   * 获取通讯录
   * @returns {Promise}
   */
  getAlipayJSBridge(params, apiName) {
    let promise = new Promise(function(resolve) {
      window.AlipayJSBridge &&
        window.AlipayJSBridge.call(apiName, params, function(data) {
          resolve("调用结果" + JSON.stringify(data));
        });
    });
    return promise;
  },

  /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[统一原生api-url调用接口]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
  nativeCommonFun(reqData, type, callback, callbackFail) {
    try {
      if (window.cordova || window.globalConfig.runningEnvironment === "AlipayJSBridge") {
        let type1 = "";
        let type2 = "";
        if (type && type.indexOf("_")) {
          type.split("_")[0] && (type1 = type.split("_")[0]);
          type.split("_")[1] && (type2 = type.split("_")[1]);
        } else {
          callbackFail("参数type不能为空且格式为: xxx_xxx;命名规范见 @/data/codedata/README.md");
        }
        if (type1 === "Cordova") {
          console.log("%c 调用原生通用模板-Cordova>>>>>>> url >>>>>> type", "color:purple;", `Cordova-${type}`);
          this[type2](reqData).then(
            success => {
              callback(success);
            },
            error => {
              callbackFail(error);
            },
          );
        } else if (type1 === "AlipayJSBridge") {
          this.getAlipayJSBridge(reqData, type2).then(
            success => {
              callback(success);
            },
            error => {
              callbackFail(error);
            },
          );
        } else {
          const url = code.getCodeTextOrVal(type, "nativeModal", "url", "code");
          let str = `${url}?${JSON.stringify(reqData)}`;
          console.log("%c 调用原生通用模板>>>>>>> url >>>>>> type", "color:purple;", `EntryPlugin-${type}:${url}`);
          window.EntryPlugin.hybridCallAction(str, callback, callbackFail);
        }
      } else {
        window.utils.ui.toast({
          message: `h5模拟调用待补充,调用模块${type}`,
          position: "center",
          duration: 3000,
        });
        console.log("%c nativeHandler", "color:green;", `h5模拟调用待补充,调用模块${type}`);
        const modal = code.getCodeTextOrVal(type, "nativeModal", "modal", "code");
        let promise = new Promise(function(resolve) {
          resolve(modal);
        });
        promise.then(
          success => {
            callback(success);
          },
          error => {
            callbackFail(error);
          },
        );
      }
    } catch (error) {
      console.error("%c 调用原生通用模板-error", "color:red;", error);
      window.utils.ui.toast({
        message: `<201908061707>${error}`,
        position: "center",
        duration: 3000,
      });
    }
  },
  /*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[统一原生api-url调用接口]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
};

export default handler;
