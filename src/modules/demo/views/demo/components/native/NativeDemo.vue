<template>
  <div class="demo-native-demo">
    <al-all-head v-if="runningEnvironment != 'AlipayJSBridge'"></al-all-head>
    <al-content
      class="demo-native-demo-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <n22-button @click="nativeTestFun">nativeTestFun掉用alert</n22-button>
      <n22-button> fdsfs </n22-button>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button } from "al-mobile";
import nativeHandler from "@/handlers/native/nativeHandler";

export default {
  name: "demo-native-demo", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c demo-生命周期-mounted", "color:green;", "");
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
          upCallbackFun: ""
        }
      ]
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    nativeTestFun() {
      nativeHandler.nativeCommonFun(
        //调用原生通用模板
        { title: "亲", message: "你好", button: "确定" },
        "AlipayJSBridge_alert",
        success => {
          console.log(
            "%c PhoneImport Cordova_getContacts",
            "color:green;",
            success
          );
        },
        error => {
          window.utils.ui.toast({
            message: JSON.stringify(error || ""),
            position: "bottom",
            duration: 3000
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-native-demo {
  .demo-native-demo-content {
  }
}
</style>
