<template>
  <div class="slider-wrapper">
    <div class="floor j_expo">
      <div class="floor-container floor06051">
        <div class="catchimg">
          <img
            class="catchimg-bg"
            src="https://m.360buyimg.com/mobilecms/jfs/t1/16345/2/6121/170329/5c4a6f0bEd492432a/3a583205980ee409.gif"
          />
          <ul
            class="catchimg-skus"
            style="left: 40px; top: 21px; width: 70px; height: 70px; display: block;"
          >
            <swiper :options="swiperOption">
              <swiper-slide class v-for="item in images" :key="item.id">
                <li class="catchimg-skus-item">
                  <span class="j_event_param">
                    <img class="csi-img" :src="item.img" />
                  </span>
                </li>
              </swiper-slide>
            </swiper>
          </ul>
        </div>
      </div>
    </div>
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
export default {
  name: "home-second-level-ad-one", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    swiper,
    swiperSlide
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  data() {
    return {
      images: [
        {
          img:
            "https://m.360buyimg.com/n1/jfs/t27982/51/520870885/142115/74e7f883/5bf61988Na964316c.jpg!q70.jpg.dpg"
        },
        {
          img:
            "https://m.360buyimg.com/n1/jfs/t25429/345/1351017193/901258/821966a9/5baddaacN2068de9e.jpg!q70.jpg.dpg"
        },
        {
          img:
            "https://m.360buyimg.com/n1/jfs/t1/31584/15/1309/581895/5c4a83a8Ec51f8b9c/25665cd98a3a9ed8.jpg!q70.jpg.dpg"
        }
      ],
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: true, //可选选项，自动滑动
        loop: true,
        // speed: 100,
        slidesPerView: 1,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        direction: "vertical",
        grabCursor: true,
        setWrapperSize: true,
        pagination: {
          //分页器
          el: ".homemenupagination",
          bulletClass: "homemenu-swiper-pagination-switch", //点样式
          bulletActiveClass: "homemenu-swiper-active-switch" //选中的样式
        },
        uniqueNavElements: false, //独立分页元素，当启用（默认）并且分页元素的传入值为字符串时，swiper会优先查找子元素匹配这些元素。可应用于分页器，按钮和滚动条（pagination, prev/next buttons and scrollbar elements）。当你的控制组件放在container外面的时候，需要用到。
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        height: 70, //你的slide高度
        autoHeight: true, //高度随内容变化
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
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.slider-wrapper > div {
  position: relative;
  margin-top: -8px;
  z-index: 12;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}
.floor {
  font-size: 0;
  width: 100%;
}
.floor .floor-container:last-child {
  border-bottom: none;
}
.floor-container {
  width: 100%;
  overflow: hidden;
  font-size: 0;
}
.floor06051 .catchimg {
  position: relative;
  overflow: hidden;
  text-align: center;
}
.floor06051 .catchimg-bg {
  width: 100%;
}
.floor-container img {
  width: 100%;
  height: auto;
  overflow: hidden;
}
img {
  border: 0 none;
  vertical-align: top;
}
.floor06051 .catchimg-skus:nth-child(2) {
  background: #f2e3bf;
}
.floor06051 .catchimg-skus {
  display: none;
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: #fff;
  overflow: hidden;
  z-index: -1;
}
.floor a {
  text-decoration: none;
}
</style>
