<template>
  <div>
    <al-all-head></al-all-head>
    <!-- <div>
      <p @click="toggleContent1" class="massage_title">
        投保人信息
      </p>
      <div v-show="contentShow1">
        <p>证件类型：</p>
        <p>证件号码：</p>
        <p>职业代码：</p>
        <p>手机号码：</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { AllHead } from "al-mobile";
export default {
  name: "", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {},
  watch: {},
  data() {
    return {
      contentShow1: true,
      expand1: true,
    };
  },
  methods: {
    toggleContent1() {
      this.contentShow1 = !this.contentShow1;
    },
  },
};
</script>

<style lang="scss" scoped>
.massage_title {
  background: #f5f5f5;
}
</style>
