<template>
  <div class="share-button" v-show="isPopupShow">
    <div class="share-button">
      <div class="share-button-content">
        <div class="arrow-bottom" @click="$_onBtnClick($event, shareModel[2])"></div>
        <div class="item-content item-content-border">
          <div class="button-icon-content">
            <img class="icon" src="../assets/images/icon2_join_friend.png" />
          </div>
          <div @click="$_onBtnClick($event, shareModel[0])" class="button-font">{{ shareModel[0].desc }}</div>
        </div>
        <div class="item-content">
          <div class="button-icon-content">
            <img class="icon" src="../assets/images/icon2_join_group.png" />
          </div>
          <div @click="$_onBtnClick($event, shareModel[1])" class="button-font">{{ shareModel[1].desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "share-button", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      //props定义样例
      type: Boolean,
      default: false,
    },
    shareModel: {
      //props定义样例
      type: Array,
      required: true,
    },
  },
  components: {},
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
.share-button {
  .share-button-content {
    position: absolute;
    top: 110%;
    right: 3%;
    width: 35%;
    text-align: left;
    background: #fdb92c;
    color: #fff;
    border: 1px solid #fdb92c;
    border-radius: 7px;
    .item-content {
      flex: 1;
      margin-right: 3%;
      display: flex;
      align-items: center;
      line-height: 1.2rem;
      margin-right: 0;
      padding: 8%;
      justify-content: flex-start;
    }
    .item-content-border {
      border-bottom: 0.1px solid #fff;
    }
    .button-icon-content {
      width: 17px;
      height: 18px;
    }
    .icon {
      width: 100%;
      height: 100%;
    }
    .button-font {
      margin-left: 9px;
      font-size: 12px;
      font-weight: 400;
    }
    .arrow-bottom {
      top: -40%;
      right: 2%;
      width: 0;
      height: 0;
      font-size: 0;
      position: absolute;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 20px transparent;
      border-bottom: solid 20px transparent;
      border-bottom-color: #fdb92c;
    }
  }
}
</style>
