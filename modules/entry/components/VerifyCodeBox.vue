<template>
  <n22-popup v-model="isPopupShow">
    <div class="verify-code-box">
      <div class="verify-code">
        <div class="close">
          <img class="close-img" @click="$_onBtnClick($event, models[0])" src="../assets/images/icon2_join_close.png" />
        </div>
        <div class="code-box">
          <n22-input-item
            v-model="verifyCode"
            class="input"
            type="digit"
            :maxlength="6"
            placeholder="输入验证码"
          ></n22-input-item>
          <div class="cross-blank"></div>
          <p
            :style="{
              pointerEvents: statue ? 'none' : 'auto',
            }"
            @click="getVerifyCode"
            class="get-code-button"
          >
            {{ hint }}
          </p>
        </div>
        <p class="hint-text">验证码已发送，请查收</p>
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
import { Button, Icon, InputItem, Field, Popup } from "al-mobile";

//导入当前页面所使用的到的接口
import { codeCustom } from "../service/smsServie";

export default {
  name: "verify-code-box",
  props: {
    data: {
      type: String,
      default: "",
      required: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    models: {
      type: Array,
      required: true,
    },
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Popup.name]: Popup,
  },
  computed: {},
  filters: {},
  data() {
    return {
      phoneNum: this.data,
      entrantName: this.name,
      isPopupShow: this.value,
      verifyCode: "",
      verifyId: "",
      hint: "获取验证码", //描述文本
      timer: "", //定时器对象
      time: 60, //总时长
      statue: false, //是否开始发送
    };
  },
  activated() {},
  methods: {
    requestSmsCode(params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        mobileNum: params.mobileNum,
        smsType: params.smsType,
        args: {
          entrantName: params.args.entrantName,
        },
      };
      //发起请求
      codeCustom({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //验证码定时器状态
    controlTime() {
      this.statue = true;
      this.timer = setInterval(() => {
        if (this.time <= 60 && this.time > 0) {
          this.time--;
          this.hint = `${this.time}秒后获取`;
        } else if (this.time == 0) {
          this.hint = "获取验证码";
          this.time = 60;
          clearInterval(this.timer);
          this.statue = false;
        }
      }, 1000);
    },
    $_onBtnClick(event, action) {
      action["verifyCode"] = this.verifyCode;
      action["verifyId"] = this.verifyId;
      action.onClick && action.onClick(event, action);
      this.$emit("click", event, action);
      this.verifyCode = "";
      this.verifyId = "";
    },
    getVerifyCode() {
      console.log(this.phoneNum);
      console.log(this.entrantName);
      let request = {
        mobileNum: this.phoneNum,
        smsType: "ENTRY_CODE",
        args: {
          entrantName: this.entrantName,
        },
      };
      console.log(request);
      this.requestSmsCode(
        request,
        body => {
          (this.verifyId = body.data.vid), this.controlTime();
        },
        error => {
          console.log(error);
        },
      );
    },
  },
  mounted() {},
  watch: {
    data(newVal) {
      this.phoneNum = newVal;
    },
    name(newVal) {
      this.entrantName = newVal;
    },
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
.verify-code-box {
  .verify-code {
    width: 80%;
    padding: 9px 18px 18px 18px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 0 auto;
    .close {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      .close-img {
        width: 22px;
        height: 22px;
      }
    }
    .code-box {
      height: 36px;
      border-radius: 4px;
      border: 1px solid rgba(151, 151, 151, 1);
      display: flex;
      align-items: center;
      padding: 1px;
      .input {
        margin-left: 10px;
      }
      .cross-blank {
        width: 1px;
        height: 25px;
        background: #979797;
      }
      .get-code-button {
        padding-left: 10px;
        width: 90px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(253, 194, 72, 1);
      }
    }
    .hint-text {
      font-size: 11px;
      font-weight: 400;
      color: rgba(207, 207, 207, 1);
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
