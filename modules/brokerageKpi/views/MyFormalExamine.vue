<template>
  <div class="brokerageKpi-my-formal-examine">
    <al-all-head :title="title"></al-all-head>
    <al-content
      class="brokerageKpi-my-formal-examine-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="brokerageKpi-warning-myExamine">
        <div class="brokerageKpi-warning-myExamine-top">
          <div class="brokerageKpi-warning-myExamine-topContent">
            <div>我的考核</div>
            <div class="brokerageKpi-warning-myExamine-seeMore" @click="$_toDetails">
              <div>查看详情</div>
              <div slot="right">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <item-line></item-line>
        <div class="brokerageKpi-warning-myExamine-bottom">
          <div class="details">
            <div class="details-top">{{ rank[res.currentLevel] }}</div>
            <div>当前职级</div>
          </div>
          <div class="line"></div>
          <div class="details">
            <div class="details-top maintain">{{ rank[res.currentResult] }}</div>
            <div>本期考核结果</div>
          </div>
        </div>
      </div>
      <div class="brokerageKpi-warning-myExamine bottom-height" v-if="hasTeams">
        <div class="brokerageKpi-warning-myExamine-top">
          <div class="brokerageKpi-warning-myExamine-topContent">
            <div>
              我的团队
              <span class="teams-number">（直属属员{{ res.directCount }}人）</span>
            </div>
            <div class="brokerageKpi-warning-myExamine-seeMore" @click="$_toMyTeams">
              <div>查看详情</div>
              <div slot="right">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="brokerageKpi-warning-myExamine-bottom bottom-center">
          <div class="detail-table color-blue">
            <div class="detail-table-title border-bottom">预计维持</div>
            <div class="detail-table-title background-none">{{ res.holdCount }}</div>
          </div>
          <div class="detail-table color-red">
            <div class="detail-table-title border-bottom">预计晋升</div>
            <div class="detail-table-title background-none">{{ res.promoteCount }}</div>
          </div>
          <div class="detail-table color-green">
            <div class="detail-table-title border-bottom">预计降级</div>
            <div class="detail-table-title background-none">{{ res.downgradeCount }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-bottom border-right">预计解约</div>
            <div class="detail-table-title border-right background-none">{{ res.breakCount }}</div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import rank from "../common/rank.json";
import { getMyFormalExamine } from "../service/getData";

export default {
  name: "brokerage-kpi-my-formal-examine", //使用xx-xx-xx命名方式具体看操作文档
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
    [Icon.name]: Icon,
    [ItemLine.name]: ItemLine,
  },
  computed: {
    ...mapState(["brokerageKpi"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c my-formal-examine>生命周期>mounted", "color:green;", "");
    console.log(this.$route.query["indexcalno"]);
    if (this.brokerageKpi.agentCode != "") {
      this.getMyFormalExamine();
    } else {
      Toast.info(`请返回重试！`);
    }
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
      title: this.$route.query["indexcalno"] + "正式考核",
      indexcalno: this.$route.query["indexcalno"],
      hasTeams: false,
      res: {},
      rank: rank,
    };
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "MYEXAMINETABS",
      "AGENTCODE",
      "MYEXAMINE",
    ]),
    $_toDetails() {
      console.log("%c toDetails", "color:green;", "点击查看toDetails详情");
      if (this.brokerageKpi.agentCode != "" && this.res.tabs.length) {
        this.go("brokerageKpi/myFormalExamineDetails?indexcalno=" + this.indexcalno);
      } else {
        Toast.info(`当前时间无相应考核数据。`);
      }
    },
    $_toMyTeams() {
      if (this.brokerageKpi.agentCode != "" && this.res.currentLevel) {
        this.MYEXAMINE(this.res);
        this.go("brokerageKpi/myFormalTeam?indexcalno=" + this.indexcalno);
        console.log("%c toMyTeams", "color:green;", "点击查看toMyTeams详情");
      } else {
        Toast.info(`请返回重试！`);
      }
    },
    getMyFormalExamine() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.brokerageKpi.agentCode,
        indexcalno: this.indexcalno,
      };
      //isParms
      getMyFormalExamine({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          this.res = data.data;
          this.MYEXAMINETABS(data.data.tabs);
          if (data.data.directCount && data.data.directCount != "") {
            this.hasTeams = true;
          }
        },
        error => {
          console.log("%c getUserWarning", "color:#00CD00", error);
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-my-formal-examine {
  .brokerageKpi-my-formal-examine-content {
    .brokerageKpi-warning-myExamine {
      width: 100%;
      height: 128px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      ::v-deep .n22-icon-right_arrow:before {
        position: relative;
        z-index: 2;
        color: #979797;
        font-size: 15px;
        margin-left: 12px;
      }
      .brokerageKpi-warning-myExamine-top {
        width: 100%;
        height: 42px;
        .brokerageKpi-warning-myExamine-topContent {
          width: 100%;
          height: 100%;
          display: flex;
          box-sizing: border-box;
          padding: 0 19px 0 13px;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 500;
          color: rgba(253, 185, 44, 1);
          .brokerageKpi-warning-myExamine-seeMore {
            height: 100%;
            font-size: 12px;
            font-weight: 400;
            color: rgba(165, 165, 165, 1);
            display: flex;
            align-items: center;
          }
          .teams-number {
            font-size: 12px;
            font-weight: 400;
            color: rgba(165, 165, 165, 1);
          }
        }
      }
      .brokerageKpi-warning-myExamine-bottom {
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        .details {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(165, 165, 165, 1);
          .details-top {
            color: rgba(53, 190, 76, 1);
            margin-bottom: 5px;
          }
          .maintain {
            color: rgba(83, 133, 255, 1);
          }
        }
        .line {
          width: 1px;
          height: 48px;
          background: rgba(236, 237, 239, 1);
        }
        .detail-table {
          width: 87px;
          height: 70px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          font-size: 10px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          .detail-table-title {
            width: 100%;
            height: 35px;
            border: 1px solid rgba(213, 213, 213, 1);
            border-right: none;
            background-color: rgba(255, 251, 244, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .border-bottom {
            border-bottom: none;
          }
          .border-right {
            border-right: 1px solid rgba(213, 213, 213, 1);
          }
          .background-none {
            background: none;
          }
        }
        .color-blue {
          color: rgba(83, 133, 255, 1);
        }
        .color-green {
          color: rgba(53, 190, 76, 1);
        }
        .color-red {
          color: rgba(247, 83, 83, 1);
        }
      }
      .bottom-center {
        justify-content: center;
      }
    }
    .bottom-height {
      height: 134px;
    }
    .period {
      height: 27px;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 19px 0 13px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      align-items: center;
      background: rgba(246, 246, 246, 1);
    }
  }
}
</style>
