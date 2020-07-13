const fn = function(params) {
  console.log("%c DataPoint-params", "color:#00CD00", params);
};

export default {
  inserted: function(el, { value: { aa, stop = true } }) {
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
  },
};
