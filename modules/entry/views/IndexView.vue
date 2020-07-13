<template>
  <div class="entry-index-view">
    <al-all-head back-url="hybrid-back">
      <div class="head-right-content" slot="right">
        <img @click="isShowSeach = !isShowSeach" class="head-icon" src="../assets/images/icon2_join_search.png" />
        <div class="blank"></div>
        <img @click="isShowShare = !isShowShare" class="head-icon" src="../assets/images/icon2_join_add.png" />
      </div>
      <div slot="head_bottom">
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          @change="changeTab"
        ></n22-tab-bar>
        <share-button :value="isShowShare" :shareModel="shareModels"></share-button>
      </div>
    </al-all-head>
    <al-content-list
      class="entry-index-view-content"
      ref="listSwiper"
      v-model="curIndex"
      :needSwiper="true"
      :tabs="tabs"
      :swiperTop="swiperTop"
      :isMescrollDown="false"
      :isToTop="true"
      isMescrollLoadList
      :isAutoMescrollDown="false"
      htmlNodata="<p class='upwarp-nodata'>到底了，无更多数据</p>"
      :page="page"
      @selectListByPage="selectListByPage"
    >
      <div v-for="(item, index) in tabs[curIndex].list" :key="index">
        <home-list-item :item="item" @goto="gotoDetail"></home-list-item>
        <item-line></item-line>
      </div>
    </al-content-list>
    <side-slip-seach
      :value="isShowSeach"
      @closeFun="closeSideSeach"
      @seachFun="seachSideSeach"
      @resetFun="resetSideSeach"
    ></side-slip-seach>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, ContentList, Button, TabBar, Toast } from "al-mobile";
import ShareButton from "../components/ShareButton";
import HomeListItem from "../components/HomeListItem";
import ItemLine from "../components/ItemLine";
import SideSlipSeach from "../components/SideSlipSeach";

import icon2_join_nodata from "../assets/images/icon2_join_nodata.png";

//接口调用导入
import { queryPage } from "../service/getData";

import native from "js-native-n22";

const __getAge = require("@t/getAge");

