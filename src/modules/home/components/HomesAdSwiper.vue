<template>
  <div class="swiper">
    <swiper v-if="images.length > 0" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(img, $index) in images" :key="img.id">
        <img
          :id="module + '_' + $index"
          @click="goDetail($event, img)"
          class="swiper-item"
          v-lazy="img.imgUrl"
        />
        <!-- <img class="swiper-item" :src="img.imgUrl" > 'http://show.n22.com.cn:8889'+-->
      </swiper-slide>
      <div slot="pagination" class="homeadpagination"></div>
    </swiper>
    <swiper v-else :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(img, $index) in 1" :key="img.id">
        <img
          :id="module + '_' + $index"
          class="swiper-item"
          v-lazy="img.imgUrl"
        />
      </swiper-slide>
      <div slot="pagination" class="homeadpagination"></div>
    </swiper>
  </div>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import "al-mobile/components/common/swiper/dist/css/swiper.css";
import {
  swiper,
  swiperSlide
} from "al-mobile/components/common/swiper/swiper-vue";

export default {
  name: "home-ad-swiper", //train广告swiper位
  components: {
    swiper,
    swiperSlide
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return [];
      }
    },
    module: {
      type: String,
      default: "home"
    },
    //控制轮播图是否跳转
    isNumber: {
      type: String,
      default: ""
    }
  },
  data() {
    const _this = this;
    return {
      tcImage: "",
      rootUrl: window.globalConfig.rootUrl,
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          //可选选项，自动滑动
          disableOnInteraction: false
          // delay: 1000,
          // waitForTransition: false,
        },
        // loop:true,
        // loopAdditionalSlides : 1,
        // observer: true,
        // observerParents: true,
        speed: 300,
        // slidesPerView: 1,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // slideVisibleClass : 'swiper-slide-visible',//额外的样式
        // slidesOffsetBefore : 110,//设定slide与左边框的预设偏移量（单位px）。
        // slidesOffsetAfter : 110,//设定slide与右边框的预设偏移量（单位px）。
        // spaceBetween : '5%',//在slide之间设置距离（单位px）。'10%',按container的百分比
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        pagination: {
          //分页器
          el: ".homeadpagination",
          type: "progressbar"
          // bulletClass : 'homead-swiper-pagination-switch',//点样式
          // bulletActiveClass: 'homead-swiper-active-switch',//选中的样式
        },
        uniqueNavElements: false, //独立分页元素，当启用（默认）并且分页元素的传入值为字符串时，swiper会优先查找子元素匹配这些元素。可应用于分页器，按钮和滚动条（pagination, prev/next buttons and scrollbar elements）。当你的控制组件放在container外面的时候，需要用到。
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        // height: 300,//你的slide高度
        autoHeight: true, //高度随内容变化
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        noSwipingClass: "removerule",
        on: {
          slideChangeTransitionEnd: function() {
            // _this.$emit("input",this.activeIndex)
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
            // console.log(that.index);//切换结束时，告诉我现在是第几个slide
          },
          slideChange: function() {
            _this.$emit("input", this.activeIndex);
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  activated() {
    this.swiper.autoplay.run();
    console.log("%c 启动xxxxxxxx", "color:orange;", this.swiper);
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    goDetail(e, img) {
      // 下面演示点击图片的时候也触发点击图事件
      console.log("%c eeeeee", "color:green;", e);
      // utils.sensors.quick("trackHeatMap", e.srcElement)//第二个参数是发生事件的dom元素
      //培训首页轮播图跳转变量为1  跳转
      if (this.isNumber == "1") {
        this.$router.push("/noticeDetail?outLink=" + img.outLink);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/homeadwiper.scss";
.homeadpagination {
  position: absolute;
  z-index: 20;
  left: 0px;
  text-align: center;
  bottom: 5px;
  // width: 100%;

  width: 40px;
  margin-left: 167px;
  margin-top: 189px;
}
.swiper >>> .swiper-pagination-progressbar-fill {
  background: #d51333;
}
.swiper >>> .homead-swiper-pagination-switch {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 11px;
  cursor: pointer;
  -webkit-transition: 300ms;
  transition: 300ms;
  position: relative;
  background: #fedc00;
  opacity: 0.5;
}
.swiper >>> .homead-swiper-active-switch {
  width: 8px;
  height: 8px;
  margin-right: 12px;
  opacity: 1;
}
</style>
