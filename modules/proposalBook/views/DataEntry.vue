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
        <n22-input-item
          title="姓名"
          id="name"
          name="name"
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
          v-model="insured.birthday"
          title="年龄"
          pickerTitle="生日(选填)"
          :options="options"
          :isAppendTo="true"
          is-show-required
          ispickerValue="生日(选填)"
          data-vv-as="xxxx"
          type="date"
          name="certificateType"
        ></n22-drop-select>
        <!-- <n22-drop-select
          v-model="modelDropSelectDate"
          title="来了"
          pickerTitle="请选择xxxx"
          :options="options"
          vvalidateModal=""
          ispickerValue="请选择xxxx"
          data-vv-as="xxxx"
          type="date"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select> -->
      </n22-field>
      <n22-field class="holder-info-c" title="投保人信息">
        <div
          class="action-container"
          slot="action"
          @click="holderIsCheck = !holderIsCheck"
        >
          <n22-icon :name="holderIsCheck ? 'checked' : 'check'"></n22-icon>
        </div>
        <transition name="n22-base-slide-down">
          <div v-if="holderIsCheck">
            <n22-input-item
              title="姓名"
              id="name"
              name="name"
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
              v-model="holder.birthday"
              title="年龄"
              pickerTitle="生日(选填)"
              :options="options"
              :isAppendTo="false"
              is-show-required
              ispickerValue="生日(选填)"
              data-vv-as="xxxx"
              type="date"
              name="certificateType"
            ></n22-drop-select>
            <!-- <n22-drop-select
              v-model="modelDropSelectDate"
              title="来了"
              pickerTitle="请选择xxxx"
              :options="options"
              vvalidateModal=""
              ispickerValue="请选择xxxx"
              data-vv-as="xxxx"
              type="single"
              name="certificateType"
              :isAppendTo="false"
            ></n22-drop-select> -->
          </div>
        </transition>
      </n22-field>
      <n22-field title="险种设置">
        <proposal-book-pro-show
          :masterProData="masterProData"
          :fjProData="fjProData"
          @addPro="$_addPro"
          @changePro="$_changePro"
          @deletePro="$_deletePro"
        ></proposal-book-pro-show>
      </n22-field>
      <n22-field class="doc-info">
        <div class="doc-arrea">
          <div>
            <img src="../assets/images/product_tk.png" />
            <span>产品条款</span>
          </div>
          <div>
            <img src="../assets/images/product_sms.png" />
            <span>产品说明书</span>
          </div>
        </div>
      </n22-field>
      <n22-action-bar class="action-bar-c" :actions="buttonArray">
        <div class="price">
          <span class="bar-text-desc">首年总保费:</span>
          <span>
            <n22-amount value="3000" has-separator :precision="2"></n22-amount>
          </span>
          <small>&nbsp;元</small>
        </div>
      </n22-action-bar>
    </al-content>
    <n22-popup
      v-model="isPopupShow"
      position="bottom"
      @maskClick="riskMaskClick"
      class="pro-popup"
    >
      <n22-popup-title-bar title="福运至尊 相伴人生" @confirm="riskMaskClick">
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div
        class="pro-select-popup-content"
        :style="{ height: '500px', 'overflow-y': 'auto' }"
      >
        <n22-field :title="item.name" v-for="(item, i) in fjProData" :key="i">
          <div
            class="action-container"
            slot="action"
            @click="selectFjPro(item, i)"
          >
            <n22-icon :name="item.isCheck ? 'checked' : 'check'"></n22-icon>
          </div>
          <transition name="n22-base-fade">
            <div class="pro-popup-cont" v-if="item.isCheck">
              <n22-drop-select
                v-model="holder.birthday"
                title="保险期间"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
              ></n22-drop-select>
              <n22-drop-select
                v-model="holder.birthday"
                title="交费期间"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
              ></n22-drop-select>
              <n22-drop-select
                v-model="holder.birthday"
                title="交费方式"
                :options="options"
                :isAppendTo="false"
                ispickerValue="请选择"
                type="single"
              ></n22-drop-select>
            </div>
          </transition>
        </n22-field>
        <div class="button-yl-h"></div>
        <n22-button
          @click="riskMaskClick"
          type="primary"
          class="pro-popup-button"
          >确定</n22-button
        >
      </div>
    </n22-popup>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
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
  Button
} from "al-mobile";
import ProShow from "../components/ProShow";
import code from "@@/utils/code/";
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
    [Button.name]: Button
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c data-entry>生命周期>mounted", "color:green;", "");
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
          upCallbackFun: ""
        }
      ],
      insured: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "1"
      },
      holder: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "2"
      },
      sexOptions: code.getCodeData("", "", "sex"),
      //简单下拉菜单
      modelDropSelectSingle: "",
      options: code.getCodeData("", "", "test"),
      holderIsCheck: false,
      //主险信息-对象
      masterProData: [
        {
          name: "光大永明福运至尊年金保险",
          amount: 88888.88,
          premium: 88888.88,
          nj: "10年交"
        }
      ],
      //附加险信息-数组
      fjProData: [
        {
          name: "光大永明福运至尊年金保险",
          amount: 888.88,
          premium: 888.88,
          nj: "10年交"
        },
        {
          name: "百万安康(2019版)医疗保险",
          amount: 888.88,
          premium: 888.88,
          nj: "10年交"
        },
        {
          name: "增利宝（庆典版）年金保险（万能型）",
          amount: 888.88,
          premium: 888.88,
          nj: "10年交"
        },
        {
          name: "无忧住院津贴",
          amount: 888.88,
          premium: 888.88,
          nj: "10年交"
        },
        {
          name: "附加投保人豁免保险费（加强版）重大 疾病保险",
          amount: 888.88,
          premium: 888.88,
          nj: "10年交"
        }
      ],
      //按钮组
      buttonArray: [
        //底部按钮组
        {
          text: "生成建议书",
          value: "create",
          onClick: this.onBtnClick2
        }
      ],
      isPopupShow: false
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
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
    $_changeData(val, item, key, type) {
      console.log("%c $_changeData", "color:green;", val);
      // this.$emit("changeData",val,item,key,type)
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
    riskMaskClick() {
      //蒙层点击取消
      this.isPopupShow = false;
    },
    selectFjPro(item, i) {
      item.isCheck = !item.isCheck;
      this.$set(this.fjProData, i, item);
    }
  }
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
    .action-bar-c {
      ::v-deep .n22-button {
        flex: none;
        height: 46px;
        width: 125px;
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
        font-size: 16px;
      }
      .price {
        margin-top: 5px;
        // margin-bottom: 8px;
        // height: 50px;
        font-weight: 500;
        font-size: 20px;
        color: #ff4002;
        small {
          margin-left: 2px;
          font-size: 16px;
          color: #ff4002;
        }
      }
    }
    .doc-info {
      margin-bottom: 35px;
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
  .pro-popup {
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
      position: fixed;
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
