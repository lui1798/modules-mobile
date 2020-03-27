//引入axios
import axios from "axios";
import utils from "@@/utils";
import n22des3 from "@@/utils/N22DES3";

let myvue = null; // 定义一个变量，用来代替this（vue）
// console.log('%c vm','color:green;',myvue);

let instance = axios.create({
  method: "post",
  timeout: 900000,
  withCredentials: true,
  headers: {
    post: {
      "Content-Type": "application/json",
      // 'Content-Type': undefined
    },
  },
});

axios.defaults.retry = 4; // 连接异常重请求次数
axios.defaults.retryDelay = 1000; // 连接异常重请求间隔时间

let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;
//请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.resquestLoaddingParam.resquestLoadding)
      utils.ui.resquestLoadding(config.resquestLoaddingParam.resquestLoaddingText);
    console.log("%c 请求拦截器", "color:green;", config);
    //发起请求时，取消掉当前正在进行的相同请求
    if (config.promiseCancel && promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    let header;
    if (config.data.header) {
      header = config.data.header;
      delete config.data["header"];
    }
    let requestObj = config.data;
    // requestObj.commonObject = commonObject
    // let requestProcessObj = {
    //   "objects":config.data,
    // }
    // requestProcessObj.objects.commonObject = commonObject
    // if(config.url.requestType == "PROCESSFIELDRULE" || config.url.requestType == "PROCESSPAGESTEPSAVE"
    //    || config.url.requestType == "LOGIN"){
    //   requestObj = requestProcessObj
    // }
    let params = {
      packages: {
        header: {
          // "UUID":"de98d28c-2824-4476-9d2c-0673a11c5db1",
          // "errorMessage":"",
          // "productCode":"",
          // "responseCode":"",
          // "asyn":"0",
          // "requestType": config.url.requestType,
          // "comId": window.globalConfig.comId,
          // "from": window.globalConfig.from,
          // "sendTime": new Date(),
          // "orderSerial": "orderId",
          // "comSerial": "comSerial"
          uuid: "de98d28c-2824-4476-9d2c-0673a11c5db1",
          callBackType: "",
          channel: "android",
          clientSystem: "android",
          clientSystemVer: "",
          cpuUsageRate: "",
          deviceMemorySize: "",
          deviceMemoryUsageSize: "",
          deviceNo: "78060855212a8bde",
          deviceType: "",
          downloadSpeed: "",
          latitude: "116.480641",
          loginType: "",
          longitude: "39.89686",
          networkName: "",
          networkOperator: "",
          networkSignal: "",
          networkType: "",
          openId: "",
          tagChannel: "",
          systemId: "APP",
          // "tokenCode": "1431202663-26-tEzgRYHRBqJya96oiytXBNIniG5cCywOlep-TGT",
          tokenCode: window.utils.cache.get("token") == null ? "" : window.utils.cache.get("token"),
          uploadSpeed: "",
          skipAuth: "false",
          asyn: "0",
        },
        // request: DES3.encrypt('', JSON.stringify(config.data)).replace(/\s/g, "")
        request: requestObj,
      },
    };
    Object.assign(params.packages.header, header);
    console.log("%c " + config.urlModule + "请求数据OBJECT格式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓", "color:#ffcc00", "");
    console.log("%c >>>>>>", "color:#ffcc00", params);
    console.log("%c " + config.urlModule + "请求数据OBJECT格式↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑", "color:#ffcc00", "");
    // console.log('%c '+config.url+'请求数据JSON格式:','color:#ffcc00', JSON.stringify(response.data))
    // console.log('%c '+config.url+'请求数据JSON格式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓','color:#ffcc00', "")
    let paramStr = n22des3.encrypt("", JSON.stringify(params)) || JSON.stringify(params);
    let sign = n22des3.n22md5("", paramStr);
    if (config.debug && process.env.VUE_APP_ENV != "prd") {
      //是否开启单个接口debug-或者全部debug
      console.log("%c mock", "color:green;", config);
      config.url = config.url.replace(config.urlT, "");
    } else {
      if (config.url.indexOf("sign") < 0 && config.url.indexOf("comId") < 0) {
        config.url = config.url + "?sign=" + sign + "&comId=" + window.globalConfig.comId;
      }
    }
    config.data = paramStr;
    // console.log('%c config请求数据：','color:#CD00CD;',config);
    return config;
  },
  error => {
    utils.ui.toast({
      message: "系统网络连接异常，请稍后重试！",
      position: "middle",
      duration: 3000,
    });
    return Promise.reject(error);
  },
);

