<template>
  <div>
    <!-- 头部 -->
    <al-all-head
      v-if="!notdropDpwn"
      title="search_all"
      @click-right="messageCenter"
      :opacityStyle="opacityStyle"
    >
      <div slot="left" class="right_button">
        <n22-icon name="customer_service"></n22-icon>
      </div>
      <div slot="right" class="right_button">
        <n22-icon name="message"></n22-icon>
      </div>
    </al-all-head>
    <!-- content区域 -->
    <home-mescroll
      @dropSown="dropSown"
      @downRefresh="downRefresh"
      @handleScroll="handleScroll"
    >
      <div slot="content" class="home_content" style="padding-bottom: 44px;">
        <!-- 头部广告图片 -->
        <home-ad-swiper v-model="homeAdSwiperIndex" :images="images" />
        <transition name="n22-base-slide-down">
          <div v-if="images.length > 0">
            <!-- 公告 -->
            <div class="home_information">
              <div
                class="home_information_bg"
                :style="{
                  background:
                    'linear-gradient(to right,' +
                    images[homeAdSwiperIndex].color +
                    ' 50%,' +
                    images[homeAdSwiperIndex].bcLinearGradient +
                    ' 70%)'
                }"
              ></div>
              <n22-information-bar
                :class="homeSecondLevelAdTwo ? '' : 'home_information_bar'"
                :leftImg="imgtest"
                :informationList="informationList"
                @goLink="informationClick"
              ></n22-information-bar>
            </div>
            <!-- 二级战略广告位-带滚动1--左右滚动 -->
            <!-- <home-second-level-ad-one></home-second-level-ad-one> -->
            <!-- 二级战略广告位-带滚动2--3d翻转 -->
            <transition name="n22-base-slide-down">
              <home-second-level-ad-two
                v-if="homeSecondLevelAdTwo"
                :topic="topic"
                :backgroundColor="images[homeAdSwiperIndex].color"
                :bcLinearGradient="images[homeAdSwiperIndex].bcLinearGradient"
              ></home-second-level-ad-two>
            </transition>
          </div>
        </transition>
        <!-- 菜单menu -->
        <div class="menu">
          <home-menu-swiper :menuList="menuList" />
        </div>
        <!-- 二级战略广告位-带滚动1--左右滚动 -->
        <!-- <div style="padding-top:10px;">
          <home-second-level-ad-one></home-second-level-ad-one>
        </div> -->
        <!-- 新闻资讯列表 -->
        <transition name="n22-base-fade">
          <div v-if="noticeListShow" style="background-color:#ffffff">
            <notice-list :dataList="message" title="新闻资讯"></notice-list>
          </div>
        </transition>
        <!-- 热销产品 -->
        <div class="product_list">
          <gong-ge-list
            title="热销产品"
            @gongge_go="gongge_go"
            titleButton="more"
            :dataListProp="dataList"
            @selectListByPage="() => {}"
          ></gong-ge-list>
        </div>
      </div>
    </home-mescroll>
  </div>
</template>

<script>
//servive
import { getMenu, homePage } from "@/service/getData";
// import { mapMutations } from "vuex";
//基础组件
import { AllHead, InformationBar, Icon } from "al-mobile";

//业务组件
import HomesAdSwiper from "./components/HomesAdSwiper";
import HomeMenuSwiper from "./components/HomeMenuSwiper";
import HomeSecondLevelAdOne from "./components/HomeSecondLevelAdOne";
import HomeSecondLevelAdTwo from "./components/HomeSecondLevelAdTwo";
import NoticeList from "./components/NoticeList";
import GongGeList from "./components/GongGeList";
// 引入mescroll的vue组件
import HomeMescroll from "./components/HomeMescroll";

