/**
 * 数据码表统一映射 value-text转换
 * @param {String} value
 * @param {String} option
 * @param {String} codeData
 * @return {String} laber
 */
const keyValueFun = function(val, option, CodeData) {
  if (val) {
    if (CodeData) {
      let retval = "";
      if (typeof val === "object") {
        const dval = [];
        for (let i = 0; i < CodeData[option].length; i++) {
          const cur = CodeData[option][i];
          for (let a = 0; a < val.length; a++) {
            if (cur.value === val[a]) {
              dval.push(cur.label);
            }
          }
        }
        retval = dval.toString();
      } else {
        retval = CodeData[option].reduce((acc, cur) => {
          acc[cur.value] = cur.text;
          return acc;
        }, {})[val];
      }
      return retval || val;
    } else {
      return val;
    }
  } else {
    return "";
  }
};
export function keyValueFilter(val, optionType, CodeData) {
  return keyValueFun(val, optionType, CodeData);
}