export default {
  name: "join-company-index-view",
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [ContentList.name]: ContentList,
    [Button.name]: Button,
    [TabBar.name]: TabBar,
    [ShareButton.name]: ShareButton,
    [HomeListItem.name]: HomeListItem,
    [ItemLine.name]: ItemLine,
    [SideSlipSeach.name]: SideSlipSeach,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  async mounted() {
    console.log("%c entry-生命周期-mounted", "color:green;", "");
    try {
      let code = await this.getRecommendCodeFromStorageNative();
      if (code == undefined) {
        Toast({
          content: "无法正确获取到代理人工号",
          position: "bottom",
          duration: 3000,
        });
        console.error("无法正确获取到代理人工号");
      } else {
        this.recommend_code = code;
        this.tabs[0].mescroll.triggerDownScroll();
      }
    } catch (error) {
      this.recommend_code = window.utils.cache.get("_agent");
      this.tabs[0].mescroll.triggerDownScroll();
      console.log("插件调用失败,请确定使用环境为手机");
    }
  },
  watch: {},
  data() {
    return {
      //展示查询组件
      isShowSeach: false,
      //接收查询组件参数
      searchParams: {},
      //推荐人号,路由获取
      recommend_code: "",
      //分享组件参数
      isShowShare: false,
      shareModels: [
        {
          desc: "分享给微信好友",
          type: "wechat",
          onClick: this.wechatShare,
        },
        {
          desc: "分享至朋友圈",
          type: "wechatf",
          onClick: this.wechatShare,
        },
        {
          desc: "取消",
          type: "cancel",
          onClick: this.wechatShare,
        },
      ],
      swiperTop: 54,
      curIndex: 0,
      //分页参数
      page: {
        pagenum: 1,
        size: 10,
        time: null,
      },
      tabs: [
        //content组件对象
        {
          label: "待审核",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            icon: icon2_join_nodata, //数据为空时的图片
            tip: "未查询到相关人员，请继续邀请您的亲朋好友", // 提示
          },
        },
        {
          label: "审核通过",
          name: 1,
          listType: "2",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            icon: icon2_join_nodata, //数据为空时的图片
            tip: "未查询到相关人员，请继续邀请您的亲朋好友", // 提示
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
    //切换Tab页
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      //如果contet内容区使用了列表content-list组件并且开启了needSwiper通过ref去操作content-list组件的changeTab切换内容区（具体可以移步content查看参数）
      // this.$refs.listSwiper.changeTab && this.$refs.listSwiper.changeTab(i);
      this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(i);
      //触发下拉刷新
      //this.tabs[i].mescroll.triggerDownScroll();
    },
    //Content区触发刷新
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      console.log("tabIndex", tabIndex);
      if (this.recommend_code == undefined || this.recommend_code == "") {
        successCallback && successCallback([]);
        return;
      }
      this.requestQueryPage(
        this.tabs[tabIndex].listType,
        pageNum,
        this.searchParams,
        body => {
          if (body != undefined) {
            console.log(body.data);
            let listData = [];
            body.data.data.forEach(ele => {
              let item = {
                id: ele.id,
                name: ele.name,
                age: __getAge(new Date(ele.birthday.substr(0, 10))),
                sex: ele.sex,
                phone: ele.mobile,
                status: ele.status,
              };
              listData.push(item);
            });
            //按服务器返回每页数据量更新配置
            this.page.size = body.data.pageSize;
            successCallback && successCallback(listData);
          }
        },
        error => {
          errorCallback && errorCallback(error);
          console.log(error);
        },
      );
    },
    wechatShare(event, action) {
      console.log("wechatShare ", event);
      console.log("wechatShare ", action);
      this.isShowShare = false;
      let recommendCode = this.recommend_code;
      //拼装分享地址
      let rootURL = new URL(window.globalConfig.rootUrl);
      let link =
        rootURL.protocol +
        "//" +
        rootURL.hostname +
        "/app/entry/index.html#/entry/BasicInforEntry?recommendCode=" +
        recommendCode +
        "&isShare=2";
      console.log(link);
      if (action.type == "wechat") {
        this.shareWeChatNative("1", link);
      } else if (action.type == "wechatf") {
        this.shareWeChatNative("2", link);
      } else if (action.type == "cancel") {
        console.log("取消操作");
      }
    },
    /**
     * 调用原生插件进行分享
     * platform: 分享好友1,分享朋友圈2
     * link: 分享的地址
     */
    shareWeChatNative(platform = "1", link) {
      native.shareWeChat(
        {
          platform: platform,
          webPageUrl: link,
          iconUrl: "https://xinyidongzhanyeguangsubao-st-1254235118.cos.ap-beijing.myqcloud.com/Default/share.jpg",
          title: "光大永明人寿邀请您的加入",
          desc: "上万人的选择，期待您的加入，一次加入，终身受益",
        },
        content => {
          console.log(content);
        },
        error => {
          console.log(error);
        },
      );
    },
    //通过插件获取代理人信息中的工号
    getRecommendCodeFromStorageNative() {
      return new Promise(resolve => {
        native.storage(
          {
            mode: 2,
            key: "userInfo",
          },
          content => {
            console.log(content);
            resolve(content.object.appLoginUser.agentCode);
          },
        );
      });
    },
    //搜索框查询
    seachSideSeach(seach) {
      this.isShowSeach = !this.isShowSeach;
      this.searchParams = seach;
      this.tabs[this.curIndex].mescroll.resetUpScroll(false);
    },
    //搜索框重置
    resetSideSeach(seach) {
      this.searchParams = seach;
      this.tabs[this.curIndex].mescroll.resetUpScroll(false);
    },
    //查询框关闭
    closeSideSeach() {
      this.isShowSeach = !this.isShowSeach;
    },
    //跳转到详情页面
    gotoDetail(id) {
      this.go(`entry/PersonDetail?uid=${id}`);
    },
    //查询用户列表接口
    requestQueryPage(status = "1", page = "1", params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: false,
        loaddingText: "数据请求中...",
        isDealError: false,
      };
      //构建请求参数
      let request = {
        status: status, //列表类型
        pageNumber: page, //当前页数
        pageSize: this.page.size, //额定的页大小
        recommendCode: this.recommend_code, //推荐人号
        name: params != undefined ? params.name : "", // 姓名
        sex: params != undefined ? params.sex : "", // 性别
        mobile: params != undefined ? params.phone : "", // 联系电话
        startAge: params != undefined ? params.startAge : "", //最小年龄
        endAge: params != undefined ? params.endAge : "", // 最大年龄
      };
      queryPage({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-index-view {
  .head-right-content {
    display: flex;
    height: 30px;
    .blank {
      margin-left: 6px;
      margin-right: 6px;
    }
    .head-icon {
      width: 20px;
      height: 20px;
    }
  }
  .entry-index-view-content {
    ::v-deep .mescroll {
      background: #fff;
      .empty-icon {
        width: 68px;
        height: 72px;
        margin-top: 100px;
        margin-bottom: 39px;
      }
    }
  }
}
</style>
