<template>
  <div class="entry-basic-infor-entry">
    <al-all-head>
      <template slot="left">
        <span @click="closePage()">
          <n22-icon name="back" size="lg"></n22-icon>
        </span>
      </template>
    </al-all-head>
    <al-content
      class="entry-basic-infor-entry-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="basic-infor-entry-box">
        <n22-input-item
          title="姓名："
          v-model="personalInformation.name"
          placeholder="请输入姓名"
          data-vv-as="姓名"
          align="right"
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
          v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
        >
          <!--OSpoon 暂时关闭-->
          <!-- <div @click="gotoOcr()" slot="right">
            <img class="camera" src="../assets/images/icon2_join_camera.png" />
          </div> -->
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="身份证号码："
          v-model="personalInformation.idCardNum"
          placeholder="请输入身份证号"
          data-vv-as="身份证号码"
          align="right"
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
          v-input-limit="/[^\X0-9]/g"
        >
        </n22-input-item>
        <item-line />
        <n22-radio-item
          v-model="personalInformation.gender"
          title="性别："
          data-vv-as="性别"
          name="radio1"
          :isAppendTo="false"
          :options="options.gender"
          disabled
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
        ></n22-radio-item>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.birthday"
          title="出生日期"
          pickerTitle="请选择出生日期"
          :options="birthdays"
          is-show-required
          vvalidateModal=""
          disabled
          type="date"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <item-line />
        <n22-switch-item
          v-model="personalInformation.idCardIsLong"
          title="身份证长期有效"
          name="switch"
          :options="options.switchOptions"
          is-show-required
          maxlength="18"
        ></n22-switch-item>
        <item-line v-show="personalInformation.idCardIsLong == '1'" />
        <n22-drop-select
          v-show="personalInformation.idCardIsLong == '1'"
          v-model="personalInformation.idCardDate"
          title="身份证有效止期"
          pickerTitle="请选择"
          :options="birthdays"
          vvalidateModal=""
          :maxDate="new Date('2200/12/31')"
          type="date"
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.marriageStatus"
          title="婚姻状况："
          :options="options.switchOptions"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-input-item
          title="手机："
          v-model="personalInformation.phoneNum"
          placeholder="请输入手机号"
          data-vv-as="手机"
          align="right"
          is-show-required
          maxlength="11"
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
          type="phone"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.national"
          title="民族："
          is-show-required
          :options="options.national"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.householdRegistration"
          title="户口所在地："
          pickerTitle="请选择"
          :options="options.nativePlace"
          type="single"
        ></n22-drop-select>
        <item-line />
        <n22-switch-item
          v-model="personalInformation.isHireRetired"
          title="是否退休返聘"
          name="switch"
          is-show-required
          :options="options.switchOptions"
        ></n22-switch-item>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.politicsStatus"
          title="政治面貌："
          is-show-required
          :options="options.politicsStatus"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.nativePlace"
          title="籍贯："
          :options="options.nativePlace"
          type="single"
        ></n22-drop-select>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.educationBackground"
          title="学历："
          is-show-required
          :options="options.educationBackground"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-input-item
          title="毕业院校："
          v-model="personalInformation.graduateSchool"
          placeholder="请输入毕业院校"
          data-vv-as="毕业院校"
          align="right"
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="专业："
          v-model="personalInformation.professional"
          placeholder="请输入专业"
          data-vv-as="专业"
          align="right"
          @changeData="$_changeData"
          @click="$_onClick"
          @focus="$_onFocus"
          @blur="$_onBlur"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-drop-select
          v-model="personalInformation.warriorWizardTaoist"
          title="职称："
          :options="options.warriorWizardTaoist"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <div class="button">
          <n22-button @click="next" type="primary">下一步</n22-button>
        </div>
      </div>
    </al-content>
    <verify-code-box
      :data="personalInformation.phoneNum"
      :name="personalInformation.name"
      :value="isShowVerifyCode"
      :models="verifyCodeModels"
    ></verify-code-box>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
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
  Switch,
  DatePicker,
  Picker,
  SwitchItem,
  Dialog,
} from "al-mobile";
import ItemLine from "../components/ItemLine";
import VerifyCodeBox from "../components/VerifyCodeBox";
import code from "@@/utils/code/";
const __getAge = require("@t/getAge");
import {
  ethnic_groups,
  gender,
  native_place,
  education,
  position_rank,
  politics_status,
  yes_or_no,
} from "../assets/code/codes.js";

