<template>
  <div class="brokerageKpi-newcomer-allowance">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-newcomer-allowance-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div>当月NPC</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">14</div>
          </div>
        </div>
      </div>
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div>对应档次</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">14</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">14</div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
import ItemLine from "../components/ItemLine";
export default {
  name: "bkge-examine-newcomer-allowance", //使用xx-xx-xx命名方式具体看操作文档
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
    [ItemLine.name]: ItemLine,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c newcomer-allowance>生命周期>mounted", "color:green;", "");
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
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-newcomer-allowance {
  .brokerageKpi-newcomer-allowance-content {
    .content-detail {
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      padding: 14px 0 20px 14px;
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
  }
}
</style>
