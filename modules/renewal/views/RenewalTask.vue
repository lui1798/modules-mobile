<template>
  <div>
    <al-all-head title="续期任务">
      <div slot="head_bottom">
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          @change="changeTab"
        ></n22-tab-bar>
      </div>
    </al-all-head>
    <al-content
      v-model="curIndex"
      ref="listSwiper"
      :swiperTop="44"
      :tabWidth="187.5"
      :tabs="tabs"
      :page="page"
      @selectListByPage="selectListByPage"
      isMescrollLoadList
    >
      <!-- 列表数据 -->
      <div slot-scope="props">
        <renewal-list
          :dataList="props.list"
          :swiperIndex="props.swiperIndex"
          :id="props.id"
          @policyDetails="policyDetails"
          @renewalService="renewalService"
          @historyService="historyService"
        ></renewal-list>
      </div>
    </al-content>
    <!-- 续收服务动作面板 -->
    <n22-action-sheet
      v-model="value"
      :title="title"
      :cancel-text="cancelText"
      :options="options"
      @selected="$_selected"
      @cancel="$_cancel"
    ></n22-action-sheet>
    <!-- 弹出框 -->
    <n22-popup v-model="isPopupShow" :mask-closable="false">
      <div class="call_box">
        <div class="border">
          <div class="border_two">
            <img src="../assets/images/call.png" alt="" />
          </div>
        </div>
        <!-- <div class="boda">您将拨打的电话号码为</div> -->
      </div>
    </n22-popup>
  </div>
</template>

<script>
import RenewalList from "../components/RenewalList";
import { AllHead, Content, TabBar, ActionSheet, Popup } from "al-mobile";
const searchModelJson = { name: "", age: "" };
export default {
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [TabBar.name]: TabBar,
    [RenewalList.name]: RenewalList,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {},
  watch: {},
  data() {
    return {
      searchModel: JSON.parse(JSON.stringify(searchModelJson)),
      page: {
        pagenum: 1,
        size: 10,
      },
      curIndex: 0,
      tabs: [
        //content组件对象
        {
          label: "续收任务",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
        },
        {
          label: "挽单任务",
          name: 1,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
        },
      ],
      value: false,
      title: "",
      options: [
        {
          label: "拨打客户电话",
          value: 0,
        },
        {
          label: "发送服务短信",
          value: 1,
        },
        {
          label: "提醒变更账号",
          value: 2,
        },
      ],
      cancelText: "取消",
      isPopupShow: false,
    };
  },
  methods: {
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      //如果contet内容区使用了列表content-list组件并且开启了needSwiper通过ref去操作content-list组件的changeTab切换内容区（具体可以移步content查看参数）
      console.log("%c this.$refs.listSwiper", "color:#00CD00", this.$refs.listSwiper);
      this.$refs.listSwiper.changeTab && this.$refs.listSwiper.changeTab(i);
      this.tabs[i].mescroll.triggerDownScroll();
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      //   console.log(tabIndex, item, pageNum, pageSize, successCallback, errorCallback);
      var listData = [
        { field1: "10日未交", field2: "MH1128111110", field3: "张三", field4: "2020/11/08", field5: "11280" },
        { field1: "5日未交", field2: "MH1128111112", field3: "李四", field4: "2020/11/08", field5: "10010" },
      ];
      if (listData.length > 0) {
        successCallback && successCallback(listData);
      } else {
        errorCallback && errorCallback();
      }
    },
    policyDetails() {
      //保单详情
      this.$router.push({
        path: "policyDetails",
      });
    },
    renewalService() {
      //续收服务
      this.value = true;
    },
    historyService() {
      //历史服务
      console.log("历史服务");
    },
    $_selected(item) {
      console.log("action-sheet selected:", JSON.stringify(item));
      switch (item.value) {
        case 0:
          this.isPopupShow = true;
          break;
        case 1:
          console.log(item.label);
          break;
        default:
          console.log(item.label);
      }
    },
    $_cancel() {
      console.log("action-sheet cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.call_box {
  width: 315px;
  background: #fff;
  padding: 18px 0 36px 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  .border {
    width: 97px;
    height: 97px;
    border: 1px solid rgba(255, 240, 208, 1);
    border-radius: 50%;
    padding: 11px;
    .border_two {
      width: 100%;
      height: 100%;
      border: 1px solid #fdc248;
      border-radius: 50%;
      img {
        display: block;
        width: 52px;
        height: 52px;
      }
    }
  }
}
.border,
.border_two {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
