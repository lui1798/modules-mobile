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
    <!-- 分享模块 -->
    <share-popup :shareModal="shareModal" v-model="isPopupShowShare" />
  </div>
</template>

<script>
import { mapMutations } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, ActionBar, Toast } from "al-mobile";
import PlanbkTemplate1 from "../components/planbkTemplate/PlanbkTemplate1";
import SharePopup from "../components/SharePopup.vue";

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
    [Toast.name]: Toast,
    [PlanbkTemplate1.name]: PlanbkTemplate1,
    [SharePopup.name]: SharePopup,
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
          onClick: this.goWordShow,
        },
        {
          text: "转发建议书",
          onClick: this.shareProposal,
        },
      ],
      shareModal: [
        {
          desc: "微信",
          type: "wechat",
          url: "http://show.n22.com.cn:8788",
          svg: "wechat",
          onClick: this.wechatShare,
          img: "http://show.n22.com.cn:8788/statics/menu/insurce.png",
        },
        {
          desc: "朋友圈",
          type: "wechatf",
          url: "http://show.n22.com.cn:8788",
          svg: "wechat_friends",
          onClick: this.wechatShare,
          img: "http://show.n22.com.cn:8788/statics/menu/insurce.png",
        },
        {
          desc: "短信",
          type: "email",
          svg: "email",
          img: "http://show.n22.com.cn:8788/statics/menu/insurce.png",
        },
      ],
      isPopupShowShare: false,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORKSHOWURL",
    ]),
    goWordShow() {
      const outLink = "https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdSit/pdf.jpg";
      this.WORKSHOWURL(outLink);
      this.go("proposalBook/wordShow");
    },
    shareProposal() {
      this.isPopupShowShare = true;
    },
    shareStart(action) {
      window.Wechat.share({
        message: {
          title: "保险规划书",
          description: "光永明规划师为您制定的专属规划书(我是体验测试版！）",
          thumb: "https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/gdsc/share_JCSHS2-5Y.jpg",
          mediaTagName: "链接",
          media: {
            type: window.Wechat.Type.WEBPAGE,
            webpageUrl:
              "https://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/proposalBook/#/proposalBook/planShow",
          },
        },
        scene: action.type === "wechat" ? window.Wechat.Scene.SESSION : window.Wechat.Scene.TIMELINE, // share to Timeline
      });
    },
    wechatShare(event, action) {
      console.log("%c action", "color:#00CD00", action);
      this.shareStart(action);
    },
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
