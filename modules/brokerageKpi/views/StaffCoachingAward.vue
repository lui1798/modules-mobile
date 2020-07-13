<template>
  <div class="brokerageKpi-staff-coaching-award">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-staff-coaching-award-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="bk-content">
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">达成1500元NPC人数</div>
            <div class="list-right">
              <div class="list-num">20人</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">属员辅导奖金额</div>
            <div class="list-right">
              <div class="list-num">8000元</div>
            </div>
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
  name: "bkge-examine-staff-coaching-award", //使用xx-xx-xx命名方式具体看操作文档
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
    console.log("%c staff-coaching-award>生命周期>mounted", "color:green;", "");
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
.brokerageKpi-staff-coaching-award {
  .brokerageKpi-staff-coaching-award-content {
    .bk-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
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
            display: flex;
            height: 100%;
            align-items: center;
            color: rgba(150, 150, 150, 1);
            font-size: 12px;
            .list-num {
              text-align: right;
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
      }
    }
  }
}
</style>
