/**
 * @author 小龙
 * @date 2020-07-03 09:28
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "customer";
export const dataService = {
  customerList: "/proposal/get/list", //查询客户管理列表
  customerDetail: "/proposal/get/detail", //查询核心客户详情detail
};
export const getData = dataService;

/**
 * @methodName: 查询客户管理列表
 * @author 小龙
 * @date 2020/7/3 09:30
 * @params:agentCode 代理人工号 type:1:本地客户 2:核心客户 pageNumber":"1"开始,"pageSize":"10
 */
export const customerList = params =>
  axiosHttp.request(`${dataService.customerList}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * @methodName:查询核心客户详情
 * @author 小龙
 * @date 2020/7/3 14:10
 * @params:核心客户职业;{"agentCode,"infoId"}
 */
export const customerDetail = params =>
  axiosHttp.request(`${dataService.customerDetail}`, params, localStorage.getItem(module + "Debug"), module);
