<template>
  <div class="proposalBook-pro-list">
    <al-all-head title="产品">
      <div slot="head_bottom">
        <!-- <div class="my-head-top">
          <div>aaa</div>
          <div>aaa</div>
        </div> -->
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          @change="changeTab"
        ></n22-tab-bar>
      </div>
    </al-all-head>
    <al-content-list
      class="proposalBook-pro-list-content"
      v-model="curIndex"
      ref="listSwiper"
      :needSwiper="true"
      :swiperTop="44"
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
      >
        <template #top_right_one="{item}">
          <span class="">{{ item.name }}</span>
        </template>
        <template #top_right_two="{item}">
          <span class="">{{ item.alias }}</span>
        </template>
      </common-list>
    </al-content-list>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import CommonList from "../components/CommonList";
import { AllHead, ContentList, TabBar } from "al-mobile";
import _number from "lodash/number";

export default {
  name: "proposal-book-pro-list", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    // [Content.name]: Content,
    [ContentList.name]: ContentList,
    [TabBar.name]: TabBar,
    [CommonList.name]: CommonList
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c proposalBook-生命周期-mounted", "color:green;", "");
    for (let i = 0; i < 60; i++) {
      let index = _number.random(0, 3);
      this.tabs[index].list.push({
        name: `光大永明福运连年(A款)${this.tabs[index].label}`,
        alias: `福运连年(A款)${this.tabs[index].label}`,
        money: 888,
        imgPath:
          "https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdUat/product/listPicture/JCSHS2-5Y.jpg",
        id: "prolist" + i
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
          label: "寿险",
          name: 0,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: ""
        },
        {
          label: "健康险",
          name: 1,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: ""
        },
        {
          label: "意外险",
          name: 2,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: ""
        },
        {
          label: "年金保险",
          name: 3,
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
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      this.$refs.listSwiper.$children[0].changeTab &&
        this.$refs.listSwiper.$children[0].changeTab(i);
    },
    commonListGo() {
      console.log("%c go", "color:#00CD00", 1);
      this.go("proposalBook/dataEntry");
    }
  }
};
</script>

<style lang="scss" scoped>
.proposalBook-pro-list {
  ::v-deep .n22-tab-bar {
    padding-left: 10px;
    padding-right: 80px;
    background-color: #ffffff;
    .n22-tab-bar-item {
      color: #333333;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .proposalBook-pro-list-content {
  }
}
</style>
