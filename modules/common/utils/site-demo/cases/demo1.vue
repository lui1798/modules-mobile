<template>
  <div class="n22-example-child n22-example-child-all-head n22-example-child-all-head-0">
    <al-all-head title="我的标题" :opacityStyle="opacityStyle"></al-all-head>
    <al-content
      v-model="curIndex"
      ref="listSwiper"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      isMescrollLoadList
    >
      年龄：{{ age }} <br />
      格式化（兼容ios）：{{ formatDate }} <br />
      判定类型：true是字符串类型-{{ isType("String", true) }},"dddddd"是字符串类型-{{ isType("String", "dddddd") }}
      <br />
      获取url中参数：{{ getUrlParams("age") }} （可在url中拼接 ?age=99 刷新查看试试~）<br />
      <br />
    </al-content>
  </div>
</template>

<script>
const __getAge = require("@t/getAge");
const __flatDateStr = require("@t/flatDateStr");
const __is = require("@t/is");
const __getUrlParams = require("@t/getUrlParams");
import { AllHead, Content } from "al-mobile";

export default {
  name: "utils-demo",
  /* DELETE */
  title: "tool.js",
  titleEnUS: "tool",
  height: 120,
  /* DELETE */
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  data() {
    return {
      age: "",
      formatDate: "",
      isType: __is,
      getUrlParams: __getUrlParams,
      opacityStyle: {
        "background-color": "#ffffff",
      },
      curIndex: 0,
      tabs: [
        {
          label: "",
          name: 0,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
    };
  },
  mounted() {
    this.age = __getAge("2019-01-01");
    this.formatDate = new Date(__flatDateStr(new Date())).Format("yyyy-MM-dd");
  },
  methods: {},
};
</script>
<style lang="stylus">
.head-left-children
  position absolute
  margin-left 20px
.head-right-children
  span
    margin-left 10px
</style>
