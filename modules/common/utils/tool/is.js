/**
 * check value type
 * @param  {String}  type 类型
 * @param  {*}  val  校验的值
 * @return {Boolean}
 */
function is(type, val) {
  return Object.prototype.toString.call(val) === "[object " + type + "]";
}

module.exports = is;
