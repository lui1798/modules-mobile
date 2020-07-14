<template>
  <div class="demo-all-demo">
    <al-all-head :z-index="2" backUrl="hybrid-back" v-if="runningEnvironment != 'AlipayJSBridge'"></al-all-head>
    <al-content
      class="demo-all-demo-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="false"
      :isToTop="true"
      :swiperTop="runningEnvironment != 'AlipayJSBridge' ? 0 : -allHeadTopPx"
    >
      <n22-field title="">
        <span v-for="(item, i) in navList" :key="i">
          <n22-field-item
            name="item0"
            :title="item.title"
            arrow="arrow-right"
            align="left"
            @click="onClick(item, i)"
          ></n22-field-item>
        </span>
      </n22-field>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Field, FieldItem } from "al-mobile";
import NavConfig from "../components/nav.config.json";
export default {
  name: "native-demo", //使用xx-xx-xx命名方式具体看操作文档
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
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c demo-生命周期-mounted", "color:green;background-color:orange;", "");
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
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
      navList: NavConfig,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    onClick(item) {
      if (typeof item.handle == "string") {
        this.go(item.handle);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-all-demo {
  .demo-all-demo-content {
    ::v-deep .n22-field-item-title {
      max-width: 340px;
    }
  }
}
</style>
