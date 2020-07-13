<template>
  <div class="brokerageKpi-brokerage-warning">
    <al-all-head back-url="hybrid-back">
      <div slot="head_bottom">
        <item-line></item-line>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-brokerage-warning-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="header">
        <div class="header-number">{{ res.monthExpect ? res.monthExpect : "0" }}</div>
        <div class="header-num-title">本月预估（元）</div>
        <div class="header-bottom">
          <div class="header-bottom-detail">
            <div class="header-bottom-detail-number">{{ res.pFYC ? res.pFYC : "0" }}</div>
            <div class="header-bottom-detail-title">个人FYC</div>
          </div>
          <div class="header-bottom-line"></div>
          <div class="header-bottom-detail header-to-detail">
            <div class="header-icon" @click="toDirectCommission">
              <n22-icon name="right_arrow"></n22-icon>
            </div>
            <div>
              <div class="header-bottom-detail-number">{{ res.direct ? res.direct : "0" }}</div>
              <div class="header-bottom-detail-title">直接佣金</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bk-content">
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left list-title">基本法律津贴待遇（元）</div>
            <div>0</div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left color-y">新人津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon" @click="toNewcomerAllowance">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">增员辅导奖</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left color-y">季度展业奖</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon" @click="toQuarterlyExhibitionAward">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">营销主任管理津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left color-y">直辖组管理津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon" @click="toAdministrationAllowance">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">精英辅导奖</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left color-y">属员辅导奖</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon" @click="toStaffCoachingAward">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">职务津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">直辖部管理津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">直辖区管理津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育组津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育部津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育区津贴</div>
            <div class="list-right">
              <div class="list-num">0</div>
              <div class="list-icon"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bk-content">
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left list-title">历史收入（元）</div>
            <div class="list-right" @click="toHistorcalIncome">
              <div>查看更多</div>
              <div class="list-icon history">
                <n22-icon name="right_arrow"></n22-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot-canvas-content">
        <canvas id="lineChart" canvas-id="lineChart"></canvas>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import F2 from "@antv/f2";
import native from "js-native-n22";
import { getBrokeBase } from "../service/getData";

