<template>
  <div class="entry-card-scan">
    <al-all-head></al-all-head>
    <al-content class="entry-card-scan-content" ref="insureMessage" :tabs="tabs" :isMescrollDown="true" :isToTop="true">
      <div class="card-scan-box">
        <div class="card-scan-title">
          请上传您的身份证正反面
        </div>
        <div class="card-scan-content">
          <img src="../assets/images/icon2_join_card_p.png" />
          <n22-button type="primary">上传身份证证正面</n22-button>
        </div>
        <div class="card-scan-content">
          <img src="../assets/images/icon2_join_card_b.png" />
          <n22-button type="primary">上传身份证证反面</n22-button>
        </div>
        <div class="card-scan-child-title">
          照片要求
        </div>
        <div class="card-scan-hint">
          <div>
            <img src="../assets/images/icon2_join_card_hint_1.png" />
          </div>
          <div>
            <img src="../assets/images/icon2_join_card_hint_2.png" />
          </div>
          <div>
            <img src="../assets/images/icon2_join_card_hint_3.png" />
          </div>
          <div>
            <img src="../assets/images/icon2_join_card_hint_4.png" />
          </div>
        </div>
        <div class="card-scan-child-button">
          <n22-button type="primary">证件识别</n22-button>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button } from "al-mobile";
export default {
  name: "join-company-card-scan", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c card-scan>生命周期>mounted", "color:green;", "");
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
.entry-card-scan {
  .entry-card-scan-content {
    .card-scan-box {
      background: #fff;
      text-align: center;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      .card-scan-title {
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-top: 22px;
        margin-bottom: 22px;
      }
      .card-scan-content {
        background: rgba(253, 185, 44, 0.1);
        border-radius: 10px;
        margin-top: 16.5px;
        margin-bottom: 16.5px;
        margin-left: 33px;
        margin-right: 33px;
        img {
          width: 190px;
          height: 110px;
          margin-top: 13px;
          margin-bottom: 13px;
        }
        .n22-button {
          border-radius: 0 0 10px 10px;
        }
        .n22-button.primary:after {
          border: none;
        }
      }
      .card-scan-child-title {
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-top: 16.5px;
        margin-bottom: 16.5px;
      }
      .card-scan-hint {
        display: flex;
        justify-content: space-around;
        margin-left: 11px;
        margin-right: 11px;
        img {
          width: 83px;
          height: 70px;
        }
      }
      .card-scan-child-button {
        margin-left: 90px;
        margin-right: 90px;
        margin-bottom: 45px;
        margin-top: 45px;
      }
    }
  }
}
</style>
