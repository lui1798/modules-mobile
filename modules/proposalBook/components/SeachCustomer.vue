<template>
  <n22-popup v-model="isPopupShow" position="top" @maskClick="cancelMask">
    <n22-popup-title-bar :title="title" @confirm="cancelMask">
      <template slot="confirm">
        <n22-icon name="close" size="lg"></n22-icon>
      </template>
      <item-line></item-line>
    </n22-popup-title-bar>
    <div class="seach-content">
      <div class="flexs flex" style="line-height: 1.1rem;padding: 4% 0 4% 0;">
        <div class="info-left">
          <img src="../assets/images/images/seach.png" alt width="16" height="16" class="info-left-img" />
          <span class="seach-icon">搜索条件</span>
        </div>
      </div>
      <item-line></item-line>
      <div class="item-input-content">
        <n22-input-item
          title="客户姓名"
          placeholder="请输入您要查询的客户姓名"
          align="right"
          id="seachname"
          name="seachname"
          v-model="searchParameter.customerName"
        ></n22-input-item>
      </div>
      <div class="item-input-content">
        <n22-input-item
          type="phone"
          title="手机号码"
          data-vv-as="手机号码"
          placeholder="请输入您要查询的手机号码"
          align="right"
          id="seachphone"
          name="seachphone"
          v-model="searchParameter.phoneNumber"
        ></n22-input-item>
      </div>
      <div class="item-input-content">
        <n22-input-item
          type="digit"
          title="证件号码"
          data-vv-as="证件号码"
          placeholder="请输入您要查询的证件号码"
          align="right"
          maxlength="18"
          id="idNo"
          name="idNo"
          v-model="searchParameter.idNo"
        ></n22-input-item>
      </div>
      <div class="button-content">
        <n22-button class="button-cancel" type="primary" @click="cancelMask">取消</n22-button>
        <n22-button class="button-confirm" type="primary" @click="$_seachClick">查询</n22-button>
      </div>
    </div>
  </n22-popup>
</template>

<script>
import { Icon, InputItem, Popup, PopupTitleBar, Button } from "al-mobile";
import ItemLine from "./ItemLine";

export default {
  name: "SeachCustomer",
  props: {
    isShow: {
      //props定义样例
      type: Boolean,
      default: false,
    },
  },
  components: {
    [Icon.name]: Icon, //引入组件样例如此
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [ItemLine.name]: ItemLine,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
  },
  computed: {},
  data() {
    return {
      isPopupShow: this.isShow,
      searchParameter: {
        customerName: "",
        phoneNumber: "",
        idNo: "",
      },
      title: "客户查询",
      swiperTop: 2,
      curIndex: 0,
      aa: false,
      customerType: "1",
      search_tag: "",
    };
  },
  activated() {},
  methods: {
    $_seachClick() {
      this.$emit("seachFun", this.searchParameter);
    },
    cancelMask() {
      this.$emit("closeFun");
    },
    cancel() {
      this.searchParameter = {
        customerName: "",
        phoneNumber: "",
        idNo: "",
      };
      this.$emit("closeFun", this.searchParameter);
    },
  },
  mounted() {},
  watch: {
    isShow(newVal) {
      this.isPopupShow = newVal;
    },
  },
};
</script>

<style scoped lang="scss">
.seach-content {
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2%;
  .flexs {
    display: flex;
    align-items: center;
  }
  .flex {
    flex: 1;
    justify-content: space-between;
    margin-right: 3%;
  }
  .info-left {
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  input::-webkit-input-placeholder {
    font-size: 14px;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }
  .seach-icon {
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-left: 5px;
  }

  .item-input-content {
    height: 50px;
    border-bottom: 1px solid #ecedef;
    box-sizing: border-box;
    padding: 0 15px;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*padding: 0 15px;*/
    height: 40px;
    .button-confirm {
      flex: 1;
      height: 40px;
      background: rgba(253, 194, 72, 1);
    }
    .button-cancel {
      flex: 1;
      height: 40px;
      background: rgb(255, 255, 255);
      color: rgb(168, 168, 168);
    }
    .n22-button.primary:after {
      border: none;
    }
  }
}
</style>
