<template>
  <div class="brokerageKpi-direct-commission-details">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
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
    <al-content-list
      class="brokerageKpi-direct-commission-details-content"
      ref="listSwiper"
      :needSwiper="true"
      :tabs="tabs"
      :swiperTop="swiperTop"
      :isMescrollDown="false"
      :isToTop="true"
      isMescrollLoadList
      :isAutoMescrollDown="false"
      :page="page"
      @loadMoreData="loadMoreData"
      htmlNodata="<p class='upwarp-nodata'>到底了，无更多数据</p>"
    >
      <div class="content">
        <div class="content-detail" v-for="(item, index) in tabs[curIndex].list" :key="index">
          <div class="detail-title">
            <div class="detail-title-icon"></div>
            <div>保单号：{{ item.contno }}</div>
          </div>
          <div class="detail-table-content">
            <div class="detail-table flex-one">
              <div class="detail-table-title">投保人</div>
              <div class="detail-table-title">{{ item.appntname }}</div>
            </div>
            <div class="detail-table flex-one">
              <div class="detail-table-title">被保人</div>
              <div class="detail-table-title">{{ item.insureName }}</div>
            </div>
            <div class="detail-table flex-three">
              <div class="detail-table-title">生效日期</div>
              <div class="detail-table-title">{{ item.cvalidate }}</div>
            </div>
            <div class="detail-table flex-three">
              <div class="detail-table-title">回执日期</div>
              <div class="detail-table-title">{{ item.getpoldate }}</div>
            </div>
            <div class="detail-table flex-two">
              <div class="detail-table-title">保费</div>
              <div class="detail-table-title">{{ item.transmoney }}</div>
            </div>
            <div class="detail-table flex-two">
              <div class="detail-table-title border-right">实发佣金</div>
              <div class="detail-table-title border-right">{{ item.fyc }}</div>
            </div>
          </div>
        </div>
      </div>
    </al-content-list>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, ContentList, Icon, TabBar, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getBrokeirDectInfo } from "../service/getData";
export default {
  name: "bkge-examine-direct-commission-details", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    ItemLine,
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [ContentList.name]: ContentList,
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
    [ItemLine.name]: ItemLine,
  },
  computed: {
    ...mapState(["brokerageKpi"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c direct-commission-details>生命周期>mounted", "color:green;", "");
    if (this.brokerageKpi.agentCode && this.brokerageKpi.agentCode != "") {
      this.tabs[this.curIndex].mescroll.resetUpScroll(false);
    } else {
      Toast.info("请返回重试！");
    }
  },
  watch: {},
  data() {
    return {
      curIndex: 0,
      swiperTop: 44, //54 79
      tabs: [
        //content组件对象
        {
          label: "新单",
          name: 0,
          listType: "0",
          flag: 1,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "loadMoreData",
          emptyProp: {
            icon: "", //数据为空时的图片
            tip: "未查到数据", // 提示
          },
        },
        {
          label: "续期",
          name: 1,
          listType: "1",
          flag: 2,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "loadMoreData",
          emptyProp: {
            icon: "", //数据为空时的图片
            tip: "未查到数据", // 提示
          },
        },
      ],
      //分页参数
      page: {
        pageNo: 1,
        pageSize: 10,
        time: null,
      },
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations(["AGENTCODE"]),
    changeTab(item, i, curIndex) {
      console.log("%c changeTab curIndex", "color:#00CD00", curIndex);
      this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(i);
      this.tabs[i].mescroll.triggerDownScroll();
    },
    loadMoreData(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      console.log("%c selectListByPage", "color:#00CD00", tabIndex);
      this.getBrokeirDectInfo(
        item.flag,
        pageNum,
        pageSize,
        body => {
          console.log(body);
          successCallback && successCallback(body);
        },
        error => {
          Toast.info(error);
          errorCallback && errorCallback(error);
        },
      );
    },
    getBrokeirDectInfo(type, pageNo, pageSize, successCallback, errorCallback) {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.brokerageKpi.agentCode,
        type: type,
        pageSize: pageSize,
        pageNo: pageNo,
      };
      //isParms
      getBrokeirDectInfo({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getBrokeirDectInfo", "color:#00CD00", data.data);
          successCallback && successCallback(data.data);
        },
        error => {
          console.log("%c getBrokeirDectInfo", "color:#00CD00", error);
          errorCallback && errorCallback();
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-direct-commission-details {
  .brokerageKpi-direct-commission-details-content {
    background: #ffffff;
    .swiper-wrapper {
      background: #ffffff;
    }
    .content {
      background: #fff;
      margin-top: 10px;
      margin-bottom: 60px;
      .content-detail {
        background: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        padding: 14px 0 20px 14px;
        border-bottom: 1px solid rgba(236, 237, 239, 1);
        .detail-title {
          height: 22px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
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
          .detail-table {
            display: flex;
            flex-direction: column;
            .detail-table-title {
              height: 35px;
              box-sizing: border-box;
              font-size: 10px;
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

          .flex-one {
            flex: 1;
          }

          .flex-two {
            flex: 1.5;
          }

          .flex-three {
            flex: 2;
          }
        }
      }
    }
  }
}
</style>
