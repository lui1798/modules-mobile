import codemapping from "./codemapping";
// 码表data
//******2020-01-02修改 codeData取不到值
import codeData from "allCodeData";
// let codeData = "";
// import(process.env.VUE_APP_ENV === "local" ? "@/data/codedata" : "allCodeData")
//   .then(module => {
//     console.log(module);
//     codeData = module.default;
//   })
//   .catch(err => {
//     console.error(err.message);
//   });
//******2020-01-02修改 codeData取不到值
// require('allCodeData')
console.log(
  "%c commonCodeDatacommonCodeData",
  "color:green;",
  window.allCodeData
);
// console.log("%c commonCodeDatacommonCodeData", "color:green;", allCodeData);

const code = {};
/**
 * 扩充后台对象的options码表
 * @param {*} 对象 流程化的字段对象-fieldCode为key-fieldValue为value-item
 * @param {*} 返回对象模板
 * @return retValue
 */
//eslint-disable-next-line
code.getCodeData = function(item, retValue, type, product, value, whereFrom) {
  // console.log('%c 当前字段','color:green;',item,product,retValue,value);
  if (item) {
    if (
      item[type === "options" ? "optionList" : type] &&
      !window.utils.utilsPlugin.isEmptyArray(
        item[type === "options" ? "optionList" : type]
      )
    ) {
      retValue[type] = item[type === "options" ? "optionList" : type];
    } else if (item.fieldCode) {
      if (product) {
        // 产品的码表取产品定义的返回数据
        if (codemapping[item.fieldCode] && codemapping[item.fieldCode][type]) {
          if (
            product[codemapping[item.fieldCode][type]] ||
            product[codemapping[item.fieldCode][type]] == 0
          ) {
            retValue[type] = product[codemapping[item.fieldCode][type]];
          } else if (product[codemapping[item.fieldCode][type]] === undefined) {
            retValue[type] = codeData[codemapping[item.fieldCode][type]];
          } else if (product[codemapping[item.fieldCode][type]] === null) {
            retValue[type] = "";
          }
        } else if (product[item.fieldCode]) {
          retValue[type] =
            product[
              type === "options" ? `${item.fieldCode}` : `${item.fieldCode}Code`
            ];
        } else if (codeData[item.fieldCode]) {
          // 非产品的码表没有映射直接取码表中的值
          if (typeof codeData[item.fieldCode] && type === "options") {
            retValue[type] = codeData[item.fieldCode];
          }
        } else {
          console.log(
            "%c codemapping不存在当前键值对",
            "color:green;",
            `${item.fieldCode}===${type}`
          );
        }
      } else if (codemapping[item.fieldCode]) {
        // 非产品的码表先找映射码表
        if (
          typeof codemapping[item.fieldCode] === "string" &&
          type === "options"
        ) {
          retValue[type] = codeData[codemapping[item.fieldCode]];
        } else if (codemapping[item.fieldCode][type]) {
          retValue[type] = codeData[codemapping[item.fieldCode][type]];
        } else if (
          typeof codemapping[item.fieldCode] === "string" &&
          type === "defaultValue"
        ) {
          retValue[type] = item.defaultVal;
        } else {
          // console.log(`%c 未处理的if逻辑：当前code:${item.fieldCode}-type:${type}`,'color:red;','1、可能不影响当前流程。2、也可能是程序出错');
        }
      } else if (codeData[item.fieldCode]) {
        // 非产品的码表没有映射直接取码表中的值
        if (
          typeof codeData[item.fieldCode] === "string" &&
          type === "options"
        ) {
          retValue[type] = codeData[item.fieldCode];
        } else if (codeData[item.fieldCode][type]) {
          retValue[type] = codeData[item.fieldCode][type];
        } else if (
          codeData[item.fieldCode] === "address" &&
          type === "options"
        ) {
          retValue[type] = codeData[item.fieldCode];
        } else {
          type === "options" && (retValue.options = codeData[item.fieldCode]);
          // console.log(`%c 未处理的if逻辑：当前code${item.fieldCode}-type:${type}`,'color:red;','1、可能不影响当前流程。2、也可能是程序出错');
        }
      } else {
        if (type === "options") {
          // console.group('%c ','color:red;','未匹配到相应的码表值：')
          //   console.log('%c 未匹配到相应的码表值：','color:red;','1、可能是程序出错');
          //   console.log('%c 未匹配到相应的码表值：','color:red;',`2、可能是未配置${item.fieldCode}字段的映射码表数据，请前往@/data/codedata/common 按说明进行相应的配置`);
          console.log(
            "%c 未匹配到相应的码表值：",
            "color:red;",
            `3、可能是后台服务未配置${item.fieldCode}字段的映射码表数据，请检查返回的option码表数组`
          );
          // console.groupEnd()
          retValue.options = [
            {
              text: "测试1",
              value: "T2019001"
            },
            {
              text: "测试2",
              value: "T2019002"
            },
            {
              text: "出现此选项组--证明码表未取到正确值(△仅用于测试)",
              value: "T2019003"
            }
          ];
        } else if (type === "defaultValue") {
          //  console.log('%c 未匹配到相应defaultValue的码表值：','color:red;',`1、可能是未配置${item.fieldCode}字段的映射码表defaultValue数据，请前往@/data/codedata/common 按说明进行相应的配置`);
        }
      }
    } else {
      console.log("%c 码表处理出现没有值的情况", "color:green;", "");
    }
    return retValue;
  } else {
    //非流程对象取码表
    return codeData[type];
  }
};
// 产品计算因子转换获取
code.getProductCodeData = function(
  retValue,
  type,
  value,
  field,
  item,
  opten = "payFreq"
) {
  console.log(
    "%c utils--field",
    "color:green;",
    retValue,
    type,
    value,
    field,
    item,
    opten
  );
  if (!retValue) {
    retValue = {
      text: "",
      value: ""
    };
  } else if (retValue === "filter") {
    type = "text";
    retValue = {
      text: "",
      value: "",
      type: "filter"
    };
  }
  //  console.log(codeData.product[opten][value])
  //  console.log(retValue[type])
  if (codeData.product[opten][value]) {
    retValue[type] = codeData.product[opten][value];
  } else if (typeof value === "string") {
    if (value.indexOf("term_") === 0) {
      retValue[type] = `${value.split("term_")[1]}年`;
    } else if (value.indexOf("to_") === 0) {
      retValue[type] = ` ${
        value.split("to_")[1] === "full"
          ? "终身"
          : value.indexOf("_full") === 0
          ? `交至${value.split("_")[1]}周岁`
          : `至${value.split("to_")[1]}周岁`
      } `;
    } else if (value.indexOf("month_") === 0) {
      retValue[type] = `${value.split("month_")[1]}个月`;
    }
  }
  if (field != undefined && field != "" && field != null) {
    if (
      field.fieldCode === "amount" &&
      item &&
      (item === "乐行无忧意外伤害保险" ||
        item === "安顺意外伤害保险" ||
        item === "6014" ||
        item === "6015" ||
        item === "6016" ||
        item === "4110" ||
        item === "4111")
    ) {
      if (parseInt(field.fieldValue) === 10000) {
        retValue[type] = "计划一（保险责任及对应保额见费率表）";
      }
      if (parseInt(field.fieldValue) === 20000) {
        retValue[type] = "计划二（保险责任及对应保额见费率表）";
      }
      if (parseInt(field.fieldValue) === 30000) {
        retValue[type] = "计划三（保险责任及对应保额见费率表）";
      }
      if (parseInt(field.fieldValue) === 5000000) {
        retValue[type] = "计划一（保险责任及对应保额见费率表）";
      }
      if (parseInt(field.fieldValue) === 3000000) {
        retValue[type] = "计划二（保险责任及对应保额见费率表）";
      }
    }
    if (field.fieldCode === "isRenewal") {
      if (field.fieldType === "200200") {
        if (field.fieldCode === "1") {
          retValue[type] = "保险期满后，保单终止";
        } else {
          retValue[type] = "保险期满后，继续续保";
        }
      } else {
        if (field.fieldCode === "1") {
          retValue[type] = "是";
        } else {
          retValue[type] = "否";
        }
      }
    }
    if (field.fieldCode === "isRenewal_3") {
      if (field.fieldType === "200200") {
        if (field.fieldCode === "1") {
          retValue[type] = "是";
        } else {
          retValue[type] = "否";
        }
      } else {
        if (field.fieldValue === "1") {
          retValue[type] = "是";
        } else {
          retValue[type] = "否";
        }
      }
    }
    if (field.fieldCode === "chargePeriod" && field.fieldValue === "single") {
      retValue[type] = "一次交清";
    }
  }
  if (!retValue[type]) {
    retValue[type] = value;
  }
  if (retValue.type === "filter") {
    return retValue.text;
  } else {
    return retValue;
  }
};

