const trim = require("./trim");
/**
 * 是否为空
 * @param  {*}  value
 * @return {Boolean}
 */
function isEmpty(value) {
  return (
    !value || value === undefined || trim(value) === "" || trim(value) === "null" || value === "" || value.length === 0
  );
}

module.exports = isEmpty;
