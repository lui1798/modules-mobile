/**
 * 去除空格
 * @param  {String}  str 字符串
 * @return {String}
 */
function trim(str) {
  return str && !(str instanceof Object) ? String(str).replace(/(^\s+)|(\s+$)/g, "") : str;
}

module.exports = trim;
