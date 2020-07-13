/**
 * 获取Url参数
 * @param  {String}  name 参数名--如果为空时返回所有参数key-value对象
 * @param {String} url Url地址非必填（默认取当前window.location）
 * @return {String}
 */
function getUrlParams(name, url) {
  if (name) {
    let reg = new RegExp(name + "=([^&]*)(&|$)");
    let r = (url || window.location.search.substr(1)).match(reg);
    if (r !== null) return decodeURIComponent(r[1]);
    r = (url ? url.split("#")[1] || window.location.hash : window.location.hash).match(reg);
    if (r !== null) return decodeURIComponent(r[1]);
    return null;
  } else {
    const search = url.split("?")[1];
    if (!search) {
      return {};
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, " ") +
        '"}',
    );
  }
}

module.exports = getUrlParams;