//响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    if (response.config.resquestLoaddingParam.resquestLoadding) utils.ui.closeLoadding();
    // console.log('%c response','color:green;',response);
    try {
      // response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response).replace(/(\\)*"/g, '"').replace(/"{/g, '{').replace(/}"/g, '}'))
      if (response.config.debug && process.env.VUE_APP_ENV != "prd") {
        //是否开启单个接口debug
      } else {
        response.data = JSON.parse(n22des3.decrypt("", response.data));
      }
      console.log(
        "%c " + response.config.urlModule + ">>>>>>↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓返回数据OBJECT格式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓",
        "color:#CD00CD",
        "",
      );
      console.log("%c >>>>>>", "color:green", JSON.parse(JSON.stringify(response.data)));
      console.log(
        "%c " + response.config.urlModule + ">>>>>>↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑返回数据OBJECT格式↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑",
        "color:#CD00CD",
        "",
      );
      // console.log('%c '+response.config.urlModule+'>>>>>>↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓返回数据JSON格式↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓','color:#CD00CD', "")
      // console.log('%c >>>>>>','color:green', JSON.stringify(response.data))
      // console.log('%c '+response.config.urlModule+'>>>>>>↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑返回数据JSON格式↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑','color:#CD00CD', "")
    } catch (e) {
      console.log("%c 系统异常", "color:red;", e);
      utils.ui
        .messageBox({
          title: "提示",
          message: "系统异常，请稍后重试！",
        })
        .then(() => {});
      return;
    }
    return response;
  },
  err => {
    if (err.message == "Network Error") {
      var config = err.config;
      config.promiseCancel = false;
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) {
        console.log("%c 接口请求错误--001", "color:red;", err);
        utils.ui.closeLoadding();
        return Promise.resolve(err);
      }
      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;
      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        console.log("%c 接口请求错误--002", "color:red;", err);
        utils.ui.closeLoadding();
        return Promise.resolve(err);
      }
      // Increase the retry count
      config.__retryCount += 1;
      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, config.retryDelay || 1);
      });
      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return instance(config);
      });
    }
    console.log("%c 接口请求错误--003", "color:red;", err);
    utils.ui.closeLoadding();
    return Promise.resolve(err);
  },
);