export default {
  components: {
    [AllHead.name]: AllHead,
    [InformationBar.name]: InformationBar,
    [Icon.name]: Icon,
    [HomeSecondLevelAdOne.name]: HomeSecondLevelAdOne,
    [HomeSecondLevelAdTwo.name]: HomeSecondLevelAdTwo,
    [HomeMescroll.name]: HomeMescroll,
    [HomesAdSwiper.name]: HomesAdSwiper,
    [HomeMenuSwiper.name]: HomeMenuSwiper,
    [NoticeList.name]: NoticeList,

    [GongGeList.name]: GongGeList
  },
  data() {
    return {
      notdropDpwn: false,
      homeSecondLevelAdTwo: false, //二级战略导航
      noticeListShow: true, //新闻资讯
      licon: require("@/assets/images/common/notice_bar_left_icon.png"),
      vanPullRefresh: {
        //下拉刷新组件
        headHeight: 400
      },
      showAbs: true,
      opacityStyle: {
        backgroundColor: "rgba(67, 139, 237, 0)",
        textColor: "#ffffff"
      },
      //n22-information-bar
      imgtest: require("@/views/home/assets/home_notice.png"),
      informationList: [
        {
          label: "N22咨询",
          labelColor: "#ffffff",
          content:
            "欢迎使用N22在线培训考试系统，系统正在持续开放中，敬请期待。",
          contentColor: "#ffffff"
        },
        {
          label: "",
          content: "客户李欢欢电子保单XADFDFJ09090900承包成功。",
          contentColor: "green"
        },
        {
          label: "",
          content: "客户李哈哈电子保单XADFDFJ09090900支付成功，请及时处理。",
          contentColor: "red"
        }
      ],
      //home-second-level-ad-two
      homeAdSwiperIndex: 0,
      images: [
        {
          color: "#4C47E7" || "rgb(76, 71, 231,1)",
          bcLinearGradient: "#438BED" || "rgb(68, 135, 237.0.6)",
          link: "http://show.n22.com.cn:8889/cms/index.jhtml",
          linkType: "externalLink",
          imgUrl: require("@/views/home/assets/home_swiper_ad1.png")
        },
        {
          color: "orange",
          bcLinearGradient: "#ecb349",
          link: "/trainAll",
          linkType: "appLink",
          imgUrl:
            "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/21927/31/3934/177491/5c2d9025E2c344f89/8f5e5786fc9176ce.jpg"
        },
        {
          color: "yellow",
          bcLinearGradient: "#f9f980",
          link: "/trainAll",
          linkType: "appLink",
          imgUrl:
            "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/21927/31/3934/177491/5c2d9025E2c344f89/8f5e5786fc9176ce.jpg"
        }
      ],
      //二级
      topic: [
        {
          imgUrl: require("@/views/home/assets/sec_ad_img1.png")
        },
        {
          imgUrl: require("@/views/home/assets/sec_ad_img1.png")
        },
        {
          imgUrl: require("@/views/home/assets/sec_ad_img1.png")
        }
      ],
      //>>>>>>咨询
      message: [
        {
          title: "某某某某某某某某某某某某某某某某某某某某某某某.",
          interactionList: [
            {
              num: "2000",
              myselect: "test"
            },
            {
              num: "1000",
              myselect: "like_no"
            },
            {
              num: "400",
              myselect: "notlike_yes"
            }
          ]
        },
        {
          title: "某某某某某某某某某某某某某某某某某某某某某某某.",
          interactionList: [
            {
              num: "2000",
              myselect: "mess_no"
            },
            {
              num: "1000",
              myselect: "like_yes"
            },
            {
              num: "400",
              myselect: "notlike_no"
            }
          ]
        }
      ],
      showPic: false,
      geohash: "", // city页面传递过来的地址geohash
      msiteTitle: "请选择地址...", // msite页面头部标题
      menuList: [], // 食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      //以下为mescroll配置
      dataList: [], // 列表数据
      pdType: 0 // 菜单
      //以上为mescroll配置
    };
  },
  // async beforeMount() {
  //   if (!this.$route.query.geohash) {
  //     const address = await cityGuess();
  //     this.geohash = "112,112" || address.latitude + "," + address.longitude;
  //   } else {
  //     this.geohash = this.$route.query.geohash;
  //   }
  //   //保存geohash 到vuex
  //   // this.SAVE_GEOHASH(this.geohash);
  //   //获取位置信息
  //   let res = await msiteAddress(this.geohash);
  //   this.msiteTitle = "北京市" || res.name;
  //   // 记录当前经度纬度
  //   // this.RECORD_ADDRESS(res);

  //   this.hasGetData = true;
  // },
  activated() {
    //解决微信浏览器bug-微信打开网页键盘弹起后页面上滑，导致弹框里的按钮响应区域错位
    console.log("%c homefish", "color:orange;", "活跃");
    if (!window.cordova) {
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 100);
    }
    // if(this.homeSecondLevelAdTwo){
    //   this.homeSecondLevelAdTwo = true
    //   setTimeout(function() {
    //     this.homeSecondLevelAdTwo = false
    //   }, 100);
    // }
    // this.showAbs = true
    // this.notdropDpwn = true
    console.log("%c aaaaaaaaaaaaaaaaaaaaaa", "color:orange;", this.mescroll);
    // this.scrollTop()
    // window.addEventListener('scroll', this.handleScroll)
    // this.init();
  },
  mounted() {
    // this.init();
    console.log("%c 当前 homefish 页面", "color:red;", "mounted");
  },
  deactivated() {
    console.log("%c 当前 homefish 页面", "color:red;", "销毁");
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    dealgd() {
      return (images, homeAdSwiperIndex) => {
        if (images.lengtn > 0)
          return {
            background:
              "linear-gradient(to right," +
              images[homeAdSwiperIndex].color +
              " 50%," +
              images[homeAdSwiperIndex].bcLinearGradient +
              " 70%)"
          };
      };
    },
    dealgdbg() {
      return (images, homeAdSwiperIndex) => {
        if (images.lengtn > 0) return images[homeAdSwiperIndex].color;
      };
    },
    dealgdbc() {
      return (images, homeAdSwiperIndex) => {
        if (images.lengtn > 0)
          return images[homeAdSwiperIndex].bcLinearGradient;
      };
    }
  },
  methods: {
    // ...mapMutations(["PRODUCT"]),
    // scrollTop(){
    //   this.mescroll.scrollTo( 0, 3 );
    // },
    informationClick(item) {
      this.go(item.pageDetailRouting, { notiDetail: item });
    },
    messageCenter() {
      this.homeSecondLevelAdTwo = !this.homeSecondLevelAdTwo;
    },
    gongge_go(item, index) {
      console.log("%c gongge_go>>>item", "color:green;", item);
      // this.PRODUCT(item);
      if (index == 1)
        this.$router.push(
          `/insured/insureFlowModule/a?productCode=${item.productCode}&productId=${item.productCode}&orderId=${item.orderId}&insteI=1`
        );
      if (index != 1) {
        this.$router.push(
          `/insured/insureFlowModule/aa?productCode=&productId=&orderId=${item.orderId}&insteI=1`
        );
      }
    },
    godemo() {
      this.$router.push("/demo");
    },
    //handleScroll--实现顶部导航的渐进式
    handleScroll(mescroll, y) {
      // console.log("%c y", "color:green;", y);
      const top =
        y ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      let opacity = top / 140;
      opacity = opacity > 1 ? 1 : opacity;
      this.opacityStyle.backgroundColor = "rgba(64, 144, 251, " + opacity + ")";
      this.opacityStyle.textColor = "rgba(102, 102, 102, " + opacity + ")";
      if (top <= 10) {
        // this.opacityStyle.backgroundColor = "rgba(255, 255, 255, 1)";
        this.opacityStyle.textColor = "#ffffff";
      }
    },
    dropSown(parms) {
      console.log(
        "%c dropSown下拉隐藏顶部导航",
        "color:#00CD00",
        "dropSown" + parms
      );
      this.notdropDpwn = parms;
    },
    downRefresh() {
      console.log(
        "%c downRefresh首页下拉刷新触发",
        "color:#00CD00",
        "downRefresh"
      );
      // this.init();
    },
    homePage() {
      let _this = this;
      homePage({}).then(
        res => {
          console.log(
            "%c homePage数据返回成功",
            "color:green;",
            JSON.parse(JSON.stringify(res))
          );
          res = res.response.responseData;
          //咨询数据
          if (res.noticeList && res.noticeList.length > 0) {
            this.noticeListShow = true;
            _this.message = res.noticeList;
          } else {
            this.noticeListShow = false;
          }
          //头部广告轮播图片1>home-ad-swiper
          if (res.images && res.images.length > 0) {
            _this.images = res.images;
          }
          //二级战略导航2>home-second-level-ad-two
          if (res.topic && res.topic.length > 0) {
            _this.topic = res.topic;
            _this.homeSecondLevelAdTwo = true;
          }
          //二级战略导航
          if (res.message) {
            if (res.message.customerMessage.length) {
              _this.informationList = res.message.customerMessage;
            } else if (res.message.systemMessage.length) {
              _this.informationList = res.message.systemMessage;
            }
          }
          //热销产品
          if (res.data && res.data.length > 0) {
            _this.dataList = res.data;
          }
        },
        error => {
          console.log("%c err", "color:red;", error);
        }
      );
    },
    getMenu() {
      getMenu({}).then(
        res => {
          console.log(
            JSON.stringify(res.response.responseData.cusMemberMenuList)
          );
          this.menuList = res.response.responseData.cusMemberMenuList;
          // res = res.response.responseData;
        },
        error => {
          console.log("%c err", "color:red;", error);
        }
      );
    },
    init() {
      this.homePage();
      this.getMenu();
    }
  },
  watch: {
    // '$route'(val){
    //   if(val.name!="homefish"){
    //     console.log('%c 路由销毁xxxx','color:green;',val.name);
    //     window.removeEventListener('scroll', this.handleScroll,true);
    //   }
    // },
  }
};
</script>

