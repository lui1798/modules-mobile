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
      看你的右上角~~
    </al-content>
    <move :id="i + 1 + ''" v-show="item.isShow !== false" :floatWidth="182" v-for="(item, i) in roleList" :key="i">
      <div class="role_button" :class="'role_button' + (1 + i)" @click="$_onClick(item)">{{ item.name }}</div>
    </move>
  </div>
</template>

<script>
import { AllHead, Content } from "al-mobile";
import Move from "@@/components/Move.vue";

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
    [Move.name]: Move,
  },
  data() {
    return {
      roleList: [
        { name: "我是拖拽浮动按钮", type: "1" },
        { name: "按责任", type: "2", isShow: false },
      ],
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
  mounted() {},
  methods: {
    $_onClick(data) {
      console.log("%c data", "color:#00CD00", data);
    },
  },
};
</script>
<style lang="stylus">
.head-left-children
  position absolute
  margin-left 20px
.head-right-children
  span
    margin-left 10px

.role_button
  background-color: #ddd;
  font-size: 16px;
  text-align: center;
  line-height: 25px;
  border-radius: 15px 0 0 15px;
.float_div{
  z-index: 9999!important;
  /* DELETE */
  top:200px;
  /* DELETE */
}
</style>
