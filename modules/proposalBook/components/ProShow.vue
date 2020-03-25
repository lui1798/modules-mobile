<template>
  <div class="proposalBook-pro-show">
    <div class="pro-title">
      <div>{{ masterProData[0] && masterProData[0].name }}</div>
      <div v-show="isShow">
        <span @click="deletePro(masterProData[0])">删除</span>
        <span>｜</span>
        <span @click="changePro(masterProData[0])">修改</span>
      </div>
    </div>
    <div class="pro-amount">首期保费：{{ masterProData[0].amount }}元</div>
    <div class="ph-area" v-if="isShow">
      <div class="ph-area-header">
        <span>险种</span>
        <span>保额</span>
        <span>保费</span>
        <span>交费期</span>
      </div>
      <div>
        <div v-for="(item, i) in fjProData" :key="i" class="ph-area-data">
          <div v-if="item.isCheck">
            <div class="area">
              <span>{{ item.name }}</span>
            </div>
            <div class="area">
              <span>{{ item.amount }}</span>
            </div>
            <div class="area">
              <span>{{ item.premium }}</span>
            </div>
            <div class="area">
              <span>{{ item.nj }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pro-add">
      <n22-button @click="addPro" type="primary" icon="add_pro" plain inline>
        新增附加险
      </n22-button>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button } from "al-mobile";
export default {
  name: "proposal-book-pro-show", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    masterProData: {
      // props定义样例
      type: Array,
      default: () => {
        return [];
      }
    },
    fjProData: {
      // props定义样例
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    isShow() {
      return this.fjProData.findIndex(item => item.isCheck === true) > -1;
    }
  },
  mounted() {
    console.log("%c pro-show>生命周期>mounted", "color:green;", "");
  },
  watch: {},
  data() {
    return {};
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    addPro() {
      this.$emit("addPro");
    },
    changePro(item) {
      this.$emit("changePro", item);
    },
    deletePro(item) {
      this.$emit("deletePro", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.proposalBook-pro-show {
  .pro-title {
    height: 15px;
    div:first-child {
      float: left;
    }
    div:last-child {
      float: right;
      font-size: 14px;
      color: $theme-color;
      span:nth-child(2) {
        color: #efefef;
        height: 10px;
      }
    }
  }
  .pro-amount {
    margin-top: 10px;
    font-size: 12px;
    color: #565656;
  }
  .ph-area {
    margin-top: 22px;
    border-radius: 5px;
    background-color: #fff;
    color: #999999;
    .ph-area-header {
      display: flex;
      justify-content: space-around;
      line-height: 30px;
      height: 30px;
      border-left: 1px solid #efefef;
      border-top: 1px solid #efefef;
      border-bottom: 1px solid #efefef;
      span {
        border-right: 1px solid #efefef;
        width: 22%;
        font-size: 13px;
        text-align: center;
      }
      span:first-child {
        width: 34%;
      }
    }
    .ph-area-data {
      .area {
        border-left: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
      }
      div {
        display: flex;
        justify-content: space-around;
        height: 44px;
        div {
          display: flex;
          width: 22%;
        }
        div:last-child {
          border-right: 1px solid #efefef;
        }
        span {
          margin: auto;
          font-size: 12px;
          text-align: center;
        }
        div:first-child {
          width: 34%;
        }
      }
    }
  }
  .pro-add {
    margin-top: 16px;
    float: right;
    .n22-button {
      height: 27px;
      width: 113px;
      font-size: 13px;
      font-weight: 400;
      ::v-deep .n22-icon {
        color: #ffba01;
      }
    }
  }
}
</style>
