<template>
  <div class="n22-invalid">
    <!-- 手写签名测试区 -->
    <!-- <n22-sign ref="signcfun" :data-params="itemObject"></n22-sign> -->
    <!-- 头部信息 -->
    <al-all-head leftText=" " @click-left="goBack" :zIndex="3" title="链接已失效~ " />
    <al-content ref="invalid" :headBottom="false">
      <div class="invalid-content">
        <svg-icon icon-class="warning"></svg-icon>
        <div>
          {{ message }}
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
export default {
  name: "n22-invalid-html", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    [AllHead.name]: AllHead, //引入组件样例如此
    [Content.name]: Content,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  data() {
    return {
      message: "亲爱的用户，您访问的页面已失效，请联系您的销售人员！",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    goBack() {
      window.wx.closeWindow();
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.n22-invalid {
  >>> .n22-nav-bar {
    background-color: #fafafa;
  }
  .invalid-content {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 70%;
    margin: -15% 0 0 -35%;
    svg {
      height: 60px;
      width: 60px;
    }
  }
}
.router-view {
  background-color: #ffffff;
}
</style>
