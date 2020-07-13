<template>
  <div
    :class="[
      'planbook-template',
      $route.query.isShare == 2 ? 'bottom-height-share' : 'bottom-height',
      platform == 'ios' ? 'bottom-height-ios' : 'bottom-height-android',
    ]"
    :style="{ background: proposalBookData.backgroundColor }"
  >
    <!-- 顶部图片 -->
    <div class="bn-wrap header mb-23">
      <img v-lazy="`//${proposalBookData.backgroundImage}`" alt="综合保障方案" />
      <!-- <img src="../../assets/images/ls-pro-ts.png" alt="综合保障方案" /> -->
    </div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[人员信息及产品信息]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <person-message :proccessInforData="proposalBookData" :masterProData="masterProData"></person-message>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[人员信息及产品信息]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[按险种展示]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="con-wrap" v-for="(master, i) in proposalBookData.dutyFamilies" :key="i">
      <article class="conditions-wrap">
        <div class="english-dx">CONDITIONS</div>
        <div class="conditions-title">
          <img src="../../assets/images/circle.png" /> {{ master.nameAbbr }}
          <img src="../../assets/images/circle.png" />
        </div>
        <div v-for="(pro, pi) in master.productDuties" :key="pi">
          <div class="conditions-container">
            <div>
              <span></span>
              <div class="pro-name">{{ pro.name }}</div>
            </div>
            <n22-button @click="goWordShow(pro)" type="default" size="small" round>条款</n22-button>
          </div>
          <div class="conditions-container" v-for="(desc, di) in pro.duties" :key="di">
            <div class="tk-desc-circle">
              <span class="circle"></span>
              <div v-html="desc"></div>
              <!-- <div class="tk-desc" v-html="desc.desc"></div>
              <div class="tk-desc2">{{ desc.desc2 }}</div> -->
            </div>
          </div>
          <div class="line" v-if="pi + 1 !== master.productDuties.length"></div>
        </div>
        <!-- <div class="conditions-container">
          <div>
            <span></span>
            <div class="pro-name">{{ master.name }}</div>
          </div>
          <n22-button @click="goWordShow" type="default" size="small" round>条款</n22-button>
        </div> -->
      </article>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[按险种展示]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[利益表]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="demon-wrap">
      <article class="demonstration-wrap">
        <div class="english-dx">DEMONSTRSTION</div>
        <div class="demonstration-title">
          <img src="../../assets/images/circle.png" /> 利益演示
          <img src="../../assets/images/circle.png" />
        </div>
        <section class="demonstration-container" v-if="benefitArray.length > 0">
          <div v-if="benefitArray.length === 1" class="one-pro">{{ benefitArray[0].nameAbbr }}</div>
          <n22-tab-bar
            v-else
            v-model="selectMasterIndex"
            @change="changeTabBar"
            :ink-length="29"
            textKey="nameAbbr"
            :items="benefitArray"
          />
          <div class="bonus-wrap">
            <span class="age">
              被保人
              <span>{{ selectIndex + proposalBookData.insurant.age }}</span>
              周岁时保单利益如下：
            </span>
          </div>
          <div class="button-arr" v-if="benefitArray[selectMasterIndex].multiLevel">
            <n22-button @click="zdgButton = 1" type="warning" :plain="zdgButton !== 1" inline
              >3.00%<br />低档利率</n22-button
            >
            <n22-button @click="zdgButton = 2" type="warning" :plain="zdgButton !== 2" inline
              >4.5%<br />中档利率</n22-button
            >
            <n22-button @click="zdgButton = 3" type="warning" :plain="zdgButton !== 3" inline
              >6.00%<br />高档利率</n22-button
            >
          </div>
          <div class="explicit" v-for="(item, i) in benefitArray[selectMasterIndex].title" :key="i">
            <div style="max-width: 80%">{{ item[0].replace("：", "") }}</div>
            <!-- <div style="margin: auto 0;"> -->
            <div>
              <!-- <span v-if="item.val1">{{ parseFloat(item.val1) + selectIndex + zdgButton }}%/</span>
              {{ parseFloat(item.val2) + selectIndex + zdgButton }}元 -->
              {{ benefitArray[selectMasterIndex].arrayData[selectIndex][i] }}
              {{
                item[0].indexOf("保险单年度末") > -1
                  ? "年"
                  : benefitArray[selectMasterIndex].arrayData[selectIndex][i]
                  ? "元"
                  : ""
              }}
            </div>
          </div>
          <div class="slider">
            <div class="slider-btn minus" @click="sliderClick(-1)"></div>
            <div class="slider-btn plus" @click="sliderClick(1)"></div>
            <div class="runway-wrap">
              <div class="runway-inner">
                <transition name="n22-fade">
                  <n22-slider
                    v-if="sliderMax > 0 && isShowSlider"
                    v-model="selectIndex"
                    :min="0"
                    :max="sliderMax"
                  ></n22-slider>
                </transition>
              </div>
            </div>
          </div>
          <div class="slider-tips">
            <span>拖动按钮查看不同年龄段保单利益</span>
          </div>
        </section>
      </article>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[利益表]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[条款]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <tiao-kuan :data="proposalBookData.terms" @goWordShow="goWordShow"></tiao-kuan>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[条款]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[代理人]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <agent-message :data="proposalBookData.agentInfo"></agent-message>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[代理人]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[风险提示]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <risk-waring :proposalBookData="proposalBookData"></risk-waring>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[风险提示]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Slider, Button, TabBar } from "al-mobile";
