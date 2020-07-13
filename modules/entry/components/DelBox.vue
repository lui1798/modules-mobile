<template>
  <n22-popup v-model="isPopupShow">
    <div class="del-box">
      <div class="del-hint">
        <img @click="$_onBtnClick($event, models[0])" class="close" src="../assets/images/icon2_join_close.png" />
        <p class="text">确认删除该条数据？</p>
        <div class="button-content">
          <n22-button @click="$_onBtnClick($event, models[0])" class="button-cancel" type="primary">取消</n22-button>
          <div class="cross-blank"></div>
          <n22-button @click="$_onBtnClick($event, models[1])" class="button-confirm" type="primary">确定</n22-button>
        </div>
      </div>
    </div>
  </n22-popup>
</template>

<script>
import { Button, Icon, Popup } from "al-mobile";

export default {
  name: "del-box", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      //props定义样例
      type: Boolean,
      default: false,
    },
    models: {
      //props定义样例
      type: Array,
      required: true,
    },
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
  },
  computed: {},
  filters: {},
  data() {
    return {
      isPopupShow: this.value,
    };
  },
  activated() {},
  methods: {
    $_onBtnClick(event, action) {
      action.onClick && action.onClick(event, action);
      this.$emit("click", event, action);
    },
  },
  mounted() {},
  watch: {
    value(newVal) {
      this.isPopupShow = newVal;
    },
    isPopupShow(newVal) {
      this.$emit("input", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.del-box {
  .del-hint {
    width: 80%;
    padding: 18px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    .close {
      width: 22px;
      height: 22px;
      float: right;
    }
    .text {
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
    }
    .button-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button-confirm {
        width: 120px;
        height: 40px;
        background: rgba(253, 194, 72, 1);
        border-radius: 5px;
      }
      .cross-blank {
        width: 40px;
      }
      .button-cancel {
        width: 120px;
        height: 40px;
        background: rgba(216, 216, 216, 1);
        border-radius: 5px;
      }
      .n22-button.primary:after {
        border: none;
      }
    }
  }
}
</style>
