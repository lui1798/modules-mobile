//两级联系地址
import address from "./address";
//户口所在地
import registered_permanent_residence from "./registered_permanent_residence";
//籍贯码表
import native_place from "./native_place";
//民族码表
import ethnic_groups from "./ethnic_groups";
//省码表
import provinces from "./provinces";
//市码表
import cities from "./cities";
//学历码表
const education = [
  { value: "0", text: "博士" },
  { value: "1", text: "硕士" },
  { value: "2", text: "研究生" },
  { value: "3", text: "本科" },
  { value: "4", text: "大专" },
  { value: "5", text: "中专" },
  { value: "6", text: "高中及同等学历" },
  { value: "7", text: "初中及同等学历" },
  { value: "8", text: "初中以下学历" },
  { value: "9", text: "其他" },
];
//同业经验年限码表
const years_of_industry_experience = [
  { value: "0", text: "无" },
  { value: "1", text: "1年以下" },
  { value: "2", text: "1至2年" },
  { value: "3", text: "2至3年" },
  { value: "4", text: "3至4年" },
  { value: "5", text: "4年以上" },
];
//金融培训经验年限码表
const years_of_financial_training_experience = [
  { value: "0", text: "无" },
  { value: "1", text: "1年以下" },
  { value: "2", text: "1至2年" },
  { value: "3", text: "2至3年" },
  { value: "4", text: "3至4年" },
  { value: "5", text: "4年以上" },
];
//销售经验年限码表
const years_of_sales_experience = [
  { value: "0", text: "无" },
  { value: "1", text: "1年以下" },
  { value: "2", text: "1至2年" },
  { value: "3", text: "2至3年" },
  { value: "4", text: "3至4年" },
  { value: "5", text: "4年以上" },
];
//性别码表
const gender = [
  { value: "0", text: "男" },
  { value: "1", text: "女" },
];
//身份证是否长期有效
const is_long_time = [
  { value: "Y", text: "是" },
  { value: "N", text: "否" },
];
//是否退休返聘
const is_restart = [
  { value: "Y", text: "是" },
  { value: "N", text: "否" },
];
//政治面貌
const politics_status = [
  { value: "01", text: "群众" },
  { value: "02", text: "团员" },
  { value: "03", text: "党员" },
  { value: "04", text: "其他党派" },
];
//职称
const position_rank = [
  { value: "1", text: "初级职称" },
  { value: "2", text: "中级职称" },
  { value: "3", text: "高级职称" },
];
//应聘渠道
const apply_for_the_channel = [
  { value: "1", text: "网络" },
  { value: "2", text: "人力市场" },
  { value: "3", text: "转介绍" },
];
//原职业
const old_occupation = [
  { value: "01", text: "职员" },
  { value: "02", text: "教师" },
  { value: "03", text: "销售" },
  { value: "04", text: "技师" },
  { value: "05", text: "财务" },
  { value: "06", text: "医护" },
  { value: "07", text: "其它" },
];
//通用是否
const yes_or_no = [
  { value: "0", text: "是" },
  { value: "1", text: "否" },
];

export {
  provinces,
  cities,
  ethnic_groups,
  education,
  native_place,
  years_of_industry_experience,
  years_of_financial_training_experience,
  years_of_sales_experience,
  gender,
  is_long_time,
  is_restart,
  politics_status,
  position_rank,
  address,
  registered_permanent_residence,
  apply_for_the_channel,
  old_occupation,
  yes_or_no,
};
