/*
 * @Author: aliang
 * @Date: 2018-11-19 17:21:00
 * @des: 系统级接口serve
 * @Last Modified by: aliang
 * @Last Modified time: 2020-05-18 20:13:25
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "app";
export const dataService = {
  login: "/user/login", //entryUserEdu
};
export const getData = dataService;

/**
 * 登陆并获取用户信息
 * @param {*} 获取用户信息
 */
export const login = params =>
  axiosHttp.request(
    `${dataService.login}${params.data.id ? `/${params.data.id}` : ""}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );
