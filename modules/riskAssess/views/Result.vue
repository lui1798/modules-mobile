<template>
  <div class="riskAssess-result">
    <al-all-head hairline></al-all-head>
    <al-content
      class="riskAssess-result-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="head-con">
        <div class="assets-actionBg"></div>
        <img class="assets-title" src="../assets/images/风险等级评估结果.png" />
        <div class="assets-color" />
        <img class="assets-entryPic" src="../assets/images/head02.png" />
        <img class="assets-item" src="../assets/images/head_bg.png" />
      </div>
      <div class="block_3" v-for="(item, i) in riskArray" :key="i">
        <div class="top-con">
          <div class="outer" @click="toogle(item, i)">
            <div class="color" :style="{ width: `${dealPxToVw(18 * item[0].length)}vw` }" />
            <span class="word">{{ item[0] }}</span>
            <div :class="['all_toogle', item[4] ? 'toogle-down' : '']">
              <!-- <img class="toogle" src="../assets/images/up.png" /> -->
              <n22-icon name="right_arrow" size="sm"></n22-icon>
            </div>
          </div>
        </div>
        <div class="content">
          <transition name="n22-fade-down">
            <div class="txt" v-show="item[4]">
              {{ item[1] }}
            </div>
          </transition>
          <!-- <div v-if="i === 0" style="position:relative">
            <canvas id="container" style="width:100%;"></canvas>
          </div> -->
          <img :src="require(`../assets/images/chart-demo${0 + 1}.png`)" />
          <div class="bz_block_2">
            <div class="bz_block">
              <span class="bz_word">保障类型：</span>
              <span class="bz_text">{{ item[2] }}</span>
            </div>
            <div class="bz_group_2">
              <span class="bz_word">保障缺口：</span>
              <span class="bz_text">{{ item[3] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="block_15">
        <div class="group_11">
          <span class="word_5">测 评</span>
          <span class="text_5">结 果</span>
          <span class="txt_7">汇 总</span>
        </div>
        <div class="gap_contain">
          <div class="all_gap">总保障缺口：1890000</div>
          <div class="gap">
            <div class="gap_area">
              <div class="money">630000</div>
              <div class="gap_title">疾病保障缺口</div>
            </div>
            <div class="gap_area">
              <div class="money">1060000</div>
              <div class="gap_title">身故保障缺口</div>
            </div>
            <div class="gap_area">
              <div class="money">200000</div>
              <div class="gap_title">子教保障缺口</div>
            </div>
          </div>
        </div>
        <!-- <span class="article"
          >疾病风险保障的规划，应确保保障额度能够基本覆盖重疾来临时将导致的巨额医疗费用、长期康复费用、长期护理费用以及收入损失费用，才能保证疾病风险来临时的从容不迫。</span
        > -->
      </div>
      <div class="assets-ft">
        <n22-button class="left-button" @click="create" type="primary">生成报告</n22-button>
        <n22-button class="right-button" @click="next" type="primary">保障计划</n22-button>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, Icon } from "al-mobile";
// import F2 from "@antv/f2";
export default {
  name: "risk-assess-result", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c result>生命周期>mounted", "color:green;", "");
    // this.doChart();
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
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      riskArray: [
        [
          "疾病风险测评结果",
          "身故风险保障的规划，一方面需要保证保障额度覆盖房贷、车贷等家庭负债，才能保证风险来临时不会因为收入中断、无法偿还债务造成的损失；另一方面，还应保障额度足以覆盖子女教育、家庭生活、父母赡养等家庭生活支出，确保即便风险来临也能尽到自己的家庭责任。",
          "疾病保障",
          630000,
        ],
        [
          "身故风险测评结果",
          "意外风险保障应首先保证保障范围的全面，保障包括一般意外、交通意外、意外医疗、意外住院等常见的意外风险。建议意外风险保障额度至少达到预期10年的总收入或能覆盖未来家庭支出和债务负担。",
          "身故保障",
          1060000,
        ],
        [
          "子女教育金",
          "希望为子女未来的教育费用准备足够的教育金，需要根据相应的需求预先做好储蓄类规划。根据资产、投资、期望收入、子女的升学费用及时点确定。",
          "子教保障",
          200000,
        ],
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    // doChart() {
    //   const data = [
    //     {
    //       time: "1",
    //       tem: 30,
    //       type: false,
    //     },
    //     {
    //       time: "5",
    //       tem: 20,
    //       type: false,
    //     },
    //     {
    //       time: "10",
    //       tem: 50,
    //       type: false,
    //     },
    //     {
    //       time: "15",
    //       tem: 25,
    //       type: false,
    //     },
    //     {
    //       time: "20",
    //       tem: 63,
    //       type: true,
    //     },
    //     {
    //       time: "25",
    //       tem: 40,
    //       type: false,
    //     },
    //     {
    //       time: "30",
    //       tem: 80,
    //       type: false,
    //     },
    //     {
    //       time: "31",
    //       tem: 50,
    //       type: false,
    //     },
    //     {
    //       time: "32",
    //       tem: 49,
    //       type: false,
    //     },
    //     {
    //       time: "33",
    //       tem: 30,
    //       type: false,
    //     },
    //     {
    //       time: "35",
    //       tem: 35,
    //       type: false,
    //     },
    //   ];

    //   const chart = new F2.Chart({
    //     id: "container",
    //     pixelRatio: window.devicePixelRatio,
    //   });

    //   const defs = {
    //     // time: {
    //     //   tickCount: 5,
    //     //   range: [0, 1],
    //     // },
    //     tem: {
    //       tickCount: 10,
    //       min: 0,
    //       alias: "您的保障额度为",
    //     },
    //   };
    //   chart.source(data, defs);
    //   chart.axis(false);
    //   // chart.axis("time", {
    //   //   label: function label(text, index, total) {
    //   //     const textCfg = {};
    //   //     if (index === 0) {
    //   //       textCfg.textAlign = "left";
    //   //     } else if (index === total - 1) {
    //   //       textCfg.textAlign = "right";
    //   //     }
    //   //     return textCfg;
    //   //   },
    //   // });
    //   // Tooltip 配置
    //   window
    //     .$('\n  <div class="f2-tooltip">\n    <span></span>\n    <span></span>\n  </div>\n')
    //     .insertBefore("#container");

    //   const canvasOffsetTop = window.$("#container").position().top;
    //   const canvasOffsetLeft = window.$("#container").position().left;

    //   chart.tooltip({
    //     custom: true,
    //     showCrosshairs: false,
    //     onChange: function onChange(ev) {
    //       const tooltipEl = window.$(".f2-tooltip");
    //       const currentData = ev.items[0];
    //       const text = currentData.value;
    //       tooltipEl.html(
    //         ["<span>您的保障额度为" + currentData.origin.tem + "万元超过" + text + "%的同类人士。</span>"].join(""),
    //       );

    //       tooltipEl.css({
    //         opacity: 1,
    //         left: canvasOffsetLeft + currentData.x - tooltipEl.outerWidth() / 2 + "px",
    //         top: canvasOffsetTop + currentData.y - tooltipEl.outerHeight() - 15 + "px",
    //       });
    //     },
    //     onHide: function onHide() {
    //       const tooltipEl = window.$(".f2-tooltip");
    //       tooltipEl.css({
    //         opacity: 0,
    //       });
    //     },
    //     alwaysShow: true,
    //     showItemMarker: false,
    //     // onShow: function onShow(ev) {
    //     //   // const items = ev.items;
    //     //   // items[0].name = items[0].title;
    //     // },
    //     background: {
    //       // radius: 2,
    //       fill: "#FFB83D",
    //       padding: [5],
    //       width: 120,
    //     },
    //     tooltipMarkerStyle: {
    //       fill: "#ffffff",
    //       fontSize: 20,
    //       stroke: "#FFB83D",
    //       lineWidth: 4,
    //     },
    //   });

    //   chart
    //     .line()
    //     .position("time*tem")
    //     .shape("smooth")
    //     .style({
    //       stroke: "#FFB83D",
    //       lineWidth: 2,
    //     });
    //   chart
    //     .area()
    //     .position("time*tem")
    //     .color("l(90) 0:#FFB83D 0.5:#FEF880 1:#ffffff")
    //     .shape("smooth");
    //   chart
    //     .point()
    //     .position("time*tem")
    //     .shape("smooth")
    //     .size(2)
    //     // .size("type", type => {
    //     //   console.log("%c type>>>>>>>>>>>>>>>>>>>", "color:green;", type);
    //     //   // console.log("%c tem>>>>>>>>>>>>>>>>>>>", "color:green;", tem);
    //     //   // 回调函数
    //     //   if (type === true) {
    //     //     return 5;
    //     //   }
    //     //   return 1;
    //     // })
    //     .color("#ffffff")
    //     .style({
    //       stroke: "#FFB83D",
    //       lineWidth: 2,
    //     });
    //   chart.render();

    //   let showItem = ""; // 要展示 tooltip 的数据
    //   for (let i = 0; i < data.length; i++) {
    //     const d = data[i];
    //     if (d.type) {
    //       showItem = d;
    //     }
    //   }
    //   const point = chart.getPosition(showItem); // 获取该数据的画布坐标
    //   chart.showTooltip(point); // 展示该点的 tooltip
    // },
    toogle(item, i) {
      console.log("%c ", "color:#00CD00", item[4]);
      if (item[4]) {
        item[4] = false;
      } else {
        item[4] = true;
      }
      this.$set(this.riskArray, i, this.riskArray[i]);
    },
    create() {
      this.$dialog.alert({
        title: "提示",
        content: "功能暂未开放，敬请期待",
        confirmText: "确定",
      });
    },
    next() {
      this.go("riskAssess/ensurePlan");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/title.scss";
.riskAssess-result {
  .riskAssess-result-content {
    .content {
      margin: 17px 10px 10px 10px;
      .txt {
        line-height: 17px;
        color: #333333;
        font-size: 12px;
        font-weight: 400;
        background-color: #fff7e9;
        padding: 10px;
        border-radius: 5px;
      }
      img {
        width: 100%;
        margin-top: 15px;
      }
      .bz_block_2 {
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
        height: 20px;
        .bz_block {
          display: flex;
          align-items: center;
          flex-direction: row;
          height: 20px;
        }

        .bz_word {
          opacity: 1;
          max-width: 100px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          white-space: nowrap;
          color: #333333;
          font-size: 14px;
          font-weight: 500;
        }

        .bz_text {
          opacity: 1;
          max-width: 80px;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          white-space: nowrap;
          color: #ffb83d;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
    .block_15 {
      margin: 16px 10px;
      display: flex;
      position: relative;
      align-items: center;
      flex-direction: row;
      margin-top: 19px;
      border-radius: 10px;
      background-color: #ffffff;
      width: 350px;
      height: 107px;
      .all_gap {
        text-align: center;
        margin-top: 10px;
        font-size: 15px;
        color: #ffb83d;
      }
      .gap {
        display: flex;
        .gap_area {
          margin: 15px 6px;
          text-align: center;
          .money {
            font-size: 15px;
          }
          .gap_title {
            margin-top: 6px;
            font-size: 12px;
            color: #b4b4b4;
          }
        }
      }
    }

    .group_11 {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 13px;
      margin-left: 15px;
      border-top-left-radius: 16px;
      border-bottom-right-radius: 17px;
      background-color: #ffb83d;
      width: 56px;
      height: 75px;
    }

    .word_5 {
      position: relative;
      opacity: 1;
      margin-top: 7px;
      line-height: 20px;
      white-space: pre;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    }

    .text_5 {
      position: relative;
      opacity: 1;
      line-height: 20px;
      white-space: pre;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    }

    .txt_7 {
      position: relative;
      opacity: 1;
      line-height: 20px;
      white-space: pre;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    }

    // .article {
    //   opacity: 1;
    //   width: 240px;
    //   height: 68px;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   line-height: 17px;
    //   color: #4a4a4a;
    //   font-size: 12px;
    //   font-weight: 400;
    // }
    .assets-ft {
      width: 320px;
    }
    .left-button {
      width: 136px;
      float: left;
    }
    .right-button {
      width: 136px;
      float: right;
    }
  }
}
</style>

<style>
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
