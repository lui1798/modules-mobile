<template>
  <div class="entry-work-experience">
    <al-all-head></al-all-head>
    <al-content
      class="entry-work-experience-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="work-experience-content-box">
        <n22-drop-select
          v-model="workExperience.startDate"
          title="开始时间："
          pickerTitle="请选择"
          :options="beforeDateCodes"
          ispickerValue="请选择开始时间"
          type="date"
          is-show-required
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <item-line />
        <n22-drop-select
          v-model="workExperience.endDate"
          title="结束时间："
          pickerTitle="请选择"
          :options="beforeDateCodes"
          ispickerValue="请选择结束时间"
          type="date"
          is-show-required
          name="certificateType"
          :isAppendTo="false"
        ></n22-drop-select>
        <item-line />
        <n22-input-item
          v-model="workExperience.company"
          title="工作单位："
          maxlength="30"
          placeholder="请输入工作单位"
          is-show-required
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          v-model="workExperience.position"
          title="职务："
          maxlength="30"
          placeholder="请输入职务"
          is-show-required
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
        <item-line />
        <n22-input-item
          v-model="workExperience.why"
          title="离职原因："
          maxlength="30"
          placeholder="请输入备注"
          align="right"
        >
          <div slot="right">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
        </n22-input-item>
      </div>
      <div class="button">
        <n22-button @click="saveData()" type="primary">保存</n22-button>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, InputItem, Field, Icon, DropSelectItem, Dialog } from "al-mobile";
import ItemLine from "../components/ItemLine";
import code from "@@/utils/code/";

import entryUtil from "../assets/utils/entryUtil";

//导入当前页面所使用的到的接口
import { saveEntryUserWork } from "../service/getData";

export default {
  name: "join-company-work-experience", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [DropSelectItem.name]: DropSelectItem,
    [ItemLine.name]: ItemLine,
    [Dialog.name]: Dialog,
  },
  computed: {
    ...mapState(["entry"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c work-experience>生命周期>mounted", "color:green;", "");
    let result = this.$route.query["item"];
    if (result != undefined) {
      console.log(result);
      this.workExperience = JSON.parse(result);
    }
  },
  watch: {},
  data() {
    return {
      workExperience: {
        startDate: "",
        endDate: "",
        company: "",
        position: "",
        why: "",
      },
      beforeDateCodes: code.getCodeData("", "", "test"),
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
    ...mapMutations([
      //提交vuex-state更改样例
      "WORKEXPERIENCE",
    ]),
    saveData() {
      let result = this.checkData(this.workExperience);
      if (result) {
        this.requestSaveEntryUserWork(
          this.workExperience.id != undefined ? this.workExperience.id : "",
          this.workExperience,
          body => {
            console.log(body);
            this.back();
          },
          error => {
            console.log(error);
          },
        );
      }
    },
    checkData(data) {
      if (data == undefined) {
        return false;
      }
      //开始时间
      let result = entryUtil.checkStartDate(data.startDate, data.endDate, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //结束时间
      result = entryUtil.checkEndDate(data.endDate, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //工作单位
      result = entryUtil.checkCompany(data.company, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //职务
      result = entryUtil.checkPosition(data.position, true);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      //离职原因
      result = entryUtil.checkWhy(data.why);
      if (result != undefined) {
        this.alert(result.msg);
        return false;
      }
      return true;
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
    requestSaveEntryUserWork(id, params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        duties: params.position, //职务
        endTime: params.endDate, //结束时间
        id: id,
        leaveReason: params.why, //离职原因
        startTime: params.startDate, //开始时间
        userId: this.$route.query["uid"], //userId
        workCompany: params.company, //工作单位
      };
      //发起请求
      saveEntryUserWork({ data: request, config: axiosParams }).then(
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
.entry-work-experience {
  .entry-work-experience-content {
    .work-experience-content-box {
      background: #fff;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      ::v-deep .n22-field-item {
        padding-left: 30px;
        padding-right: 30px;
        .right-img {
          width: 23px;
          height: 23px;
        }
      }
      ::v-deep .n22-icon-right_arrow:before {
        position: relative;
        z-index: 2;
        color: #979797;
        font-size: 15px;
        margin-left: 5px;
      }
      ::v-deep .n22-input-item-input {
        font-weight: 400;
      }
      ::v-deep .n22-drop-select-field-item.is-select .n22-field-item-right-addon {
        color: rgb(200, 200, 210);
      }
      ::v-deep .n22-field-item-title {
        color: #333333;
      }
    }
    .button {
      margin-left: 90px;
      margin-right: 90px;
      margin-bottom: 45px;
      margin-top: 45px;
    }
  }
}
</style>