let lineChart = null;
export default {
  name: "bkge-examine-brokerage-warning", //使用xx-xx-xx命名方式具体看操作文档
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
    console.log("%c brokerage-warning>生命周期>mounted", "color:green;", "");
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
        this.getBrokeBase();
      }
    } catch (error) {
      this.agentCode = window.utils.cache.get("agentInfo").agentCode;
      this.AGENTCODE(this.agentCode);
      this.getBrokeBase();
      console.log("插件调用失败,请确定使用环境为手机");
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
      res: {},
      agentCode: "",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
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
    toDirectCommission() {
      console.log("%c toDirectCommission TO直接佣金", "color:green;", "");
      // Toast.info("此功能正在开发...");
      this.go("brokerageKpi/directCommissionDetails");
    },
    toNewcomerAllowance() {
      console.log("%c toNewcomerAllowance TO新人津贴", "color:green;", "");
      Toast.info("此功能正在开发...");
      // this.go("brokerageKpi/newcomerAllowance");
    },
    toQuarterlyExhibitionAward() {
      console.log("%c toQuarterlyExhibitionAward To季度展业奖", "color:green;", "");
      Toast.info("此功能正在开发...");
      // this.go("brokerageKpi/quarterlyExhibitionAward");
    },
    toAdministrationAllowance() {
      console.log("%c toAdministrationAllowance TO直辖组管理津贴", "color:green;", "");
      Toast.info("此功能正在开发...");
      // this.go("brokerageKpi/administrationAllowance");
    },
    toStaffCoachingAward() {
      console.log("%c toStaffCoachingAward TO属员辅导奖", "color:green;", "");
      Toast.info("此功能正在开发...");
      // this.go("brokerageKpi/staffCoachingAward");
    },
    toHistorcalIncome() {
      console.log("%c toHistorcalIncome TO历史收入", "color:green;", "");
      this.go("brokerageKpi/historicalIncome?agentCode=" + this.agentCode);
    },
    drawLineArea(canvsId, container, data, xtick = 6, dateType, callback) {
      container = new F2.Chart({
        el: document.getElementById(canvsId),
        width: window.innerWidth * 0.9,
        pixelRatio: window.devicePixelRatio,
      });
      container.source(data, {
        indexcalno: {
          type: "cat",
          mask: "YYYYMMDD",
          tickCount: xtick,
          range: [0, 1],
        },
        value: {
          type: "linear",
          tickCount: 5,
        },
      });
      container.axis("value", {
        label(text) {
          const cfx = {};
          let newtext = text;
          cfx.text = newtext;
          return cfx;
        },
      });
      container.axis("date", {
        label(text, index, total) {
          const cfg = {
            textAlign: "center",
          };
          if (index === 0) {
            cfg.textAlign = "center";
          } else if (index > 0 && index === total - 1) {
            cfg.textAlign = "right";
          }
          cfg.text = text;
          return cfg;
        },
      });
      // container.coord('rect');
      container.legend({
        align: "center",
        itemWidth: null, // 图例项按照实际宽度渲染
        position: "top",
        marker: "square",
      });
      container.tooltip({
        showCrosshairs: true,
        layout: "vertical",
        custom: false, // 自定义 tooltip 内容框
        onChange(obj) {
          let items = obj.items;
          items.forEach(function(item) {
            // console.log(item);
            // item.name = item.name + " " + item.title;
            item.name = item.title;
          });
        },
        // onHide(obj) {},
      });
      container
        .line()
        .position("indexcalno*value")
        .color("#FFD866");
      // .color("type", ["#FFD866"]);
      container
        .area()
        .position("indexcalno*value")
        .color("#FDB92C");
      container.animate(true);
      container.render();
      callback(container);
    },
    getBrokeBase() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.agentCode,
      };
      //isParms
      getBrokeBase({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getBrokeBase", "color:#00CD00", data.data);
          this.res = data.data;
          if (data.data.history.length) {
            this.drawLineArea("lineChart", lineChart, data.data.history, 6, 1, res => {
              lineChart = res;
            });
          }
        },
        error => {
          console.log("%c getBrokeBase", "color:#00CD00", error);
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-brokerage-warning {
  .brokerageKpi-brokerage-warning-content {
    ::v-deep .n22-icon {
      color: #979797;
    }
    .header {
      width: 100%;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 10px 0 12px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .header-number {
        height: 33px;
        font-size: 24px;
        font-weight: 500;
        color: rgba(253, 185, 44, 1);
        margin-bottom: 5px;
      }
      .header-num-title {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(165, 165, 165, 1);
        margin-bottom: 10px;
      }
      .header-bottom {
        width: 100%;
        display: flex;
        .header-bottom-detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          font-weight: 400;
          color: rgba(165, 165, 165, 1);
          .header-bottom-detail-number {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            margin-bottom: 5px;
            color: rgba(51, 51, 51, 1);
            position: relative;
          }
          .header-bottom-detail-title {
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .header-icon {
            margin: 0 20px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .header-to-detail {
          flex-direction: row-reverse;
          align-items: center;
          display: flex;
        }
        .header-bottom-line {
          width: 1px;
          height: 48px;
          background: rgba(236, 237, 239, 1);
        }
      }
    }
    .bk-content {
      width: 100%;
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
          padding: 0 19px 0 14px;
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
          .color-y {
            color: rgba(253, 185, 44, 1);
          }
          .list-right {
            display: flex;
            height: 100%;
            align-items: center;
            color: rgba(150, 150, 150, 1);
            .list-num {
              text-align: right;
            }
            .list-icon {
              height: 100%;
              width: 10px;
              margin-left: 20px;
              display: flex;
              align-items: center;
            }
            .history {
              margin: 0;
            }
          }
        }
        .bk-detail-list:first-child {
          font-size: 16px;
        }
      }
      .bk-detail:last-child {
        border-bottom: none;
      }
    }
    .foot-canvas-content {
      margin-top: 10px;
      width: 100%;
      height: 200px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 24px 24px 20px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
