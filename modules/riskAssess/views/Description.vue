<template>
  <div class="riskAssess-description">
    <al-all-head hairline></al-all-head>
    <al-content
      class="riskAssess-description-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="box">
        <div class="assets-actionBg"></div>
        <img class="assets-title" src="../assets/images/风险等级评估.png" />
        <div class="assets-color" />
        <img class="assets-entryPic" src="../assets/images/head01.png" />
        <img class="assets-item" src="../assets/images/head_bg.png" />
        <div class="hd">
          <div class="outer">
            <img src="../assets/images/life_font_title.png" />
          </div>
          <img class="assets-txtBg" src="../assets/images/dashed.png" />
          <img class="buttonBg" src="../assets/images/desc_chart01.png" />
          <div class="colorDiv_4" />
          <img class="icon" src="../assets/images/gives.png" />
          <div class="block-txt" @click="txt1 = !txt1">
            <div class="wrap">
              <n22-icon class="desc-icon" name="warning"></n22-icon>
            </div>
            <span class="text" :lines="1">说明</span>
            <n22-icon :class="['desc-icon', txt1 ? 'arrow' : 'arrow-close']" name="right_arrow"></n22-icon>
          </div>
          <div class="group" v-show="txt1">
            <span class="summary" :lines="2"
              >全生命周期风险分析，是随着人的年龄成长而进行关键风险因素分析的风险分析理论。</span
            >
            <span class="summary_2" :lines="2"
              >将人的一生会遇到各类风险，按照前段、中段、后段加以区分，突出各阶段的关键性风险，为风险管理提供指导。</span
            >
          </div>
          <div class="container">
            <span class="text_2" :lines="1">您正处于</span>
            <span class="info_2" :lines="1">生命周期的中段，</span>
            <span class="info_3" :lines="1">在这个阶段，您主要面临</span>
            <span class="text_3" :lines="1">生命周</span>
          </div>
          <span class="desc" :lines="1">期的前段风险和中段风险。</span>
          <div class="outer_2">
            <span class="txt" :lines="1">前段风险：</span>
            <span class="desc_2" :lines="1">随着年龄增长和收入增长，相比过去，您所面临</span>
          </div>
          <span class="summary_3" :lines="2"
            >的大病风险、医疗风险、意外风险不断提高，应当不断增加前段风险的保障额度，确保幸福生活高枕无忧。</span
          >
          <div class="block_2">
            <span class="text_4" :lines="1">中段风险：</span>
            <span class="desc_3" :lines="1">您的生命周期刚刚进入中段。随着家庭的组建，</span>
          </div>
          <span class="summary_4" :lines="2"
            >您开始面临投资风险、子教风险、责任风险，应当立即开始规划，以保障生活的顺风顺水。</span
          >
        </div>
        <div class="bd">
          <div class="color_5" />
          <div class="outer">
            <img src="../assets/images/family_font_title.png" />
          </div>
          <img class="assets-txtBg" src="../assets/images/dashed.png" />
          <img class="icon_3" src="../assets/images/gives.png" />
          <img class="actionBg_2" src="../assets/images/desc_chart02.png" />
          <div class="container_2" @click="txt2 = !txt2">
            <div class="block_3">
              <n22-icon class="desc-icon" name="warning"></n22-icon>
            </div>
            <span class="text_5" :lines="1">说明</span>
            <n22-icon :class="['desc-icon', txt2 ? 'arrow' : 'arrow-close']" name="right_arrow"></n22-icon>
          </div>
          <div class="sectionWrap" v-show="txt2">
            <span class="section" :lines="3"
              >全家庭周期风险分析，是随着家庭的组建和发展而进行关键风险因素分析的风险分析理论。将家庭的成长划分为5个阶段，明确各阶段的风险管理目标，为风险管理提供指导。</span
            >
          </div>
          <div class="block_4">
            <span class="word" :lines="1">您正处于</span>
            <span class="info_5" :lines="1">家庭周期的成长期，</span>
            <span class="desc_4" :lines="1">在这个阶段，家庭财富不断积</span>
          </div>
          <span class="summary_5" :lines="2"
            >累的同时，家庭支出也在不断加大。作为家庭的支柱，进行有效的家庭风险管理尤为重要。</span
          >
          <div class="group_3">
            <span class="word_2" :lines="1">整体特征：</span>
            <span class="desc_5" :lines="1">随着小宝宝的出生，夫妇双方都会明显感到家庭</span>
          </div>
          <span class="article" :lines="3"
            >生活负担的加重。这个时期子女教育、资产的保值与增值以及健康是生活的重要组成部分，事业与家庭的兼顾将会对成长期人群产生很大的生理及心理压力。</span
          >
        </div>
        <div class="main">
          <div class="outer">
            <img src="../assets/images/fammon_font_title.png" />
          </div>
          <img class="assets-txtBg" src="../assets/images/dashed.png" />
          <img class="entryPic_2" src="../assets/images/desc_chart03.png" />
          <div class="outer_3" @click="txt3 = !txt3">
            <div class="container_4">
              <n22-icon class="desc-icon" name="warning"></n22-icon>
            </div>
            <span class="txt_2" :lines="1">说明</span>
            <n22-icon :class="['desc-icon', txt3 ? 'arrow' : 'arrow-close']" name="right_arrow"></n22-icon>
          </div>
          <div class="sectionWrap_2" v-show="txt3">
            <span class="section_2" :lines="3"
              >全财富周期风险分析，是针对财富保值增值的风险分析理论。将财富分配的划分为4个账户，科学分析财富在各个账户的合理分配比例，为家庭财富的合理分配提供指导。</span
            >
          </div>
          <div class="group_5">
            <span class="info_7" :lines="1">第一个账户是</span>
            <span class="info_8" :lines="1">短期消费账户，</span>
            <span class="desc_6" :lines="1">也就是要花的钱，一般占家庭</span>
          </div>
          <span class="desc_7" :lines="1">资产的10%，保障3-6个月的生活费；</span>
          <div class="container_5">
            <span class="info_9" :lines="1">第二个账户是</span>
            <span class="info_10" :lines="1">杠杆保障账户，</span>
            <span class="desc_8" :lines="1">是保命的钱，一般占家庭资产</span>
          </div>
          <span class="summary_6" :lines="2">的20%，以小博大、专款专用，保障意外、重疾等突发大额开支风险；</span>
          <div class="outer_4">
            <span class="info_11" :lines="1">第三个账户是</span>
            <span class="info_12" :lines="1">投资收益账户，</span>
            <span class="desc_9" :lines="1">也就是生钱的钱，一般占家庭</span>
          </div>
          <span class="desc_10" :lines="1">资产的30%，重在收益，承担投资风险；</span>
          <div class="block_5">
            <span class="info_13" :lines="1">第四个账户是</span>
            <span class="info_14" :lines="1">长期收益账户，</span>
            <span class="desc_11" :lines="1">也就是保本升值的钱，一般占</span>
          </div>
          <span class="summary_7" :lines="2"
            >家庭资产的40%，保证本金安全，收益稳定，作为养老、子教、传承的专属资产。</span
          >
        </div>
        <div class="assets-ft">
          <n22-button @click="next" type="primary">查看保障需求等级</n22-button>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, Icon } from "al-mobile";
export default {
  name: "risk-assess-description", //使用xx-xx-xx命名方式具体看操作文档
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
    console.log("%c description>生命周期>mounted", "color:green;", "");
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
      txt1: false,
      txt2: false,
      txt3: false,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    next() {
      this.go("riskAssess/dataPerfect");
    },
  },
};
</script>

<style lang="scss" scoped>
.riskAssess-description {
  .riskAssess-description-content {
    @import "./Description.scss";
    ::v-deep .not-swiper-div {
      background-color: #f1f3f4;
    }
  }
}
</style>
