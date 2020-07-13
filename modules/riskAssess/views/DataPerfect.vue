<template>
  <div class="riskAssess-data-perfect">
    <al-all-head hairline></al-all-head>
    <al-content
      class="riskAssess-data-perfect-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="mod">
        <div class="box">
          <div class="head-con">
            <div class="assets-actionBg"></div>
            <img class="assets-title" src="../assets/images/风险等级评估.png" />
            <div class="assets-color" />
            <img class="assets-entryPic" src="../assets/images/head01.png" />
            <img class="assets-item" src="../assets/images/head_bg.png" />
          </div>
          <div class="block_3" v-for="(item, i) in riskArray" :key="i">
            <div class="top-con">
              <div class="outer" @click="toogle(item, i)">
                <div class="color" />
                <span class="word">{{ item[0] }}</span>
                <div :class="['all_toogle', item[4] ? 'toogle-down' : '']">
                  <!-- <img class="toogle" src="../assets/images/up.png" /> -->
                  <n22-icon name="right_arrow" size="sm"></n22-icon>
                </div>
              </div>
              <div class="block_2">
                <span class="text">需求等级</span>
                <div class="star" v-for="(star, si) in 5" :key="si">
                  <img :src="require(`../assets/images/star_${si >= item[3] ? 'off' : 'on'}.png`)" />
                </div>
              </div>
              <div class="group_2" v-html="item[1]"></div>
            </div>
            <transition name="n22-slide-down">
              <div v-show="item[4]">
                <img class="assets-txtBg" src="../assets/images/dashed.png" />
                <span class="article">
                  <span class="txt_2">{{ item[0] }}</span>
                  <span v-html="item[2]"></span>
                </span>
              </div>
            </transition>
          </div>
          <div class="container_14">
            <div class="colorDiv_3" />
            <span class="info_11">FRM专业风险评测</span>
            <n22-check-group v-model="assess">
              <n22-check-box :name="0">身故风险</n22-check-box>
              <n22-check-box :name="1">意外风险</n22-check-box>
              <n22-check-box :name="2">疾病风险</n22-check-box>
              <n22-check-box :name="3" disabled>养老风险</n22-check-box>
              <n22-check-box :name="4" disabled>资产风险</n22-check-box>
            </n22-check-group>
            <div class="assets-ft">
              <n22-button @click="next" type="primary">完善数据</n22-button>
            </div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, CheckGroup, CheckBox, Icon } from "al-mobile";
export default {
  name: "risk-assess-data-perfect", //使用xx-xx-xx命名方式具体看操作文档
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
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup,
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c data-perfect>生命周期>mounted", "color:green;", "");
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
          "责任保障",
          "您当前的<span class='desc'>责任保障需求等级为最高的五颗星，</span>是需要重点关注的风险项目，应务必确保拥有充足保障。",
          "是家庭顶梁柱必须考虑的风险项目。对于一般家庭经济支柱而言，普遍面临着较大的经济压力，包括日常生活开支、房贷、车贷、孩子教育、医疗支出和赡养父母等各方面的经济负担。在这种情况下，一旦家庭经济支柱发生不幸，整个家庭的经济来源面临中断，原有的生活水平将受到重创，家人可能面临无法偿还的房贷、无法承担的高端教育、重返职场的艰辛等等。",
          5,
        ],
        [
          "意外保障",
          "您当前的<span class='desc'>意外保障需求等级为最高的五颗星，</span>是需要重点关注的风险项目，应务必确保拥有充足保障。",
          "是非主观意愿，不可测的风险，例如由于意外原因造成身体伤害或导致残废、死亡。意外风险除了可能给家人带来心灵上的无尽伤痛，同时还会面临治疗所需的巨额费用，包括手术费、护理费等；若因严重的意外，导致失去劳动能力，增加家庭开支的同时，还会让家庭减少甚至失去经济来源。",
          5,
        ],
        [
          "疾病保障",
          "您当前的<span class='desc'>疾病保障需求等级为三颗星，</span>应当引起关注，确保应有的保障额度。",
          "是指由于患病而带来的风险。患病别是罹患重大疾病，将对家庭经济带来很大损失，破坏幸福的家庭生活重疾带来的损失，除了因治疗疾病而花费的治疗费用的直接损失，还包括治疗中的收入损失和治疗后的康复费用的间接损失。",
          3,
        ],
        [
          "资产保障",
          "您当前的<span class='desc'>资产保障需求等级为两颗星，</span>可根据家庭收支情况，适时建立起相关保障。",
          "是指家庭资产管理过程中可能出现的收益下降、本金亏损、资产流失、债务清偿等的风险。例如投资失利导致的收益损失乃至于本金亏损；如离婚、夫妻一方死亡等可能造成财产的分割或继承的风险；再如家庭成员的民事侵权、外债、抵押担保乃至于天灾造成的家庭资产流失等。",
          2,
        ],
        [
          "养老保障",
          "您当前的<span class='desc'>养老保障需求等级为两颗星，</span>可根据家庭收支情况，适时建立起相关保障。",
          "是指人在年老时，由于缺乏相应经济保障，无法保证的养老生活费用、护理费用、疾病治疗费用等必要费用的支出，而遭受的养老生活品质下降甚至遭遇生存危险的风险。",
          2,
        ],
      ],
      assess: [0, 1],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    toogle(item, i) {
      console.log("%c ", "color:#00CD00", item[4]);
      if (item[4]) {
        item[4] = false;
      } else {
        item[4] = true;
      }
      this.$set(this.riskArray, i, this.riskArray[i]);
    },
    next() {
      this.go("riskAssess/dataMoney");
    },
  },
};
</script>

<style lang="scss" scoped>
.riskAssess-data-perfect {
  .riskAssess-data-perfect-content {
    ::v-deep .not-swiper-div {
      background-color: #f1f3f4;
    }
    @import "./DataPerfect.scss";
  }
}
</style>
