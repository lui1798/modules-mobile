<template>
  <div class="" v-show="$route.query.rrweb !== '2'">
    <!-- <al-all-head title="action-bar" :headBottom="true"></al-all-head> -->
    <al-content :isAutoTopMargin="false">
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
          title="职业1"
          pickerTitle="请选择职业"
          :options="workOptions"
          vvalidateModal=""
          ispickerValue="请选择"
          data-vv-as="职业"
          type="work"
          name="certificateType"
          :isAppendTo="true"
          @changeData="$_changeData2"
        ></n22-drop-select>
        <n22-drop-select
          v-model="modelWork"
          title="职业2"
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
          @changeData="$_changeData2"
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
          plain
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
        <n22-field-item title="起保年份" arrow="arrow-right" :addon="pickerValue0" @click="isPickerShow0 = true">
        </n22-field-item>
      </n22-field>
    </al-content>
    <n22-picker
      ref="picker0"
      v-model="isPickerShow0"
      :default-value="['2019']"
      :data="a"
      @confirm="onPickerConfirm(0)"
      title="选择年份"
    ></n22-picker>
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
  Picker,
  Dialog,
  ActionBar,
  Popup,
  PopupTitleBar,
  Toast,
  Icon,
} from "al-mobile";
import code from "@@/utils/code/";
import { login } from "@@/service/getData";
import simple from "al-mobile/components/picker/demo/data/simple";
const rrweb = require("rrweb");
const rrwebPlayer = require("rrweb-player");

import RecordApp from "recorder-core/src/app-support/app";
//可选开启IOS上微信录音支持，需要引入此文件
import "recorder-core/src/app-support/app-ios-weixin-support";
//必须引入的核心。所有文件都需要自行引入，否则app.js会尝试用script来请求需要的这些文件，进而导致错误，引入后会检测到组件已自动加载，就不会去请求了
import "recorder-core";
//需要使用到的音频格式编码引擎的js文件统统加载进来
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine";

