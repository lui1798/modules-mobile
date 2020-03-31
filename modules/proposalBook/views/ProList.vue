<template>
  <div class="proposalBook-pro-list">
    <al-all-head back-url="hybrid-back" title="产品">
      <template slot="left-children">
        <transition name="n22-base-fade">
          <span @click="goProposalList" class="prolist-small" v-if="isShowSmallSvg">
            <!-- <img src="../assets/images/family_plan.png" /> -->
            <img src="../assets/images/proposal_list.png" />
            <!-- <n22-icon class="prolist-small-svg" name="proccess" size="lg"></n22-icon>
            <n22-icon class="prolist-small-svg" name="edit" size="lg"></n22-icon> -->
          </span>
        </transition>
      </template>
      <div slot="head_bottom">
        <!-- <transition name="n22-base-fade"> -->
        <div v-if="!isShowSmallSvg" class="my-head-top">
          <!-- <div>
            <img src="../assets/images/family_plan.png" />
            <span class="type-text">家庭计划</span>
          </div> -->
          <div @click="goProposalList">
            <img src="../assets/images/proposal_list.png" />
            <span class="type-text">建议书列表</span>
          </div>
        </div>
        <!-- </transition> -->
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
      :swiperTop="isShowSmallSvg ? 44 : 143"
      :tabs="tabs"
      :needSwiper="true"
      :isMescrollDown="true"
      :isToTop="true"
      isMescrollLoadList
      @handleScroll="handleScroll"
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
import { AllHead, ContentList, TabBar, Icon } from "al-mobile";
import _number from "lodash/number";
import _throttle from "lodash/throttle";

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
    [Icon.name]: Icon,
    [CommonList.name]: CommonList,
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
        id: "prolist" + i,
      });
    }
  },
  watch: {},
  data() {
    return {
      isShowSmallSvg: false,
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
          upCallbackFun: "",
        },
        {
          label: "健康险",
          name: 1,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
        {
          label: "意外险",
          name: 2,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
        {
          label: "年金保险",
          name: 3,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
    };
  },
  // eslint-disable-next-line
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    handleScroll: _throttle(function(mescroll, y, isUp) {
      const top = y || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      // console.log("%c top", "color:green;", top);
      if (isUp && top > 80) {
        this.isShowSmallSvg = true;
      }
      if (!isUp && top < 20) {
        this.isShowSmallSvg = false;
      }
    }, 200),
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(i);
    },
    commonListGo() {
      console.log("%c go", "color:#00CD00", 4);
      this.go("proposalBook/dataEntry");
    },
    goProposalList() {
      console.log("%c go", "color:#00CD00", 4);
      this.go("proposalBook/bookList");
    },
  },
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
  .prolist-small {
    img {
      height: 20px;
      width: 20px;
      margin-top: 12px;
      margin-left: 10px;
      position: absolute;
    }
    img:nth-child(2) {
      margin-left: 40px;
    }
    .n22-icon {
      margin-left: 10px;
    }
  }
  .my-head-top {
    line-height: 30px;
    margin-bottom: 10px;
    background-color: #ffffff;
    display: flex;
    img {
      height: 30px;
      width: 30px;
      // margin: 20px 20px 0px;
    }
    div {
      margin: 10px 20px;
    }
    .type-text {
      display: block;
      font-size: 14px;
      color: #333333;
    }
  }
  .proposalBook-pro-list-content {
  }
}
</style>
