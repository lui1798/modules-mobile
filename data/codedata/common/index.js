/*
 * @Author: aliang
 * @Date: 2018-01-06 21:45:22
 * @Last Modified by: aliang
 * @Last Modified time: 2019-12-17 19:14:43
 */
import {
  address,
  occupation,
  certificateType,
  nativeModal,
  oneLevelWork,
  twoLevelWork,
  work,
  nationality,
  education,
  bank,
  nation,
  bankNameYBRZ
} from './json'
const CodeData = {
  // 性别
  sex: [{ text: "男", value: "1" }, { text: "女", value: "2" }],
  // 先生or女士
  mrOrMS: [{ text: "先生", value: "1" }, { text: "女士", value: "2" }, { text: "先生/女士", value: "" }],
  // 民族
  nation: nation,
  // 银行
  bank: bank,
  cardType: [{ text: "存折", value: "01" }, { text: "借记卡", value: "02" }, { text: "信用卡", value: "03" }],
  // 是否有社保
  social: [{ text: "有", value: "1" }, { text: "无", value: "2" }],
  //婚姻
  marriage: [{ text: "已婚", value: "1"},{ text: "未婚", value: "2" },{ text: "离婚",value: "3"},{ text: "丧偶", value: "4"},{ text: "其他", value: "5"}],
  //受育程度
  education: education,
  //证件类型
  certificateType: certificateType,
  entryCertificateType: [{ text: "身份证", value: "01" }, { text: "护照", value: "07" }, { text: "军官证", value: "04" }, { text: "驾照", value: "03" }, { text: "出生证明", value: "12" }, { text: "户口簿", value: "02" }, { text: "其他", value: "99" }, { text: "异常身份证", value: "08" }],
  // 地址
  address: address,
  // 国籍
  nationality: nationality,
  // 原职业
  oldProfession: [{ "text": "销售", "value": "09" }, { "text": "商业管理", "value": "02" }, { "text": "普通职员", "value": "03" }, { "text": "技术", "value": "04" }, { "text": "医务", "value": "05" }, { "text": "财会", "value": "06" }, { "text": "教育", "value": "07" }, { "text": "法律", "value": "08" }, { "text": "国家公务员", "value": "1" }, { "text": "文体", "value": "10" }, { "text": "生产", "value": "11" }, { "text": "军人", "value": "12" }, { "text": "学生", "value": "13" }, { "text": "个体", "value": "14" }, { "text": "自由职业", "value": "15 " }, { "text": "其他", "value": "16" }],
  // 职业
  occupation: work,
  // 职业一级
  oneLevelWork: oneLevelWork,
  // 职业二级
  twoLevelWork: twoLevelWork,
  // 职业三级
  work: [oneLevelWork,twoLevelWork,work],
  // 招聘来源
  recruitSource: [{ text: "新人", value: "00" }, { text: "同业", value: "12" }],
  // 司内是否有亲属
  isKinship: [{ text: "是", value: "0" }, { text: "否", value: "1" }],
  // 专兼职
  fullTimeFlag: [{ text: "兼职", value: "1" }, { text: "专职", value: "0" }],
  // 是否为聘才
  isHire: [{ text: "是", value: "1" }, { text: "否", value: "2" }],
  // 证书类型
  qualificationTypeTX: [{ text: "请选择", value: "" }, { text: "执业证书", value: "2" }, { text: "万能险产品销售资格", value: "4" }, { text: "分红险产品销售资格证", value: "14" }],
  // 证书类型(银保)
  qualificationType: [{ text: "请选择", value: "" }, { text: "万能险产品销售资格", value: "4" }, { text: "分红险产品销售资格证", value: "14" }],
  // 销售资质是否有效
  invalidResult: [{ text: "是", value: "1" }, { text: "否", value: "2" }],
  // 人员类型
  agentKind: [{ text: "销售人员", value: "1" }, { text: "续期专员", value: "2" }, { text: "新模式人员", value: "3" }, { text: "中介人员", value: "4" }, { text: "团险直销", value: "5" }, { text: "其他", value: "6" }],
  // 金融职称-团险
  postTitleTX: [{ text: "初级职称", value: "1" }, { text: "中级职称", value: "2" }, { text: "高级职称", value: "3" }],
  // 金融职称
  postTitle: [{ text: "请选择", value: "" }, { text: "金融理财师", value: "AFP" }, { text: "国际金融理财师", value: "CFP" }],
  // 荣誉讲师
  honoraryLecturerLevel: [{ text: "PT-1", value: "1" }, { text: "PT-2", value: "2" }, { text: "PT-3", value: "3" }, { text: "PT-4", value: "4" }, { text: "PT-5", value: "5" }],
  // 开户银行
  // 个险
  bankNameRZ: [
    { text: "中国银行", value: "9006" },
    { text: "工商银行", value: "9001" },
    { text: "招商银行", value: "9002" },
    { text: "建设银行", value: "9008" },
    { text: "农业银行", value: "9010" }
  ],
  // 银保
  bankNameYBRZ: bankNameYBRZ,
  // 增员渠道
  channelName: [{ text: "缘故", value: "0" }, { text: "网络", value: "1" }, { text: "转介绍", value: "2" }, { text: "公司公开招募", value: "3" }, { text: "其他", value: "4" }],
  // 政治面貌
  political: [{ text: "群众", value: "01" }, { text: "团员", value: "02" }, { text: "党员", value: "03" }, { text: "其他", value: "04" }],
  // 销售方式
  saleType: [{ value: '02', text: '团险直销' }, { value: '03', text: '银行代理' }],
  // 从业年限
  salesExperience: [{ value: '1', text: '1年以内' }, { value: '2', text: '1年以上' }],
  // 销售渠道
  channelId: [{ value: '02', text: '个险' }, { value: '03', text: '银保' }, { value: '04', text: '电话直销' }, { value: '05', text: '网销' }, { value: '06', text: '团险' }],

  //原生接口映射码表
  nativeModal:nativeModal,

  test: [{ text: "测试1", value: "C2019001" },{ text: "测试2", value: "C2019002",tag:"推荐" },{ text: "★仅用于测试(demo)的码表", value: "C2019003" }]
}

//如果有json进行合并
// Object.assign(CodeData, jsonModal);

export default CodeData
