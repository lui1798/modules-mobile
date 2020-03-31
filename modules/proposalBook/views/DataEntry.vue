<template>
  <div class="proposalBook-data-entry">
    <al-all-head title="福运至尊 相伴人生"></al-all-head>
    <al-content
      class="proposalBook-data-entry-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <n22-field class="insured-info-c" title="被保人信息">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list1.png" />
        </template>
        <n22-input-item
          title="姓名"
          id="insuredname"
          name="insuredname"
          v-model="insured.name"
          data-vv-as="姓名"
          placeholder="请输入您的姓名"
          align="right"
          is-highlight
          clearable
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        ></n22-input-item>
        <n22-radio-item
          v-model="insured.sex"
          title="性别"
          vvalidateModal=""
          data-vv-as="xxxx"
          name="radio1"
          :isAppendTo="false"
          :options="sexOptions"
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
        ></n22-radio-item>
        <n22-drop-select
          class="my-birthday-c"
          v-model="insured.birthday"
          title="年龄"
          pickerTitle="生日(选填)"
          arrow="calendar"
          :itemObject="{ name: 'insured.birthday' }"
          :options="options"
          :isAppendTo="true"
          selectDefaultValue="1998-01-01"
          is-show-required
          ispickerValue="生日(选填)"
          type="date"
          @changeData="$_changeData"
          @onDatePickerConfirm="$_onPickerConfirm"
        ></n22-drop-select>
        <n22-drop-select
          class="my-age-c"
          v-model="insured.age"
          pickerTitle="请选择年龄"
          :itemObject="{ name: 'insured.age' }"
          :selectDefaultValue="30"
          :options="ageOptions"
          ispickerValue="请选择年龄"
          type="single"
          :isAppendTo="true"
          @changeData="$_changeData"
          @onPickerConfirm="$_onPickerConfirm"
        ></n22-drop-select>
      </n22-field>
      <n22-field class="holder-info-c" title="投保人信息" @headerClick="holderIsCheck = !holderIsCheck">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list1.png" />
        </template>
        <div class="action-container" slot="action">
          <n22-icon :name="holderIsCheck ? 'checked' : 'check'"></n22-icon>
        </div>
        <transition name="n22-base-slide-down">
          <div v-if="holderIsCheck">
            <n22-input-item
              title="姓名"
              id="holdername"
              name="holdername"
              v-model="holder.name"
              data-vv-as="姓名"
              placeholder="请输入您的姓名"
              align="right"
              is-highlight
              clearable
              is-show-required
              @changeData="$_changeData"
              @click="$_onClick"
              @focus="$_onFocus"
              @blur="$_onBlur"
            ></n22-input-item>
            <n22-radio-item
              v-model="holder.sex"
              title="性别"
              vvalidateModal=""
              data-vv-as="xxxx"
              name="radio1"
              :isAppendTo="false"
              :options="sexOptions"
              is-show-required
              @changeData="$_changeData"
              @click="$_onClick"
            ></n22-radio-item>
            <n22-drop-select
              class="my-birthday-c"
              v-model="holder.birthday"
              title="年龄"
              pickerTitle="生日(选填)"
              arrow="calendar"
              :options="options"
              :isAppendTo="true"
              is-show-required
              ispickerValue="生日(选填)"
              type="date"
            ></n22-drop-select>
            <n22-drop-select
              class="my-age-c"
              v-model="holder.age"
              pickerTitle="请选择年龄"
              :selectDefaultValue="18"
              :options="ageOptions"
              ispickerValue="请选择年龄"
              type="single"
              :isAppendTo="true"
            ></n22-drop-select>
          </div>
        </transition>
      </n22-field>
      <n22-field title="险种设置">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list2.png" />
        </template>
        <proposal-book-pro-show
          :tableTitle="['险种', '保额', '保费', '交费期']"
          :masterProData="masterProData"
          :fjProData="fjProData"
          @addPro="$_addPro"
          @changePro="$_changePro"
          @deletePro="$_deletePro"
          is-edit
        ></proposal-book-pro-show>
      </n22-field>
      <n22-field class="doc-info">
        <div class="doc-arrea">
          <div @click="goWordShow">
            <img src="../assets/images/product_tk.png" />
            <span>产品条款</span>
          </div>
          <div @click="goWordShow">
            <img src="../assets/images/product_sms.png" />
            <span>产品说明书</span>
          </div>
        </div>
      </n22-field>
    </al-content>
    <n22-action-bar class="action-bar-c" :actions="buttonArray">
      <div class="price">
        <span class="bar-text-desc">首年总保费:</span>
        <span>
          <n22-amount value="3000" has-separator :precision="2"></n22-amount>
        </span>
        <small>&nbsp;元</small>
      </div>
    </n22-action-bar>
    <n22-popup v-model="isPopupShow" position="bottom" @maskClick="riskMaskClick" class="pro-popup">
      <n22-popup-title-bar title="福运至尊 相伴人生" @confirm="riskMaskClick">
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div class="pro-select-popup-content">
        <n22-field :title="item.name" v-for="(item, i) in fjProData" :key="i" @headerClick="selectFjPro(item, i)">
          <div class="action-container" slot="action">
            <n22-icon :name="item.isCheck ? 'checked' : 'check'"></n22-icon>
          </div>
          <transition name="n22-base-fade">
            <div class="pro-popup-cont" v-if="item.isCheck">
              <n22-input-item
                title="保额"
                v-model="item.amount"
                data-vv-as="姓名"
                placeholder="请输入保额"
                align="right"
                is-highlight
                clearable
                @changeData="$_changeData"
                @click="$_onClick"
                @focus="$_onFocus"
                @blur="$_onBlur"
              ></n22-input-item>
              <n22-drop-select
                v-model="item.bxqj"
                title="保险期间"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
                @hide="isShowConfirm = !isShowConfirm"
                @dropSelectClick="isShowConfirm = !isShowConfirm"
              ></n22-drop-select>
              <n22-drop-select
                v-model="item.jfqj"
                title="交费期间"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
                @hide="isShowConfirm = !isShowConfirm"
                @dropSelectClick="isShowConfirm = !isShowConfirm"
              ></n22-drop-select>
              <n22-drop-select
                v-model="item.jffs"
                title="交费方式"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
                @hide="isShowConfirm = !isShowConfirm"
                @dropSelectClick="isShowConfirm = !isShowConfirm"
              ></n22-drop-select>
            </div>
          </transition>
        </n22-field>
        <div class="button-yl-h"></div>
      </div>
      <transition name="n22-base-slide-up">
        <n22-button v-if="isShowConfirm" @click="confirmPro" type="primary" class="pro-popup-button">
          确定
        </n22-button>
      </transition>
    </n22-popup>
  </div>
