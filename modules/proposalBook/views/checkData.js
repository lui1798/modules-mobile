export const personCheck = function(params) {
  for (let index = 0; index < params.length; index++) {
    const per = params[index];
    const alias = per[1];
    // if (per[0] && per[0].name) {
    //   if (!/^[\u4E00-\u9FA5a-zA-Z]+$/.test(per[0].name)) {
    //     return `${alias}姓名仅可输入中文和英文`;
    //   }
    // }
    if (per[0] && !per[0].age) {
      return `请输入${alias}年龄`;
    }
    if (per[0] && !per[0].occupationCode) {
      return `请输入${alias}职业`;
    }
    if (per[0] && per[0].sameInsurant === false && per[0].relation === "33") {
      if (params[0][0].sex === params[1][0].sex) {
        return `关系填写有误，请检查`;
      }
    }
  }
  return "";
};

/**
 * 统一抽离险种录入项校验的显示险种的信息拼接字符串
 * @param {Object} params 险种对象
 */
function showProductName(params) {
  return `<${params.nameAbbr}>`;
}
/**
 * 根据录入项的key返回该字段的中文title
 * @param {String} key 产品录入项key值
 */
function getTitleByKey(key) {
  switch (key) {
    case "pay_freq":
      return "交费方式";
    case "pay":
      return "交费期间";
    case "insure":
      return "保险期间";
    case "draw_freq":
      return "领取频率";
    case "draw_age":
      return "领取年龄";
    case "rank":
      return "计划";
    case "draw_mode":
      return "领取方式";
    case "option_duty":
      return "可选责任";

    default:
      return "<202005260001>未设定的字段";
  }
}

export const productCheck = function(params) {
  //遍历主险组合数组
  for (let mpi = 0; mpi < params.length; mpi++) {
    const mpro = params[mpi];
    //遍历本主险及附加险数组参数对象数组
    for (let mpi = 0; mpi < mpro.product.length; mpi++) {
      const pro = mpro.product[mpi];
      //判定当前输入类型--输入型校验
      if (pro.inputModel === 1 || pro.quantity != undefined) {
        //份数
        if (!pro.quantity) {
          return `请输入${showProductName(pro)}份数`;
        }
      } else if (pro.inputModel === 2 || pro.amount != undefined) {
        //保额
        if (!pro.amount) {
          return `请输入${showProductName(pro)}保额`;
        }
      } else if (pro.inputModel === 4 || pro.premium != undefined) {
        //保费
        if (!pro.premium) {
          return `请输入${showProductName(pro)}保费`;
        }
      } else if (pro.inputModel === 7 || pro.fixed != undefined) {
        //一次支付固定保费
        if (!pro.fixed) {
          return `请输入${showProductName(pro)}保费`;
        }
      }
      //下拉选择型
      for (const key in pro.choose) {
        if (Object.prototype.hasOwnProperty.call(pro.choose, key)) {
          const val = pro.chooseValues[key];
          if (key === "option_duty") {
            console.log("%c 不需要校验key", "color:#00CD00", key);
            continue;
          }
          console.log("%c 校验key", "color:#00CD00", key);
          if (!val) {
            return `请输入${showProductName(pro)}${getTitleByKey(key)}`;
          }
        }
      }
      //万能险追加领取校验
      if (pro.append && pro.append.length > 0) {
        for (let i = 0; i < pro.append.length; i++) {
          const item = pro.append[i];
          if (!item.startYear) {
            return `请输入${showProductName(pro)}追加起始年限`;
          }
          if (!item.endYear) {
            return `请输入${showProductName(pro)}追加截止年限`;
          }
          if (item.startYear > item.endYear) {
            return `请输入${showProductName(pro)}追加起始年限不能大于截止年限`;
          }
          if (!item.money) {
            return `请输入${showProductName(pro)}追加保费`;
          }
        }
      }
      if (pro.draw && pro.draw.length > 0) {
        for (let i = 0; i < pro.draw.length; i++) {
          const item = pro.draw[i];
          if (!item.startYear) {
            return `请输入${showProductName(pro)}领取起始年限`;
          }
          if (!item.endYear) {
            return `请输入${showProductName(pro)}领取截止年限`;
          }
          if (item.startYear > item.endYear) {
            return `请输入${showProductName(pro)}领取起始年限不能大于截止年限`;
          }
          if (!item.money) {
            return `请输入${showProductName(pro)}领取保费`;
          }
        }
      }
    }
  }
};

/**
 * 豁免险更改显示值
 * @param {*} master
 * @param {*} val
 */
export const dealHuomian = function(master, val, _this) {
  if (val.indexOf("term_") > -1) {
    for (let i = 0; i < master.length; i++) {
      const ma = master[i];
      for (let ci = 0; ci < ma.choose.pay.length; ci++) {
        if (ma.choose.pay[ci].value === "exempt") {
          ma.choose.pay[ci].text = `${parseInt(val.split("term_")[1]) - 1}年`;
          ma.chooseValues.pay = `exempt1`;
          setTimeout(() => {
            ma.chooseValues.pay = `exempt`;
          }, 50);
          _this.$set(master, i, master[i]);
        }
      }
    }
  }
};

/**
 * 是否为豁免
 * @param {*} master
 * @param {*} val
 */
export const isHuomian = function(master, ma) {
  for (let ci = 0; ci < ma.choose.pay.length; ci++) {
    if (ma.choose.pay[ci].value === "exempt") {
      return true;
    }
  }
  return false;
};
