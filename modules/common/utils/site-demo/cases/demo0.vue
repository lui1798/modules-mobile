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
      <n22-radio-item
        v-model="sex"
        title="性别"
        :options="sexOptions"
        name="radio1"
        :isAppendTo="false"
        plain
      ></n22-radio-item>
    </al-content>
  </div>
</template>

<script>
import code from "@@/utils/code";
import { AllHead, Content, RadioItem } from "al-mobile";

export default {
  name: "utils-demo",
  /* DELETE */
  title: "getCodeData.js",
  titleEnUS: "getCodeData",
  height: 120,
  /* DELETE */
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [RadioItem.name]: RadioItem,
  },
  data() {
    return {
      sex: "1",
      sexOptions: code.getCodeData("sex"),
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