import entryUtil from "../assets/utils/entryUtil";

//导入当前页面所使用的到的接口
import { saveEntryUserInfoOne, queryEntryUserInfoOne } from "../service/getData";

import inputLimit from "@@/utils/inputLimit";

import wx from "weixin-js-sdk";

export default {
  name: "join-company-basic-infor-entry", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button,
    [ItemLine.name]: ItemLine,
    [VerifyCodeBox.name]: VerifyCodeBox,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Picker.name]: Picker,
    [SwitchItem.name]: SwitchItem,
    [Dialog.name]: Dialog,
  },
  computed: {
    ...mapState(["entry"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c basic-infor-entry>生命周期>mounted", "color:green;", "");
    this.CLEAN();
    this.initPageData();
  },
  activated() {
    this.initPageData();
  },
  watch: {
    "personalInformation.idCardNum": {
      handler(nValue, oValue) {
        if (nValue != oValue) {
          let isPass = entryUtil.checkIdCard(nValue, true);
          if (isPass == undefined) {
            let result = entryUtil.getAnalysisIdCard(nValue, "yyyy/MM/dd");
            console.log(result);
            this.personalInformation.gender = result.gender.type;
            this.personalInformation.birthday = result.birthday;
          } else {
            this.personalInformation.gender = "0";
            this.personalInformation.birthday = "";
          }
        }
      },
      deep: true,
    },
  },
  directives: {
    inputLimit,
  },
  data() {
    return {
      uid: "", //当前页面为保存数据模式需获取uid
      model: "", //当前页面模式 new:新页面 save:保存数据
      //验证码组件参数
      isShowVerifyCode: false,
      verifyCodeModels: [
        {
          desc: "取消",
          type: "cancel",
          onClick: this.verifyCodeClick,
        },
        {
          desc: "确定",
          type: "confirm",
          onClick: this.verifyCodeClick,
        },
      ],
      personalInformation: {
        name: "", //姓名
        idCardNum: "", //身份证号码
        gender: "0", //性别
        birthday: "", //生日
        idCardIsLong: "1", //是否长期
        idCardDate: "", //证件有效期
        marriageStatus: "", //婚姻状况 非必填 下拉选项
        phoneNum: "", //手机号码
        national: "", //民族
        householdRegistration: "", //户籍所在地
        isHireRetired: "1", // 是否退休返聘
        politicsStatus: "", //政治面貌
        nativePlace: "", //籍贯
        educationBackground: "", //学历
        graduateSchool: "", //毕业院校
        professional: "", //专业
        warriorWizardTaoist: "", //职称
      },
      options: {
        //性别
        gender: gender,
        //民族列表
        national: ethnic_groups,
        //户口所在地列表
        //政治面貌列表
        politicsStatus: politics_status,
        //籍贯列表
        nativePlace: native_place,
        //学历列表
        educationBackground: education,
        //职称列表
        warriorWizardTaoist: position_rank,
        switchOptions: yes_or_no,
      },
      pickerValue0: "",
      isPickerShow0: false,
      isDatePickerShow2: false,
      currentDate: new Date(),
      isDatePickerShow: false,
      datePickerValue: "",
      modelWork: "",
      birthdays: code.getCodeData("", "", "test"),
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
    };
  },
  filters: {
    defaultValue(value) {
      if (value == undefined || value == "") {
        return "请选择";
      } else {
        return value;
      }
    },
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "CLEAN",
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
    $_onPickerConfirm({ name }, val) {
      console.log("%c $_onPickerConfirm-name", "color:green;", name);
      console.log("%c $_onPickerConfirm", "color:green;", val);
      if (name) {
        let objKey = name.split(".")[0];
        if (name === `${objKey}.birthday`) {
          this[objKey].age = __getAge(val) === 0 ? "0" : __getAge(val) + "";
          console.log("%c this." + objKey + ".age", "color:red", this[objKey].age);
        } else if (name === `${objKey}.age`) {
          this[objKey].birthday && (this[objKey].birthday = "");
        }
      }
    },
    closePage() {
      console.log("wx closeWindow");
      wx.closeWindow();
    },
    //回调选择日期并进行赋值
    onDatePickerConfirm(ref) {
      this.personalInformation[ref] = this.$refs[ref].getFormatDate("yyyy/MM/dd");
    },
    //回调选择选项并进行赋值
    onPickerConfirm(ref) {
      const values = this.$refs[ref].getColumnValues();
      let res = "";
      values.forEach(value => {
        value && (res = `${value.value}`);
      });
      this.personalInformation[ref] = res;
    },
    gotoOcr() {
      this.toast("暂未开放");
      // this.go("entry/CardScan");
    },
    //下一步
    next() {
      let result = this.checkData(this.personalInformation);
      if (result) {
        this.requestSaveUserInfo(
          this.personalInformation,
          body => {
            console.log(body);
            if (body.data != undefined && body.data != "") {
              //更新当前路由
              this.$router.push({
                path: this.$route.path,
                query: Object.assign({}, this.$route.query, { uid: body.data }),
              });
              console.log("数据保存成功,跳转到下一个页面");
              this.go("entry/BasicInforMoreEntry?uid=" + body.data);
            }
          },
          error => {
            console.log(error);
            this.personalInformation.randomId = undefined;
            this.personalInformation.code = undefined;
            // 新增用户需要获取短信验证码
            if (error.bizcode == "1800") {
              this.isShowVerifyCode = !this.isShowVerifyCode;
            }
          },
        );
      }
    },
    //验证码窗口
    verifyCodeClick(event, action) {
      this.isShowVerifyCode = !this.isShowVerifyCode;
      console.log("verifyCodeClick ", event);
      console.log("verifyCodeClick ", action);
      if (action.type == "confirm") {
        console.log("进行验证码验证", action);
        if (action.verifyCode != "" && action.verifyId != "") {
          this.personalInformation["code"] = action.verifyCode;
          this.personalInformation["randomId"] = action.verifyId;
          this.requestSaveUserInfo(
            this.personalInformation,
            body => {
              console.log(body);
              if (body.data != undefined && body.data != "") {
                //更新当前路由
                this.$router.push({
                  path: this.$route.path,
                  query: Object.assign({}, this.$route.query, { uid: body.data }),
                });
                this.go("entry/BasicInforMoreEntry?uid=" + body.data);
              }
            },
            error => {
              console.log(error);
              this.personalInformation.randomId = undefined;
              this.personalInformation.code = undefined;
            },
          );
        } else {
          this.toast("请获取新的验证码使用");
        }
      } else if (action.type == "cancel") {
        console.log("取消验证");
      }
    },
    //消息提示窗口
    toast(message) {
      window.utils.ui.toast({
        message: message,
        position: "middle",
        duration: 1500,
      });
    },
    //提示选择窗口
    alert(message) {
      Dialog.alert({
        title: "温馨提示",
        content: message,
        cancelText: "取消",
        confirmText: "确定",
        onConfirm: () => console.log("[Dialog.alert] confirm clicked"),
      });
    },
    /*
      校验录入数据
    */
    checkData(data) {
      if (data == undefined) {
        return false;
      }
      //姓名
      let result = entryUtil.checkName(data.name, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //身份证号码
      result = entryUtil.checkIdCard(data.idCardNum, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //身份证有效止期
      if (data.idCardIsLong == "1") {
        result = entryUtil.checkIdCardDate(data.idCardDate, true);
        if (result != undefined) {
          this.alert(result.msg);
          return false;
        }
      }
      //手机
      result = entryUtil.checkPhoneNum(data.phoneNum, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //民族
      result = entryUtil.required("民族", data.national, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //政治面貌
      result = entryUtil.required("政治面貌", data.politicsStatus, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //学历
      result = entryUtil.required("学历", data.educationBackground, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //毕业院校
      result = entryUtil.checkGraduateSchool(data.graduateSchool, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //专业
      result = entryUtil.checkProfessional(data.professional);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      return true;
    },
    //初始化页面数据
    initPageData() {
      //获取UID
      this.uid = this.$route.query["uid"];
      if (this.uid == undefined || this.uid === "") {
        this.model = "new";
      } else {
        this.model = "save";
      }
      if (this.model == "save") {
        this.requestQueryUserInfo(
          this.uid,
          body => {
            console.log(body.data);
            this.$nextTick(() => {
              this.personalInformation = {
                id: body.data.id, //信息Id
                name: body.data.name, //姓名
                idCardNum: body.data.idNo, //身份证号码
                gender: body.data.sex, //性别
                birthday: body.data.birthday != undefined ? body.data.birthday.substring(0, 10) : "", //生日
                idCardIsLong: body.data.longValid, //是否长期
                idCardDate: body.data.expiry != undefined ? body.data.expiry.substring(0, 10) : "", //证件有效期
                marriageStatus: body.data.marry, //婚姻状况 非必填 下拉选项
                phoneNum: body.data.mobile, //手机号码
                national: body.data.nation, //民族
                householdRegistration: body.data.householdRegister, //户籍所在地
                isHireRetired: body.data.rehire, // 是否退休返聘
                politicsStatus: body.data.political, //政治面貌
                nativePlace: body.data.nativePlace, //籍贯
                educationBackground: body.data.education, //学历
                graduateSchool: body.data.graduatedSchool, //毕业院校
                professional: body.data.major, //专业
                warriorWizardTaoist: body.data.title, //职称
              };
            });
          },
          error => {
            console.log(error);
          },
        );
      }
    },
    //查询信息接口
    requestQueryUserInfo(uid, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      queryEntryUserInfoOne({ id: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //保存信息接口
    requestSaveUserInfo(params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        id: this.uid != undefined ? this.uid : "",
        recommendCode: this.$route.query["recommendCode"], //推荐人工号
        name: params.name, //姓名
        sex: params.gender, //性别
        birthday: params.birthday.substring(0, 10), //生日
        idNo: params.idCardNum, //身份证号
        expiry: params.idCardDate.substring(0, 10), //身份证有效期
        longValid: params.idCardIsLong, //params.idCardIsLong, //身份证是否长期
        marry: params.marriageStatus, //婚姻状况
        mobile: params.phoneNum, //手机号
        nation: params.national, //民族
        householdRegister: params.householdRegistration, //户口所在地
        rehire: params.isHireRetired, //params.isHireRetired, //是否返聘
        political: params.politicsStatus, //政治面貌
        nativePlace: params.nativePlace, //籍贯
        education: params.educationBackground, //学历
        graduatedSchool: params.graduateSchool, //毕业院校
        major: params.professional, //专业
        title: params.warriorWizardTaoist, //职称
        artificialNo: "", //人工号
        code: params.code, //验证码
        randomId: params.randomId, //验证码ID
      };
      //发起请求
      saveEntryUserInfoOne({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-basic-infor-entry {
  .entry-basic-infor-entry-content {
    .basic-infor-entry-box {
      background: #fff;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      .camera {
        width: 23px;
        height: 23px;
        margin-top: 5px;
        margin-left: 10px;
      }
      ::v-deep .n22-field-item {
        padding-left: 20px;
        padding-right: 20px;
        .right-img {
          width: 23px;
          height: 23px;
        }
      }
      ::v-deep .n22-input-item-input {
        font-weight: 400;
      }
      ::v-deep .n22-field-item-right {
        margin-left: 0;
      }
      ::v-deep .n22-drop-select-field-item.is-select .n22-field-item-right-addon {
        color: rgb(200, 200, 210);
      }
      ::v-deep .n22-icon-right_arrow:before {
        position: relative;
        z-index: 2;
        color: #979797;
        font-size: 15px;
        margin-left: 10px;
      }
      ::v-deep .n22-field-item-title {
        color: #333333;
      }
      .button {
        margin-left: 90px;
        margin-right: 90px;
        margin-bottom: 45px;
        margin-top: 45px;
      }
    }
  }
}
</style>
