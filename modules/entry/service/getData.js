/*
 * @Author: Spoon
 * @des: 模块级接口serve
 * axiosHttp.get(`${dataService.entryUser}/${params.name}`, params, localStorage.getItem(module + "Debug"), module);
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "entry";
export const dataService = {
  //接口标识配置
  entryUser: "/entryUser", //分页条件查询接口

  queryPage: "/entryUserMemeber/queryPage", //分页查询接口
  queryEntryUserMemeber: "/entryUserMemeber/queryEntryUserMemeber", // 查询个人信息

  queryEntryUserInfoOne: "/entryUserInfo/queryEntryUserInfoOne", //完善个人信息部分一查询接口
  saveEntryUserInfoOne: "/entryUserInfo/saveEntryUserInfoOne", //完善个人信息部分一保存接口

  queryEntryUserInfoTwo: "/entryUserInfo/queryEntryUserInfoTwo", //完善个人信息部分二查询接口
  updateEntryUserInfoTwo: "/entryUserInfo/updateEntryUserInfoTwo", //完善个人信息部分二保存接口

  queryEntryUserAdditional: "/entryUserAdditional/queryEntryUserAdditional", //人员详情部分三查询接口
  updateIsFreshGraduates: "/entryUserAdditional/updateIsFreshGraduates", //人员详情部分三保存接口

  saveEntryUserEducation: "/entryUserAdditional/saveEntryUserEducation", //新增修改入司前教育信息
  delEntryUserEducation: "/entryUserAdditional/delEntryUserEducation", //删除入司前教育

  saveEntryUserTrain: "/entryUserAdditional/saveEntryUserTrain", //新增修改入司前培训信息
  delEntryUserTrain: "/entryUserAdditional/delEntryUserTrain", //删除入司前培训信息

  saveEntryUserWork: "/entryUserAdditional/saveEntryUserWork", //新增修改入司前工作
  deleteEntryUserWork: "/entryUserAdditional/deleteEntryUserWork", //删除入司前工作

  saveEntryUserInfoFile: "/entryFile/saveEntryUserInfoFile", //影像页面数据保存
  queryEntryFile: "/entryFile/queryEntryFile", //影像页面数据查询

  saveSign: "/entryFile/saveSign", //签字页面签字影像保存
  querySign: "/entryFile/querySign", //签字页面签字影像获取

  sendData: "/sendData/entry", //提交接口<后续会换掉>

  cosTmpKey: "/entryFile/general/cosTmpKey", //获取COS临时秘钥

  liveAuth: "/live/auth", //人脸识别获取Url
};
export const getData = dataService;

// 分页条件查询接口(EntryUserInfoA)
export const entryUserInf = params =>
  axiosHttp.request(`${dataService.entryUser}`, params, localStorage.getItem(module + "Debug"), module);

// 分页条件查询接口
export const queryPage = params =>
  axiosHttp.request(`${dataService.queryPage}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情接口
export const queryEntryUserMemeber = params =>
  axiosHttp.request(
    `${dataService.queryEntryUserMemeber}/${params.id}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//完善个人信息部分一保存接口
export const saveEntryUserInfoOne = params =>
  axiosHttp.request(`${dataService.saveEntryUserInfoOne}`, params, localStorage.getItem(module + "Debug"), module);

//完善个人信息部分一查询接口
export const queryEntryUserInfoOne = params =>
  axiosHttp.request(
    `${dataService.queryEntryUserInfoOne}/${params.id}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//完善个人信息部分二保存接口
export const updateEntryUserInfoTwo = params =>
  axiosHttp.request(`${dataService.updateEntryUserInfoTwo}`, params, localStorage.getItem(module + "Debug"), module);

//完善个人信息部分二查询接口
export const queryEntryUserInfoTwo = params =>
  axiosHttp.request(
    `${dataService.queryEntryUserInfoTwo}/${params.id}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//人员详情部分三保存接口
export const updateIsFreshGraduates = params =>
  axiosHttp.request(`${dataService.updateIsFreshGraduates}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情部分三查询接口
export const queryEntryUserAdditional = params =>
  axiosHttp.request(
    `${dataService.queryEntryUserAdditional}/${params.id}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//人员详情-入司培训-新增/修改
export const saveEntryUserTrain = params =>
  axiosHttp.request(`${dataService.saveEntryUserTrain}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情-入司培训-删除
export const delEntryUserTrain = params =>
  axiosHttp.request(`${dataService.delEntryUserTrain}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情-入司前学历-新增/修改
export const saveEntryUserEducation = params =>
  axiosHttp.request(`${dataService.saveEntryUserEducation}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情-入司前学历-删除
export const delEntryUserEducation = params =>
  axiosHttp.request(`${dataService.delEntryUserEducation}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情-入司前工作经历-新增/修改
export const saveEntryUserWork = params =>
  axiosHttp.request(`${dataService.saveEntryUserWork}`, params, localStorage.getItem(module + "Debug"), module);

//人员详情-入司前工作经历-删除(EntryUserWork)
export const deleteEntryUserWork = params =>
  axiosHttp.request(`${dataService.deleteEntryUserWork}`, params, localStorage.getItem(module + "Debug"), module);

//提交信息接口
export const sendData = params =>
  axiosHttp.request(`${dataService.sendData}`, params, localStorage.getItem(module + "Debug"), module);

//获取COS上传临时秘钥
export const cosTmpKey = params =>
  axiosHttp.request(`${dataService.cosTmpKey}`, params, localStorage.getItem(module + "Debug"), module);

//保存影像页面数据
export const saveEntryUserInfoFile = params =>
  axiosHttp.request(`${dataService.saveEntryUserInfoFile}`, params, localStorage.getItem(module + "Debug"), module);

//查询影像页面数据
export const queryEntryFile = params =>
  axiosHttp.request(
    `${dataService.queryEntryFile}/${params.userid}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//保存签字影像
export const saveSign = params =>
  axiosHttp.request(`${dataService.saveSign}`, params, localStorage.getItem(module + "Debug"), module);

//查询保存的签字影像
export const querySign = params =>
  axiosHttp.request(
    `${dataService.querySign}/${params.userid}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

//获取人脸识别Url
export const getLiveAuth = params =>
  axiosHttp.request(`${dataService.liveAuth}`, params, localStorage.getItem(module + "Debug"), module);