</template>

<script>
import { mapMutations } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import {
  AllHead,
  Content,
  InputItem,
  Field,
  FieldItem,
  RadioItem,
  DropSelectItem,
  Icon,
  Amount,
  ActionBar,
  Popup,
  PopupTitleBar,
  Button,
} from "al-mobile";
import ProShow from "../components/ProShow";
import code from "@@/utils/code/";
const __getAge = require("@t/getAge");
export default {
  name: "proposal-book-data-entry", //使用xx-xx-xx命名方式具体看操作文档
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
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [DropSelectItem.name]: DropSelectItem,
    [RadioItem.name]: RadioItem,
    [Icon.name]: Icon,
    [Amount.name]: Amount,
    [ActionBar.name]: ActionBar,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [ProShow.name]: ProShow,
    [Button.name]: Button,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c data-entry>生命周期>mounted", "color:green;", "");
    for (let i = 0; i < 180; i++) {
      this.ageOptions.push({
        text: `${i}岁`,
        value: i + "",
      });
    }
    // this.fjProData = this.proData;
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
      insured: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "1",
        age: "",
      },
      holder: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "2",
        age: "",
      },
      sexOptions: code.getCodeData("", "", "sex"),
      //简单下拉菜单
      modelDropSelectSingle: "",
      options: code.getCodeData("", "", "test"),
      ageOptions: [],
      holderIsCheck: false,
      //主险信息-对象
      masterProData: [
        {
          name: "光大永明福运至尊年金保险",
          amount: 88888.88,
          premium: 88888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
      ],
      //附加险信息-数组
      fjProData: [
        {
          name: "光大永明福运至尊年金保险",
          amount: 888.88,
          premium: 888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
        {
          name: "百万安康(2019版)医疗保险",
          amount: 888.88,
          premium: 888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
        {
          name: "增利宝（庆典版）年金保险（万能型）",
          amount: 888.88,
          premium: 888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
        {
          name: "无忧住院津贴",
          amount: 888.88,
          premium: 888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
        {
          name: "附加投保人豁免保险费（加强版）重大 疾病保险",
          amount: 888.88,
          premium: 888.88,
          bxqj: "",
          jffs: "",
          jfqj: "10年交",
        },
      ],
      //按钮组
      buttonArray: [
        //底部按钮组
        {
          text: "生成建议书",
          value: "create",
          onClick: this.createPlan,
        },
      ],
      isPopupShow: false,
      isShowConfirm: true,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORKSHOWURL",
    ]),
    $_onFocus(name) {
      console.log("%c $_onFocus", "color:green;", name);
      this.$emit("focus", name);
    },
    $_onBlur(name) {
      console.log("%c $_onBlur", "color:green;", name);
      this.$emit("blur", name);
    },
    $_onClick(e) {
      console.log("%c $_onClick", "color:green;", e);
      this.$emit("click", e);
    },
    //更改回调
    // eslint-disable-next-line no-unused-vars
    $_changeData({ name }, val, oldval, isHand, type, key) {
      console.log("%c $_changeData-name", "color:green;", name);
      console.log("%c $_changeData", "color:green;", val);
    },
    // eslint-disable-next-line no-unused-vars
    $_onPickerConfirm({ name }, val, oldval, isHand, type, key) {
      console.log("%c $_onPickerConfirm-name", "color:green;", name);
      console.log("%c $_onPickerConfirm", "color:green;", val);
      if (name === "insured.birthday") {
        this.insured.age = __getAge(val) === 0 ? "0" : __getAge(val);
        console.log("%c this.insured.age", "color:red", this.insured.age);
      } else if (name === "insured.age") {
        this.insured.birthday && (this.insured.birthday = "");
      }
    },
    $_addPro() {
      console.log("%c add", "color:#00CD00", "add");
      this.isPopupShow = true;
      // this.fjProData = this.proData;
      console.log("%c fj", "color:#00CD00", this.fjProData);
    },
    $_changePro(item) {
      console.log("%c change", "color:#00CD00", item);
      this.isPopupShow = true;
    },
    $_deletePro(item) {
      console.log("%c delete", "color:#00CD00", item);
      for (let i = 0; i < this.fjProData.length; i++) {
        const pro = this.fjProData[i];
        if (pro.isCheck) pro.isCheck = false;
        this.$set(this.fjProData, i, pro);
      }
    },
    goWordShow() {
      const outLink =
        "http://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdUat/product/termsPicture/2MT023.jpg";
      this.WORKSHOWURL(outLink);
      this.go("proposalBook/wordShow");
    },
    riskMaskClick() {
      //蒙层点击取消
      this.isPopupShow = false;
    },
    // 确定选择险种
    confirmPro() {
      //关闭popup
      this.isPopupShow = false;
    },
    selectFjPro(item, i) {
      item.isCheck = !item.isCheck;
      this.$set(this.fjProData, i, item);
    },
    createPlan() {
      this.go("proposalBook/planShow");
    },
  },
};
</script>

<style lang="scss" scoped>
.proposalBook-data-entry {
  .action-container {
    color: $theme-color;
    display: flex;
    align-items: center;
    .n22-icon {
      color: $theme-color;
      height: 16px;
      width: 16px;
      // margin-top: -3px;
    }
  }
  .proposalBook-data-entry-content {
    .title-left-img {
      float: left;
      height: 19px;
      width: 16px;
      margin: 0 10px;
    }
    .my-birthday-c {
      width: 200px;
      float: left;
      ::v-deep .n22-field-item-right-addon {
        width: 75px;
      }
    }
    .my-age-c {
      width: 100px;
      float: right;
      margin-right: 10px;
      ::v-deep .n22-field-item-right-addon {
        width: 75px;
      }
    }
    .insured-info-c {
      position: relative;
      z-index: 3;
      padding-bottom: 0px;
    }
    .holder-info-c {
      margin-top: -32px;
      padding-bottom: 0px;
      ::v-deep .n22-field-header {
        padding-top: 10px;
        position: relative;
        z-index: 2;
        background-color: #ffffff;
      }
    }
    .doc-info {
      margin-bottom: 45px;
      .doc-arrea {
        display: flex;
        div {
          text-align: center;
          img {
            height: 40px;
            width: 40px;
          }
          span {
            font-size: 12px;
            display: block;
          }
        }
        div:nth-child(1) {
          margin-left: 15px;
        }
        div:nth-child(2) {
          margin-left: 40px;
        }
      }
    }
  }
  .action-bar-c {
    ::v-deep .n22-button {
      flex: none;
      // height: 46px;
      width: 140px;
      margin-left: 50px;
    }
    .bar-text-desc {
      font-size: 12px;
      display: block;
      color: #666666;
      margin-bottom: 5px;
    }
    ::v-deep .n22-action-bar-text {
      height: auto;
    }
    ::v-deep .n22-button-content span {
      // font-size: 16px;
    }
    .price {
      // margin-top: 5px;
      // margin-bottom: 8px;
      // height: 50px;
      font-weight: 500;
      font-size: 20px;
      color: #ff4002;
      small {
        margin-left: 2px;
        font-size: 14px;
        color: #ff4002;
      }
    }
  }
  .pro-popup {
    .pro-select-popup-content {
      overflow-y: auto;
      height: 400px;
    }
    ::v-deep .n22-field-header-bottom {
      margin-bottom: 0;
    }
    ::v-deep .n22-field-heading {
      border-left: none !important;
    }
    .pro-popup-cont {
      margin-top: 20px;
    }
    .n22-popup-title-bar {
      height: 50px;
    }
    ::v-deep .n22-popup-box {
      background-color: #f1eff0;
    }
    ::v-deep .n22-field-item-right-addon {
      width: 100px;
    }
    .button-yl-h {
      height: 56px;
    }
    .pro-popup-button {
      // z-index: 1;
      position: absolute;
      bottom: 0;
      height: 46px;
      width: 356px;
      margin: 0 10px 10px;
      ::v-deep .n22-button-content {
        font-size: 16px;
      }
    }
  }
}
</style>
