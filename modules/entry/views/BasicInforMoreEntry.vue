<template>
  <div class="entry-basic-infor-more-entry">
    <al-all-head></al-all-head>
    <al-content
      class="entry-basic-infor-more-entry-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="basic-infor-more-entry-box">
        <!-- <n22-field-item
          title="联系地址："
          arrow="arrow-right"
          @click="show = !show"
          is-show-required
          placeholder="请选择联系地址"
          align="right"
          :content="personalInformation.contactAddress"
        >
          <div slot="right" style="margin-right: 8px;">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-field-item> -->
        <n22-drop-select
          v-model="personalInformation.contactAddressCode"
          title="联系地址："
          pickerTitle="请选择联系地址"
          :options="addressOptions"
          ispickerValue="请选择联系地址"
          type="address"
          :isAppendTo="true"
          cutMark=","
          is-show-required
        ></n22-drop-select>
        <item-line />
        <n22-input-item
          title="详细地址："
          v-model="personalInformation.detailedAddress"
          is-show-required
          placeholder="请输入详细地址"
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="邮政编码："
          v-model="personalInformation.zipCode"
          placeholder="请输入邮政编码"
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="联系电话："
          v-model="personalInformation.contactPhoneNum"
          is-show-required
          placeholder="请输入联系电话"
          maxlength="12"
          align="right"
          type="digit"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item title="E-mail：" v-model="personalInformation.email" placeholder="请输入E-mail" align="right">
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="紧急联系人："
          v-model="personalInformation.emergencyContact"
          is-show-required
          placeholder="请输入紧急联系人"
          align="right"
          v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="紧急联系人电话："
          v-model="personalInformation.emergencyContactNum"
          is-show-required
          placeholder="请输入紧急联系人电话"
          align="right"
          maxlength="11"
          type="phone"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          title="原工作单位："
          v-model="personalInformation.originalWorkUnit"
          placeholder="请输入原工作单位"
          align="right"
          v-input-limit="/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-drop-select
          title="原职业："
          v-model="personalInformation.oldOccupation"
          :options="options.old_occupation"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-input-item
          title="备注："
          v-model="personalInformation.note"
          placeholder="请输入备注"
          align="right"
          v-input-limit="/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-drop-select
          title="同业经验年限："
          v-model="personalInformation.tradeExperience"
          is-show-required
          :options="options.yearsOfIndustryExperience"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-drop-select
          title="金融类培训经验年限："
          v-model="personalInformation.financialTrainingExperience"
          is-show-required
          :options="options.yearsOfFinancialTrainingExperience"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-drop-select
          title="销售经验年限："
          v-model="personalInformation.experienceInSales"
          is-show-required
          :options="options.yearsOfSalesExperience"
          type="single"
        >
        </n22-drop-select>
        <item-line />
        <n22-drop-select
          title="应聘渠道："
          v-model="personalInformation.applyForTheChannel"
          is-show-required
          :options="options.apply_for_the_channel"
          type="single"
        >
        </n22-drop-select>
        <item-line v-show="personalInformation.applyForTheChannel == '3'" />
        <n22-input-item
          v-show="personalInformation.applyForTheChannel == '3'"
          title="介绍人："
          v-model="personalInformation.references"
          placeholder="请输入介绍人"
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <div class="button">
          <n22-button @click="back()" type="primary">上一步</n22-button>
          <div class="cross-blank"></div>
          <n22-button @click="next" type="primary">下一步</n22-button>
        </div>
      </div>
    </al-content>
    <n22-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市"
      large-radius
      :data="addressOptions"
      v-model="show"
      @change="handleChange"
    />
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
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
  Radio,
  Dialog,
  TabPicker,
} from "al-mobile";
import ItemLine from "../components/ItemLine";
import {
  years_of_industry_experience,
  years_of_financial_training_experience,
  years_of_sales_experience,
  address,
  apply_for_the_channel,
  old_occupation,
} from "../assets/code/codes.js";

