<template>
  <div class="planbook">
    <!-- 顶部图片 -->
    <div class="bn-wrap header mb-23">
      <img src="../../assets/images/header.png" alt="综合保障方案" />
    </div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[人员信息及产品信息]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="person-pro">
      <div class="insured-total">
        <div class="item cell-box" v-for="(item, i) in proccessInforData.insureList" :key="i">
          <div class="cell-hd">被保人{{ i === 0 ? "" : i }}</div>
          <div class="cell-bd">
            <span>{{ item.insuredSex | codeFilter("sex") }} {{ item.insuredBirthDate | codeFilter("age") }}岁</span>
          </div>
        </div>
        <div class="item cell-box">
          <div class="cell-hd">首年保费</div>
          <div class="cell-bd">
            <span>888.88元</span>
          </div>
        </div>
      </div>
      <div class="plan-pro-table">
        <div class="instable">
          <proposal-book-pro-show
            :tableTitle="['投保险种', '保额', '保险期/交费期', '首年保费']"
            :masterProData="masterProData"
            :fjProData="fjProData"
            :showLength="isShowDetail ? 9999 : 2"
          >
            <template #three="{item}"> {{ item.jfqj }}/{{ item.jffs }} </template>
            <template #four="{item}">
              {{ item.premium }}
            </template>
          </proposal-book-pro-show>
        </div>
        <a v-if="fjProData.length > 2" @click="isShowDetail = !isShowDetail" class="toggle-desc toggle-table">
          <span>{{ isShowDetail ? "收起明细" : "展开明细" }}</span>
          <span class="svg_icon" :class="isShowDetail ? 'is_show_detail' : 'is_show_detail_close'">
            <n22-icon name="right_arrow"></n22-icon>
          </span>
        </a>
      </div>
    </div>
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
    <div class="con-wrap">
      <article class="conditions-wrap">
        <div class="english-dx">CONDITIONS</div>
        <div class="conditions-title">
          <img src="../../assets/images/circle.png" /> 条款详情
          <img src="../../assets/images/circle.png" />
        </div>
        <div class="conditions-container" v-for="(item, i) in fjProData" :key="i">
          <div>
            <span></span>
            <div class="tk-name">{{ item.name }}</div>
          </div>
          <n22-button @click="goWordShow" type="default" size="small" round>预览</n22-button>
        </div>
      </article>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[利益表]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[代理人]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="agent-wrap">
      <div class="agent-container">
        <img src="../../assets/images/circle.png" />
        <div class="agent-mes">
          <div>光永明</div>
          <div>
            <n22-icon name="phone" size="lg"></n22-icon>
            联系我
          </div>
          <div>
            <n22-icon name="card" size="lg"></n22-icon>
            查看名片
          </div>
        </div>
      </div>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[代理人]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[风险提示]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="risk-wrap">
      <article class="riskwaring-wrap">
        <div class="english-dx">CONDITIONS</div>
        <div class="riskwaring-title">
          <img src="../../assets/images/circle.png" /> 风险提示
          <img src="../../assets/images/circle.png" />
        </div>
        <div class="riskwaring-container">
          <p>风险提示投保人在保单犹豫期后解除合同会遭 受一定损失，具体保单利益请以保单合同为准。</p>
          <p>上述所有利益演示均基于保险公司的假设，不代表该公司的历史经营业绩和对未来经营业绩的预期。</p>
          <p>万能保险的最低保证利率之上的投资收益是不确定的，实际保单账户利益可能低于中、高档利益 演示水平。</p>
          <p>
            温馨提示：以上演示说明为本平台对上述产品的理解，便于保险从业人员学习、交流，演示数据 仅供参考，请以实际为准
          </p>
        </div>
      </article>
    </div>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[风险提示]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
  </div>
</template>

