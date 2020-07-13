<template>
  <div class="person-pro">
    <div class="insured-total">
      <div class="item cell-box" v-for="(item, i) in [proccessInforData.insurant]" :key="i">
        <div class="cell-hd">被保人{{ i === 0 ? "" : i }}</div>
        <div class="cell-bd">
          <span>{{ item.sex | codeFilter("sex") }} {{ item.age }}岁</span>
        </div>
      </div>
      <div class="item cell-box">
        <div class="cell-hd">首年保费</div>
        <div class="cell-bd">
          <span>{{ proccessInforData.premiumInfo.premium }}元</span>
        </div>
      </div>
      <div class="item cell-box">
        <div class="cell-hd">积分</div>
        <div class="cell-bd">
          <span>{{ proccessInforData.score }}</span>
        </div>
      </div>
    </div>
    <div class="plan-pro-table">
      <div @click="scrollClick('left')" class="iconfont icon-arrows_left" v-if="showLeftArr && tableTitle.length > 4">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
      <div
        @click="scrollClick('right')"
        class="iconfont icon-arrows_right"
        v-if="showRightArr && tableTitle.length > 4"
      >
        <n22-icon name="right_arrow"></n22-icon>
      </div>
      <div
        id="instable"
        class="instable"
        ref="instable"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @touchend="touchend"
      >
        <proposal-book-pro-show
          id="proShow"
          ref="proShow"
          :class="[tableTitle.length > 4 ? 'tran-cl' : '']"
          :style="{ width: tableTitle.length > 4 ? `${dealPxToVw(455)}vw` : 'auto' }"
          v-if="masterProData.length > 0"
          :tableTitle="tableTitle"
          :masterProData="masterProData"
          :showLength="isShowDetail ? 9999 : 2"
          :length="proDataList.length"
        >
          <template #three="{item}"> {{ item.insure }}/{{ item.pay }} </template>
          <template #four="{item}">
            {{ item.premium }}
          </template>
        </proposal-book-pro-show>
      </div>
      <a v-if="checkIsShowToggle" @click="isShowDetail = !isShowDetail" class="toggle-desc toggle-table">
        <span>{{ isShowDetail ? "收起明细" : "展开明细" }}</span>
        <span class="svg_icon" :class="isShowDetail ? 'is_show_detail' : 'is_show_detail_close'">
          <n22-icon name="right_arrow"></n22-icon>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from "al-mobile";
import ProShow from "../ProShow";
import __code from "@@/utils/code/";
// import _concat from "lodash/concat";
// import _cloneDeep from "lodash/cloneDeep";
// import _guide from "@@/utils/tool/guide";

