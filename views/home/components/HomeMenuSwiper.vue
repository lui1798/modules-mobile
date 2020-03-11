<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="homeMenuSwiper">
      <!-- <transition name="n22-base-fade"> -->
      <!-- eslint-disable -->
      <swiper-slide
        v-if="menuArr.length > 0"
        class="swiper-slide food_types_container"
        v-for="(item, $index) in menuArr"
        :key="$index"
      >
      <!-- eslint-disable -->
        <!-- 基于全局埋点点击事件的监控此处将div标签改为a标签-后期此处menu出现兼容性问题注意！！！！！ -->
        <a
          @click="homemenuGo(foodItem)"
          v-for="foodItem in item"
          :key="foodItem.id"
          class="needsclickllll link_to_food"
          v-bind:style="{ width: 100 / rankNumber + '%' }"
        >
          <figure class="needsclickxxxxxxx al_figure">
            <img class="fgimg needsclickxxxxxx" v-lazy="foodItem.url" />
            <figcaption>{{ foodItem.menuName }}</figcaption>
          </figure>
        </a>
      </swiper-slide>
      <!-- </transition> -->
      <!-- <div slot="pagination" class="homemenupagination">
      </div>-->
      <div
        v-if="menuArr.length > 1"
        slot="pagination"
        class="homemenuscrollbar"
      >
        <div
          class="home-swiper-pagination-drag"
          :style="{
            transform: 'translate3d(' + swiper.progress * 20 + 'px, 0px, 0px)',
            'transition-duration': '100ms'
          }"
        ></div>
      </div>
      <!-- <div slot="scrollbar">
        <div class="homemenuscrollbar"></div>
      </div>-->
    </swiper>
    <!-- <div v-if="!menuArr.length" class="fl_back animation_opactiy">
      <svg-icon icon-class="fl"></svg-icon>
    </div>-->

    <n22-list-svg typeSvg="menuListSvg" v-if="!menuArr.length"></n22-list-svg>
  </div>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import "al-mobile/components/common/swiper/dist/css/swiper.css";
import {
  swiper,
  swiperSlide
} from "al-mobile/components/common/swiper/swiper-vue";
import ListSvg from "@/components/common/ListSvg";

export default {
  name: "home-menu-swiper", //home广告swiper位
  components: {
    swiper,
    swiperSlide,
    [ListSvg.name]: ListSvg
  },
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rankNumber: {
      //列数
      type: Number,
      default: 4 //建议设置3-5
    }
  },
  data() {
    return {
      swiper: {},
      rootUrl: window.globalConfig.rootUrl,
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: false, //可选选项，自动滑动
        // loop:true,
        // speed: 100,
        slidesPerView: 1,
        // watchSlidesProgress : true,
        // watchSlidesVisibility : true,
        // slideVisibleClass : 'swiper-slide-visible',//额外的样式
        // slidesOffsetBefore : 110,//设定slide与左边框的预设偏移量（单位px）。
        // slidesOffsetAfter : 110,//设定slide与右边框的预设偏移量（单位px）。
        // spaceBetween : '5%',//在slide之间设置距离（单位px）。'10%',按container的百分比
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        // scrollbar: {
        //   el: '.homemenuscrollbar',
        //   dragSize: 30,
        // },
        // pagination: {//分页器
        //   el: '.homemenupagination',
        //   bulletClass : 'homemenu-swiper-pagination-switch',//点样式
        //   bulletActiveClass: 'homemenu-swiper-active-switch',//选中的样式
        // },
        uniqueNavElements: false, //独立分页元素，当启用（默认）并且分页元素的传入值为字符串时，swiper会优先查找子元素匹配这些元素。可应用于分页器，按钮和滚动条（pagination, prev/next buttons and scrollbar elements）。当你的控制组件放在container外面的时候，需要用到。
        paginationClickable: true,
        // scrollbar: ".swiper-scrollbar", //滚动条
        mousewheelControl: true,
        observeParents: true,
        // height: 300,//你的slide高度
        autoHeight: true, //高度随内容变化
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        noSwipingClass: "removerule",
        on: {
          slideChangeTransitionEnd: function() {
            // that.handleChange(this.activeIndex,false,true)
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
            // console.log(that.index);//切换结束时，告诉我现在是第几个slide
          }
        }
      }
    };
  },
  computed: {
    menuArr() {
      let res = this.menuList;
      let resLength = res.length;
      let resArr = [...res]; // 返回一个新的数组
      let menuArr = [];
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        menuArr[j] = resArr.splice(0, 8);
      }
      return menuArr;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    homemenuGo(item) {
      if (item.routeUrl) {
        // if(item.routeUrl == '/productList' || item.routeUrl == '/proposalList') {
        //   utils.cache.set('menuId',item.menuId)
        //   this.$router.push(`${item.routeUrl}?id=${item.menuId}`)
        // } else {
        this.$router.push(item.routeUrl);
        // }
      } else {
        window.utils.ui.toast("该模块未开放");
      }
    }
  },
  watch: {
    menuArr(newval, oldval) {
      if (newval && oldval.length != newval.length) {
        this.swiper = this.$refs.homeMenuSwiper.swiper;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../assets/homeadwiper.scss";
.homemenupagination {
  position: absolute;
  z-index: 20;
  left: 0px;
  width: 100%;
  text-align: center;
  bottom: 5px;
}
.homemenuscrollbar {
  // position: absolute;
  z-index: 20;
  left: 0px;
  width: 100%;
  text-align: center;
  bottom: 5px;
  height: 5px;
  width: 40px;
  margin-left: 167.5px;
  background-color: rgb(232, 223, 223);
  border-radius: 5px;
}
.home-swiper-pagination-drag {
  height: 100%;
  width: 20px;
  position: relative;
  background: #ffcc00;
  border-radius: 2.667vw;
  left: 0;
  top: 0;
}
.swiper {
  background-color: #ffffff;
}
.swiper >>> .homemenu-swiper-pagination-switch {
  display: inline-block;
  width: 8px;
  height: 7px;
  border-radius: 20px;
  margin-right: 11px;
  cursor: pointer;
  -webkit-transition: 300ms;
  transition: 300ms;
  position: relative;
  background: #fedc00;
  opacity: 0.5;
}
.swiper >>> .homemenu-swiper-active-switch {
  width: 20px;
  height: 8px;
  margin-right: 12px;
  opacity: 1;
}
.al_figure {
  margin: 8px 10px;
  height: 60px;
  width: 60px;
}
// .msite_nav {
//   // padding-top: 49.2px;
//   text-align: center;
//   background-color: #fff;
//   border-bottom: 0.6px solid $bc;
//   // height: 248.4px;
//   .swiper-container {
//     position: initial;
//     @include wh(100%, auto);
//     padding-bottom: 14.1px;
//     .swiper-pagination {
//       bottom: 4.7px;
//     }
//   }
//   .fl_back {
//     @include wh(100%, 100%);
//   }
// }
.fl_back {
  background-color: #ffffff;
  @include wh(100%, 203px);
}
.food_types_container {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  .link_to_food {
    /*width: 25%;*/
    margin-bottom: 5px;
    // padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img {
        margin-bottom: 7px;
        @include wh(44px, 44px);
      }
      figcaption {
        text-align: center;
        @include sc(12.9px, #666);
      }
    }
  }
}
</style>
