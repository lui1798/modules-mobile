<template>
  <div class="">
    <al-all-head title="echart" :headBottom="true"></al-all-head>
    <al-content>
      <div style="position:relative">
        <canvas id="container" style="width:100%;"></canvas>
      </div>
      <div style="position:relative">
        <canvas id="container-zzt" style="width:100%;"></canvas>
      </div>
      <div style="position:relative">
        <canvas id="container-zzt02" style="width:100%;"></canvas>
      </div>
      <div style="position:relative">
        <canvas id="mountNode" style="width:100%;"></canvas>
      </div>
    </al-content>
  </div>
</template>

<script>
import { AllHead, Content } from "al-mobile";
import F2 from "@antv/f2";
require("@antv/f2/src/component/guide");
const Guide = require("@antv/f2/src/plugin/guide");
F2.Chart.plugins.register(Guide); // 这里进行全局注册，也可以给 chart 的实例注册
// import _clone from "lodash/clone";
// import _values from "lodash/values";

export default {
  name: "demo-echart-demo",
  components: {
    [AllHead.name]: AllHead, //
    [Content.name]: Content, //
  },
  mounted() {
    this.doChart();
    this.doChartZZT();
    this.doChartZZT02();
    this.doA();
  },
  data() {
    return {};
  },
  methods: {
    doChart() {
      const data = [
        {
          time: "1",
          tem: 30,
          type: false,
        },
        {
          time: "5",
          tem: 20,
          type: false,
        },
        {
          time: "10",
          tem: 50,
          type: false,
        },
        {
          time: "15",
          tem: 25,
          type: false,
        },
        {
          time: "20",
          tem: 63,
          type: true,
        },
        {
          time: "25",
          tem: 40,
          type: false,
        },
        {
          time: "30",
          tem: 80,
          type: false,
        },
        {
          time: "31",
          tem: 50,
          type: false,
        },
        {
          time: "32",
          tem: 49,
          type: false,
        },
        {
          time: "33",
          tem: 30,
          type: false,
        },
        {
          time: "35",
          tem: 35,
          type: false,
        },
      ];

      const chart = new F2.Chart({
        id: "container",
        pixelRatio: window.devicePixelRatio,
      });

      const defs = {
        // time: {
        //   tickCount: 5,
        //   range: [0, 1],
        // },
        tem: {
          tickCount: 10,
          min: 0,
          alias: "您的保障额度为",
        },
      };
      chart.source(data, defs);
      chart.axis(false);
      // chart.axis("time", {
      //   label: function label(text, index, total) {
      //     const textCfg = {};
      //     if (index === 0) {
      //       textCfg.textAlign = "left";
      //     } else if (index === total - 1) {
      //       textCfg.textAlign = "right";
      //     }
      //     return textCfg;
      //   },
      // });
      // Tooltip 配置
      window
        .$('\n  <div class="f2-tooltip">\n    <span></span>\n    <span></span>\n  </div>\n')
        .insertBefore("#container");

      const canvasOffsetTop = window.$("#container").position().top;
      const canvasOffsetLeft = window.$("#container").position().left;

      chart.tooltip({
        custom: true,
        showCrosshairs: false,
        onChange: function onChange(ev) {
          const tooltipEl = window.$(".f2-tooltip");
          const currentData = ev.items[0];
          const text = currentData.value;
          tooltipEl.html(
            ["<span>您的保障额度为" + currentData.origin.tem + "万元超过" + text + "%的同类人士。</span>"].join(""),
          );

          tooltipEl.css({
            opacity: 1,
            left: canvasOffsetLeft + currentData.x - tooltipEl.outerWidth() / 2 + "px",
            top: canvasOffsetTop + currentData.y - tooltipEl.outerHeight() - 15 + "px",
          });
        },
        onHide: function onHide() {
          const tooltipEl = window.$(".f2-tooltip");
          tooltipEl.css({
            opacity: 0,
          });
        },
        alwaysShow: true,
        showItemMarker: false,
        // onShow: function onShow(ev) {
        //   // const items = ev.items;
        //   // items[0].name = items[0].title;
        // },
        background: {
          // radius: 2,
          fill: "#FFB83D",
          padding: [5],
          width: 120,
        },
        tooltipMarkerStyle: {
          fill: "#ffffff",
          fontSize: 20,
          stroke: "#FFB83D",
          lineWidth: 4,
        },
      });

      chart
        .line()
        .position("time*tem")
        .shape("smooth")
        .style({
          stroke: "#FFB83D",
          lineWidth: 2,
        });
      chart
        .area()
        .position("time*tem")
        .color("l(90) 0:#FFB83D 0.5:#FEF880 1:#ffffff")
        .shape("smooth");
      chart
        .point()
        .position("time*tem")
        .shape("smooth")
        .size(2)
        // .size("type", type => {
        //   console.log("%c type>>>>>>>>>>>>>>>>>>>", "color:green;", type);
        //   // console.log("%c tem>>>>>>>>>>>>>>>>>>>", "color:green;", tem);
        //   // 回调函数
        //   if (type === true) {
        //     return 5;
        //   }
        //   return 1;
        // })
        .color("#ffffff")
        .style({
          stroke: "#FFB83D",
          lineWidth: 2,
        });
      chart.render();

      let showItem = ""; // 要展示 tooltip 的数据
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (d.type) {
          showItem = d;
        }
      }
      const point = chart.getPosition(showItem); // 获取该数据的画布坐标
      chart.showTooltip(point); // 展示该点的 tooltip
    },
    doChartZZT() {
      const data = [];
      for (let i = 1; i < 20; i++) {
        const aa = {
          name: "aa",
          mon: i,
          demoY: (Math.sin(i / 2) + i / 3) * 2,
        };
        data.push(aa);
      }
      var chart = new F2.Chart({
        id: "container-zzt",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data);

      chart
        .interval()
        .position("mon*demoY")
        .color("name")
        .adjust("stack");

      //绘制闪动点
      const isFlasArray = [3, 6, 7, 12, 14];
      isFlasArray.forEach(fl => {
        chart.guide().html({
          position: [data[fl].mon, data[fl].demoY],
          html: `<div class="f2-zzt"></div>`,
          alignX: "center",
          alignY: "bottom",
          offsetX: 1,
          offsetY: 3,
        });
      });

      chart.render();
    },
    doChartZZT02() {
      const linNum = 10; //警戒值
      const data = [];
      for (let i = 0; i < 20; i++) {
        const aa = {
          name: "bb",
          mon: i,
          demoY: (Math.sin(i / 1) + i / 3) * 4,
        };
        data.push(aa);
        // data.push({
        //   name: "bb",
        //   mon: i,
        //   demoY: linNum - aa.demoY > 0 ? linNum - aa.demoY : 0,
        // });
        // data.push({
        //   name: "cc",
        //   mon: i,
        //   demoY: linNum - aa.demoY > 0 ? linNum - aa.demoY : 0,
        // });
      }
      var chart = new F2.Chart({
        id: "container-zzt02",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data);

      chart
        .interval()
        .position("mon*demoY")
        .color("name")
        .adjust("stack");

      // chart
      //   .line()
      //   .position("mon*jy")
      //   .style({
      //     stroke: "#FFB83D",
      //     lineWidth: 2,
      //   });
      // chart.axis("jy", false);
      // chart.point().shape("jy"); // 使用字段映射到形状，使用内置的形状

      //绘制警戒线
      chart.guide().regionFilter({
        // 绘制区域过滤
        top: true,
        start(xScale, yScales) {
          console.log("%c xScale", "color:green;", xScale);
          console.log("%c yScales", "color:green;", yScales);
          return [2, 100]; // 位置信息
        },
        end: ["min", "min"],
        color: "black",
      });
      chart.guide().line({
        // 绘制辅助线
        start: ["min", linNum],
        end: ["max", linNum],
        style: {
          stroke: "#FF4D4F",
          lineDash: [2],
        },
      });
      chart.guide().text({
        // 绘制辅助文本
        position: ["max", linNum],
        content: `预警值：${linNum}`,
        offsetY: -5,
        style: {
          fill: "#FF4D4F",
          textAlign: "end",
          textBaseline: "bottom",
        },
      });

      chart.render();
    },
    doA() {
      const { Chart, Animate, Util, G } = F2;
      const anfun = function(shape, animateCfg) {
        // setInterval(() => {
        console.log("%c delayScaleInY", "color:green;", "");
        // const box = shape.getBBox(); // 获取图形的包围盒
        // const origin = shape.get("origin"); // 获取当前 shape 的绘制数据
        // const points = origin.points; // 获取柱子的各个顶点
        // const centerX = (box.minX + box.maxX) / 2;
        // let centerY;
        // if (points[0].y - points[1].y <= 0) {
        //   // 当顶点在零点之下
        //   centerY = box.maxY;
        // } else {
        //   centerY = box.minY;
        // }

        shape.transform([["s", 1.5, 1.5]]); // 进行矩阵变换，将 shape 的原始状态改变，y 方向缩小至 0.1 倍
        const index = shape.get("index");
        let delay = animateCfg.delay; // 获取动画配置
        if (Util.isFunction(delay)) {
          delay = animateCfg.delay(index); // 根据 shape 的索引设置不同的延迟时间
        }
        const easing = animateCfg.easing; // 获取动画配置

        const matrix = shape.getMatrix(); // 获取当前矩阵
        const endMatrix = G.Matrix.transform(matrix, [["s", 1, 1]]); // shape 最终状态下的矩阵

        shape.animate().to({
          attrs: {
            matrix: endMatrix,
          },
          delay,
          easing,
          duration: animateCfg.duration,
        }); // 执行动画
        // }, 2000);
      };
      // 注册函数名为 delayScaleInY 的自定义动画，实现柱子 y 轴方向的放大效果
      Animate.registerAnimation("delayScaleInY", anfun);

      const data = [];
      for (let i = 0; i < 50; i++) {
        data.push({
          x: i,
          y: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5,
        });
      }
      const chart = new Chart({
        id: "mountNode",
        pixelRatio: window.devicePixelRatio,
      });
      chart.axis("x", false);
      chart.legend(false);
      chart.source(data);
      chart
        .interval()
        .position("x*y")
        .color("red")
        .animate({
          // 进行自定义的动画配置
          appear: {
            animation: "delayScaleInY", // 使用上面注册过的动画 delayScaleInY，当然也可以使用回调函数
            easing: "elasticOut", // 定义缓动函数
            delay(index) {
              return index * 10;
            }, // 根据索引值为各个 shape 设置不同的动画延迟执行时间
          },
        });
      chart.render();
    },
  },
};
</script>

<style lang="stylus" scoped></style>

<style>
@keyframes scaleDraw {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.3); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.3);
  }
}
.f2-zzt {
  height: 12px;
  width: 12px;
  box-shadow: 0px 0px 11px #708ae8;
  background-color: #2837e4;
  border-radius: 100%;

  animation: scaleDraw 2s ease-in-out infinite;
}
.chart-wrapper {
  position: relative;
}
.f2-tooltip {
  /* -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3); */
  position: absolute;
  z-index: 99;
  background-color: #ffb83e;
  /* padding: 5px 0; */
  border-radius: 3px;
  /* text-align: center; */
  max-width: 120px;
  opacity: 0;
}
.f2-tooltip:after {
  content: " ";
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #ffb83e;
  position: absolute;
  left: 50%;
  margin-left: -6px;
  bottom: -8px;
}
.f2-tooltip span {
  display: block;
  color: #fff;
  line-height: 18px;
  margin: 0px -4px;
}
.f2-tooltip span:nth-child(1) {
  font-size: 12px !important;
  transform: scale(0.8);
}
.f2-tooltip span:nth-child(2) {
  font-size: 12px !important;
  transform: scale(0.8);
}
</style>
