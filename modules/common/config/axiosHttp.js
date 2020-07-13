//引入axios
import axios from "axios";
import utils from "@@/utils";
import responseStatus from "./responseStatus.js";
import { Toast } from "al-mobile";
import { getToken, setToken } from "@@/utils/auth";

let myvue = null; // 定义一个变量，用来代替this（vue）
console.log("%c vm", "color:green;", myvue);

//更新token
function updateToken(headers) {
  // 如果成功返回报文体中存有token，则换取本地token（后台会在token即将过期的时候更新token带入某次请求的返回headers中）
  if (headers && headers["x-auth-token"]) {
    setToken(headers["x-auth-token"]);
    myvue.$store.state.common.showlogin;
  }
}

//错误处理
const errorDealFun = function({ config, error }, reject) {
  error.response && updateToken(error.response.headers);
  if (config && config.isDealError) {
    reject(error.response.data);
    return;
  }
  if (error.request && error.request.readyState == 4 && error.request.status === 0) {
    Toast({
      content: "系统网络连接异常，请稍后重试！",
      position: "bottom",
      duration: 3000,
    });
    return reject(error);
  } else if (error && error.request && error.request.status != 200) {
    let err = {};
    if (error && error.response && error.response.data) {
      if (error.response.status && error.response.status === 400 && error.response.data.bizcode !== 0) {
        return reject(error.response.data);
      }
      if (error.response.status && error.response.status === 401) {
        myvue.timeoutToLogin();
      }
      if (error.response.data.message) {
        err.message = error.response.data.message;
      } else if (error.response.data.status) {
        error.response.data.message &&
          console.log("%c 接口请求错误详细message--0031", "color:red;", error.response.data.message);
        // if (error.response.status === 400) {
        //   err.message = error.response.data.message;
        // } else
        if (!err.message) {
          for (let index = 0; index < responseStatus.length; index++) {
            const sta = responseStatus[index];
            if (sta.code === error.response.status) {
              err.message = sta.message;
              break;
            }
          }
        }
      }
    } else if (error && error.data && error.data.code) {
      if (error.data.code === 400) {
        err.message = error.data.msg || "null";
      }
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
  } else {
    console.log("%c 未公共处理的error直接返回", "color:red;", error);
    if (error.message === "操作取消") {
      console.log("%c 短时间重复调用同一个接口>>>>操作取消>>>并将返回错误处理为空", "color:red;", error);
      error = "";
    }
    return reject(error);
  }
};

let instance = axios.create({
  method: "post",
  timeout: 9000,
  withCredentials: false,
  headers: {
    post: {
      "Content-Type": "application/json;charset=UTF-8",
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
  async config => {
    console.log(
      "%c " + config.urlModule + " 接口请求数据OBJECT格式↓↓↓↓↓↓↓↓↓↓↓",
      "color:#ffcc00;background-color:#7b7b7b;",
      "",
    );
    console.log("%c >>>>>>", "color:#ffcc00", config.data);
    console.log(
      "%c " + config.urlModule + " 接口请求数据OBJECT格式↑↑↑↑↑↑↑↑↑↑↑",
      "color:#ffcc00;background-color:#7b7b7b;",
      "",
    );
    if (config.resquestLoaddingParam.isLoadding) Toast.loading(config.resquestLoaddingParam.loaddingText);
    console.log("%c 请求拦截器", "color:green;", config);
    //塞入token--暂时关闭token的验证
    config.headers["X-Auth-Token"] = (await getToken()) || "";
    //发起请求时，取消掉当前正在进行的相同请求
    if (config.promiseCancel && promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    if (config.debug && process.env.VUE_APP_ENV != "prd") {
      //是否开启单个接口debug-或者全部debug
      console.log("%c mock", "color:green;", config);
      config.url = config.url.replace(config.urlT, "");
    }
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
    console.log(
      "%c " + response.config.urlModule + " 接口返回数据OBJECT格式↓↓↓↓↓↓↓↓↓↓↓",
      "color:#03ff6f;background-color:#7b7b7b;",
      "",
    );
    console.log("%c >>>>>>", "color:green", JSON.parse(JSON.stringify(response.data)));
    console.log(
      "%c " + response.config.urlModule + " 接口返回数据OBJECT格式↑↑↑↑↑↑↑↑↑↑↑",
      "color:#03ff6f;background-color:#7b7b7b;",
      "",
    );
    if (response.config.resquestLoaddingParam.isLoadding) Toast.hide();
    console.log("%c 成功状态：", "color:#00CD00", response);
    const res = response.data;
    // 系统状态码
    const status = response.status;
    // 注意：业务异常时，有个bizcode可以做业务处理
    // 注意：业务异常或者系统异常时，有个ddzcode标记出问题的系统--ddzcode会返回代表核心系统的码值

    // 业务码值code
    let responseData = { data: res, headers: response.headers, status: status };
    if (res.code && response.config.isDealTYBusinessError) {
      console.log("%c 统一业务错误处理--暂时未启用--各自接口各自处理", "color:#00CD00", "测试");
      if (response.config.isDealError) {
        return responseData;
      } else {
        responseData.request = {
          status: res.code,
        };
        return Promise.reject(responseData);
      }
    } else {
      updateToken(response.headers);
      return responseData;
    }
  },
  err => {
    if (err.request && ((err.request.readyState == 4 && err.request.status === 0) || err.request.status === 408)) {
      console.log("%c 请求超时发起重新请求", "color:white;background-color:red;");
      var config = err.config;
      config.promiseCancel = false;
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) {
        console.log("%c 接口请求错误--001", "color:red;", err);
        Toast.hide();
        return Promise.reject(err);
      }
      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;
      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        console.log("%c 接口请求错误--002", "color:red;", err);
        Toast.hide();
        return Promise.reject(err);
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
    } else if (err.message == "Network Error") {
      // Toast.failed("服务网络链接异常！！！");
      return Promise.reject(err);
    } else {
      console.log("%c 接口请求错误--003", "color:red;", err);
      console.log("%c 接口请求错误--003错误返回体为", "color:red;", err.response);
      Toast.hide();
      return Promise.reject(err);
    }
  },
);

export default {
  initContext(vue) {
    myvue = vue;
  },
  get(url, { data, config }, debug, module, promiseCancel = true) {
    const urlT = window.globalConfig.rootUrl + "/" + module;
    const urlModule = url;
    try {
      url = urlT + url;
    } catch (error) {
      alert("error000001：url错误，请及时反馈");
    }
    return new Promise((resolve, reject) => {
      instance({
        method: "get",
        url,
        urlT,
        urlModule,
        promiseCancel: promiseCancel,
        debug: debug || window.globalConfig.isMock,
        resquestLoaddingParam: config || {
          isLoadding: false,
        },
        data: data,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          errorDealFun({ config, error }, reject);
        });
    });
  },
  request(url, { data, config, method, isParams }, debug, module, promiseCancel = true) {
    // 对url统一进行处理
    // 1、封装请求模块
    const urlT = window.globalConfig.rootUrl + "/" + module;
    const urlModule = url;
    try {
      url = urlT + url;
    } catch (error) {
      alert("error000001：url错误，请及时反馈");
    }
    return new Promise((resolve, reject) => {
      instance({
        method:
          (debug || window.globalConfig.isMock) && process.env.VUE_APP_ENV != "prd" ? "get" : method ? method : "post",
        params: method === "get" && isParams !== false ? data : "",
        url,
        urlT,
        urlModule,
        promiseCancel: promiseCancel,
        debug: debug || window.globalConfig.isMock,
        resquestLoaddingParam: config || {
          isLoadding: false,
        },
        data: data,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          errorDealFun({ config, error }, reject);
        });
    });
  },
};
