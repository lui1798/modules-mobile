<template>
  <div class="proposalBook-book-list">
    <al-all-head></al-all-head>
    <al-content-list
      class="proposalBook-book-list-content"
      v-model="curIndex"
      ref="listSwiper"
      :swiperTop="0"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      isMescrollLoadList
    >
      <common-list
        @commonListGo="commonListGo"
        :dataList="tabs[curIndex].list"
        :id="tabs[curIndex].id"
        :swiperIndex="tabs[curIndex].swiperIndex"
        class="common-list"
      >
        <template #top_right_one="{item}">
          <span class="">{{ item.name }}</span>
        </template>
        <template #top_right_two="{item}">
          <span>{{ item.alias }}</span>
        </template>
        <template #top_right_three></template>
      </common-list>
    </al-content-list>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import CommonList from "../components/CommonList";
import { AllHead, ContentList } from "al-mobile";
export default {
  name: "proposal-book-book-list", //使用xx-xx-xx命名方式具体看操作文档
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
    [CommonList.name]: CommonList,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c book-list>生命周期>mounted", "color:green;", "");
    for (let i = 0; i < 6; i++) {
      let index = 0;
      this.tabs[index].list.push({
        name: `光大永明福运连年(A款)${this.tabs[index].label}`,
        alias: `福运连年(A款)${this.tabs[index].label}`,
        money: 888,
        imgPath:
          "https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdUat/product/listPicture/JCSHS2-5Y.jpg",
        id: "prolist" + i,
      });
    }
  },
  watch: {},
  data() {
    return {
      curIndex: 0,
      tabs: [
        //content组件对象
        {
          label: "",
          name: 0,
          listType: "1",
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
    commonListGo() {
      console.log("%c go", "color:#00CD00", 4);
      this.go("proposalBook/dataEntry");
    },
  },
};
</script>

<style lang="scss" scoped>
.proposalBook-book-list {
  .proposalBook-book-list-content {
    ::v-deep .top-right-two {
      margin-top: 20px !important;
    }
  }
}
</style>
