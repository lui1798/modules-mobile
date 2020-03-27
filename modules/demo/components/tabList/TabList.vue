<template>
  <div class="demo-tab-list">
    <al-all-head>
      <div slot="head_bottom">
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          fill-color="#FC7353"
          font-color="#000"
          secMenuAnm="n22-base-slide-right"
        >
        </n22-tab-bar>
      </div>
    </al-all-head>
    <al-content-list
      class="demo-tab-list-content"
      v-model="curIndex"
      ref="listSwiper"
      :needSwiper="true"
      :swiperTop="44"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      isMescrollLoadList
    >
      <div v-for="(item, i) in tabs[curIndex].list" :key="i">
        [我是内容区xxxxx]>>>{{ curIndex }},i: {{ i }},item:{{ item.name }}
      </div>
    </al-content-list>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, ContentList, TabBar } from "al-mobile";
export default {
  name: "tab-list-demo", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [ContentList.name]: ContentList,
    [TabBar.name]: TabBar,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c tab-list>生命周期>mounted", "color:green;", "");
    for (let i = 0; i < 90; i++) {
      this.tabs[this.curIndex].list.push({ name: i + "qqq", id: "11" });
    }
  },
  watch: {},
  data() {
    return {
      curIndex: 0,
      tabs: [
        //content组件对象
        {
          label: "aaaa",
          name: 0,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
        {
          label: "bbbb",
          name: 1,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
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
.demo-tab-list {
  .demo-tab-list-content {
  }
}
</style>
