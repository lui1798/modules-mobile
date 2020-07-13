/*
 * @Author: Spoon
 * @des: 短信验证码接口
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "msg";
export const dataService = {
  //接口标识配置
  codeCustom: "/sms/code/custom", //发送短信验证码
};
export const smsService = dataService;

//发送短信验证码
export const codeCustom = params =>
  axiosHttp.request(`${dataService.codeCustom}`, params, localStorage.getItem(module + "Debug"), module);
