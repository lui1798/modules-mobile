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
          @change="changeTab"
        >
        </n22-tab-bar>
      </div>
    </al-all-head>
    <al-content
      class="demo-tab-list-content"
      v-model="curIndex"
      ref="listSwiper"
      :needSwiper="false"
      :swiperTop="44"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      isMescrollLoadList
      @selectListByPage="selectListByPage"
    >
      <template #default="{list,id}">
        <div :id="id">
          <div class="my-item" v-for="(item, i) in list" :key="i">
            {{ item.name }}
          </div>
        </div>
      </template>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, TabBar } from "al-mobile";
import jpg from "../../assets/images/list1.png";
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
    [Content.name]: Content,
    [TabBar.name]: TabBar,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c tab-list>生命周期>mounted", "color:green;", "");
    // for (let i = 0; i < 90; i++) {
    //   this.tabs[this.curIndex].list.push({ name: i + "qqq", id: "11" });
    // }
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
          upCallbackFun: "selectListByPage",
          emptyProp: {
            icon: jpg,
            tip: "暂无相关数据~", // 提示
            btntext: "去报名 >", // 按钮,默认""
            btnClick: this.btnClick,
          },
        },
        {
          label: "bbbb",
          name: 1,
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            icon: jpg,
            tip: "暂无相关数据~", // 提示
            btntext: "去报名 >", // 按钮,默认""
            btnClick: this.btnClick,
          },
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      //如果contet内容区使用了列表content-list组件并且开启了needSwiper通过ref去操作content-list组件的changeTab切换内容区（具体可以移步content查看参数）
      console.log("%c this.$refs.listSwiper", "color:#00CD00", this.$refs.listSwiper);
      // this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(i);
      this.$refs.listSwiper.changeTab && this.$refs.listSwiper.changeTab(i);
      //触发下拉刷新
      this.tabs[i].mescroll.triggerDownScroll();
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      let dataList = [];
      for (let i = 0; i < 100; i++) {
        dataList.push({
          name: "name" + i,
          id: "id" + i,
        });
      }
      // let _this = this;
      // let req = {};
      console.log("%c selectListByPage", "color:#00CD00", tabIndex);
      setTimeout(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          //成功回掉
          //模拟返回数据分页处理
          let listData = [];
          for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
            if (i >= dataList.length) break;
            dataList[i].name.indexOf("Tab") < 0 && (dataList[i].name = `Tab-${tabIndex}-${dataList[i].name}`);
            listData.push(dataList[i]);
          }
          // 回调
          console.log("%c this.tabs.list", "color:#00CD00", this.tabs[tabIndex].list);
          successCallback && successCallback(tabIndex === 0 ? listData : []);
        } else {
          //失败回掉
          errorCallback && errorCallback();
        }
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-tab-list {
  .demo-tab-list-content {
  }
}
</style>
