/**
 * @author 小龙
 * @date 2020-04-29 17:53
 * 佣金预警模块所有的接口
 */
import axiosHttp from "@@/config/axiosHttp";
//brokerageKpi
const module = "brokerageKpi";
export const dataService = {
  getUserExamine: "/assessment/home", //getUserExamine
  getUserMaintain: "/assessment/detail", //getUserPromotion
  getMyTeams: "/assessment/mygroup", //getMyTeams
  getMyFormalExamineMoth: "/assess/get", //getMyFormalExamineMoth
  getMyFormalExamine: "/assess/getBase", //getMyFormalExamine
  getUserFormalMaintain: "/assess/detail", //getUserFormalMaintain
  getMyFormalTeams: "/assess/mygroup", //getMyFormalTeams
  getBrokeBase: "/broke/home", //getBrokeBase
  getBrokeHistory: "/broke/history", //getrokeHistory
  getBrokeHisinfo: "/broke/hisinfo", //getBrokeHisinfo
  getBrokeirDectInfo: "/broke/directInfo", //getBrokeirDectInfo
};

/**
 * @methodName: 获取用户考核信息（预警考核）
 * @author 小龙
 * @date 2020/5/8 11:02
 * @params:{*}
 */
export const getUserExamine = params =>
  axiosHttp.request(
    `${dataService.getUserExamine}/${params.data.agentCode}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

/**
 * @methodName: 获取用户 维持差值  晋升差值
 * @author 小龙
 * @date 2020/5/8 13:55
 * @params: 08维持,09晋升
 */
export const getUserMaintain = params =>
  axiosHttp.request(
    `${dataService.getUserMaintain}/${params.data.listType}/${params.data.agentCode}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );
/**
 * @methodName: 获取用户团队信息
 * @author 小龙
 * @date 2020/5/8 11:02
 * @params:{*} agentCode-->代理人工号
 */
export const getMyTeams = params =>
  axiosHttp.request(
    `${dataService.getMyTeams}/${params.data.agentCode}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );
/**
 * @methodName: 正式考核获取月份
 * @author 小龙
 * @date 2020/6/16 10:17
 * @params: agentCode-->代理人工号
 */
export const getMyFormalExamineMoth = params =>
  axiosHttp.request(`${dataService.getMyFormalExamineMoth}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName: 获取正式考核
 * @author 小龙
 * @date 2020/6/16 10:21
 * @params: indexcalno-->考核月 agentCode-->代理人工号
 */
export const getMyFormalExamine = params =>
  axiosHttp.request(`${dataService.getMyFormalExamine}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName: 获取正式考核  维持差值  晋升差值
 * @author 小龙
 * @date 2020/6/16 10:23
 * @params: agentCode-->代理人工号  indexcalno-->考核月  type-->差值类型
 */
export const getUserFormalMaintain = params =>
  axiosHttp.request(`${dataService.getUserFormalMaintain}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName: 获取正式考核我的团队
 * @author 小龙
 * @date 2020/6/16 10:23
 * @params: agentCode-->代理人工号  indexcalno-->考核月
 */
export const getMyFormalTeams = params =>
  axiosHttp.request(`${dataService.getMyFormalTeams}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName: 佣金 首页基本信息
 * @author 小龙
 * @date 2020/7/7 10:45
 * @params: agentCode-->代理人工号
 */
export const getBrokeBase = params =>
  axiosHttp.request(`${dataService.getBrokeBase}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName:佣金历史
 * @author 小龙
 * @date 2020/7/7 10:47
 * @params: agentCode-->代理人工号
 */
export const getBrokeHistory = params =>
  axiosHttp.request(`${dataService.getBrokeHistory}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName:佣金历史明细
 * @author 小龙
 * @date 2020/7/7 10:46
 * @params: agentCode-->代理人工号 indexcalno=202002 时间月份
 */
export const getBrokeHisinfo = params =>
  axiosHttp.request(`${dataService.getBrokeHisinfo}`, params, localStorage.getItem(module + "Debug"), module);
/**
 * @methodName:直接佣金明细
 * @author 小龙
 * @date 2020/7/7 10:47
 * @params: agentCode-->代理人工号 type 1首期,2续期 pageSize  pageNo:1起始
 */
export const getBrokeirDectInfo = params =>
  axiosHttp.request(`${dataService.getBrokeirDectInfo}`, params, localStorage.getItem(module + "Debug"), module);
