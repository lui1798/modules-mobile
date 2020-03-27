<template>
  <div class="">
    <al-all-head title="action-bar" :headBottom="true"></al-all-head>
    <al-content>
      <n22-field ref="myinput" :isOnlyErrorLine="true">
        <n22-input-item
          title="简单输入"
          id="name"
          name="name"
          v-model="modelInput0"
          data-vv-as="姓名"
          vvalidateModal=""
          align="right"
          :mark="true"
          defaultValue="xxxx"
          is-highlight
          clearable
          is-show-required
          @validatorCallBackFun="$_validatorCallBackFun"
          @changeData="$_changeData"
          @markFun="$_markFun"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        ></n22-input-item>
        <n22-input-item
          title="姓名"
          id="name"
          name="name"
          v-model="modelInput1"
          placeholder="N22"
          function
          data-vv-as="姓名"
          vvalidateModal=""
          align="right"
          :mark="true"
          defaultValue="xxxx"
          is-highlight
          clearable
          is-show-required
          @validatorCallBackFun="$_validatorCallBackFun"
          @changeData="$_changeData"
          @markFun="$_markFun"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        >
          <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[客户search]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
          <template slot="right">
            <n22-button @click="getFunctionFlag(modelInput1)" class="getbutd-svg">
              <label class="slot-right-button-text">
                <n22-icon name="search"></n22-icon>
              </label>
            </n22-button>
          </template>
          <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[客户search]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
        </n22-input-item>
        <n22-input-item
          title="短信"
          id="message"
          name="message"
          v-model="modelInput2"
          placeholder="N22"
          function
          data-vv-as="短信"
          vvalidateModal=""
          align="right"
          is-highlight
          clearable
          is-show-required
          @validatorCallBackFun="$_validatorCallBackFun"
          @changeData="$_changeData"
          @markFun="$_markFun"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        >
          <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[短信验证码]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
          <template slot="right">
            <span class="slot-right-line"></span>
            <n22-button
              @click="flagShow ? getVerifyCode() : ''"
              class="getbutd-font"
              type="primary"
              :inactive="!flagShow"
            >
              <label v-if="flagShow" class="slot-right-button-text">获取短信</label>
              <label v-else class="slot-right-button-text">剩余{{ second }}s</label>
            </n22-button>
          </template>
          <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[短信验证码]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
        </n22-input-item>
        <n22-drop-select
          v-model="modelWork"
          title="职业"
          pickerTitle="请选择职业"
          :options="workOptions"
          vvalidateModal=""
          ispickerValue="请选择"
          data-vv-as="职业"
          type="work"
          name="certificateType"
          :isAppendTo="true"
        ></n22-drop-select>
        <n22-drop-select
          v-model="modelWork"
          title="职业"
          pickerTitle="请选择职业"
          :options="holderWorkOptions"
          vvalidateModal=""
          ispickerValue="请选择"
          data-vv-as="职业"
          type="single"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <n22-drop-select
          v-model="modelDropSelectSingle"
          title="简单下拉菜单"
          pickerTitle="请选择xxxx"
          :options="options"
          vvalidateModal=""
          ispickerValue="请选择xxxx"
          data-vv-as="xxxx"
          type="single"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <n22-drop-select
          v-model="modelDropSelectDate"
          title="日期"
          pickerTitle="请选择xxxx"
          :options="options"
          vvalidateModal=""
          ispickerValue="请选择xxxx"
          data-vv-as="xxxx"
          type="date"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <n22-drop-select
          v-model="modelDropSelectAddress"
          title="地址"
          pickerTitle="请选择xxxx"
          :options="addressOptions"
          vvalidateModal=""
          ispickerValue="请选择xxxx"
          data-vv-as="xxxx"
          type="address"
          name="certificateType"
          :isAppendTo="true"
        ></n22-drop-select>
        <n22-radio-item
          v-model="modelRadio11"
          title="单选"
          :options="radio1Options"
          vvalidateModal=""
          data-vv-as="xxxx"
          name="radio1"
          :isAppendTo="false"
          @changeData="$_changeData"
          @markFun="$_markFun"
          @click="$_onClick"
        ></n22-radio-item>
        <n22-switch-item
          v-model="modelswitch"
          title="滑块"
          vvalidateModal=""
          data-vv-as="xxxx"
          name="switch"
          :isAppendTo="false"
          @changeData="$_changeData"
          @markFun="$_markFun"
        ></n22-switch-item>
        <n22-radio-item
          v-model="modelRadio12"
          title="多选"
          :options="radio1Options"
          vvalidateModal=""
          data-vv-as="xxxx"
          name="radio1"
          type="checkbox"
          :isAppendTo="false"
          @changeData="$_changeData"
          @markFun="$_markFun"
          @click="$_onClick"
        ></n22-radio-item>
        <!-- <n22-image-parts
          v-model="signModal"
          :itemObject="itemObject"
          title="签名"
          name="radio1"
          type="sign"
        ></n22-image-parts> -->
      </n22-field>
    </al-content>
    <n22-action-bar :actions="buttonArray">
      <span class="price">
        &yen;128.00
        <small>起</small>
      </span>
    </n22-action-bar>
  </div>
