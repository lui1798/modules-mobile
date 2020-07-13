<template>
  <transition name="n22-fade-left">
    <div class="side-slip-seach" v-show="isShowSeach">
      <div class="side-slip-seach">
        <div class="side-slip-seach-content">
          <div class="mark-div" @click="$_close"></div>
          <div class="item-content">
            <div class="item-top">
              <img class="head-icon" src="../assets/images/icon2_join_search_title.png" alt="" />
              <div class="item-top-text">查询条件</div>
            </div>
            <div class="item-line"></div>
            <div class="item-input-content">
              <n22-input-item
                title="姓名"
                id="seachname"
                name="seachname"
                v-model="seach.name"
                placeholder="请输入您的姓名"
                align="right"
              ></n22-input-item>
            </div>
            <div class="item-sex-content item-input-content">
              <n22-radio-item v-model="seach.sex" title="性别" name="radio2" :options="sexOptions"></n22-radio-item>
            </div>
            <div class="item-input-content">
              <n22-drop-select
                class="my-age-c"
                title="最小年龄"
                v-model="seach.startAge"
                pickerTitle="请选择年龄区间"
                :itemObject="{ name: 'seach.age' }"
                selectDefaultValue="30"
                :options="ageOptions"
                ispickerValue="请选择年龄区间"
                type="single"
              ></n22-drop-select>
            </div>
            <div class="item-input-content">
              <n22-drop-select
                class="my-age-c"
                title="最大年龄"
                v-model="seach.endAge"
                pickerTitle="请选择年龄区间"
                :itemObject="{ name: 'seach.age' }"
                selectDefaultValue="30"
                :options="ageOptions"
                ispickerValue="请选择年龄区间"
                type="single"
              ></n22-drop-select>
            </div>
            <div class="item-input-content">
              <n22-input-item
                type="phone"
                title="手机号"
                id="seachphone"
                name="seachphone"
                v-model="seach.phone"
                data-vv-as="手机号"
                placeholder="请输入手机号"
                align="right"
              ></n22-input-item>
            </div>
            <div class="button-content">
              <n22-button class="button-cancel" type="primary" @click="$_clearInput">重置</n22-button>
              <n22-button class="button-confirm" type="primary" @click="$_seachClick">查询</n22-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Button, DropSelectItem, InputItem, RadioItem } from "al-mobile";
import { gender } from "../assets/code/codes.js";

export default {
  name: "side-slip-seach", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      //props定义样例
      type: Boolean,
      default: false,
    },
  },
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [RadioItem.name]: RadioItem,
    [DropSelectItem.name]: DropSelectItem,
  },
  computed: {},
  filters: {},
  data() {
    return {
      isShowSeach: this.value,
      seach: {
        //姓名
        name: "",
        //性别
        sex: "",
        startAge: "",
        endAge: "",
        phone: "",
      },
      sexOptions: gender,
      ageOptions: [],
    };
  },
  activated() {},
  methods: {
    $_clearInput() {
      console.log("%c $_clearInput", "color:green;", "");
      this.seach = {
        name: "",
        sex: "",
        age: "",
        phone: "",
      };
      this.$emit("resetFun", this.seach);
    },
    $_seachClick() {
      if (this.seach.sex == "false") {
        this.seach.sex = "";
      }
      if (this.seach.startAge != "" && this.seach.endAge != "") {
        if (parseInt(this.seach.startAge) > parseInt(this.seach.endAge)) {
          window.utils.ui.toast({
            message: "请正确选择年龄",
            position: "middle",
            duration: 1500,
          });
          return;
        }
      }
      console.log("%c $_seachClick", "color:green;", this.seach);
      this.$emit("seachFun", this.seach);
    },
    $_close() {
      this.$emit("closeFun");
    },
  },
  mounted() {
    console.log("%c side-slip-seach>生命周期>mounted", "color:green;", "");
    for (let i = 0; i < 180; i++) {
      this.ageOptions.push({
        text: `${i}岁`,
        value: i + "",
      });
    }
  },
  watch: {
    value(newVal) {
      this.isShowSeach = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-slip-seach {
  .side-slip-seach-content {
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    .item-content {
      width: 249px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      margin-top: 1px;
      display: flex;
      flex-direction: column;
      ::v-deep .n22-drop-select-field-item.is-select .n22-field-item-right-addon {
        color: rgb(200, 200, 210);
      }
      ::v-deep .n22-icon-right_arrow:before {
        position: relative;
        z-index: 2;
        color: #979797;
        font-size: 15px;
        margin-left: 5px;
      }
      .item-top {
        height: 47px;
        display: flex;
        align-items: center;
        font-size: 14px;
        /*font-family: PingFangSC-Regular, PingFang SC;*/
        font-weight: 400;
        color: rgba(116, 116, 116, 1);
        box-sizing: border-box;
        padding: 10px 0 0 14px;
        .head-icon {
          width: 20px;
          height: 20px;
        }
        .item-top-text {
          margin-left: 10px;
        }
      }
      .item-line {
        height: 5px;
        background: rgba(236, 237, 239, 1);
      }
      .item-input-content {
        height: 50px;
        border-bottom: 1px solid #ecedef;
        box-sizing: border-box;
        padding: 0 15px;
      }
      .button-content {
        margin-top: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        .button-confirm {
          width: 100px;
          height: 40px;
          background: rgba(253, 194, 72, 1);
          border-radius: 5px;
        }
        .button-cancel {
          width: 100px;
          height: 40px;
          background: rgba(216, 216, 216, 1);
          border-radius: 5px;
        }
        .n22-button.primary:after {
          border: none;
        }
      }
    }
    .mark-div {
      flex: 1;
    }
  }
}
</style>
