<template>
  <div class="proposalBook-plan-show">
    <al-all-head hairline v-if="!(isShare == 2)"></al-all-head>
    <al-content
      class="proposalBook-plan-show-content"
      :errorMessage="errorMessage"
      upRefreshFun="upRefreshFun"
      @upRefreshFun="queryforshowFun"
      :tabs="tabs"
      :isMescrollDown="true"
      :isAutoTopMargin="!(isShare == 2)"
    >
      <planbk-template1 v-if="showTemplate"></planbk-template1>
      <planbk-template2
        v-else-if="proposalBookData"
        :proposalBookData="proposalBookData"
        v-model="proposalBookData.premiumInfo.families"
      ></planbk-template2>
    </al-content>
    <role-float @onClick="$_onClick" v-model="roleList"></role-float>
    <n22-action-bar v-if="isShare !== '2'" class="action-bar-c" type="warning" :actions="buttonArray"> </n22-action-bar>
    <!-- 生成PDF封面 -->
    <n22-popup v-model="isPopupShow" position="bottom" @maskClick="riskMaskClick" class="pdf-popup">
      <n22-popup-title-bar title="封面设计" @confirm="riskMaskClick">
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div class="pdf-popup-content n22-popup-content">
        <!-- <div class="pro-title">光大永明福运至尊年金保险</div> -->
        <n22-drop-select
          class="my-age-c"
          title="结束语设置"
          v-model="jsy"
          pickerTitle="请选择"
          selectDefaultValue="0"
          :options="jsyOptions"
          ispickerValue="请选择"
          type="single"
          :isAppendTo="true"
        ></n22-drop-select>
        <div v-for="(item, i) in jsyOptions" :key="i">
          <div class="text-tsy" v-if="jsy == i">
            {{ item.content }}
          </div>
        </div>
        <div class="fmxz-c">封面选择</div>
        <div class="select-img">
          <div v-for="(item, i) in 3" :key="i" @click="isSelectFM = i">
            <img class="pro-fm" :src="require(`../assets/images/fm${i}.jpg`)" />
            <div class="mb-select">
              <img v-if="isSelectFM === i" src="../assets/images/fm_selected.png" />
              <img v-else src="../assets/images/fm_n.png" />
              <span>模版{{ i === 0 ? "一" : i === 1 ? "二" : "三" }}</span>
            </div>
          </div>
        </div>
        <div class="select-img">
          <div v-for="(item, i) in 3" :key="i" @click="isSelectFM = i + 3">
            <img class="pro-fm" :src="require(`../assets/images/fm${i + 3}.jpg`)" />
            <div class="mb-select">
              <img v-if="isSelectFM === i + 3" src="../assets/images/fm_selected.png" />
              <img v-else src="../assets/images/fm_n.png" />
              <span>模版{{ i === 0 ? "四" : i === 1 ? "五" : "六" }}</span>
            </div>
          </div>
        </div>
        <div class="select-img select-img-3">
          <div v-for="(item, i) in 1" :key="i" @click="isSelectFM = i + 6">
            <img class="pro-fm" :src="require(`../assets/images/fm${i + 6}.jpg`)" />
            <div class="mb-select">
              <img v-if="isSelectFM === i + 6" src="../assets/images/fm_selected.png" />
              <img v-else src="../assets/images/fm_n.png" />
              <span>模版{{ i === 0 ? "七" : i === 1 ? "二" : "三" }}</span>
            </div>
          </div>
        </div>
      </div>
      <transition name="n22-base-slide-up">
        <n22-button
          @click="createPDF"
          type="primary"
          class="pro-popup-button"
          v-data-point="{ aa: { module: 'PROPOSAl', eventId: '1004', createBy: proposalBook.agentCode } }"
        >
          确定
        </n22-button>
      </transition>
    </n22-popup>
    <!-- 分享模块 -->
    <share-popup :shareModal="shareModal" :wechatMessage="wechatMessage" v-model="isPopupShowShare" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, ActionBar, Button, DropSelectItem, Icon, Popup, PopupTitleBar } from "al-mobile";
import RoleFloat from "../components/RoleFloat";
import SharePopup from "../components/SharePopup.vue";
import PlanbkTemplate1 from "../components/planbkTemplate/PlanbkTemplate1";
import PlanbkTemplate2 from "../components/planbkTemplate/PlanbkTemplate2";

