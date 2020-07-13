<template>
  <div class="planbook-template planbook-template1">
    <!-- 顶部图片 -->
    <div class="bn-wrap header mb-23">
      <img src="../../assets/images/header.png" alt="综合保障方案" />
    </div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[人员信息及产品信息]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <person-message :proccessInforData="proccessInforData" :masterProData="masterProData"></person-message>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[人员信息及产品信息]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[保障结果]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="instype-result-wrap">
      <div class="instype-box">
        <img src="../../assets/images/cpts.png" />
      </div>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[保障结果]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[利益表]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="demon-wrap">
      <article class="demonstration-wrap">
        <div class="english-dx">DEMONSTRSTION</div>
        <div class="demonstration-title">
          <img src="../../assets/images/circle.png" /> 利益演示
          <img src="../../assets/images/circle.png" />
        </div>
        <section class="demonstration-container">
          <div class="bonus-wrap">
            <span class="jiazhi">
              <span>价值</span>
            </span>
            <span class="age">
              被保人
              <span>{{ selectIndex + 21 }}</span>
              周岁时
            </span>
          </div>
          <div class="explicit" v-for="(item, i) in gainExplicit" :key="i">
            <div>{{ item.title }}</div>
            <div>
              <span v-if="item.val1">{{ parseFloat(item.val1) + selectIndex }}%/</span>
              {{ parseFloat(item.val2) + selectIndex }}元
            </div>
          </div>
          <div class="slider">
            <div class="slider-btn minus" @click="sliderClick(-1)"></div>
            <div class="slider-btn plus" @click="sliderClick(1)"></div>
            <div class="runway-wrap">
              <div class="runway-inner">
                <n22-slider v-if="sliderMax > 0" v-model="selectIndex" :min="1" :max="sliderMax"></n22-slider>
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
    <tiao-kuan :masterProData="masterProData" @goWordShow="goWordShow"></tiao-kuan>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[条款]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[代理人]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <agent-message></agent-message>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[代理人]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[风险提示]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <risk-waring></risk-waring>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[风险提示]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Slider, Icon, Button } from "al-mobile";
import productDefObject from "../../assets/data/productDefObject";
import ProShow from "../ProShow";
import PersonMessage from "./PersonMessage";
import TiaoKuan from "./TiaoKuan";
import AgentMessage from "./AgentMessage";
import RiskWaring from "./RiskWaring";
import __code from "@@/utils/code/";
export default {
  name: "planbk-template1", //使用xx-xx-xx命名方式具体看操作文档
  props: {
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
    [ProShow.name]: ProShow, // 引入组件样例如此
    [Slider.name]: Slider,
    [Icon.name]: Icon,
    [Button.name]: Button,
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
    console.log("%c tableObj.tbody", "color:green;", this.tableObj.tbody);
    //获取利益演示表的html数据
    console.log("%c proposalBZ", "color:green;", this.$refs.proposalBZ);
    // for (let i = 0; i < this.$refs.proposalBZ.children.length; i++) {
    //   const p = this.$refs.proposalBZ.children[i];
    //   if (i == 0) {
    //     p.className = "product-name";
    //   } else if (p.innerHTML.indexOf("*$") > -1) {
    //     p.innerHTML = p.innerHTML.replace("*$", "");
    //     p.className = "description1";
    //   } else {
    //     p.className = "description2";
    //   }
    // }
    console.log("%c this.proccessInforData1111111", "color:green;", this.proccessInforDataProp);
    // this.proccessInforData = window.utils.insured.dealParamsFun(
    //   JSON.parse(JSON.stringify(this.proccessInforDataProp)),
    //   "",
    //   3
    // );
    console.log("%c this.proccessInforData2222222", "color:green;", this.proccessInforData);
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
      //主险信息-对象
      masterProData: [
        {
          name: "光大永明福运至尊年金保险",
          amount: 88888.88,
          premium: 88888.88,
          bxqj: "",
          jffs: "3年",
          jfqj: "10年交",
          isCheck: true,
          fjProData: [
            {
              isCheck: true,
              name: "光大永明福运至尊年金保险",
              amount: 888.88,
              premium: 888.88,
              bxqj: "",
              jffs: "3年",
              jfqj: "10年交",
            },
            {
              isCheck: true,
              name: "百万安康(2019版)医疗保险",
              amount: 888.88,
              premium: 888.88,
              bxqj: "",
              jffs: "3年",
              jfqj: "10年交",
            },
            {
              isCheck: true,
              name: "增利宝（庆典版）年金保险（万能型）",
              amount: 888.88,
              premium: 888.88,
              bxqj: "",
              jffs: "3年",
              jfqj: "10年交",
            },
            {
              isCheck: true,
              name: "无忧住院津贴",
              amount: 888.88,
              premium: 888.88,
              bxqj: "",
              jffs: "3年",
              jfqj: "10年交",
            },
            {
              isCheck: true,
              name: "附加投保人豁免保险费（加强版）重大疾病保险",
              amount: 888.88,
              premium: 888.88,
              bxqj: "",
              jffs: "3年",
              jfqj: "10年交",
            },
          ],
        },
      ],
      //附加险信息-数组
      fjProData: [],
      gainExplicit: [
        {
          title: "万能险账户价值(低档)",
          val1: "3",
          val2: "29223.89",
        },
        {
          title: "万能险账户价值(中档)",
          val1: "4",
          val2: "29223.89",
        },
        {
          title: "万能险账户价值(高档)",
          val1: "5",
          val2: "29223.89",
        },
        {
          title: "保险单年度末",
          val1: "",
          val2: "1年",
        },
        {
          title: "保险单年度末年龄",
          val1: "",
          val2: "23年",
        },
        {
          title: "当年度给付年金",
          val1: "",
          val2: "0.12",
        },
        {
          title: "累计给付年金",
          val1: "",
          val2: "0.12",
        },
        {
          title: "主险现金价值",
          val1: "",
          val2: "20000.00",
        },
        {
          title: "身故保险金",
          val1: "",
          val2: "20000.00",
        },
      ],
      proccessInforData: JSON.parse(JSON.stringify(productDefObject.processModal)),
      showTableObj: "", //页面展示的table数据
      selectIndex: 1, //选中的下标
      selectIndexr: 1, //选中的下标
      sliderMax: 120,
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
    goWordShow() {
      const outLink =
        "http://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdPre/product/termsPicture/NPT016.jpg";
      this.WORDSHOW({ title: "福运至尊 相伴人生", url: outLink });
      this.go("proposalBook/wordShow");
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
      this.selectIndex = this.selectIndex + step;
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
