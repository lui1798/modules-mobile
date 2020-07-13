<template>
  <div class="brokerageKpi-my-formal-examine-details">
    <al-all-head :title="title">
      <div slot="head_bottom">
        <item-line></item-line>
        <div class="top-title" v-show="isPromotion">
          <div>
            <n22-drop-select
              class="my-rank"
              title="晋升后职级："
              v-model="rank"
              :options="rankList"
              pickerTitle="请选择职级"
              :itemObject="{ name: rank }"
              type="single"
              :isAppendTo="false"
              @changeData="$_changeData"
            ></n22-drop-select>
          </div>
        </div>
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="75"
          @change="changeTab"
        ></n22-tab-bar>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-my-formal-examine-details-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :swiperTop="swiperTop"
    >
      <div class="my-examine-content">
        <div>
          <div
            class="my-examine-content-detail"
            :class="index > 0 ? 'margin-top' : ''"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="detail-title">
              <div class="detail-title-icon"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="detail-table-content">
              <div class="detail-table">
                <div class="detail-table-title">目前达成</div>
                <div class="detail-table-title">{{ item.reach }}</div>
              </div>
              <div class="detail-table">
                <div class="detail-table-title border-right">标准</div>
                <div class="detail-table-title border-right">{{ item.standard }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="emptyCon"></div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, TabBar, DropSelectItem, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getUserFormalMaintain } from "../service/getData";
import rankName from "../common/rank.json";
export default {
  name: "brokerage-kpi-my-formal-examine-details", //使用xx-xx-xx命名方式具体看操作文档
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
    [TabBar.name]: TabBar,
    [ItemLine.name]: ItemLine,
    [DropSelectItem.name]: DropSelectItem,
  },
  computed: {
    ...mapState(["brokerageKpi"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c my-formal-examine-details>生命周期>mounted", "color:green;", "");
    if (this.brokerageKpi.myExamineTabs.length) {
      this.brokerageKpi.myExamineTabs.forEach((item, index) => {
        let tab = {
          label: item.name,
          name: index,
          listType: 1, //这个值不可修改不然就下拉刷新
          flag: item.type,
          mescroll: null,
          isListInit: false,
          isMescrollUp: false,
        };
        this.$set(this.tabs, index, tab);
      });
      if (this.tabs.length && this.tabs[0].flag == "03") {
        this.swiperTop = 79;
        this.isPromotion = true;
      }
      this.getUserFormalMaintain(this.tabs[0].flag);
    } else {
      Toast.info(`请返回重试！`);
    }
  },
  watch: {},
  data() {
    return {
      title: this.$route.query["indexcalno"] + "正式考核",
      curIndex: 0,
      swiperTop: 44, //54 79
      tabs: [],
      rank: 0,
      rankList: [],
      isPromotion: false,
      haveReceipts: [],
      noReceipts: [],
      resData: {},
      indexcalno: this.$route.query["indexcalno"],
      list: [],
    };
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "MYEXAMINETABS",
    ]),
    changeTab(item, i, curIndex) {
      console.log("%c changeTab curIndex", "color:#00CD00", i + "======>" + curIndex);
      console.log("%c changeTab curIndex", "color:#00CD00", item);
      if (i == this.curIndex) {
        return;
      }
      if (item.flag != "03") {
        this.swiperTop = 44;
        this.isPromotion = false;
      } else {
        this.swiperTop = 79;
        this.isPromotion = true;
      }
      this.getUserFormalMaintain(item.flag);
      //如果contet内容区使用了列表content-list组件并且开启了needSwiper通过ref去操作content-list组件的changeTab切换内容区（具体可以移步content查看参数）
    },
    $_changeData(itemObj) {
      console.log("%c $_changeData", "color:#00CD00", itemObj);
      if (!this.resData[itemObj.name]) {
        return;
      }
      this.list = this.resData[itemObj.name].datas;
    },
    getUserFormalMaintain(listType) {
      console.log("%c getUserFormalMaintain", "color:#00CD00");
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        type: listType,
        agentCode: this.brokerageKpi.agentCode,
        indexcalno: this.indexcalno,
      };
      if (this.rankList.length && this.tabs[this.curIndex].flag == "03") {
        this.rankList = [];
      }
      getUserFormalMaintain({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log(data.data);
          data.data.forEach(item => {
            this.list = item.datas;
            if (this.tabs.length && this.tabs[this.curIndex].flag == "03") {
              let selectItem = {
                value: item.afterLevel,
                text: rankName[item.afterLevel],
              };
              this.resData[item.afterLevel] = item;
              this.rankList.push(selectItem);
              this.rank = this.rankList[0].value;
            }
          });
        },
        error => {
          console.log("%c getUserFormalMaintain", "color:#00CD00", error);
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-my-formal-examine-details {
  .top-title {
    width: 100%;
    height: 35px;
    background: rgba(248, 248, 248, 1);
    box-sizing: border-box;
    padding-left: 18px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(53, 190, 76, 1);
  }
  .my-rank {
    color: rgba(53, 190, 76, 1);
  }
  ::v-deep .n22-field-item-right-addon {
    color: rgba(53, 190, 76, 1);
  }
  .brokerageKpi-my-formal-examine-details-content {
    .my-examine-content {
      margin-top: 10px;
      overflow-y: scroll;
      padding-bottom: 60px;
      position: relative;
      .my-examine-content-detail {
        background: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        padding: 14px 0 20px 14px;
        min-height: 132px;
        display: flex;
        flex-direction: column;
        .detail-title {
          height: 22px;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          color: rgba(253, 185, 44, 1);
          padding-bottom: 8px;
          .detail-title-icon {
            width: 5px;
            height: 12px;
            background: rgba(253, 185, 44, 1);
            border-radius: 3px;
            margin-right: 7px;
          }
        }
        .detail-table-content {
          width: 348px;
          display: flex;
          flex: 1;
          .detail-table {
            display: flex;
            flex-direction: column;
            flex: 1;
            .detail-table-title {
              flex: 1;
              height: 35px;
              box-sizing: border-box;
              font-size: 12px;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
              border: 1px solid rgba(213, 213, 213, 1);
              border-right: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .border-right {
              border-right: 1px solid rgba(213, 213, 213, 1);
            }
            :first-child {
              background: rgba(255, 251, 244, 1);
              font-size: 10px;
              border-bottom: none;
            }
          }
        }
      }
      .margin-top {
        margin-top: 10px;
      }
      .mar-bottom {
        margin-top: 32px;
      }
      .emptyCon {
        width: 100%;
        height: 120px;
      }
    }
  }
}
</style>
