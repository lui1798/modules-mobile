let utils = {};

/**
 * 模拟分页数据
 * @param {*} pageNum 分页页码
 * @param {*} pageSize 分页条数
 * @param {*} dataList 假数据数组
 * @return {*} listData 返回分页数据
 */
utils.getPageData = function(pageNum, pageSize, dataList, searchKey) {
  //参数1正则式，参数2字串
  var listData = [];
  if (!searchKey) {
    // 全部商品 (模拟分页数据)
    for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
      if (i >= dataList.length) break;
      listData.push(dataList[i]);
    }
  } else {
    // 模拟关键词搜索
    console.log("%c  searchKey", "color:green;", searchKey);
    var word = searchKey;
    for (var k = 0; k < dataList.length; k++) {
      if (dataList[k].className.indexOf(word) !== -1) {
        listData.push(dataList[k]);
      }
    }
  }
  return listData;
};

export default utils;
