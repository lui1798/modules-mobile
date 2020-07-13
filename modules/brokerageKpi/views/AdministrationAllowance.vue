<template>
  <div class="brokerageKpi-administration-allowance">
    <al-all-head></al-all-head>
    <al-content
      class="brokerageKpi-administration-allowance-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="canvas-content">
        <canvas id="lineChart" canvas-id="lineChart"></canvas>
      </div>
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div>直辖组管理津贴比例</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">14</div>
          </div>
        </div>
      </div>
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div>与上一档奋斗目标</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">FYC差额（元）</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">津贴差值（元）</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">津贴提高比例（%）</div>
            <div class="detail-table-title border-right">14</div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
import F2 from "@antv/f2";
import _ from "lodash";

const data = [
  {
    name: "London",
    月份: "Jan.",
    月均降雨量: 18.9,
  },
  {
    name: "London",
    月份: "Feb.",
    月均降雨量: 28.8,
  },
  {
    name: "London",
    月份: "Mar.",
    月均降雨量: 39.3,
  },
  {
    name: "London",
    月份: "Apr.",
    月均降雨量: 81.4,
  },
  {
    name: "London",
    月份: "May.",
    月均降雨量: 47,
  },
  {
    name: "London",
    月份: "Jun.",
    月均降雨量: 20.3,
  },
  {
    name: "London",
    月份: "Jul.",
    月均降雨量: 24,
  },
  {
    name: "London",
    月份: "Aug.",
    月均降雨量: 35.6,
  },
  {
    name: "Berlin",
    月份: "Jan.",
    月均降雨量: 12.4,
  },
  {
    name: "Berlin",
    月份: "Feb.",
    月均降雨量: 23.2,
  },
  {
    name: "Berlin",
    月份: "Mar.",
    月均降雨量: 34.5,
  },
  {
    name: "Berlin",
    月份: "Apr.",
    月均降雨量: 99.7,
  },
  {
    name: "Berlin",
    月份: "May.",
    月均降雨量: 52.6,
  },
  {
    name: "Berlin",
    月份: "Jun.",
    月均降雨量: 35.5,
  },
  {
    name: "Berlin",
    月份: "Jul.",
    月均降雨量: 37.4,
  },
  {
    name: "Berlin",
    月份: "Aug.",
    月均降雨量: 42.4,
  },
];
export default {
  name: "bkge-examine-administration-allowance", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c administration-allowance>生命周期>mounted", "color:green;", "");
    this.draw();
  },
  create() {
    // this.draw();
  },
  watch: {},
  data() {
    return {
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    draw() {
      const chart = new F2.Chart({
        id: "lineChart",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data, {
        月均降雨量: {
          tickCount: 5,
        },
      });
      chart.coord({
        transposed: true,
      });
      chart.legend({
        align: "center",
        itemWidth: null, // 图例项按照实际宽度渲染
        position: "top",
        marker: "square",
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get("legendController").legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function(item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function(item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get("legendController").legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        },
      });
      chart
        .interval()
        .position("月份*月均降雨量")
        .color("name")
        .adjust("stack");
      // console.log("绘图了");
      chart.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-administration-allowance {
  .brokerageKpi-administration-allowance-content {
    .canvas-content {
      width: 100%;
      height: 254px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    .content-detail {
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      padding: 14px 0 20px 14px;
      .detail-title {
        height: 22px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: rgba(253, 185, 44, 1);
        padding-bottom: 8px;
        .detail-title-icon {
          width: 5px;
          height: 12px;
          background: rgba(253, 185, 44, 1);
          border-radius: 3px;
          margin-right: 7px;
        }
      }
      .detail-table-content {
        width: 100%;
        display: flex;
        .detail-table {
          display: flex;
          flex-direction: column;
          .detail-table-title {
            width: 116px;
            height: 35px;
            box-sizing: border-box;
            font-size: 10px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            border: 1px solid rgba(213, 213, 213, 1);
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .border-right {
            border-right: 1px solid rgba(213, 213, 213, 1);
          }
          :first-child {
            background: rgba(255, 251, 244, 1);
            font-size: 10px;
            border-bottom: none;
          }
        }
      }
    }
    .margin-top {
      margin-top: 10px;
    }
  }
}
</style>
