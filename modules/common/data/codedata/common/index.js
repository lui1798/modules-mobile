/*
 * @Author: aliang
 * @Date: 2018-01-06 21:45:22
 * @Last Modified by: aliang
 * @Last Modified time: 2020-05-21 17:54:44
 */
import {
  // address,
  // eslint-disable-next-line no-unused-vars
  certificateType,
  nativeModal,
  oneLevelWork,
  twoLevelWork,
  work,
  nationality,
  education,
  bank,
  nation,
  relation,
  product,
} from "./json";
const codeData = {
  // 性别
  sex: [
    { text: "男", value: "1" },
    { text: "女", value: "2" },
  ],
  // 民族
  nation: nation,
  relation: relation,
  // 银行
  bank: bank,
  cardType: [
    { text: "存折", value: "01" },
    { text: "借记卡", value: "02" },
    { text: "信用卡", value: "03" },
  ],
  // 是否有社保
  social: [
    { text: "是", value: true },
    { text: "否", value: false },
  ],
  //婚姻
  marriage: [
    { text: "已婚", value: "1" },
    { text: "未婚", value: "2" },
    { text: "离婚", value: "3" },
    { text: "丧偶", value: "4" },
    { text: "其他", value: "5" },
  ],
  //受育程度
  education: education,
  //证件类型
  certificateType: certificateType,
  entryCertificateType: [
    { text: "身份证", value: "01" },
    { text: "护照", value: "07" },
    { text: "军官证", value: "04" },
    { text: "驾照", value: "03" },
    { text: "出生证明", value: "12" },
    { text: "户口簿", value: "02" },
    { text: "其他", value: "99" },
    { text: "异常身份证", value: "08" },
  ],
  // 地址
  // address: address,
  // 国籍
  nationality: nationality,
  // 职业
  occupation: work,
  // 职业一级
  oneLevelWork: oneLevelWork,
  // 职业二级
  twoLevelWork: twoLevelWork,
  // 职业三级
  work: [oneLevelWork, twoLevelWork, work],

  //原生接口映射码表
  nativeModal: nativeModal,

  //产品因子
  product: product,

  test: [
    { text: "测试1", value: "C2019001" },
    { text: "测试2", value: "C2019002", tag: "推荐" },
    { text: "★仅用于测试(demo)的码表", value: "C2019003" },
  ],
};

//如果有json进行合并
// Object.assign(CodeData, jsonModal);

export default codeData;