</template>

<script>
import {
  AllHead,
  Content,
  Button,
  InputItem,
  Field,
  FieldItem,
  SwitchItem,
  RadioItem,
  DropSelectItem,
  Dialog,
  ActionBar,
  Popup,
  PopupTitleBar,
  Toast,
  Icon,
} from "al-mobile";
import code from "@@/utils/code/";

export default {
  name: "demo-action-bar-demo",
  components: {
    [AllHead.name]: AllHead, //
    [Content.name]: Content, //
    [Field.name]: Field, //
    [FieldItem.name]: FieldItem, //
    [InputItem.name]: InputItem, //
    [Button.name]: Button, //
    [DropSelectItem.name]: DropSelectItem, //
    [RadioItem.name]: RadioItem, //
    [SwitchItem.name]: SwitchItem, //
    [Dialog.name]: Dialog, //
    [ActionBar.name]: ActionBar, //
    [Popup.name]: Popup, //
    [PopupTitleBar.name]: PopupTitleBar, //
    [Toast.name]: Toast, //
    [Icon.name]: Icon, //
  },
  data() {
    return {
      //input
      modelInput0: "",
      modelInput1: "",
      modelInput2: "",

      //简单下拉菜单
      modelDropSelectSingle: "",
      options: code.getCodeData("", "", "test"),
      //日期
      modelDropSelectDate: "",
      //地址
      modelDropSelectAddress: "",
      addressOptions: code.getCodeData("", "", "address"),
      //职业
      modelWork: "",
      workOptions: code.getCodeData("", "", "work"),
      holderWorkOptions: code.getCodeData("", "", "occupation"),
      //单选
      modelRadio11: "",
      radio1Options: code.getCodeData("", "", "test"),
      // radio1Options: code.getCodeData("", "", "test"),
      //滑块
      modelswitch: "",
      // modelswitchOptions: code.getCodeData("", "", "test"),
      //多选
      modelRadio12: "",
      // radio1Options: code.getCodeData("", "", "test"),

      //验证码
      flagShow: true,
      second: 60,
      secondInit: 60,

      // 签名
      signModal: "",
      itemObject: {
        fieldname: "投保人签名",
        fieldValue: "",
        commitment: "本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。",
        childFileIdList: [],
      },

      //按钮组
      buttonArray: [
        //底部按钮组
        {
          text: "上一步",
          value: "submit",
          onClick: this.onBtnClick,
        },
        {
          text: "下一步",
          value: "create",
          onClick: this.onBtnClick2,
        },
      ],
    };
  },
  methods: {
    // onBtnClick(event, action) {
    //   Dialog.alert({
    //     content: `${action.text}点击`
    //   });
    // },
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
    $_markFun() {
      Dialog.alert({
        title: "友情提示",
        content: "功能暂未开放，敬请期待",
        // cancelText: '取消',
        confirmText: "确定",
        onConfirm: () => console.log("[Dialog.alert] confirm clicked"),
      });
    },
    //字段更改重新校验回调
    $_validatorCallBackFun(result) {
      console.log("%c $_validatorCallBackFun", "color:green;", result);
      // this.$emit("validatorCallBackFun", result);
    },
    //更改回调
    // eslint-disable-next-line no-unused-vars
    $_changeData(val, item, key, type) {
      console.log("%c $_changeData", "color:green;", val);
      // this.$emit("changeData",val,item,key,type)
    },
    /*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--我是分割箭头--[组件回调方法]--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

    // eslint-disable-next-line
    async onBtnClick(event, action) {
      Toast({
        content: "亲我额人图有有哦鹏啊是的发个好将库在先长吧年吗请求！看看发顺丰粉丝地方粉丝地方发顺丰就是雷锋精神疗法",
        maxTextNum: 200,
        position: "center",
        duration: 3000,
      });
      //判断如果当前为同一人则直接进行投保人赋值
      // console.log("%c 提交数据", "color:green;", this.modelRadio11);
      // console.log("%c onBtnClick", "color:green;", action);
      // let istrue = 0;
      // let moduleNowList = [];
      // let moduleList = this.$refs.myinput.$children;
      // for (let index = 0; index < moduleList.length; index++) {
      //   const mo = moduleList[index];
      //   await mo.$validator.validateAll().then(result => {
      //     // console.log("%c result", "color:green;", result);
      //     if (result) {
      //       istrue++;
      //     } else {
      //       //将校验失败的模块fieldName放入数组--用于toas展示
      //       let title = mo.title;
      //       if (
      //         moduleNowList.length <= 0 ||
      //         (moduleNowList.length > 0 && moduleNowList.indexOf(title) < 0)
      //       ) {
      //         moduleNowList.push(mo.title);
      //       }
      //     }
      //   });
      //   if (index + 1 === moduleList.length) {
      //     if (istrue === moduleList.length) {
      //       console.log("%c 表单校验是否通过--result", "color:green;", true);
      //     } else {
      //       console.log("%c 表单校验是否通过--result", "color:red;", false);
      //       Toast({
      //         message: `请检查完善<#${moduleNowList}#>！`,
      //         position: "center",
      //         duration: 3000
      //       });
      //     }
      //   }
      // }
    },
    onBtnClick2() {
      Toast({
        content:
          "111111111亲我额人图有有哦鹏啊是的发个好将库在先长吧年吗请求！看看发顺丰粉丝地方粉丝地方发顺丰就是雷锋精神疗法",
        maxTextNum: 10,
        position: "center",
        duration: 3000,
      });
    },

    getFunctionFlag() {
      Dialog.alert({
        title: "友情提示",
        content: "功能暂未开放，敬请期待",
        // cancelText: '取消',
        confirmText: "确定",
        onConfirm: () => console.log("[Dialog.alert] confirm clicked"),
      });
    },
    workClick() {
      this.$refs.test.isPopupShow = true;
    },

    /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--我是分割箭头--[获取短信验证码模块]--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
    getVerifyCode() {
      // Dialog.alert({
      //   title: '友情提示',
      //   content: '功能暂未开放，敬请期待',
      //   confirmText: '确定',
      //   onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
      // })
      // return;
      let _this = this;
      // eslint-disable-next-line no-unused-vars
      const params = {
        messageType: "REGISTERED",
        receiveDeviceNo: "13455555551",
        systemId: "APP",
      };
      // getVerifyCode(params).then(
      //   //注册
      //   res => {
      //     console.log(
      //       "%c 数据返回成功",
      //       "color:green;",
      //       JSON.parse(JSON.stringify(res))
      //     );
      //     res = res.response;
      if (_this.flagShow) {
        _this.flagShow = false;
        let interval = window.setInterval(function() {
          _this.setStorage(_this.second);
          if (_this.second-- <= 0) {
            //缓存在页面计时存在一秒的延迟--暂且忽略
            _this.second = JSON.parse(JSON.stringify(_this.secondInit));
            _this.flagShow = true;
            window.clearInterval(interval);
          }
        }, 1000);
      }
      //   },
      //   error => {
      //     console.log("%c err", "color:red;", error);
      //   }
      // );
    },
    setStorage(parm) {
      localStorage.setItem("dalay_" + this.$route.name, parm);
      localStorage.setItem("_time_" + this.$route.name, new Date().getTime());
    },
    getStorage() {
      let localDelay = {};
      localDelay.delay = localStorage.getItem("dalay_" + this.$route.name);
      localDelay.sec = localStorage.getItem("_time_" + this.$route.name);
      return localDelay;
    },
    judgeCode() {
      let _this = this;
      let localDelay = _this.getStorage();
      let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
      console.log(localDelay);
      if (secTime > localDelay.delay) {
        _this.flagShow = true;
        console.log("已过期");
      } else {
        _this.flagShow = false;
        let _delay = localDelay.delay - secTime;
        _this.second = _delay;
        _this.timer = setInterval(function() {
          if (_delay > 0) {
            _delay--;
            _this.setStorage(_delay);
            _this.second = _delay;
            _this.flagShow = false;
          } else {
            _this.flagShow = true;
            window.clearInterval(_this.timer);
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.price {
  font-weight: 500;
  font-size: 24px;
  color: #FF823A;

  small {
    margin-left: 10px;
    font-size: 16px;
    color: #858B9C;
  }
}
</style>
