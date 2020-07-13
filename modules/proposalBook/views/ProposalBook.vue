<template>
  <div class="n22-proposal-book">
    <transition name="n22-base-fade">
      <router-view v-if="isShowRouterView" class="n22-proposal-book-child-view"></router-view>
    </transition>
  </div>
</template>

<script>
//注入模块级别this
import Vue from "vue";
import { Toast, Dialog } from "al-mobile";
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
// Vue.prototype.$actionsheet = ActionSheet

import DataPoint from "../directive/DataPoint";
console.log(DataPoint);
Vue.directive("data-point", DataPoint);
Vue.prototype.$DataPoint = DataPoint.inserted;

//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
export default {
  name: "proposal-book", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c proposalBook-生命周期-mounted", "color:green;", "");
    // window.StatusBar && window.StatusBar.overlaysWebView(false);
    window.StatusBar && window.StatusBar.styleDefault();
    let _this = this;
    setTimeout(() => {
      _this.isShowRouterView = true;
    }, this.transitionTime);
  },
  watch: {},
  data() {
    return {
      isShowRouterView: false,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
  },
};
</script>

<style lang="scss" scoped>
.n22-proposal-book {
  .n22-proposal-book-child-view {
    @import "../assets/css/resetField";
  }
}
</style>