//由于大部分情况下ios-weixin的支持需要用到amr解码器，应当把amr引擎也加载进来
import "recorder-core/src/engine/beta-amr";
import "recorder-core/src/engine/beta-amr-engine";
// import mywx from "./ios-weixin-config.js";

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
    [Picker.name]: Picker, //
    [RadioItem.name]: RadioItem, //
    [SwitchItem.name]: SwitchItem, //
    [Dialog.name]: Dialog, //
    [ActionBar.name]: ActionBar, //
    [Popup.name]: Popup, //
    [PopupTitleBar.name]: PopupTitleBar, //
    [Toast.name]: Toast, //
    [Icon.name]: Icon, //
  },
  mounted() {
    setTimeout(() => {
      this.modelWork = "030302";
      this.modelDropSelectSingle = "T2019002";
    }, 2000);
    //接口请求
    // this.entryUserEduResGet();
    if (this.$route.query.rrweb !== "2") {
      console.log("%c >>>>>>>>>>>>>>>>!2", "color:#00CD00");
      let _this = this;
      rrweb.record({
        emit(event) {
          // 将 event 存入 events 数组中
          // console.log("%c event", "color:#00CD00", event);
          _this.events.push(event);
        },
      });

      // 每 10 秒调用一次 save 方法，避免请求过多
      this.interval = setInterval(this.save, 10 * 1000);

      this.beginREC();
    } else {
      const events = window.utils.cache.get("rrwebEvents").events;
      new rrwebPlayer.default({
        target: document.body, // 可以自定义 DOM 元素
        data: {
          events,
        },
      });
      const blob = window.myblob;
      if (blob) {
        var audio = document.createElement("audio");
        audio.controls = true;
        document.body.appendChild(audio);
        //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
        audio.src = (window.URL || webkitURL).createObjectURL(blob);
        audio.play();
      }
    }
  },
  // updated() {
  //   console.log("%c >>>>>>>>>>>>>>>>>A", "color:#00CD00");
  //   const blob = window.myblob;
  //   if (blob) {
  //     var audio = document.createElement("audio");
  //     audio.controls = true;
  //     document.body.appendChild(audio);
  //     //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
  //     audio.src = (window.URL || webkitURL).createObjectURL(blob);
  //     audio.play();
  //   }
  // },
  destroyed() {
    clearInterval(this.interval);
  },
  data() {
    return {
      interval: "",
      startTime: new Date().getTime(),
      events: [],
      rec: "",
      //input
      modelInput0: "",
      modelInput1: "",
      modelInput2: "",

      //简单下拉菜单
      pickerValue0: "2020",
      a: simple,
      isPickerShow0: false,
      modelDropSelectSingle: "",
      options: code.getCodeData("test"),
      //日期
      modelDropSelectDate: "",
      //地址
      modelDropSelectAddress: "",
      addressOptions: code.getCodeData("address"),
      //职业
      modelWork: "",
      workOptions: code.getCodeData("work"),
      holderWorkOptions: code.getCodeData("occupation"),
      //单选
      modelRadio11: "",
      radio1Options: code.getCodeData("test"),
      // radio1Options: code.getCodeData("test"),
      //滑块
      modelswitch: "",
      // modelswitchOptions: code.getCodeData("test"),
      //多选
      modelRadio12: "",
      // radio1Options: code.getCodeData("test"),

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
          text: "结束录屏",
          value: "create",
          onClick: this.onBtnClick2,
        },
      ],
    };
  },
  methods: {
    // save 函数用于将 events 发送至后端存入，并重置 events 数组
    save() {
      let events = this.events;
      // console.log("%c save-events", "color:green;", events);
      if (window.utils.cache.get("rrwebEvents")) {
        const lsbody = window.utils.cache.get("rrwebEvents");
        events = events.concat(lsbody.events);
      }
      let body = JSON.stringify({ events });
      window.utils.cache.set("rrwebEvents", body);
      if (new Date().getTime() - this.startTime > 80000) {
        clearInterval(this.interval);
        return;
      }
    },
    beginREC() {
      //请求录音权限
      RecordApp.RequestPermission(
        function() {
          //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
          RecordApp.Start(
            {
              //如果需要的组件还在延迟加载，Start调用会等待这些组件加载完成后才会调起底层平台的Start方法，可通绑定RecordApp.Current.OnLazyReady事件来确定是否已完成组件的加载，或者设置RecordApp.UseLazyLoad=false来关闭延迟加载（会阻塞Install导致RequestPermission变慢）
              type: "mp3",
              sampleRate: 16000,
              bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把支持文件到Platforms.Default内注册
              onProcess: function(buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
                //如果当前环境支持实时回调（RecordApp.Current.CanProcess()），收到录音数据时就会实时调用本回调方法
                //可利用extensions/waveview.js扩展实时绘制波形
                //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
              },
            },
            function() {
              setTimeout(function() {
                // RecordApp.Stop(
                //   function(blob, duration) {
                //     //到达指定条件停止录音和清理资源
                //     console.log(blob, (window.URL || webkitURL).createObjectURL(blob), "时长:" + duration + "ms");
                //     //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
                //     window.utils.cache.set("voice", blob);
                //   },
                //   function(msg) {
                //     console.log("录音失败:" + msg);
                //   },
                // );
              }, 3000);
            },
            function(msg) {
              console.log("开始录音失败：" + msg);
            },
          );
        },
        function(msg, isUserNotAllow) {
          //用户拒绝未授权或不支持
          //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消

          console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
        },
      );
    },
    voiceStop() {
      RecordApp.Stop(
        function(blob, duration) {
          //到达指定条件停止录音和清理资源
          console.log(blob, (window.URL || webkitURL).createObjectURL(blob), "时长:" + duration + "ms");

          //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
          window.myblob = blob;
        },
        function(msg) {
          console.log("录音失败:" + msg);
        },
      );
    },
    // onBtnClick(event, action) {
    //   Dialog.alert({
    //     content: `${action.text}点击`
    //   });
    // },
    // eslint-disable-next-line no-unused-vars
    $_changeData2({ name }, val, oldval, isHand, type, key) {
      console.log("%c $_changeData-name", "color:green;", name);
      console.log("%c $_changeData", "color:green;", val);
    },
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
      clearInterval(this.interval);
      this.save();
      this.voiceStop();
      this.go("demo/demoDetail?nav=action-bar-demo&rrweb=2", "", "");
      // Toast({
      //   content:
      //     "111111111亲我额人图有有哦鹏啊是的发个好将库在先长吧年吗请求！看看发顺丰粉丝地方粉丝地方发顺丰就是雷锋精神疗法",
      //   maxTextNum: 10,
      //   position: "center",
      //   duration: 3000,
      // });
      // this.entryUserEduResPost();
    },
    //get请求
    entryUserEduResGet() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
        // isDealError: true,
      };
      let testlogin = {
        number: "2",
      };
      login({ data: testlogin, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    //post请求
    entryUserEduResPost() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
        // isDealError: true,
      };
      let testlogin = {
        id: "2999",
        userId: "",
        sort: 0,
        startTime: "",
        endTime: "",
        graduateSchool: "",
        major: "",
        witness: "",
      };
      login({ data: testlogin, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
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

<style>
/* .rr-player {
  width: 375px !important;
  height: 667px !important;
} */
.replayer-wrapper {
  transform: scale(1) translate(-2px, -2px) !important;
}
.replayer-mouse {
  background-image: none !important;
}
.rr-controller {
  position: absolute;
  background-color: #00ffad;
  bottom: 20px;
}
.rr-controller__btns.svelte-1cgfpn0 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.rr-controller__btns.svelte-1cgfpn0 button.svelte-1cgfpn0 {
  width: 32px;
  height: 32px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.rr-controller__btns.svelte-1cgfpn0 button.svelte-1cgfpn0:active {
  background: #e0e1fe;
}
.rr-controller__btns.svelte-1cgfpn0 button.active.svelte-1cgfpn0 {
  color: #fff;
  background: rgb(73, 80, 246);
}
.rr-controller__btns.svelte-1cgfpn0 button.svelte-1cgfpn0:disabled {
  cursor: not-allowed;
}
.switch.svelte-a6h7w7 {
  height: 1em;
  display: flex;
  align-items: center;
}
.switch.disabled.svelte-a6h7w7 {
  opacity: 0.5;
}
.label.svelte-a6h7w7 {
  margin: 0 8px;
}
.switch.svelte-a6h7w7 input[type="checkbox"].svelte-a6h7w7 {
  position: absolute;
  opacity: 0;
}
.switch.svelte-a6h7w7 label.svelte-a6h7w7 {
  width: 2em;
  height: 1em;
  position: relative;
  cursor: pointer;
  display: block;
}
.switch.disabled.svelte-a6h7w7 label.svelte-a6h7w7 {
  cursor: not-allowed;
}
.switch.svelte-a6h7w7 label.svelte-a6h7w7:before {
  content: "";
  position: absolute;
  width: 2em;
  height: 1em;
  left: 0.1em;
  transition: background 0.1s ease;
  background: rgba(73, 80, 246, 0.5);
  border-radius: 50px;
}
.switch.svelte-a6h7w7 label.svelte-a6h7w7:after {
  content: "";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 50px;
  left: 0;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  background: #fcfff4;
  animation: switch-off 0.2s ease-out;
  z-index: 2;
}
.switch input[type="checkbox"]:checked + label.svelte-a6h7w7:before {
  background: rgb(73, 80, 246);
}
.switch input[type="checkbox"]:checked + label.svelte-a6h7w7:after {
  animation: switch-on 0.2s ease-out;
  left: 1.1em;
}
</style>