export default {
  name: "tiao-kuan",
  components: {
    [ProShow.name]: ProShow, // 引入组件样例如此
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  computed: {
    checkIsShowToggle() {
      for (let index = 0; index < this.masterProData.length; index++) {
        let ma = this.masterProData[index];
        if (ma.product && ma.product.length > 2) {
          return true;
        }
      }
      return false;
    },
  },
  filters: {
    codeFilter(value, codeType, fieldType) {
      return __code.getCodeTextOrVal(value, codeType, undefined, undefined, fieldType);
    },
    // productCodeFilter(value, codeType) {
    //   return __code.getProductCodeData("filter", "", value, codeType, undefined, undefined);
    // },
  },
  data() {
    return {
      isShowDetail: false, //产品数组是否展开
      showLeftArr: false, //产品详情左侧箭头
      showRightArr: true, //产品详情右侧箭头
      proDataList: [],
      tableTitle: ["投保险种", "保额", "保险期/交费期", "首年保费"],
      positionX: 0,
      transformX: 0,
      pageX: 0,
    };
  },
  props: {
    proccessInforData: {
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    masterProData: {
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    // let masterProData = _cloneDeep(this.masterProData);
    for (let index = 0; index < this.masterProData.length; index++) {
      let ma = this.masterProData[index];
      for (let f = 0; f < ma.product.length; f++) {
        const fj = ma.product[f];
        // if (fj.productCode === "FJ002" && fj.isCheck) {
        //   this.tableTitle = ["投保险种", "保额", "保险期/交费期", "首年保费", "保障计划", "职业类别"];
        //   break;
        // }
        this.proDataList.push(fj);
      }
      // this.proDataList.push(ma);
      // this.proDataList = _concat(this.proDataList, ma.fjProData);
    }
    // setTimeout(() => {
    //   _guide.singleGuide("温馨提示", "fsfsf", "#testaaaa");
    // }, 1000);
  },
  methods: {
    // testaaaa() {
    //   _guide.singleGuide("温馨提示", "fsfsf", "#instable");
    // },
    scrollClick(type) {
      let transformStr = this.$refs.proShow.$el.style.transform;
      transformStr = transformStr.substring(11);
      let index = transformStr.lastIndexOf("p");
      transformStr = transformStr.substring(0, index);
      let transformX = parseInt(transformStr);
      if (type === "left") {
        this.moveFun(transformX + 10);
      } else if (type === "right") {
        this.moveFun(transformX - 10);
      }
    },
    touchstart(event) {
      if (event.targetTouches.length == 1) {
        let touch = event.targetTouches[0];
        this.positionX = touch.pageX;
        //确定本次拖动transform的初始值
        var transformStr = this.$refs.proShow.$el.style.transform;
        transformStr = transformStr.substring(11);
        var index = transformStr.lastIndexOf("p");
        transformStr = transformStr.substring(0, index);
        this.transformX = parseInt(transformStr);
      }
    },
    touchmove(event) {
      //阻止其他事件
      // event.preventDefault();
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        // console.log("%c touch.pageX", "color:#00CD00", touch.pageX);
        // console.log("%c thisWidth+positionX-touch.pageX", "color:#00CD00", 351 + this.positionX - touch.pageX);
        this.moveFun(this.transformX + touch.pageX - this.positionX);
      }
    },
    touchend() {
      let transformStr = this.$refs.proShow.$el.style.transform;
      transformStr = transformStr.substring(11);
      let index = transformStr.lastIndexOf("p");
      transformStr = transformStr.substring(0, index);
      let transformX = parseInt(transformStr);
      this.$refs.proShow.$el.style.transitionDuration = "800ms";
      this.moveFun(transformX, true);
    },
    moveFun(pageX, mend) {
      const x = pageX;
      const maxX = this.$refs.proShow.$el.offsetWidth - this.$refs.instable.offsetWidth;
      // console.log("%c x", "color:#00CD00", x);
      if (x >= 0) {
        this.showLeftArr = false;
        this.showRightArr = true;
        if (mend) {
          this.$refs.proShow.$el.style.transform = "translateX(" + 0 + "px)";
          setTimeout(() => {
            this.$refs.proShow.$el.style.transitionDuration = "0ms";
          }, 800);
        }
      } else if (x < 0) {
        this.showLeftArr = true;
        if (x <= -maxX) {
          this.showRightArr = false;
          if (mend) {
            this.$refs.proShow.$el.style.transform = "translateX(" + -maxX + "px)";
            setTimeout(() => {
              this.$refs.proShow.$el.style.transitionDuration = "0ms";
            }, 800);
          }
        } else {
          this.showRightArr = true;
        }
      }
      !mend && (this.$refs.proShow.$el.style.transform = "translateX(" + x + "px)");
    },
  },
};
</script>

<style lang="scss" scoped>
.person-pro {
  .tran-cl {
    transition-duration: 0ms;
    transform: translateX(0px);
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  width: 94.667%;
  margin: 0 auto;
  margin-bottom: 10px;
  .insured-total {
    display: flex;
    padding: 30px 15px 5px;
    text-align: center;
    .item {
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }
    .cell-hd {
      color: #999;
      font-size: 14px;
      line-height: 22px;
      flex: 1;
    }
    .cell-bd {
      font-size: 18px;
      line-height: 21px;
      font-weight: 500;
      > span {
        font-weight: 600;
        color: $theme-color;
      }
    }
  }
  // 表格
  .plan-pro-table {
    padding-bottom: 17px;
    .iconfont {
      z-index: 1;
      position: absolute;
      top: 50%;
      // margin-top: 5px;
      .n22-icon {
        color: #ccc;
      }
    }
    .icon-arrows_left {
      left: 0;
      transform: rotate(180deg);
    }
    .icon-arrows_right {
      right: 0;
    }
    ::v-deep .ph-area {
      color: #333333;
      .ph-area-header {
        background-color: #f2f2f2;
        span {
          width: 22%;
          font-size: 12px;
        }
        span:first-child {
          width: 30%;
        }
        span:nth-child(3) {
          width: 26%;
        }
      }
      .ph-area-data {
        div {
          div {
            display: flex;
            width: 22%;
          }
          div:first-child {
            width: 30%;
          }
          div:nth-child(3) {
            width: 26%;
          }
        }
      }
    }
  }
}
.instable {
  overflow: hidden;
  margin: 0 20px;
}
</style>