<script>
import { mapState } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Slider, ActionBar, Icon, Button } from "al-mobile";
import productDefObject from "../../assets/data/productDefObject";
import ProShow from "../ProShow";
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
    [ActionBar.name]: ActionBar,
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
    codeFilter(value, codeType, fieldType) {
      return __code.getCodeTextOrVal(value, codeType, undefined, undefined, fieldType);
    },
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
        },
      ],
      //附加险信息-数组
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
      isShowDetail: false, //产品数组是否展开
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
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    goWordShow() {
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

<style lang="scss" scoped>
.planbook {
  padding-bottom: 30px;
  background: linear-gradient(180deg, #9a2228, #af2221, #d73736, #d73534);
  color: #333333;
  // padding-bottom: 60px;
}
// 顶部图片
.bn-wrap {
  overflow: hidden;
  position: relative;
  width: 100%;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.mb-23 {
  margin-bottom: -10px;
}
// 公用
.cell-box {
  display: flex;
  width: 100%;
}
.is_show_detail {
  @include transform(rotate(-90deg));
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
.is_show_detail_close {
  @include transform(rotate(90deg));
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[人员信息及产品信息]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
.person-pro {
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
        color: #d73534;
      }
    }
  }
  // 表格
  .plan-pro-table {
    padding-bottom: 17px;
    ::v-deep .ph-area {
      color: #333333;
      .ph-area-header {
        background-color: #f8f8f8;
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
    // 展开
    .toggle-table {
      padding: 5px 0;
      margin: -1px 15px 0;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      outline: 0;
      color: #333;
      > span {
        font-size: 13px;
        color: #333333;
        vertical-align: middle;
      }
      .svg_icon {
        height: 16px;
        width: 16px;
        margin-top: 3px;
        position: absolute;
        margin-left: 3px;
        .n22-icon {
          color: #e81f2b;
          font-weight: 600;
        }
      }
    }
  }
}

/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[展开]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
.toggle-desc {
  position: relative;
  display: block;
  height: 22px;
  padding-top: 10px;
  text-align: center;
  outline: none;
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[展开]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
.instable {
  margin: 0 10px;
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[人员信息及产品信息]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[保障类型]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
.category-wrap {
  position: relative;
  width: 94.667%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 15px 0;
  background-color: #fff;
  border-radius: 10px;
}
.category-container {
  // overflow: hidden;
  overflow-x: auto;
  .item {
    display: inline-block;
    padding: 0 7px;
    text-align: center;
    .icon-wrap {
      position: relative;
      width: 40px;
      max-width: 100%;
      height: 40px;
      margin: 0 auto 5px;
      text-align: center;
    }
    p {
      font-size: 12px;
    }
  }
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[保障类型]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[保障结果]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
.instype-result-wrap {
  width: 94.667%;
  margin: 0 auto;
  .instype-box {
    // padding: 15px 0;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    img {
      width: 100%;
    }
  }
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[保障结果]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/
.english-dx {
  background: linear-gradient(180deg, #ffdbdb 3%, #ffffff 97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
}
.demonstration-title,
.conditions-title,
.riskwaring-title {
  padding: 15px 15px 5px;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  margin-top: -33px;
  transform: perspective(1000);
  img {
    height: 13px;
  }
  img:nth-child(2) {
    @include transform(rotateY(180deg));
  }
}
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[利益表]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
.demonstration-wrap,
.conditions-wrap,
.riskwaring-wrap {
  width: 94.667%;
  margin: 0 auto 10px;
  border-radius: 10px;
  background-color: #fff;
}
.demonstration-container {
  user-select: none;
  touch-callout: none;
  .bonus-wrap {
    font-size: 15px;
    padding: 10px 30px;
    .jiazhi {
      background: linear-gradient(180deg, #d73534, #fb4847);
      border-radius: 3px;
      span {
        font-size: 13px;
        font-weight: bold;
        color: #fffefe;
        margin: 8px;
      }
    }
    .age {
      margin-left: 15px;
      font-size: 14px;
      span {
        font-weight: bold;
        font-size: 17px;
        color: #d73534;
      }
    }
  }
  .explicit {
    margin: 7px auto 0;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    span {
      color: #d73534;
      font-weight: bold;
    }
  }
  ::v-deep .n22-slider {
    &::before {
      background-color: #ffdbdb;
    }
    .n22-slider-bar,
    .n22-slider-handle span {
      background-color: #d73534;
    }
  }
  //滑动
  .slider {
    position: relative;
    width: 100%;
    padding: 5px 0;
    .minus {
      left: 5px;
    }
    .slider-btn {
      z-index: 20;
      position: absolute;
      top: 50%;
      width: 44px;
      height: 44px;
      font-size: 32px;
      line-height: 40px;
      text-align: center;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-tap-highlight-color: transparent;
    }
    .slider-btn:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      height: 2px;
      width: 18px;
    }
    .plus {
      right: 5px;
    }
    .plus:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 2px;
      height: 18px;
    }
    .minus:after,
    .plus:before,
    .plus:after,
    .tooltip {
      background-color: #d73534;
    }
    .runway-wrap {
      padding: 0px 65px;
    }
    .runway-inner {
      padding: 5px 0;
    }
    .runway {
      background-color: #e0e0e0;
    }
    .runway {
      width: 100%;
      height: 8px;
      margin: 0 auto;
      border-radius: 100px;
      position: relative;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .slider-tips {
    text-align: center;
    color: #999;
    font-size: 12px;
    padding-bottom: 35px;
  }
}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[利益表]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

//条款
.conditions-wrap {
  padding-bottom: 20px;
}
.conditions-container {
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  .tk-name {
    margin-left: 30px;
    line-height: 20px;
  }
  div {
    font-size: 14px;
    span {
      height: 9px;
      width: 9px;
      background: linear-gradient(180deg, #d73534, #fb4847);
      border-radius: 50%;
      line-height: 10px;
      float: left;
      display: block;
      margin: 4px 10px 0 10px;
    }
  }
  div:first-child {
    width: 280px;
  }
  .n22-button {
    width: 45px;
    font-size: 10px;
    color: #d73534;
    line-height: 9px;
    height: 20px;
    &::after {
      border: 1px solid #d73534;
    }
  }
}

//代理人信息
.agent-wrap {
  .agent-container {
    width: 94.667%;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #fff;
    img {
      float: left;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: red;
      margin: 13px 20px 13px 15px;
    }
    .agent-mes {
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      margin-right: 10px;
      padding: 13px 0;
      font-size: 14px;
    }
  }
}

//风险提示
.riskwaring-wrap {
  padding-bottom: 20px;
}
.riskwaring-container {
  text-indent: 2em;
  margin: 10px;
  font-size: 14px;
  line-height: 20px;
}
</style>
