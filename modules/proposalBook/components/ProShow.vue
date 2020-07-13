<template>
  <div class="proposalBook-pro-show">
    <div class="pro-title" v-if="masterProData.length <= 0">
      <div>{{ firstProObj.name }}</div>
      <div>
        <span @click="changePro(firstProObj, 0)">修改</span>
      </div>
    </div>
    <div v-for="(mpro, mi) in masterProData" :key="mi">
      <div v-if="isEdit">
        <div class="pro-title">
          <div>{{ mpro.product[0].name }}</div>
          <div>
            <span v-show="isShow && mi !== 0" @click="deletePro(mpro, mi)">删除</span>
            <span v-show="isShow && mi !== 0">｜</span>
            <span @click="changePro(mpro, mi)">修改</span>
          </div>
        </div>
        <div v-show="mpro.product[0].amount" class="pro-amount">首年保费：{{ mpro.premium }}元</div>
      </div>
      <div class="ph-area" v-if="isShow">
        <div v-if="mi === 0 || isEdit" class="ph-area-header">
          <span v-for="(item, i) in tableTitle" :key="i">
            {{ item }}
          </span>
        </div>
        <div id="item" class="ph-area-data" v-for="(item, i) in mpro.product" :key="i">
          <div v-if="i < showLength">
            <div :class="['area', isEdit ? '' : 'table-title']">
              <span>
                <slot name="first" :item="item">
                  {{ item.name }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="second" :item="item">
                  {{ item.amount }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="three" :item="item">
                  {{ item.premium }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="four" :item="item">
                  {{ item.pay | keyValueFilter("pay", item.choose) }}
                </slot>
              </span>
            </div>
            <div class="area" v-if="tableTitle.length > 4">
              <span>
                <slot name="fiv" :item="item">
                  -
                </slot>
              </span>
            </div>
            <div class="area" v-if="tableTitle.length > 4">
              <span>
                <slot name="six" :item="item">
                  -
                </slot>
              </span>
            </div>
          </div>
        </div>
        <!-- <div v-for="(item, i) in mpro.fjProData" :key="i" class="ph-area-data">
          <div id="fj" v-if="item.isCheck && masterProData.length + i < showLength">
            <div class="area">
              <span>
                <slot name="first" :item="item">
                  {{ item.name }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="second" :item="item">
                  {{ item.dc || item.amount }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="three" :item="item">
                  {{ item.premium }}
                </slot>
              </span>
            </div>
            <div class="area">
              <span>
                <slot name="four" :item="item">
                  {{ item.jfqj }}
                </slot>
              </span>
            </div>
            <div class="area" v-if="tableTitle.length > 4">
              <span>
                <slot name="five" :item="item">
                  -
                </slot>
              </span>
            </div>
            <div class="area" v-if="tableTitle.length > 4">
              <span>
                <slot name="six" :item="item">
                  -
                </slot>
              </span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div v-if="isEdit && masterProData[0]" class="pro-add">
      <n22-button @click="addPro" type="primary" icon="close" plain inline round>
        新增主险
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
    showLength: {
      type: Number,
      default: 999,
    },
    mainSelect: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 0,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    tableTitle: {
      type: Array,
      default: () => {
        return [];
      },
    },
    firstProObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    masterProData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    fjProData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    isShow() {
      return (
        this.masterProData.findIndex(item => item.isCheck === true) > -1 ||
        this.fjProData.findIndex(item => item.isCheck === true) > -1 ||
        true
      );
    },
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
    changePro(item, i) {
      console.log("%c this.masterProData", "color:#00CD00", this.masterProData);
      this.$emit("changePro", item, i);
    },
    deletePro(item, i) {
      this.$emit("deletePro", item, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.proposalBook-pro-show {
  margin-top: 22px;
  margin-bottom: 22px;
  .pro-title {
    height: 15px;
    div:first-child {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 210px;
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
      .table-title {
        // display: block !important;
        // line-height: 13px;
        text-align: justify;
        span {
          text-align: justify !important;
        }
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
    // margin-top: 16px;
    float: right;
    ::v-deep .n22-icon-close {
      transform: rotate(45deg);
    }
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