export default {
  initContext(vue) {
    myvue = vue;
  },
  get(url, param, debug, module, promiseCancel = true) {
    const urlT = window.globalConfig.rootUrl.replace("@module", module ? module : url.split("/")[1]);
    const urlModule = url;
    try {
      url = urlT + url;
    } catch (error) {
      alert("error000001：url错误，请及时反馈");
    }
    let resquestLoaddingParam = {};
    let data = param;
    if (param && param.axiosParams) {
      resquestLoaddingParam = param.axiosParams;
      if (delete param["axiosParams"]) data = param;
    }
    return new Promise(resolve => {
      instance({
        method: "get",
        url,
        urlT,
        urlModule,
        promiseCancel: promiseCancel,
        debug: debug || window.globalConfig.isMock,
        resquestLoaddingParam: resquestLoaddingParam,
        data: data,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }).then(res => {
        resolve(res.data);
      });
    });
  },
  post(url, param, debug, module, promiseCancel = true, isLoad = false) {
    // 对url统一进行处理
    // 1、封装请求模块
    const urlT = window.globalConfig.rootUrl.replace("@module", module ? module : url.split("/")[1]);
    const urlModule = url;
    try {
      url = urlT + url;
    } catch (error) {
      alert("error000001：url错误，请及时反馈");
    }
    let resquestLoaddingParam = {};
    let data = param;
    if (param && param.axiosParams) {
      resquestLoaddingParam = param.axiosParams;
      if (delete param["axiosParams"]) data = param;
    }
    return new Promise((resolve, reject) => {
      instance({
        method: (debug || window.globalConfig.isMock) && process.env.VUE_APP_ENV != "prd" ? "get" : "post",
        url,
        urlT,
        urlModule,
        promiseCancel: promiseCancel,
        debug: debug || window.globalConfig.isMock,
        resquestLoaddingParam: resquestLoaddingParam,
        data: data,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      }).then(res => {
        try {
          if (res && res.request && res.request.status != 200) {
            let err = {};
            let sw = res.request.status || "";
            if (!res.response) {
              sw = res.message;
            }
            switch (sw) {
              case 400:
                err.message = "错误请求";
                break;
              case 401:
                err.message = "未授权，请重新登录";
                break;
              case 403:
                err.message = "拒绝访问";
                break;
              case 404:
                err.message = "请求错误,未找到该资源";
                break;
              case 405:
                err.message = "请求方法未允许";
                break;
              case 408:
                err.message = "请求超时";
                break;
              case 500:
                err.message = "服务器端出错";
                break;
              case 501:
                err.message = "网络未实现";
                break;
              case 502:
                err.message = "网络错误";
                break;
              case 503:
                err.message = "服务不可用";
                break;
              case "Network Error":
                err.message = "系统网络连接异常，请稍后重试！"; //系统网络连接异常，请稍后重试
                break;
              case 504:
                err.message = "网络超时";
                break;
              case 505:
                err.message = "http版本不支持该请求";
                break;
              default:
                err.message = "其他未知错误";
            }
            if (err.message) {
              utils.ui.toast({
                message: err.message,
                position: "bottom",
                duration: 3000,
              });
              reject(err);
              return;
            }
          }
          let err = res.data.packages ? res.data.packages.header || {} : res;
          if (err && err.responseCode && err.responseCode == 1900) {
            console.log("%c myvue", "color:green;", myvue);
            console.log("%c myvue-$navigation", "color:green;", myvue.$navigation.getRoutes());
            if (
              myvue.$route.meta &&
              myvue.$route.meta.login !== false &&
              myvue.$route.name != "login" &&
              !myvue.$route.query.token
            ) {
              utils.ui.toast(myvue.$t("center.loginTimeout"));
              //app端如果是出入了isLoad为true则进行处理重载逻辑
              if (isLoad) {
                myvue.$store.commit("HTTP_INVALID", true);
              }
              // ★login_000001★ 2019-06-06将登陆改为历史返回
              // myvue.$router.replace({ name: 'login' })
              utils.cache.removeItem("pasWord");
              myvue.$router.push(myvue.$route.meta.loginTimeoutGoUrl || "/login");
            }
            if (
              myvue.$route.meta &&
              myvue.$route.meta.shareTimeout !== false &&
              myvue.$route.name != "shareTimeout" &&
              myvue.$route.query.token
            ) {
              if (myvue.$route.meta.shareTimeoutGoUrl) {
                myvue.$router.push(myvue.$route.meta.shareTimeoutGoUrl);
              } else {
                utils.ui.toast(myvue.$t("center.shareTimeout"));
              }
            }
            console.log("%c myvue-$navigation", "color:green;", myvue.$navigation.getRoutes());
            const navigationRouters = myvue.$navigation.getRoutes();
            if (navigationRouters.length > 0) {
              // myvue.$navigation.cleanRoutes()
            }
            reject(err);
          } else if (err.responseCode == 0) {
            //重新组织返回各个接口逻辑的数据对象
            let myres = {
              header: res.data.packages.header,
              response: res.data.packages.response,
            };
            resolve(myres);
          } else {
            switch (err.responseCode) {
              case "1000":
                err.message = err.errorMessage;
                break;
              default:
                err.message = `连接错误${err.responseCode}`;
            }
            utils.ui.toast({
              message: err.message,
              position: "bottom",
              duration: 3000,
            });
            reject(err);
          }
          console.log("%c xxxxxxxxxxxxxxxxxxxxxxxxxpppppppppppppp", "color:green;", err.message);
        } catch (error) {
          if (resquestLoaddingParam.resquestLoadding) utils.ui.closeLoadding();
          if (res && res.message && res.message === "操作取消") {
            console.log("%c 正常操作取消之前的请求接口", "color:green;", res);
          } else {
            console.log("%c error000002错误码为后台返回数据无法处理-返回数据为", "color:green;", res);
            console.log("%c error000002错误为", "color:green;", error);
            utils.ui.toast({
              message: "error000002：抱歉数据错误，请您及时反馈！",
              position: "bottom",
              duration: 3000,
            });
          }
        }
      });
    });
  },
};
