const __getAge = require("@t/getAge");
import { format, compareAsc } from "date-fns";
//手机号码前缀
const phoneNumberRuleList = {
  rule: {
    item: [
      {
        code: "1",
        text: "130",
      },
      {
        code: "2",
        text: "131",
      },
      {
        code: "3",
        text: "132",
      },
      {
        code: "4",
        text: "133",
      },
      {
        code: "5",
        text: "134",
      },
      {
        code: "6",
        text: "135",
      },
      {
        code: "7",
        text: "136",
      },
      {
        code: "8",
        text: "137",
      },
      {
        code: "9",
        text: "138",
      },
      {
        code: "10",
        text: "139",
      },
      {
        code: "11",
        text: "145",
      },
      {
        code: "12",
        text: "146",
      },
      {
        code: "13",
        text: "147",
      },
      {
        code: "14",
        text: "148",
      },
      {
        code: "15",
        text: "149",
      },
      {
        code: "16",
        text: "150",
      },
      {
        code: "17",
        text: "151",
      },
      {
        code: "18",
        text: "152",
      },
      {
        code: "19",
        text: "153",
      },
      {
        code: "20",
        text: "155",
      },
      {
        code: "21",
        text: "156",
      },
      {
        code: "22",
        text: "157",
      },
      {
        code: "23",
        text: "158",
      },
      {
        code: "24",
        text: "159",
      },
      {
        code: "25",
        text: "166",
      },
      {
        code: "26",
        text: "170",
      },
      {
        code: "27",
        text: "171",
      },
      {
        code: "28",
        text: "172",
      },
      {
        code: "29",
        text: "173",
      },
      {
        code: "30",
        text: "174",
      },
      {
        code: "31",
        text: "175",
      },
      {
        code: "32",
        text: "176",
      },
      {
        code: "33",
        text: "177",
      },
      {
        code: "34",
        text: "178",
      },
      {
        code: "35",
        text: "180",
      },
      {
        code: "36",
        text: "181",
      },
      {
        code: "37",
        text: "182",
      },
      {
        code: "38",
        text: "183",
      },
      {
        code: "39",
        text: "184",
      },
      {
        code: "40",
        text: "185",
      },
      {
        code: "41",
        text: "186",
      },
      {
        code: "42",
        text: "187",
      },
      {
        code: "43",
        text: "188",
      },
      {
        code: "44",
        text: "189",
      },
      {
        code: "45",
        text: "198",
      },
      {
        code: "46",
        text: "199",
      },
      {
        code: "47",
        text: "140",
      },
      {
        code: "48",
        text: "141",
      },
      {
        code: "49",
        text: "142",
      },
      {
        code: "50",
        text: "143",
      },
      {
        code: "51",
        text: "144",
      },
      {
        code: "52",
        text: "145",
      },
      {
        code: "53",
        text: "146",
      },
      {
        code: "54",
        text: "147",
      },
      {
        code: "55",
        text: "148",
      },
      {
        code: "56",
        text: "149",
      },
      {
        code: "57",
        text: "160",
      },
      {
        code: "58",
        text: "161",
      },
      {
        code: "58",
        text: "162",
      },
      {
        code: "59",
        text: "163",
      },
      {
        code: "60",
        text: "164",
      },
      {
        code: "61",
        text: "165",
      },
      {
        code: "62",
        text: "166",
      },
      {
        code: "63",
        text: "167",
      },
      {
        code: "64",
        text: "168",
      },
      {
        code: "65",
        text: "169",
      },
      {
        code: "66",
        text: "190",
      },
      {
        code: "67",
        text: "191",
      },
      {
        code: "68",
        text: "192",
      },
      {
        code: "69",
        text: "193",
      },
      {
        code: "70",
        text: "194",
      },
      {
        code: "71",
        text: "195",
      },
      {
        code: "72",
        text: "196",
      },
      {
        code: "73",
        text: "197",
      },
      {
        code: "74",
        text: "198",
      },
      {
        code: "75",
        text: "199",
      },
    ],
  },
};
const entryUtil = {
  /** 解析身份证号码中的生日,性别,年龄 */
  getAnalysisIdCard(card, fmt = "yyyy-MM-dd") {
    //获取出生日期
    let birthday = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
    let genderType = 0;
    let genderDesc = 0;
    if (parseInt(card.substr(16, 1)) % 2 == 1) {
      //男
      genderType = 0;
      genderDesc = "男";
    } else {
      //女
      genderType = 1;
      genderDesc = "女";
    }
    return {
      birthday: format(new Date(birthday), fmt),
      gender: { type: genderType, desc: genderDesc },
      age: __getAge(birthday),
    };
  },
  /*
    校验项:姓名,名字
    校验规则:未填写提示,特殊字符/数字/空格提示,长度不规范提示
  */
  checkName(str, required = false) {
    let prefix = "姓名";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let userName = str.replace(/\s+/g, "");
      let reg1 = /.*\d.*/;
      let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
      if (reg1.test(userName)) {
        return { code: 2, msg: prefix + "填写有误，请重新填写" };
      } else if (!reg2.test(userName)) {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length < 2) {
        return { code: 4, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length > 15) {
        return { code: 5, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:紧急联系人
    校验规则:未填写提示,特殊字符/数字/空格提示,长度不规范提示
  */
  checkEmergencyContact(str, required = false) {
    let prefix = "紧急联系人";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let userName = str.replace(/\s+/g, "");
      let reg1 = /.*\d.*/;
      let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
      if (reg1.test(userName)) {
        return { code: 2, msg: prefix + "填写有误，请重新填写" };
      } else if (!reg2.test(userName)) {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length < 2) {
        return { code: 4, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length > 15) {
        return { code: 5, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:介绍人
    校验规则:未填写提示,特殊字符/数字/空格提示,长度不规范提示
  */
  checkReferences(str, required = false) {
    let prefix = "介绍人";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let userName = str.replace(/\s+/g, "");
      let reg1 = /.*\d.*/;
      let reg2 = /^[\u4E00-\u9FA5A-Za-z]+$/;
      if (reg1.test(userName)) {
        return { code: 2, msg: prefix + "填写有误，请重新填写" };
      } else if (!reg2.test(userName)) {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length < 2) {
        return { code: 4, msg: prefix + "填写有误，请重新填写" };
      }
      if (userName.length > 15) {
        return { code: 5, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:身份证号码
    校验规则:18位校验
  */
  checkIdCard(idCard, required = false) {
    let prefix = "身份证号码";
    if (idCard == undefined || idCard == null || idCard == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      //15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
          var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }
          var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17); //得到最后一位身份证号码
          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              console.log("验证通过1");
            } else {
              return { code: 1, msg: prefix + "填写有误，请重新填写" };
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              console.log("验证通过2");
            } else {
              return { code: 2, msg: prefix + "填写有误，请重新填写" };
            }
          }
        }
      } else {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:身份证有效止期
    校验规则:身份证有效止期不能小于系统当前时间
    提示:比较两个日期，如果第一个日期在第二个日期之后， 则返回1；如果第一个日期在第二个日期之前，则返回-1；如果日期相等，则返回0。
  */
  checkIdCardDate(str, required = false) {
    console.log(str);
    let prefix = "身份证有效止期";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let compareResult = compareAsc(
        new Date(format(new Date(str), "yyyy-MM-dd")),
        new Date(format(new Date(), "yyyy-MM-dd")),
      );
      console.log(compareResult);
      if (compareResult == -1) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:手机
    校验规则:同光速保客户管理
  */
  checkPhoneNum(mobilePhone, required = false) {
    let prefix = "手机";
    if (mobilePhone == undefined || mobilePhone == null || mobilePhone == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let tel = mobilePhone.replace(/(^\s*)|(\s*$)/g, "");
      let ispass = false;
      if (phoneNumberRuleList != undefined && phoneNumberRuleList != "") {
        if (mobilePhone.toString().length == 11 && !isNaN(mobilePhone)) {
          for (let i = 0; i < phoneNumberRuleList.rule.item.length; i++) {
            if (mobilePhone.substring(0, 3) == phoneNumberRuleList.rule.item[i].text) {
              ispass = true;
              break;
            }
          }
        }
      }
      if (tel.toString().length != 11) {
        return { code: 2, msg: prefix + "填写有误，请重新填写" };
      } else if (isNaN(mobilePhone)) {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
      if (!ispass) {
        return { code: 4, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:紧急联系人电话
    校验规则:同光速保客户管理
  */
  checkEmergencyContactNum(mobilePhone, required = false) {
    let prefix = "紧急联系人电话";
    if (mobilePhone == undefined || mobilePhone == null || mobilePhone == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let tel = mobilePhone.replace(/(^\s*)|(\s*$)/g, "");
      let ispass = false;
      if (phoneNumberRuleList != undefined && phoneNumberRuleList != "") {
        if (mobilePhone.toString().length == 11 && !isNaN(mobilePhone)) {
          for (let i = 0; i < phoneNumberRuleList.rule.item.length; i++) {
            if (mobilePhone.substring(0, 3) == phoneNumberRuleList.rule.item[i].text) {
              ispass = true;
              break;
            }
          }
        }
      }
      if (tel.toString().length != 11) {
        return { code: 2, msg: prefix + "填写有误，请重新填写" };
      } else if (isNaN(mobilePhone)) {
        return { code: 3, msg: prefix + "填写有误，请重新填写" };
      }
      if (!ispass) {
        return { code: 4, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:毕业院校
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkGraduateSchool(str, required = false) {
    let prefix = "毕业院校";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:专业
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkProfessional(str, required = false) {
    let prefix = "专业";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:邮政编码,邮编
    校验规则:6位数字
  */
  checkZipCode(str, required = false) {
    let prefix = "邮政编码";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^\d{6}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:联系电话
    校验规则:长度6-12，只能填写数字
  */
  checkContactPhone(str, required = false) {
    let prefix = "联系电话";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^\d{6,12}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:邮箱,电子邮箱
    校验规则:同光速保客户管理
  */
  checkEmail(str, required = false) {
    let prefix = "邮箱";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[A-Za-z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:详细地址
    校验规则:长度为2-50，可填写汉字、数字、字母
  */
  checkDetailedAddress(str, required = false) {
    let prefix = "详细地址";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,50}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:备注
    校验规则:长度为2-50，可填写汉字、数字、字母
  */
  checkNote(str, required = false) {
    let prefix = "备注";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,50}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:开始时间
    校验规则:开始时间不能大于结束时间
    提示:比较两个日期，如果第一个日期在第二个日期之后， 则返回1；如果第一个日期在第二个日期之前，则返回-1；如果日期相等，则返回0。
  */
  checkStartDate(start, end, required = false) {
    let prefix = "开始时间";
    let prefix2 = "结束时间";
    if (start == undefined || start == null || start == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      if (end == undefined || end == null || end == "") {
        return { code: 0, msg: prefix2 + "为必填项，请进行填写" };
      }
      let compareResult = compareAsc(
        new Date(format(new Date(start), "yyyy-MM-dd")),
        new Date(format(new Date(end), "yyyy-MM-dd")),
      );
      if (compareResult == 1) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:结束时间
    校验规则:结束时间不能大于系统当前时间
    提示:比较两个日期，如果第一个日期在第二个日期之后， 则返回1；如果第一个日期在第二个日期之前，则返回-1；如果日期相等，则返回0。
  */
  checkEndDate(str, required = false) {
    let prefix = "结束时间";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let compareResult = compareAsc(
        new Date(format(new Date(str), "yyyy-MM-dd")),
        new Date(format(new Date(), "yyyy-MM-dd")),
      );
      if (compareResult == 1) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:举办单位
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkHostUnits(str, required = false) {
    let prefix = "举办单位";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:培训内容
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkTraining(str, required = false) {
    let prefix = "培训内容";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:获何证书
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkCertificate(str, required = false) {
    let prefix = "获何证书";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:毕业院校
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkSchoolOfGraduation(str, required = false) {
    let prefix = "毕业院校";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:所学专业
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkProfession(str, required = false) {
    let prefix = "所学专业";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    校验项:证明人
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkWitness(str, required = false) {
    let prefix = "证明人";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:原工作单位
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkOriginalCompany(str, required = false) {
    let prefix = "原工作单位";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:工作单位
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkCompany(str, required = false) {
    let prefix = "工作单位";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:职务
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkPosition(str, required = false) {
    let prefix = "职务";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /* 
    校验项:离职原因
    校验规则:长度为2-30，可填写汉字、数字、字母
  */
  checkWhy(str, required = false) {
    let prefix = "离职原因";
    if (str == undefined || str == null || str == "") {
      if (required) {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    } else {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,30}$/;
      if (!reg.test(str)) {
        return { code: 1, msg: prefix + "填写有误，请重新填写" };
      }
    }
  },
  /*
    必填项校验
  */
  required(prefix, str, required) {
    if (required) {
      if (str == undefined || str == null || str == "") {
        return { code: 0, msg: prefix + "为必填项，请进行填写" };
      }
    }
  },
};
export default entryUtil;
