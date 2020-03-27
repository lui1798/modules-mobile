const isEmpty = require("./isEmpty");
const is = require("./is");
/**
 * 变幻Date，兼容 iOS
 * @param {String} date
 */
function flatDateStr(date) {
  if (is("String", date) && !isEmpty(date)) {
    date = date
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "")
      .replace(/(-)/g, "/");
    if (date.indexOf(".") > 0) date = date.slice(0, date.indexOf("."));
  }
  return date;
}

module.exports = flatDateStr;
