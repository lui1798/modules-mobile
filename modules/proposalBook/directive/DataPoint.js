const fn = function(params) {
  console.log("%c DataPoint-params", "color:#00CD00", params);
  window.jQuery.ajax({
    url: window.globalConfig.rootUrl + "/dataPoint/point/save",
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    processData: false,
    contentType: "application/json",
    success: function() {},
    Error: function() {},
  });
};

export default {
  inserted: function(el, { value: { aa, postParms = false, stop = true } }) {
    if (postParms) {
      fn(aa);
    } else {
      el.addEventListener(
        "click",
        event => {
          fn(aa); // 可以做任何事情，发送给后端
          if (stop) {
            event.stopPropagation(); // 是针对有些原先代码把clik事件冒泡给禁止了
          }
        },
        false,
      );
    }
  },
};
