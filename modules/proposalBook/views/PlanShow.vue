<template>
  <div class="proposalBook-plan-show">
    <al-all-head title="福运至尊 相伴人生"></al-all-head>
    <al-content
      class="proposalBook-plan-show-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <planbk-template1></planbk-template1>
    </al-content>
    <n22-action-bar class="action-bar-c" type="warning" :actions="buttonArray"> </n22-action-bar>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, ActionBar } from "al-mobile";
import PlanbkTemplate1 from "../components/planbkTemplate/PlanbkTemplate1";
export default {
  name: "proposal-book-plan-show", //使用xx-xx-xx命名方式具体看操作文档
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
    [ActionBar.name]: ActionBar,
    [PlanbkTemplate1.name]: PlanbkTemplate1,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c plan-show>生命周期>mounted", "color:green;", "");
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
      //按钮组
      buttonArray: [
        //底部按钮组
        {
          plain: false,
          text: "生成PDF",
          onClick: this.createPlan,
        },
        {
          text: "转发建议书",
          onClick: this.createPlan,
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
  },
};
</script>

<style lang="scss" scoped>
.proposalBook-plan-show {
  .proposalBook-plan-show-content {
  }
  .action-bar-c {
    ::v-deep .n22-button {
      height: 46px;
      width: 125px;
    }
    ::v-deep .warning {
      background-color: #d73635;
    }
    ::v-deep .active:active {
      background-color: #ff5257;
    }
    ::v-deep .n22-button-content span {
      font-size: 16px;
    }
  }
}
</style>
