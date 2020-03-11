/*
 * @Author: aliang
 * @Date: 2018-01-06 21:45:22
 * @Last Modified by: aliang
 * @Last Modified time: 2019-12-18 18:11:04
 */
import commonCodeData from "./common";

//如果有不同模块的进行合并
Object.assign(
  commonCodeData,
);

var allCodeData = commonCodeData;
// module.exports = allCodeData;
// window.allCodeData = commonCodeData
export default allCodeData;
