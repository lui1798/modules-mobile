/*
 * @Author: aliang
 * @Date: 2018-01-06 21:45:22
 * @desc: 映射表 key为后台对象filedCode value为当前@/data/codedata/common中定义的码表key
 * @Last Modified by: aliang
 * @Last Modified time: 2019-12-13 14:28:42
 */
const common = {
  isAdd: "switchIsOr", //是否追加
  isJian: "switchIsOr", //是否减保
  displayPerCard: "switchIsOr", //是否显示个人名片
  displayBankCard: "switchIsOr", //是否显示网点名片
  isIntroduction: "switchIsOr", //是否显示公司介绍
  isBaoDan: "switchIsOr", //是否显示人生必备的七张保单
  beneficyValidLongTerm: "switchIsOr", //是否显示人生必备的七张保单

  holderJobCode: "work",
  insuredJobCode: "work",
  insuredSex: "sex",
  holderSex: "sex",
  benefitSex: "sex",
  holderIndusiry: "work",
  insuredIndusiry: "work",
  holderNationality: "nationality", //投保人国籍
  insuredNationality: "nationality", //被保人国籍
  benNationality: "nationality", //受益人国籍
  holderEducation: "education", //投保人受教育程度
  insuredEducation: "education", //被保人受教育程度
  holderIsMarriage: "marriage", //投保人婚姻
  insuredIsMarriage: "marriage", //被保人婚姻
  holderCertificateType: "certificateType", //投保人证件类型
  insuredCertificateType: "certificateType", //被保人证件类型
  benefitCertificateType: "certificateType", //受益人证件类型
  taxStatement: "statement", //税收声明
  province: "address", // 住址地址
  // "address": "address",// 住址地址
  comProvince: "address", // 通讯地址
  holderBirthDate: {
    defaultValue: new Date(),
  },
  insuredBirthDate: {
    defaultValue: new Date(),
  },

  //产品相关
  chargeWay: {
    //缴费方式
    options: "payType",
    defaultValue: "payTypeCode",
  },
  // "chargeType": {//缴费期间类型
  //     "options": "payType",
  //     "defaultValue": "payTypeCode",
  // },
  chargePeriod: {
    //缴费期间
    options: "payTime",
    defaultValue: "payTimeCode",
  },
  // "coverageType": {//保障期间类型
  //     "options": "payType",
  //     "defaultValue": "payTypeCode",
  // },
  coveragePeriod: {
    //保障期间
    options: "insureTime",
    defaultValue: "insureTimeCode",
  },
  drawAge: {
    //领取年龄
    options: "drawAge",
    defaultValue: "drawAgeCode",
  },
  drawType: {
    //领取年龄方式
    options: "drawType",
    defaultValue: "drawTypeCode",
  },
  overdue: {
    //保费逾期未付
    options: "overdue",
    defaultValue: "overdueCode",
  },
  amount: {
    //保额
    defaultValue: "amount",
    options: "amountList",
  },
  premium: {
    //保费
    defaultValue: "premium",
  },
  dividend: {
    //红利领取方式
    defaultValue: "dividend",
    options: "dividendList",
  },

  // "holderCertificateType":"certificateType",
  // {//投保人证件类型
  //     "options": "certificateType",
  //     "defaultValue": "holderCertificateType",
  // },
  // "insuredCertificateType": "certificateType"
  //{//被保人证件类型
  //     "options": "certificateType",
  //     "defaultValue": "insuredCertificateType",
  // },
};

export default common;
