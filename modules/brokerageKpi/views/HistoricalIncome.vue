<template>
  <div class="brokerageKpi-historical-income">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
        <div class="header-title">
          最终收入结果请以实发金额为准
        </div>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-historical-income-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :swiperTop="swiperTop"
    >
      <div class="bk-content">
        <div class="bk-detail" v-for="(item, index) in list" :key="index">
          <div class="bk-detail-list">
            <div class="list-left">{{ item.indexcalno }}</div>
            <div class="list-right" @click="toHistoryDetails(item)">
              <div class="list-icon">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
              <div class="list-num">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">历史数据</div>
            <div class="list-right" @click="$_toHistry">
              <div class="list-icon">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
              <div class="list-num"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail" v-if="!list.length">
          <div class="bk-detail-list center">暂无数据</div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getBrokeHistory } from "../service/getData";

export default {
  name: "bkge-examine-historical-income", //使用xx-xx-xx命名方式具体看操作文档
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
    console.log("%c historical-income>生命周期>mounted", "color:green;", "");
    if (this.agentCode != "") {
      this.getBrokeHistory();
    } else {
      Toast.info("请返回重试！");
    }
  },
  watch: {},
  data() {
    return {
      swiperTop: 54,
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
      list: [],
      agentCode: this.$route.query["agentCode"],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations(["AGENTCODE"]),
    toHistoryDetails(item) {
      console.log("%c toHistoryDetails TO历史明细", "color:green;", item);
      this.go("brokerageKpi/historyDetails?indexcalno=" + item.indexcalno);
    },
    $_toHistry() {
      let agentInfo = window.utils.cache.get("agentInfo");
      console.log("%c $_toHistry TO正式考核2.0", "color:green;", agentInfo);
      console.log(window.globalConfig.rootUrl);
      console.log(window.globalConfig.rootUrl.includes("mitphone"));
      let url = "";
      let lastUrl =
        ":8010/com.ifp.ipartner/proposalShare/index.html#/comprehensiveGexian/AriskmyCommission/AriskmyCommissionDetails?isNewVer=1";
      let objUrl = window.globalConfig.rootUrl.split("//");
      let httpUrl = objUrl[1].split("/");
      if (window.globalConfig.rootUrl.includes("mitphone")) {
        console.log(httpUrl);
        url = objUrl[0] + "//" + httpUrl[0] + lastUrl;
      } else {
        url = "http://" + httpUrl[0] + lastUrl;
      }
      window.location.replace(url);
      console.log(url);
      // Toast.info("此功能正在开发...");
    },
    getBrokeHistory() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.agentCode,
      };
      //isParms
      getBrokeHistory({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getBrokeHistory", "color:#00CD00", data.data);
          this.list = data.data;
        },
        error => {
          console.log("%c getBrokeHistory", "color:#00CD00", error);
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-historical-income {
  .header-title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding-left: 17px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    background-color: #ffffff;
  }
  .brokerageKpi-historical-income-content {
    ::v-deep .n22-icon {
      color: #979797;
    }
    .bk-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      margin-top: 10px;
      margin-bottom: 60px;
      .bk-detail {
        width: 100%;
        height: 44px;
        border-bottom: 1px solid rgba(236, 237, 239, 1);
        display: flex;
        align-items: center;
        .bk-detail-list {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 0 19px 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          .list-title {
            font-weight: 500;
            color: rgba(253, 185, 44, 1);
          }
          .list-right {
            width: 50%;
            display: flex;
            height: 100%;
            align-items: center;
            color: rgba(150, 150, 150, 1);
            font-size: 12px;
            flex-direction: row-reverse;
            .list-num {
              text-align: right;
              min-width: 40px;
            }
            .list-icon {
              height: 100%;
              width: 10px;
              margin-left: 15px;
              display: flex;
              align-items: center;
            }
            .waring {
              color: rgba(253, 63, 44, 1);
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