// import productDefObject from "../../assets/data/productDefObject";
import PersonMessage from "./PersonMessage";
import TiaoKuan from "./TiaoKuan";
import AgentMessage from "./AgentMessage";
import RiskWaring from "./RiskWaring";
import __code from "@@/utils/code/";
export default {
  name: "planbk-template2", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    proposalBookData: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    proccessInforDataProp: {
      type: [Object, Array],
      default: () => {
        return [];
      },
    },
    proposalBZ: {
      type: [String, Object, Array],
      default: "",
    },
    tableObj: {
      //table转化后的数据对象
      //table数据
      type: [Object, String],
      default: () => {
        return {
          thead: [],
          tbody: [],
          columns: [],
          merge: [],
        };
      },
    },
  },
  components: {
    [Slider.name]: Slider,
    [Button.name]: Button,
    [TabBar.name]: TabBar,
    PersonMessage,
    TiaoKuan,
    AgentMessage,
    RiskWaring,
  },
  computed: {
    ...mapState(["insured"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    dealMove() {
      return val => {
        return this.dealPxToVw(val * (225 / (this.sliderMax - 1))) + "vw";
      };
    },
    sorts() {
      return val => {
        return val;
        // return window.utils.utilsPlugin.insertSort(val, "isMaster");
      };
    },
  },
  filters: {
    productCodeFilter(value, codeType) {
      return __code.getProductCodeData("filter", "", value, codeType, undefined, undefined);
    },
  },
  mounted() {
    console.log("%c masterProData", "color:green;", this.masterProData);
    this.proposalBookData.benefitFamilies.forEach((ma, mi) => {
      let master = ma;
      if (master.singleLevel && master.singleLevel.length > 0) {
        const rowls = master.singleLevel.length - 1;
        const row = master.singleLevel[rowls].length;
        master.title = master.singleLevel.slice(0, row);
        master.arrayData = master.singleLevel.slice(row, rowls + 1);
        mi === 0 && (this.sliderMax = parseInt(master.arrayData.length) - 1);
      }
      this.benefitArray.push(master);
    });
    console.log("%c this.benefitArray", "color:#00CD00", this.benefitArray);
  },
  watch: {
    selectIndex(newVal) {
      this.selectIndexr = newVal + 28;
      this.selectYear();
    },
    selectIndexr(newVal) {
      this.selectIndex = newVal - 28;
      this.selectYear();
    },
    // "tableObj.tbody": {
    //   handler(newVal,oldVal) {
    //     if(newVal&&newVal.length>0){
    //       this.sliderMax=newVal.length;
    //       this.selectYear();
    //     }
    //   },
    //   deep: true
    // },
    // proccessInforDataProp: {
    //   handler(newVal,oldVal) {
    //     if(newVal&&newVal!=[]){
    //       console.log('%c this.proccessInforData1111111','color:green;',this.proccessInforData);
    //       this.proccessInforData = utils.insured.dealParamsFun(this.proccessInforDataProp,"",3);
    //       console.log('%c this.proccessInforData2222222','color:green;',this.proccessInforData);;
    //     }
    //   },
    //   deep: true
    // }
  },
  data() {
    return {
      //利益演示对象数组
      benefitArray: [],
      selectMasterIndex: 0,
      //主险信息-对象
      masterProData: this.value,
      //附加险信息-数组
      zdgButton: 1,
      showTableObj: "", //页面展示的table数据
      selectIndex: 0, //选中的下标
      selectIndexr: 1, //选中的下标
      sliderMax: 120, //利益演示最大年度
      isShowSlider: true, //利益演示最大年度
      isShowDetailSel: false, //利益下拉是否展开
      // quantity: 25,
      scope: [0, 120],
      buttonArray: [
        //底部按钮组
        {
          text: "生成计划书",
          onClick: () => {},
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORDSHOW",
    ]),
    changeTabBar(item, index) {
      console.log("%c index>>>>>>>>>>>>>>>>>>", "color:green;", index);
      this.isShowSlider = false;
      this.sliderMax = parseInt(this.benefitArray[index].arrayData.length) - 1;
      if (this.selectIndex > this.sliderMax) {
        this.selectIndex = 0;
      }
      setTimeout(() => {
        this.isShowSlider = true;
      }, 200);
      console.log("%c this.sliderMax", "color:green;", this.sliderMax);
    },
    goWordShow(tk) {
      const outLink = `//${tk.terms}`;
      this.WORDSHOW({ title: tk.name, url: outLink });
      this.go("/proposalBook/wordShow", { isPdf: true });
    },
    seePlanbkTb() {
      //弹出利益演示
      this.$emit("isPopupShowF", true);
    },
    selectYear() {
      //下拉选择保单年度
      // console.log('%c selectYear','color:green;',"");
      this.showTableObj = {
        p_1: 1,
        p_2: 1000,
      };
    },
    sliderClick(step) {
      //slider的按钮加减点击
      if ((this.selectIndex < this.sliderMax && step > 0) || (this.selectIndex > 0 && step < 0)) {
        this.selectIndex = this.selectIndex + step;
      }
    },
    stepTextRender(step) {
      return step + "岁";
    },
    move(e) {
      console.log("%c touchmove", "color:green;", e);
    },
    down() {
      console.log("%c touchmove", "color:green;", "down");
    },
    end() {
      console.log("%c touchmove", "color:green;", "end");
    },
  },
};
</script>

<style lang="scss">
@import "./css/toggle-desc";
@import "./css/planbook-template";
</style>

<style lang="scss" scoped>
.one-pro {
  text-align: center;
  margin: 10px;
  font-size: 14px;
  color: #666666;
}
.demonstration-container {
  .n22-tab-bar {
    z-index: 90 !important;
  }
}
</style>
