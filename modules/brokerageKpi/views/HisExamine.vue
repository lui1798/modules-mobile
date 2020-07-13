<template>
  <div class="brokerageKpi-his-examine">
    <al-all-head>
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
      class="brokerageKpi-his-examine-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :swiperTop="swiperTop"
    >
      <div class="my-examine-content">
        <div class="my-examine-content-head">
          <div>考虑回执</div>
          <div
            @click="$_showConsidereceipt"
            class="arrow"
            :style="{ transform: isConsidereceiptShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_my_examine_down_arrow.png" />
          </div>
        </div>
        <div v-if="isConsidereceiptShow">
          <item-line></item-line>
          <div
            class="my-examine-content-detail"
            :class="index > 0 ? 'margin-top' : ''"
            v-for="(item, index) in haveReceipts"
            :key="index"
          >
            <div class="detail-title">
              <div class="detail-title-icon"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="detail-table-content">
              <div class="detail-table">
                <div class="detail-table-title">差值</div>
                <div class="detail-table-title">{{ item.dValue }}</div>
              </div>
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
        <div class="my-examine-content-head margin-top mar-bottom">
          <div>不考虑回执</div>
          <div
            @click="$_showNoConsidereceipt"
            class="arrow"
            :style="{ transform: isNoConsidereceiptShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_my_examine_down_arrow.png" />
          </div>
        </div>
        <div v-if="isNoConsidereceiptShow">
          <item-line></item-line>
          <div
            class="my-examine-content-detail"
            :class="index > 0 ? 'margin-top' : ''"
            v-for="(item, index) in haveReceipts"
            :key="index"
          >
            <div class="detail-title">
              <div class="detail-title-icon"></div>
              <div>{{ item.title }}</div>
            </div>
            <div class="detail-table-content">
              <div class="detail-table">
                <div class="detail-table-title">差值</div>
                <div class="detail-table-title">{{ item.dValue }}</div>
              </div>
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
import { AllHead, Content, TabBar, DropSelectItem } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getUserMaintain } from "../service/getData";
import rankName from "../common/rank.json";

export default {
  name: "bkge-examine-his-examine", //使用xx-xx-xx命名方式具体看操作文档
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
    [DropSelectItem.name]: DropSelectItem,
    [ItemLine.name]: ItemLine,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    ...mapState(["brokerageKpi"]),
  },
  mounted() {
    console.log("%c his-examine>生命周期>mounted", "color:green;", "");
    this.agentCode = this.$route.query["hisAgentCode"];
    if (this.brokerageKpi.hisTabs.length) {
      this.brokerageKpi.hisTabs.forEach((item, index) => {
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
      if (this.tabs.length && this.tabs[0].flag == "09") {
        this.swiperTop = 79;
        this.isPromotion = true;
      }
      this.getUserMaintain(this.tabs[0].flag);
    }
  },
  watch: {},
  data() {
    return {
      curIndex: 0,
      swiperTop: 50, //54 79
      tabs: [],
      agentCode: "",
      rank: 0,
      rankList: [],
      isConsidereceiptShow: true,
      isNoConsidereceiptShow: false,
      isPromotion: false,
      haveReceipts: [],
      noReceipts: [],
      resData: {},
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "HISTAbS",
    ]),
    changeTab(item, i, curIndex) {
      console.log("%c changeTab curIndex", "color:#00CD00", i + "======>" + curIndex);
      if (i == this.curIndex) {
        return;
      }
      if (item.flag != "09") {
        this.swiperTop = 44;
      } else {
        this.swiperTop = 79;
      }
      this.getUserMaintain(item.flag);
    },
    $_changeData(itemObj) {
      console.log("%c $_changeData", "color:#00CD00", itemObj);
      if (!this.resData[itemObj.name]) {
        return;
      }
      this.haveReceipts = this.resData[itemObj.name].haveReceipts;
      this.noReceipts = this.resData[itemObj.name].noReceipts;
    },
    $_showConsidereceipt() {
      this.isConsidereceiptShow = !this.isConsidereceiptShow;
    },
    $_showNoConsidereceipt() {
      this.isNoConsidereceiptShow = !this.isNoConsidereceiptShow;
    },
    getUserMaintain(listType) {
      console.log("%c getUserMaintain", "color:#00CD00");
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        listType: listType,
        agentCode: this.agentCode,
      };
      getUserMaintain({ data: request, config: axiosParams, method: "get", isParams: false }).then(
        data => {
          data.data.forEach(item => {
            this.haveReceipts = item.haveReceipts;
            this.noReceipts = item.noReceipts;
            // this.isConsidereceiptShow = true;
            if (this.tabs.length && this.tabs[this.curIndex].flag == "09") {
              let selectItem = {
                value: item.afterLevel,
                text: rankName[item.afterLevel],
              };
              this.resData[item.afterLevel] = item;
              this.rankList.push(selectItem);
            }
            this.rank = this.rankList[0].value;
          });
        },
        error => {
          console.log("%c getUserMaintain", "color:#00CD00", error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-his-examine {
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
  .brokerageKpi-his-examine-content {
    .my-examine-content {
      margin-top: 10px;
      overflow-y: scroll;
      padding-bottom: 60px;
      position: relative;
      .my-examine-content-head {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 18px 0 14px;
        background: rgba(255, 255, 255, 1);
        font-size: 16px;
        font-weight: 500;
        color: rgba(253, 185, 44, 1);
        .arrow {
          height: 100%;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 15px;
            height: 7px;
          }
        }
      }
      .my-examine-content-detail {
        background: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        padding: 14px 0 20px 14px;
        min-height: 132px;
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
          width: 100%;
          display: flex;
          .detail-table {
            display: flex;
            flex-direction: column;
            .detail-table-title {
              width: 116px;
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
