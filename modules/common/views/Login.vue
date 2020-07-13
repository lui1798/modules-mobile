<template>
  <div class="login_all">
    <div class="login">
      <div>
        <n22-field ref="myinput" :isOnlyErrorLine="true">
          <n22-input-item
            title="账号"
            name="name"
            v-model="userInfo.accountNum"
            align="right"
            defaultValue="1100000006"
            is-highlight
            clearable
          ></n22-input-item>
          <n22-input-item
            title="密码"
            type="password"
            name="password"
            v-model="userInfo.password"
            align="right"
            defaultValue="140825"
            is-highlight
            clearable
          ></n22-input-item>
        </n22-field>
      </div>
      <div>
        <n22-button
          id="login_button"
          class="login_button"
          :disabled="!true"
          type="primary"
          round
          full-width
          @click="login()"
          >登陆</n22-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import { Button, InputItem, Field, FieldItem } from "al-mobile";

import { login } from "@@/service/getData";
import { mapMutations, mapState } from "vuex";

export default {
  name: "login",
  props: {
    showlogin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      title: "操作说明的标题",
      userInfo: {
        accountNum: "",
        channelCode: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["common"]),
  },
  methods: {
    blur() {
      //解决微信浏览器bug-微信打开网页键盘弹起后页面上滑，导致弹框里的按钮响应区域错位
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 100);
    },
    ...mapMutations(["SHOWLOGIN", "ISLOGINGO", "USER_INFO"]),
    login() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "登录中...",
      };
      login({ data: this.userInfo, config: axiosParams }).then(
        res => {
          console.log("%c 登陆数据返回成功", "color:green;", JSON.parse(JSON.stringify(res)));
          this.SHOWLOGIN(false);
          window.utils.cache.set(window.globalConfig.userInfoCacheKey, res.data.appLoginUser);
          console.log("%c $store.state.common.showlogin", "color:green;", this.$store.state.common.showlogin);
        },
        error => {
          console.log("%c err", "color:red;", error);
        },
      );
    },
  },
  mounted() {
    console.log("%c ddddddddddddddddddddddddd", "color:green;", "dddd");
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.mu-form-item .mu-button {
  margin: 0;
}
.login_button {
  padding: 10px 10px;
}

.form_third {
  padding-bottom: 15px;
}
.change_login_type {
  margin-top: 20px;
  display: block;
  font-size: 14px;
}

.login {
  margin-top: $headBottomTop;
  padding: 20px 40px;
}

.login_all {
  height: 100%;
  width: 100%;
  position: fixed; //popup时候起作用
  // background-color: #ffffff;
  // background:url("/static/images/login/login_bj.png");
  background-size: 375px 667px;
}

.login-bar--fixed {
  z-index: 101;
  top: 0;
  left: 20px;
  // width: 100%;
  position: fixed;
}
.login-bar {
  height: $headBottomTop;
  // position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  line-height: $headBottomTop;
}
.login-bar .login_icon {
  color: #4091fb;
  vertical-align: middle;
  height: 16px;
  width: 16px;
}
.login-bar__left {
  left: 20px;
}
.login_swiper {
  height: 250px;
  width: 78.47vw;
}

.login-type {
  ::v-deep .n22-popup-box {
    padding: 0 10px 5px;
    width: auto;
  }
}
</style>
