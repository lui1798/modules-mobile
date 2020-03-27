const isEmpty = require("./isEmpty");
const flatDateStr = require("./flatDateStr");
require("./Format");
/**
 * 计算周岁
 * @param {Object} dateStr 日期字符串或日期对象
 * @param {Date|String|Number} today 今天
 * @param  today 今天
 * @return {Number}
 */
function getAge(dateStr, today, isHaveToday = true) {
  if (isEmpty(dateStr)) return 0;
  dateStr = dateStr instanceof Date ? dateStr.Format("yyyy-MM-dd") : dateStr;
  let r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (isEmpty(r)) return 0;
  let birth = new Date(r[1], r[3] - 1, r[4]);
  if (
    birth.getFullYear() === parseInt(r[1]) &&
    birth.getMonth() + 1 === parseInt(r[3]) &&
    birth.getDate() === parseInt(r[4])
  ) {
    today = isEmpty(today) ? new Date() : typeof today === "object" ? today : new Date(flatDateStr(today));
    let age = today.getFullYear() - r[1];
    if (today.getMonth() > birth.getMonth()) {
      return age;
    }
    if (today.getMonth() === birth.getMonth()) {
      if (isHaveToday && today.getDate() >= birth.getDate()) {
        return age;
      }
      if (!isHaveToday && today.getDate() > birth.getDate()) {
        return age - 1;
      }
      return age - 1;
    }
    if (today.getMonth() < birth.getMonth()) {
      return age - 1;
    }
    today = null;
  }
  return 0;
}

module.exports = getAge;
