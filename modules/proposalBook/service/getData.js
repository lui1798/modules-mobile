/*
 * @Author: aliang
 * @Date: 2018-11-19 17:21:00
 * @des: 系统级接口serve
 * @Last Modified by: aliang
 * @Last Modified time: 2020-05-28 22:01:56
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "proposal";
export const dataService = {
  productList: "/product/main", //查询主险险种列表
  productEntry: "/product/entry", //查询某款产品的录入项
  queryData: "/proposal/queryforedit", //查询回显数据
  queryforshow: "/proposal/queryforshow", //查询回显数据--预览
  queryforshowShare: "/proposal/open/query", //查询回显数据--预览
  calculate: "/proposal/calculate", //保费试算
  saveProposal: "/proposal/persistence", //建议书数据保存
  createPdf: "/pdf/create", //建议书pdf创建
  queryPdf: "/pdf/query", //建议书pdf查询
  queryPdfShare: "/pdf/open/query", //建议书pdf查询-share
  queryCalculate: "/point/calculate", //获取积分
};
export const getData = dataService;

/**
 * 查询主险险种列表
 * @param {*} code 主险code
 */
export const getProductList = params =>
  axiosHttp.request(`${dataService.productList}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * 查询回显数据
 * @param {*} proposalId 建议书id
 */
export const queryData = params =>
  axiosHttp.request(`${dataService.queryData}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * 查询回显数据--预览
 * @param {*} proposalId 建议书id
 */
export const queryforshow = params =>
  axiosHttp.request(
    `${params.config.isShare ? dataService.queryforshowShare : dataService.queryforshow}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

/**
 * 根据code查询产品的录入项
 * @param {*} code 主险code
 */
export const getProductEntry = params =>
  axiosHttp.request(`${dataService.productEntry}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * 保费试算
 * @param {*} 保费试算
 */
export const calculate = params =>
  axiosHttp.request(`${dataService.calculate}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * 建议书数据保存
 * @param {*} 建议书数据保存
 */
export const saveProposal = params =>
  axiosHttp.request(
    `${dataService.saveProposal}${params.id ? `/${params.id}` : ""}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

/**
 * 建议书pdf创建
 * @param {*} params 接口参数
 */
export const createPdf = params =>
  axiosHttp.request(`${dataService.createPdf}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * 建议书pdf查询
 * @param {*} params 接口参数
 */
export const queryPdf = params =>
  axiosHttp.request(
    `${params.config.isShare ? dataService.queryPdfShare : dataService.queryPdf}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );
/**
 * @methodName: 获取积分
 * @date 2020/6/29 16:10
 * @params:
 */
export const queryCalculate = params =>
  axiosHttp.request(`${dataService.queryCalculate}`, params, localStorage.getItem(module + "Debug"), module);