import gdym from "../assets/images/gdym.png";
// import __getUrlParams from "@t/getUrlParams";
//service
import { queryforshow, createPdf, queryCalculate } from "../service/getData";

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
    [Button.name]: Button,
    [DropSelectItem.name]: DropSelectItem,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [RoleFloat.name]: RoleFloat,
    [SharePopup.name]: SharePopup,
    [PlanbkTemplate1.name]: PlanbkTemplate1,
    [PlanbkTemplate2.name]: PlanbkTemplate2,
  },
  computed: {
    ...mapState(["proposalBook"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c plan-show>生命周期>mounted", "color:green;", "");
    this.queryforshowFun();
  },
  data() {
    return {
      errorMessage: "",
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
      proposalBookData: "",
      proposalId: this.$route.query.proposalId,
      isShare: this.$route.query.isShare,
      roleList: [
        { name: "公司简介", type: "1" },
        { name: "按责任", type: "2", isShow: false },
      ],
      //按钮组
      buttonArray: [
        //底部按钮组
        {
          plain: false,
          text: "生成PDF",
          onClick: this.showPdfTemplate,
        },
        {
          text: "转发建议书",
          onClick: this.shareProposal,
        },
      ],
      isPopupShowShare: false,
      shareModal: [
        {
          desc: "微信",
          type: "wechat",
          url: "http://show.n22.com.cn:8788",
          svg: require("../assets/images/wechat.png"),
        },
        {
          desc: "朋友圈",
          type: "wechatf",
          url: "http://show.n22.com.cn:8788",
          svg: require("../assets/images/wechat_p.png"),
        },
        // {
        //   desc: "短信",
        //   type: "sms",
        //   svg: require("../assets/images/sms.png"),
        // },
      ],
      wechatMessage: {},
      isPopupShow: false,
      gdym,
      isSelectFM: 0,
      jsy: "1",
      jsyOptions: [
        {
          text: "生命的呐喊",
          value: "0",
          content:
            "保险是家庭责任的分期付款，你可以说不需要保险，但是，你不可以代替你的妻子，儿女说他们不需要。虽然，你死去以后，可以一走了之什麽都不要，但是，妻子儿女活着却万事艰难，什麽都需要。",
        },
        {
          text: "毛泽东谈保险",
          value: "1",
          content: "保险的意义无需多做赘述，其重要性不言而喻，早已融入了现代人类社会的边边角角。",
        },
        {
          text: "李嘉诚谈保险",
          value: "2",
          content: "别人都说我很富有，拥有很多的财富。其实真正属于我个人的财富是给自己和亲人买了充足的人寿保险。",
        },
        {
          text: "胡适说保险",
          value: "3",
          content:
            "保险的意义，只是今日做明日的准备，生时做死时的准备，父母做儿女的准备，儿女幼小时做儿女长大时准备，如此而已。今天预备明天，这是真稳健；生时预备死时，这是真旷达；父母预备儿女，这是真慈爱；不能做到这三步，不能算做现代人！",
        },
        {
          text: "王石说保险",
          value: "4",
          content: "保险，意味着对家庭的责任。",
        },
        {
          text: "罗斯福看保险",
          value: "5",
          content: "保有适当的保险，是一种道德责任是大部分国民应负有的义务。",
        },
        {
          text: "比尔盖茨谈保险",
          value: "6",
          content: "到目前为止，我没有发现有哪一种方法比购买人寿保险更能有效地解决企业的医疗财务问题。",
        },
        {
          text: "朱镕基说保险",
          value: "7",
          content:
            "基本医疗保障只能是低水平的“保”而不是“包”，“保”即有一个基本的保障，超出部分主要应通过商业保障解决。现在该是转变陈旧观念的时候了，应明确健康与人生风险投资人人有责，不能再完全依靠社会，社会的进步要求我们积极参加商业保险。",
        },
        {
          text: "赫鲁晓夫谈保险",
          value: "8",
          content: "我对资本主义向来没有好感,但保险制度却是资本主义唯一可取的地方。",
        },
      ],
      showTemplate: false, //展示模版，默认false，展示模版2
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORDSHOW",
    ]),
    /**
     * 数据回显
     * id
     */
    queryforshowFun() {
      const axiosParams = {
        isShare: this.isShare == 2,
        isLoadding: true,
        loaddingText: "数据查询中...",
      };
      const params = {
        proposalId: this.proposalId,
        id: this.proposalId,
      };
      let code = "1001";
      if (this.isShare == 2) {
        code = "1002";
      }
      this.$DataPoint("", {
        value: { aa: { module: "PROPOSAl", eventId: code, createBy: this.proposalBook.agentCode }, postParms: true },
      });
      queryforshow({ data: params, config: axiosParams, method: "get" }).then(
        data => {
          this.errorMessage = "";
          console.log("%c getProductEntry>>>>data", "color:green;", data);
          this.proposalBookData = data.data;
          this.queryCalculate();
          this.wechatMessage = {
            title: "保险规划书",
            description: `${this.proposalBookData.agentInfo.name}规划师为您制定的专属规划书`,
            webpageUrl: `${window.globalConfig.rootUrl.replace(
              "/api",
              "",
            )}/app/proposalBook/#/proposalBook/planShow?proposalId=${this.proposalId}&isShare=2`,
            thumb: `//${this.proposalBookData.backgroundImage}`,
          };
        },
        err => {
          console.log("%c getProductEntry>>>>err", "color:green;", err);
          this.errorMessage = err.message;
        },
      );
    },
    $_onClick(role) {
      if (role.type == "1") {
        this.WORDSHOW({ title: "公司简介", url: gdym });
        let code = "1007";
        if (this.isShare == 2) {
          code = "1008";
        }
        this.$DataPoint("", {
          value: {
            aa: { module: "PROPOSAl", eventId: code, createBy: this.proposalBook.agentCode },
            postParms: true,
          },
        });
        this.go("proposalBook/wordShow?isZoom=false");
      } else if (role.type == "2") {
        this.showTemplate = !this.showTemplate;
        if (this.showTemplate) {
          this.roleList[1].name = "按险种";
        } else {
          this.roleList[1].name = "按责任";
        }
        this.$set(this.roleList, 1, this.roleList[1]);
      }
    },
    riskMaskClick() {
      //蒙层点击取消
      this.isPopupShow = false;
    },
    showPdfTemplate() {
      this.isPopupShow = true;
    },
    createPDF() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "PDF生成中...",
      };
      const params = {
        greetCode: this.jsy,
        proposalId: this.proposalId,
        templateCode: `fm${this.isSelectFM}`,
      };
      createPdf({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c createPDF>>>>data", "color:green;", data);
          this.goWordShow({
            // terms: data.data,
            terms: data.data[0],
            name: "光大永明人寿保险规划书",
          });
        },
        err => {
          console.log("%c createPDF>>>>err", "color:green;", err);
        },
      );
    },
    goWordShow(pdf) {
      const outLink = pdf.terms;
      this.WORDSHOW({
        title: pdf.name,
        url: outLink,
        isShowShare: 1,
        shareMes: {
          agentName: this.proposalBookData.agentInfo.name,
          img: this.proposalBookData.backgroundImage,
        },
      });
      this.go("/proposalBook/wordShow", {
        proposalId: this.proposalId,
        canShare: true,
        isPdf: true,
        shareMessage: {
          agentName: this.proposalBookData.agentInfo.name,
          img: this.proposalBookData.backgroundImage,
        },
      });
    },
    shareProposal() {
      this.isPopupShowShare = true;
    },
    queryCalculate() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据查询中...",
      };
      let request = {
        proposalId: this.proposalId,
      };
      queryCalculate({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          let res = data.data;
          this.$set(this.proposalBookData, "score", res);
          console.log("%c queryCalculate>>>>data", "color:green;", res);
          console.log("%c queryCalculate>>>>data", "color:green;", this.proposalBookData);
        },
        error => {
          console.log("%c queryCalculate", "color:#00CD00", error);
        },
      );
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
      background-color: $theme-color;
      &::after {
        border: none;
      }
    }
    ::v-deep .active:active {
      background-color: #ffd86e;
    }
    ::v-deep .n22-button-content span {
      font-size: 16px;
    }
  }
  .pdf-popup {
    .n22-popup-title-bar {
      // position: fixed;
      height: 50px;
      ::v-deep .title-bar-title {
        .title {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .pdf-popup-content {
      overflow-y: auto;
      height: 500px;
      background-color: #ffffff;
      padding: 15px;
      color: rgba(86, 86, 86, 1);
      .pro-title {
        margin-top: 14px;
        margin-bottom: 20px;
        font-weight: bold;
        color: #333333;
      }
      .my-age-c {
        margin-bottom: 10px;
        // width: 140px;
        // margin-right: 10px;
        ::v-deep .n22-field-item-right-addon {
          // width: 100px;
        }
      }
      ::v-deep.n22-drop-select {
        .n22-field-item-title {
          color: #565656;
        }
        .n22-field-item-right {
          border: 1px solid #dadada;
          padding: 6px;
          border-radius: 3px;
          .n22-field-item-right-addon {
            font-size: 12px;
            width: 126px;
            // color: #dadada;
          }
          .n22-icon {
            color: #cccccc;
          }
        }
      }
    }
  }
  .text-tsy {
    // width: 335px;
    text-indent: 2em;
    // height: 70px;
    background: rgba(240, 240, 240, 1);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 400;
    padding: 13px 9px 12px 10px;
    line-height: 18px;
    text-align: justify;
  }
  .fmxz-c {
    font-size: 14px;
    margin: 20px 0;
  }
  .select-img-3 {
    margin-bottom: 40px;
  }
  .select-img {
    height: 200px;
    .pro-fm {
      border-radius: 2px;
      height: 152px;
      width: 102px;
      box-shadow: 0px 5px 10px 1px #ececec;
    }
    div {
      width: 102px;
      float: left;
    }
    div:nth-child(2) {
      margin-left: 18px;
    }
    div:nth-child(3) {
      margin-left: 18px;
    }
    .mb-select {
      margin-top: 10px;
      img {
        height: 14px;
        width: 14px;
        vertical-align: middle;
      }
      span {
        margin-left: 9px;
        vertical-align: middle;
        font-size: 12px;
        color: #333333;
      }
    }
  }
  .pro-popup-button {
    // z-index: 1;
    position: absolute;
    bottom: 0;
    height: 46px;
    width: 356px;
    margin: 0 10px 10px;
    ::v-deep .n22-button-content {
      font-size: 16px;
    }
  }
}
</style>