import entryUtil from "../assets/utils/entryUtil";

import { updateEntryUserInfoTwo, queryEntryUserInfoTwo } from "../service/getData";

import inputLimit from "@@/utils/inputLimit";

export default {
  name: "join-company-basic-infor-more-entry", //使用xx-xx-xx命名方式具体看操作文档
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
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Radio.name]: Radio,
    [Dialog.name]: Dialog,
    [TabPicker.name]: TabPicker,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c basic-infor-more-entry>生命周期>mounted", "color:green;", "");
    this.initPageData();
  },
  activated() {
    this.initPageData();
  },
  watch: {},
  directives: {
    inputLimit,
  },
  data() {
    return {
      uid: "",
      show: false,
      addressOptions: address,
      personalInformation: {
        contactAddressCode: "", //联系地址编码
        contactAddress: "", //联系地址
        detailedAddress: "", //详细地址
        zipCode: "", //邮政编码
        contactPhoneNum: "", //联系电话
        email: "", //E-mail
        emergencyContact: "", //紧急联系人
        emergencyContactNum: "", //紧急联系人电话
        originalWorkUnit: "", //原工作单位
        oldOccupation: "", //原职业
        note: "", //备注
        tradeExperience: "", //同业经验年限
        financialTrainingExperience: "", //金融类培训经验年限
        experienceInSales: "", //销售经验年限
        applyForTheChannel: "", //应聘渠道
        references: "", //介绍人
      },
      options: {
        //同业经验年限
        yearsOfIndustryExperience: years_of_industry_experience,
        //金融培训经验年限码表
        yearsOfFinancialTrainingExperience: years_of_financial_training_experience,
        //销售经验年限
        yearsOfSalesExperience: years_of_sales_experience,
        //应聘渠道
        apply_for_the_channel: apply_for_the_channel,
        //原职业
        old_occupation: old_occupation,
      },
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
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    next() {
      console.log("%c this.personalInformation", "color:#00CD00", this.personalInformation);
      let result = this.checkData(this.personalInformation);
      if (result) {
        this.requestUpdateEntryUserInfoTwo(
          this.personalInformation,
          body => {
            console.log(body);
            console.log("数据保存成功,跳转到下一个页面");
            this.go("entry/DetailInforEntry?uid=" + this.uid);
          },
          error => {
            console.log(error);
          },
        );
      }
    },
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
      //联系地址
      let result = entryUtil.required("联系地址", data.contactAddressCode, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //详细地址
      result = entryUtil.checkDetailedAddress(data.detailedAddress, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //邮政编码
      result = entryUtil.checkZipCode(data.zipCode);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //联系电话
      result = entryUtil.checkContactPhone(data.contactPhoneNum, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //邮箱
      result = entryUtil.checkEmail(data.email);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //紧急联系人
      result = entryUtil.checkEmergencyContact(data.emergencyContact, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //紧急联系人电话
      result = entryUtil.checkEmergencyContactNum(data.emergencyContactNum, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //原工作单位
      result = entryUtil.checkOriginalCompany(data.originalWorkUnit);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //备注
      result = entryUtil.checkNote(data.note);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //同业经验年限
      result = entryUtil.required("同业经验年限", data.tradeExperience, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //金融类培训经验年限
      result = entryUtil.required("金融类培训经验年限", data.financialTrainingExperience, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //销售经验年限
      result = entryUtil.required("销售经验年限", data.experienceInSales, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //应聘渠道
      result = entryUtil.required("应聘渠道", data.applyForTheChannel, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //介绍人
      if (data.applyForTheChannel == "3") {
        result = entryUtil.checkReferences(data.references, true);
        if (result != undefined) {
          this.alert(result.msg);
          return false;
        }
      }
      return true;
    },
    handleChange({ options }) {
      this.personalInformation.contactAddressCode = options.map(item => item.value).join(",");
      console.log(this.personalInformation.contactAddressCode);
      this.personalInformation.contactAddress = options.map(item => item.label).join(",");
    },
    //初始化页面数据
    initPageData() {
      //获取UID
      this.uid = this.$route.query["uid"];
      if (this.uid != undefined && this.uid !== "") {
        this.requestQueryUserInfo(
          this.uid,
          body => {
            console.log(body.data);
            this.$nextTick(() => {
              this.personalInformation = {
                contactAddress: this.getAddressDesc(body.data.contactAddressProvince, body.data.contactAddressCity),
                contactAddressCode: body.data.contactAddressProvince + "," + body.data.contactAddressCity,
                detailedAddress: body.data.detailAddress, //详细地址
                zipCode: body.data.zipCode, //邮政编码
                contactPhoneNum: body.data.contactNumber, //联系电话
                email: body.data.email, //E-mail
                emergencyContact: body.data.emergencyContact, //紧急联系人
                emergencyContactNum: body.data.emergencyMobile, //紧急联系人电话
                originalWorkUnit: body.data.oldWork, //原工作单位
                oldOccupation: body.data.oldOccupation, //原职业
                note: body.data.remarks, //备注
                tradeExperience: body.data.experienceYears, //同业经验年限
                financialTrainingExperience: body.data.financialExperienceYear, //金融类培训经验年限
                experienceInSales: body.data.salesExperienceYears, //销售经验年限
                applyForTheChannel: body.data.applicationChannels, //应聘渠道
                references: body.data.introducer, //介绍人
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
      queryEntryUserInfoTwo({ id: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //保存信息接口
    requestUpdateEntryUserInfoTwo(params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        id: this.uid,
        recommendCode: "",
        artificialNo: "",
        contactAddressProvince: params.contactAddressCode.split(",")[0],
        contactAddressCity: params.contactAddressCode.split(",")[1],
        detailAddress: params.detailedAddress,
        zipCode: params.zipCode,
        contactNumber: params.contactPhoneNum,
        email: params.email,
        emergencyContact: params.emergencyContact,
        emergencyMobile: params.emergencyContactNum,
        oldWork: params.originalWorkUnit,
        oldOccupation: params.oldOccupation,
        remarks: params.note,
        experienceYears: params.tradeExperience,
        financialExperienceYear: params.financialTrainingExperience,
        salesExperienceYears: params.experienceInSales,
        applicationChannels: params.applyForTheChannel,
        introducer: params.references,
        // freshGraduates: params.,
        // diplomaCertificate: params.,
        // incomeCertificate: params.,
        // incomeRemarks: params.,
        // workCertificate: params.,
        // workRemarks: params.,
      };
      //发起请求
      updateEntryUserInfoTwo({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //通过Code获取对应的联系地址用于显示
    getAddressDesc(contactAddressProvince, contactAddressCity) {
      let address = "";
      this.addressOptions.options.forEach(item => {
        if (item.value == contactAddressProvince) {
          let province = item.label;
          item.children.options.forEach(item => {
            if (item.value == contactAddressCity) {
              address = province + "," + item.label;
            }
          });
        }
      });
      return address;
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-basic-infor-more-entry {
  .entry-basic-infor-more-entry-content {
    .basic-infor-more-entry-box {
      background: #fff;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      ::v-deep .n22-field-item-control {
        font-weight: 400;
      }
      ::v-deep .n22-field-item {
        padding-left: 20px;
        padding-right: 12px;
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
      ::v-deep .n22-drop-select-field-item.is-select .n22-field-item-right-addon {
        color: rgb(200, 200, 210);
      }
    }
    .button {
      display: flex;
      justify-content: space-around;
      padding: 30px;
      .cross-blank {
        margin-left: 20px;
        margin-right: 20px;
      }
      .n22-button {
        height: 44px;
      }
    }
  }
}
</style>
