<template>
  <div>
    <ContentLoader :height="90" v-if="typeSvg == 'noticeListSvg'">
      <rect x="110" y="15" rx="3" ry="3" width="180" height="10" />
      <rect x="320" y="15" rx="3" ry="3" width="60" height="10" />
      <rect x="110" y="40" rx="3" ry="3" width="150" height="10" />
      <rect x="290" y="40" rx="3" ry="3" width="90" height="10" />
      <rect x="110" y="65" rx="3" ry="3" width="100" height="10" />
      <rect x="10" y="10" rx="3" ry="3" width="90" height="70" />
    </ContentLoader>
    <ContentLoader :height="60" v-else-if="typeSvg == 'productObjSvg'">
      <rect x="0" y="0" rx="1" ry="1" width="150" height="50" />
      <rect x="300" y="0" rx="1" ry="1" width="100" height="50" />
      <rect x="0" y="55" rx="1" ry="1" width="400" height="5" />
    </ContentLoader>
    <ContentLoader :height="156" v-else-if="typeSvg == 'menuListSvg'">
      <!-- 50+30 -->
      <rect x="35" y="60" rx="3" ry="3" width="40" height="10" />
      <circle cx="55" cy="25" r="25" />
      <rect x="135" y="60" rx="3" ry="3" width="40" height="10" />
      <circle cx="155" cy="25" r="25" />
      <rect x="225" y="60" rx="3" ry="3" width="40" height="10" />
      <circle cx="245" cy="25" r="25" />
      <rect x="315" y="60" rx="3" ry="3" width="40" height="10" />
      <circle cx="335" cy="25" r="25" />
      <!-- 50+30 70+25+10-->
      <rect x="35" y="140" rx="3" ry="3" width="40" height="10" />
      <circle cx="55" cy="105" r="25" />
      <rect x="135" y="140" rx="3" ry="3" width="40" height="10" />
      <circle cx="155" cy="105" r="25" />
      <rect x="225" y="140" rx="3" ry="3" width="40" height="10" />
      <circle cx="245" cy="105" r="25" />
      <rect x="315" y="140" rx="3" ry="3" width="40" height="10" />
      <circle cx="335" cy="105" r="25" />
    </ContentLoader>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { ContentLoader } from "al-mobile";
export default {
  name: "n22-list-svg", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    typeSvg: {
      //props定义样例
      type: String,
      default: "",
    },
  },
  components: {
    [ContentLoader.name]: ContentLoader,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  data() {
    return {};
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
/*列表--无数据*/
.list_back_li {
  height: 87.3px;
  .list_back_svg {
    height: 100%;
    width: 100%;
  }
}
</style>
