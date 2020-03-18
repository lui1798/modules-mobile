<template>
  <div class="home-second-ad2">
    <div class="floor j_expo" v-if="topic.length > 0">
      <div
        class="floor-container"
        :style="{
          background:
            'linear-gradient(to right,' +
            backgroundColor +
            ' 45%,' +
            bcLinearGradient +
            ' 70%)'
        }"
      ></div>
      <div class="swiper-div">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide
            style="height: 133px;"
            class=""
            v-for="(item, i) in topic"
            :key="i"
          >
            <div class="catchimg">
              <img
                @click="goDetail($event, item)"
                class="catchimg-bg"
                v-lazy="item.imgUrl"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <n22-list-svg
      typeSvg="noticeListSvg"
      v-for="item in 3"
      :key="item.id"
      v-else
    ></n22-list-svg>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import "al-mobile/components/common/swiper/dist/css/swiper.css";
import {
  swiper,
  swiperSlide
} from "al-mobile/components/common/swiper/swiper-vue";
import ListSvg from "@/components/common/ListSvg";
export default {
  name: "home-second-level-ad-two", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    backgroundColor: {
      //props定义样例
      type: String,
      default: () => {
        return "#4c47e7";
      }
    },
    bcLinearGradient: {
      //props定义样例
      type: String,
      default: () => {
        return "#4c47e7";
      }
    },
    topic: {
      //props定义样例
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    [ListSvg.name]: ListSvg, //引入组件样例如此
    swiper,
    swiperSlide
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  activated() {
    this.swiper.autoplay.run();
    console.log("%c 启动xxxxxxxx", "color:orange;", this.swiper);
  },
  data() {
    return {
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          //可选选项，自动滑动
          disableOnInteraction: false
          // delay: 1000,
          // waitForTransition: false,
        },
        allowTouchMove: false, //禁止手滑-只能自动
        // loop: true,
        // speed: 100,
        effect: "flip", //slide的切换效果，默认为"slide"（位移切换），可设置为'slide'（普通切换、默认）,"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        direction: "vertical", //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
        grabCursor: true,
        setWrapperSize: true,
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        height: window.utils.ui.screenWidthR(133), //你的slide高度
        // autoHeight: true, //高度随内容变化
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        noSwipingClass: "removerule"
      }
    };
  },

  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    goDetail(e, img) {
      // 下面演示点击图片的时候也触发点击图事件
      console.log("%c eeeeee", "color:green;", e);
      // utils.sensors.quick("trackHeatMap", e.srcElement)//第二个参数是发生事件的dom元素
      this.$router.push("/noticeDetail?outLink=" + img.outLink);
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.floor-container >>> .swiper-wrapper {
  height: 133px;
}
.home-second-ad2 > div {
  // margin-top: -1px;
  z-index: 12;
  background-color: #fff;
  position: relative;
  height: 152px;
}
.swiper-div {
  // position: relative;
}
.floor {
  font-size: 0;
  width: 100%;
  overflow: hidden;
}
.floor .floor-container:last-child {
  border-bottom: none;
}
.floor-container {
  position: absolute;
  height: 133px;

  width: 575px;
  margin-left: -100px;
  overflow: hidden;
  font-size: 0;
  background-color: rgba(67, 139, 237, 1);
  border-radius: 0 0 50% 50%;
}
.swiper-div .catchimg {
  /* position: relative; */
  // overflow: hidden;
  // text-align: center;
  height: 133px;
}
.swiper-div .catchimg-bg {
  width: 335px;
  // position: absolute;
  // margin-left: -167.5px;
}
.swiper-div >>> .swiper-slide {
  width: 335px;
  margin: auto;
}
.catchimg img {
  width: 100%;
  height: auto;
  overflow: hidden;
  border: 0 none;
  vertical-align: top;
}
</style>
