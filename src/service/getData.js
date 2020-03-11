/*
 * @Author: aliang
 * @Date: 2018-11-19 17:21:00
 * @des: 系统级接口serve
 * @Last Modified by: aliang
 * @Last Modified time: 2019-12-02 16:39:01
 */
import axiosHttp from "../config/axiosHttp";

const module = "auth";
const module2 = "member";
export const dataService = {
  login: "/login", //login
  register: "/member/registryMember", //注册
  forgertPwd: "/member/updateMemberFindPwd", // 忘记密码接口
  getVerifyCode: "/member/getVerifyCode", //获取验证码获取验证码And注册
  homePage: "/app/homePage", //homePage
  getMenu: "/member/getMenu" // getMenu
};
export const getData = dataService;

/**
 * 登陆并获取用户信息
 * @param {*} 获取用户信息
 */
export const login = validateForm =>
  axiosHttp.post(
    dataService.login,
    validateForm,
    localStorage.getItem(module + "Debug"),
    module
  );

/**
 * app首页所有数据
 * @url {*} 请求url
 * @param {*} 请求参数
 * @debug {*} mock虚拟数据debug-(如果调试debug数据即调用本地json虚拟数据则需要在/utils/mock.js中配置虚拟接口跟正式url一致即可)
 * @module {String} 接口模块
 */
export const homePage = param =>
  axiosHttp.post(
    dataService.homePage,
    param,
    localStorage.getItem(module + "Debug"),
    module2
  );

/**
 * app首页菜单
 * @url {*} 请求url
 * @param {*} 请求参数
 * @debug {*} mock虚拟数据debug-(如果调试debug数据即调用本地json虚拟数据则需要在/utils/mock.js中配置虚拟接口跟正式url一致即可)
 * @module {String} 接口模块
 */

export const getMenu = param =>
  axiosHttp.post(
    dataService.getMenu,
    param,
    localStorage.getItem(module2 + "Debug"),
    module2
  );

/**
 * app找回密码And注册--获取验证码
 * @url {*} 请求url
 * @param {*} 请求参数
 * @debug {*} mock虚拟数据debug-(如果调试debug数据即调用本地json虚拟数据则需要在/utils/mock.js中配置虚拟接口跟正式url一致即可)
 * @module {String} 接口模块
 */
export const register = param =>
  axiosHttp.post(dataService.register, param, false, module2);

/*
 * @postJson {
 * 			"messageContent": "string",
 * 			"messageType": "FINDPWD(找回密码)",FINDPWD(找回密码)REGISTERED(注册)
 * 			"receiveDeviceNo": "string"
 * 		}
 */
export const getVerifyCode = param =>
  axiosHttp.post(
    dataService.getVerifyCode,
    param,
    localStorage.getItem(module2 + "Debug"),
    module2
  );

/**
 * 忘记密码
 * @url {*} 请求url
 * @param {*} 请求参数
 * @debug {*} mock虚拟数据debug-(如果调试debug数据即调用本地json虚拟数据则需要在/utils/mock.js中配置虚拟接口跟正式url一致即可)
 * @module {String} 接口模块
 */
export const forgertPwd = param =>
  axiosHttp.post(
    dataService.forgertPwd,
    param,
    localStorage.getItem(module2 + "Debug"),
    module2
  );