code.getCodeTextOrVal = function(
  tv,
  codeType,
  getType = "text",
  comType = "value",
  fieldType
) {
  let codeArray = [];
  if (fieldType === "200203") {
    //职业特殊处理
    tv = tv.split("|")[2] || tv;
    codeType = "occupation";
  }
  if (codeType === "age") {
    return window.utils.utilsPlugin.calcAge(tv);
  }
  if (codemapping[codeType]) {
    codeArray = codeData[codemapping[codeType]];
  } else if (codeData[codeType]) {
    codeArray = codeData[codeType];
  } else {
    console.error(
      `未匹配到<${codeType}>相应的码表值：请检查/src/data/codedata下是否存在<${codeType}>的option码表数组`
    );
    return;
  }
  if (fieldType === "200202") {
    //地址特殊处理
    let tva = tv.split("|");
    let retVal = "";
    for (let tia = 0; tia < codeArray.options.length; tia++) {
      const tiea = codeArray.options[tia];
      if (tiea[comType] === tva[0]) {
        retVal += tiea.label;
        for (let tib = 0; tib < tiea.children.options.length; tib++) {
          const tieb = tiea.children.options[tib];
          if (tieb[comType] === tva[1]) {
            retVal += `-${tieb.label}`;
            for (let tic = 0; tic < tieb.children.options.length; tic++) {
              const tiec = tieb.children.options[tic];
              if (tiec[comType] === tva[2]) {
                retVal += `-${tiec.label}`;
                return retVal;
              }
            }
          }
        }
      }
    }
  }
  for (let ti = 0; ti < codeArray.length; ti++) {
    const tie = codeArray[ti];
    if (tie[comType] === tv) {
      return tie[getType];
    } else if (tie[getType] === tv) {
      return tie[comType];
    }
  }
};

export default code;