<style lang="scss" scoped>
.right_button {
  height: 40px;
  width: 30px;
  margin-right: -10px;
}
.home_information {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  .home_information_bg {
    margin-top: -83px;
    position: absolute;
    height: 133px;
    width: 625px;
    margin-left: -125px;
    overflow: hidden;
    font-size: 0;
    background-color: rgba(67, 139, 237, 1);
    border-radius: 0 0 50% 50%;
  }
  .home_information_bar {
    height: 50px;
    margin-top: 10px;
  }
}
.home_information >>> .information li {
  position: relative;
}

.home_content >>> .information {
  margin-top: -2px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-bottom: -2px;
}
// .home_content >>> .home-second-ad2 {
//   margin-top: -2px;
//   padding-top: 2px;
// }

.menu div:first-child {
  padding-top: 15px;
}

.product_list {
  background-color: #fff;
}

.shop_list_container {
  margin-top: 9.4px;
  border-top: 0.6px solid $bc;
  background-color: #fff;
  .shop_header {
    .shop_icon {
      fill: #999;
      margin-left: 14.1px;
      vertical-align: middle;
      @include wh(14.1px, 14.1px);
    }
    .shop_header_title {
      color: #999;
      @include font(12.9px, 37.5px);
    }
  }
}

//=======================mescroll===============================
.navv {
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.navv p {
  display: inline-block;
  width: 30%;
  padding: 10px 0;
}

.navv .active {
  border-bottom: 1px solid #ff6990;
  color: #ff6990;
}

.data-list li {
  position: relative;
  padding: 10px 8px 10px 120px;
  border-bottom: 1px solid #eee;
}

.data-list .pd-img {
  position: absolute;
  left: 18px;
  top: 18px;
  width: 80px;
  height: 80px;
}

.data-list .pd-name {
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
}

.data-list .pd-price {
  margin-top: 8px;
  color: red;
}

.data-list .pd-sold {
  font-size: 12px;
  margin-top: 8px;
  color: gray;
}
//=======================================================
</style>
