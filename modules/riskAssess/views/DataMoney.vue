<template>
  <div class="riskAssess-data-money">
    <al-all-head hairline></al-all-head>
    <al-content
      class="riskAssess-data-money-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="head-con">
        <div class="assets-actionBg"></div>
        <img class="assets-title" src="../assets/images/风险等级评估.png" />
        <div class="assets-color" />
        <img class="assets-entryPic" src="../assets/images/head01.png" />
        <img class="assets-item" src="../assets/images/head_bg.png" />
      </div>
      <div class="block_3">
        <div class="top-con">
          <div class="outer">
            <div class="color" :style="{ width: `${dealPxToVw(18 * 7)}vw` }" />
            <span class="word">个人及收入信息</span>
          </div>
        </div>
        <n22-field class="insured-info-c" title="">
          <n22-drop-select
            title="劳务收入（年）"
            v-model="per.a"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="非劳务收入（年）"
            v-model="per.b"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="预期退休年龄"
            v-model="per.c"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
        </n22-field>
      </div>
      <div class="block_3">
        <div class="top-con">
          <div class="outer">
            <div class="color color-wi" />
            <span class="word">家庭资产</span>
          </div>
        </div>
        <n22-field class="insured-info-c" title="">
          <n22-drop-select
            title="家庭总资产"
            v-model="per.d"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
        </n22-field>
      </div>
      <div class="block_3">
        <div class="top-con">
          <div class="outer">
            <div class="color color-wi" />
            <span class="word">家庭负债</span>
          </div>
        </div>
        <n22-field class="insured-info-c" title="">
          <n22-drop-select
            title="家庭负债"
            v-model="per.e"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
        </n22-field>
      </div>
      <div class="block_3">
        <div class="top-con">
          <div class="outer">
            <div class="color color-wi" />
            <span class="word">社会保险</span>
          </div>
        </div>
        <n22-field class="insured-info-c" title="">
          <n22-drop-select
            title="社会保险"
            v-model="per.f"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="socialOptions"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
        </n22-field>
      </div>
      <div class="block_3">
        <div class="top-con">
          <div class="outer">
            <div class="color color-wi" />
            <span class="word">商业保险</span>
          </div>
        </div>
        <n22-field class="insured-info-c" title="">
          <n22-drop-select
            title="商业保险"
            v-model="per.g"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="身故保障"
            v-model="per.g"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="意外保障"
            v-model="per.g"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="疾病保障"
            v-model="per.g"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
          <n22-drop-select
            title="养老保障"
            v-model="per.g"
            pickerTitle="请选择"
            selectDefaultValue="10"
            :options="options"
            ispickerValue="请选择"
            type="single"
            :isAppendTo="true"
          ></n22-drop-select>
        </n22-field>
      </div>
      <div class="assets-ft">
        <n22-button @click="next" type="primary">开始测评</n22-button>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, DropSelectItem, Field, FieldItem } from "al-mobile";
export default {
  name: "risk-assess-data-money", //使用xx-xx-xx命名方式具体看操作文档
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
    [DropSelectItem.name]: DropSelectItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c data-money>生命周期>mounted", "color:green;", "");
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
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      per: {
        a: "10",
        b: "10",
        c: "60",
        d: "10",
        e: "10",
        f: "1",
        g: "0",
      },
      socialOptions: [
        {
          text: "有",
          value: "1",
        },
        {
          text: "无",
          value: "2",
        },
      ],
      options: [
        {
          text: "0",
          value: "0",
        },
        {
          text: "10万",
          value: "10",
        },
        {
          text: "60岁",
          value: "60",
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
      this.go("riskAssess/result");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/title.scss";
.riskAssess-data-money {
  .riskAssess-data-money-content {
    // ::v-deep .n22-field-item-content {
    //   min-height: 33px;
    // }
    ::v-deep .n22-field-item-title {
      color: #333 !important;
    }
    ::v-deep .n22-field-item-content-line:before {
      border: none;
    }
  }
}
</style>
