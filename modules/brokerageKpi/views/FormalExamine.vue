<template>
  <div class="brokerageKpi-formal-examine">
    <al-all-head back-url="hybrid-back">
      <div slot="head_bottom">
        <item-line></item-line>
        <div class="header-title">
          最终考核结果请以实际职级信息为准
        </div>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-formal-examine-content"
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
            <div class="list-right" @click="$_toMyFormalExamine(item)">
              <div class="list-icon">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
              <div class="list-num">{{ item.currentResult | getLevel }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">历史数据</div>
            <div class="list-right" @click="$_toHistryUat">
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
import native from "js-native-n22";
import { getMyFormalExamineMoth } from "../service/getData";

export default {
  name: "bkge-examine-formal-examine", //使用xx-xx-xx命名方式具体看操作文档
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
  async mounted() {
    console.log("%c formal-examine>生命周期>mounted", "color:green;", "");
    try {
      let code = await this.getRecommendCodeFromStorageNative();
      if (code == undefined) {
        Toast({
          content: "无法正确获取到代理人工号",
          position: "bottom",
          duration: 3000,
        });
        console.error("无法正确获取到代理人工号");
      } else {
        this.agentCode = code;
        this.AGENTCODE(this.agentCode);
        this.getMyFormalExamineMoth();
      }
    } catch (error) {
      this.agentCode = window.utils.cache.get("agentInfo").agentCode;
      this.AGENTCODE(this.agentCode);
      this.getMyFormalExamineMoth();
      console.log("插件调用失败,请确定使用环境为手机");
    }
  },
  watch: {},
  filters: {
    getLevel(item) {
      let level = "";
      switch (item) {
        case 1:
          level = "维持";
          break;
        case 2:
          level = "降级";
          break;
        case 3:
          level = "晋升";
          break;
        case 4:
          level = "解约";
          break;
      }
      return level;
    },
  },
  data() {
    return {
      swiperTop: 49,
      agentCode: "",
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
    };
  },
  methods: {
    ...mapMutations(["AGENTCODE"]),
    //通过插件获取代理人信息中的工号
    getRecommendCodeFromStorageNative() {
      return new Promise((resolve, reject) => {
        native.storage(
          {
            mode: 2,
            key: "userInfo",
          },
          content => {
            console.log(content);
            resolve(content.object.appLoginUser.agentCode);
          },
          error => {
            reject(error);
          },
        );
      });
    },
    $_toMyFormalExamine(item) {
      console.log("%c  TO正式考核", "color:green;", item);
      this.go("brokerageKpi/myFormalExamine?indexcalno=" + item.indexcalno);
    },
    $_toHistryUat() {
      console.log("%c $_toHistry TO正式考核2.0", "color:green;");
      let url = "";
      let lastUrl =
        ":8010/com.ifp.ipartner/proposalShare/index.html#/comprehensiveGexian/FormalAssessment/left1?isNewVer=1";
      let objUrl = window.globalConfig.rootUrl.split("//");
      let httpUrl = objUrl[1].split("/");
      if (window.globalConfig.rootUrl.includes("mitphone")) {
        console.log(httpUrl);
        url = objUrl[0] + "//" + httpUrl[0] + lastUrl;
      } else {
        url = "http://" + httpUrl[0] + lastUrl;
      }
      console.log(url);
      window.location.replace(url);
      // console.log(url);
      // Toast.info("此功能正在开发...");
    },
    getMyFormalExamineMoth() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.agentCode,
      };
      //isParms
      getMyFormalExamineMoth({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log(data.data);
          this.list = data.data;
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
.brokerageKpi-formal-examine {
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
  .brokerageKpi-formal-examine-content {
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
          }
        }
        .center {
          justify-content: center;
        }
      }
    }
  }
}
</style>
