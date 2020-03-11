<template>
  <div
    id="home-merscroll"
    ref="homeMescroll"
    @touchmove="tmov"
    @touchend="tend"
  >
    <div class="mescroll">
      <!--滑动区域-->
      <mescroll-vue
        ref="mescroll"
        class="mescroll"
        :up="mescrollUp"
        :down="mescrolldown"
        @init="mescrollInit"
      >
        <!-- <pullLoading /> -->
        <slot name="content"></slot>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// 引入mescroll的vue组件
import MescrollVue from "al-mobile/components/common/mescroll.js/mescroll.vue";

export default {
  name: "home-mescroll",
  components: {
    MescrollVue
  },
  data() {
    return {
      isTouchMov: false,
      rate: 0,
      mescroll: null,
      mescrolldown: {
        use: true, // 是否初始化下拉刷新; 默认true
        auto: true, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        autoShowLoading: true, // 如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
        offset: 80, //触发刷新的距离
        outOffsetRate: 0.5, //超过指定距离范围外时,改变下拉区域高度比例;小于1,越往下拉高度变化越小;
        htmlContent:
          '<div class="downwarp-progress"><div><div class="progress-left-arc"></div></div><div><div class="progress-right-arc"></div></div></div><p class="downwarp-tip">下拉即可刷新</p>', //布局内容
        inited: this.inited,
        inOffset: this.inOffset,
        outOffset: this.outOffset,
        callback: this.downCallback, // 下拉刷新的回调
        onMoving: this.onMoving,
        beforeLoading: this.beforeLoading,
        showLoading: this.showLoading
      },
      mescrollUp: {
        use: false,
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        onScroll: this.onScroll,
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          warpId: "home-merscroll",
          // src: 'http://imgsrc.baidu.com/forum/w=580/sign=ba383376543d26972ed3085565fab24f/b422e5dde71190ef6c129c63cb1b9d16fcfa60b3.jpg',
          src: require("@/assets/images/common/topimg.png"),
          // html: null ,
          offset: 100,
          warpClass: "mescroll-totop",
          showClass: "mescroll-totop-fade-in",
          hideClass: "mescroll-totop-fade-out"
          // duration : 300 ,
          // supportTap : false,
          // btnClick : null
        }
      },
      newArr: [] // 数据列表
    };
  },
  mounted() {
    this.isTouchMov = false;
    // console.log(
    //   "%c homeMescroll",
    //   "color:green;",
    //   this.$refs.homeMescroll.offsetTop
    // );
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  },
  deactivated() {
    console.log("%c deactivated-content", "color:red;", "销毁");
    let mescroll = this.mescroll;
    if (mescroll) {
      mescroll.lastBounce = mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      mescroll.setBounce(true); // 允许bounce
      mescroll.lastScrollTop = mescroll.getScrollTop(); // 记录当前滚动条的位置
      mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
  },
  activated() {
    this.isTouchMov = false;
    console.log("%c activated-content", "color:orange;", "活跃");
    let mescroll = this.mescroll;
    if (mescroll) {
      // 恢复到之前设置的isBounce状态
      if (mescroll.lastBounce != null) mescroll.setBounce(mescroll.lastBounce);
      // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
      if (mescroll.lastScrollTop) {
        mescroll.setScrollTop(mescroll.lastScrollTop);
        setTimeout(() => {
          // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
          mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
        }, 16);
      }
    }
  },
  props: {
    headBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    tmov() {
      this.isTouchMov = true;
      // console.log('%c mov','color:green;',this.$refs)
    },
    tend() {
      console.log("%c this.rete", "color:green;", this.rate);
      if (
        this.isTouchMov &&
        ((this.rate < 1 && this.rate > 0) || this.rate > 1.5)
      ) {
        this.$emit("dropSown", false);
        this.isTouchMov = false;
        this.rate = 0;
        // console.log('%c end','color:green;',this.$refs)
        // console.log('%c end','color:green;',event)
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    inited(mescroll, downwarp) {
      const _this = this;
      //初始化完毕的回调,可缓存dom
      mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
      mescroll.downProgressDom = downwarp.getElementsByClassName(
        "downwarp-progress"
      )[0];
      mescroll.downLeftArcDom = downwarp.getElementsByClassName(
        "progress-left-arc"
      )[0];
      mescroll.downRightArcDom = downwarp.getElementsByClassName(
        "progress-right-arc"
      )[0];
      //这里为了演示流畅,提前创建二楼欢迎页,预先加载好相关图片; 实际项目可按需加载;
      mescroll.taobaoErlouDom = document.createElement("div");
      mescroll.taobaoErlouDom.className = "mescorll-erlou";
      document.body.appendChild(mescroll.taobaoErlouDom); //加在body上,避免加在me.scrollDom在使用硬件加速样式时会使fixed失效
      mescroll.taobaoErlouDom.onclick = function() {
        //点击隐藏
        mescroll.taobaoErlouDom.classList.remove("mescrollhome-fade-in");
        mescroll.taobaoErlouDom.classList.add("mescrollhome-fade-out");
        _this.$router.push("/demo/allDemo?componentId=activity-demo");
      };
    },
    inOffset(mescroll) {
      this.$emit("dropSown", true);
      //进入指定距离范围内那一刻的回调
      mescroll.downTipDom.innerHTML = "下拉即可刷新";
      mescroll.downProgressDom.classList.remove("mescroll-rotate");
      mescroll.downProgressDom.style.display = "inline-block";
    },
    outOffset(mescroll) {
      console.log("%c mescroll", "color:green;", mescroll);
      //下拉超过指定距离那一刻的回调
      //配置空方法,表示outOffset不做处理 (不可写outOffset:null,否则会执行mescroll默认配置的outOffset方法)
    },
    showLoading(mescroll) {
      //触发下拉刷新的回调
      mescroll.downTipDom.innerHTML = "加载中 ...";
      mescroll.downProgressDom.classList.add("mescroll-rotate");
    },
    /* 下拉刷新的回调 */
    downCallback() {
      // 结束下拉刷新,无参--模拟三秒
      setTimeout(() => {
        this.$emit("downRefresh");
        this.$emit("dropSown", false);
        this.mescroll.endSuccess();
      }, 1000);
    },
    onMoving(mescroll, rate, downHight) {
      console.log("%c downHight", "color:green;", downHight);
      //下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
      // console.log('%c rate','color:#00CD00',mescroll)
      this.rate = rate;
      if (rate < 1) {
        //inOffset
        var progress = 360 * rate;
        if (progress < 180) {
          mescroll.downRightArcDom.style.webkitTransform =
            "rotate(" + (progress + 45) + "deg)";
          mescroll.downRightArcDom.style.transform =
            "rotate(" + (progress + 45) + "deg)";
          mescroll.downLeftArcDom.style.webkitTransform = "rotate(45deg)";
          mescroll.downLeftArcDom.style.transform = "rotate(45deg)";
        } else {
          mescroll.downLeftArcDom.style.webkitTransform =
            "rotate(" + (progress - 180 + 45) + "deg)";
          mescroll.downLeftArcDom.style.transform =
            "rotate(" + (progress - 180 + 45) + "deg)";
          mescroll.downRightArcDom.style.webkitTransform = "rotate(225deg)";
          mescroll.downRightArcDom.style.transform = "rotate(225deg)";
        }
      } else if (rate < 1.5) {
        //小于1.5倍offset,
        mescroll.isLockCallback = false; //解除完全自定义下拉刷新
        mescroll.downTipDom.innerHTML = "释放即可刷新";
        mescroll.downProgressDom.style.display = "inline-block";
      } else {
        //大于1.5倍offset,自定义下拉刷新,进入二楼
        //        if (!mescroll.isLockCallback) {
        //          mescroll.isLockCallback = true; //标记完全自定义下拉刷新,进入二楼
        //          mescroll.downTipDom.innerHTML = "欢迎光临 二楼";
        //          mescroll.downProgressDom.style.display = "none";
        //        }
      }
    },
    beforeLoading(mescroll, downwarp) {
      console.log("%c downwarp", "color:green;", downwarp);
      //准备触发下拉刷新的回调,自定义下拉刷新进入二楼
      if (mescroll.isLockCallback) {
        //月亮动画
        //        console.log("%c downwarp", "color:#00CD00", downwarp);
        //        console.log(
        //          "%c downwarp.classList",
        //          "color:#00CD00",
        //          downwarp.classList
        //        );
        //        downwarp.classList.add("downwarp-erlou-shows");
        //        setTimeout(function() {
        //          downwarp.classList.remove("downwarp-erlou-shows");
        //          mescroll.endDownScroll(); //动画执行完毕后,结束下拉的状态
        //        }, 2000);
        //        //显示二楼
        //        mescroll.taobaoErlouDom.classList.remove("mescrollhome-fade-out");
        //        mescroll.taobaoErlouDom.classList.add("mescrollhome-fade-in");
      }

      return mescroll.isLockCallback; //如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page) {
      console.log("%c page", "color:green;", page);
      //上拉加载--模拟三秒
      setTimeout(() => {
        this.mescroll.endSuccess();
      }, 3000);
    },
    onScroll(mescroll, y, isUp) {
      // console.log('%c onScroll','color:#00CD00',y)
      this.$emit("handleScroll", mescroll, y, isUp);
    }
  },
  watch: {
    "$refs.homeMescroll.offsetTop"(val) {
      console.log("%c $refs.homeMescroll.offsetTop", "color: pink", val);
    }
  }
};
</script>

<style>
.mescorll-erlou {
  z-index: 9999;
  position: fixed;
  /* top: 0;
	left: 0; */
  height: 100%;
  width: 100%;
  right: 0;
  bottom: 0;
  /* background-image: url("../assets/option/mescorll-erlou.jpg"); */
  background-size: cover;
  background-color: #02040a;
  opacity: 0;
  pointer-events: none;
}
/*二楼--淡入显示时接收点击事件*/
.mescrollhome-fade-in {
  pointer-events: auto;
  -webkit-animation: mescrollhomeFadeIn 1.5s linear forwards;
  animation: mescrollhomeFadeIn 1.5s linear forwards;
}
@-webkit-keyframes mescrollhomeFadeIn {
  0% {
    opacity: 0;
    z-index: 9999;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
}
@keyframes mescrollhomeFadeIn {
  0% {
    opacity: 0;
    z-index: 9999;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
}
/*二楼--淡出隐藏时取消接收事件*/
.mescrollhome-fade-out {
  pointer-events: none;
  -webkit-animation: mescrollhomeFadeOut 1.5s linear forwards;
  animation: mescrollhomeFadeOut 1.5s linear forwards;
}

@-webkit-keyframes mescrollhomeFadeOut {
  0% {
    opacity: 1;
    z-index: 9999;
  }
  100% {
    opacity: 0;
    z-index: 9999;
  }
}
@keyframes mescrollhomeFadeOut {
  0% {
    opacity: 1;
    z-index: 9999;
  }
  100% {
    opacity: 0;
    z-index: 9999;
  }
}
</style>

<style lang="scss" scoped>
.mescroll {
  position: fixed;
  top: 0px;
  bottom: 0;
  height: auto;
}
/*.mescroll >>> .mescroll-downwarp {
  background-color: #2b202d;
  background-image: url("../assets/option/mescroll-bg.png");
  background-size: cover;
  background-position: 50% 55%;
}*/

/*下拉刷新--内容区,定位于区域底部*/
/*.mescroll >>> .mescroll-downwarp .downwarp-content {
  height: 50px;
  background-image: url("../assets/option/mescroll-bg-down.png");
  background-size: 100% 100%;
}*/

/*当下拉区域背景不是白色的时候,因iOS列表回弹,会在快速下拉刷新时,短时间显示body背景,导致下拉区域底部闪白线的问题,可通过给body设置下拉区域的背景解决*/
.mescroll >>> .body-bg {
  // background-image: url("../assets/option/mescroll-bg-down-fix.png");
  background-size: 100% 150px;
  background-repeat: no-repeat;
}

/*下拉刷新--旋转进度条*/
.mescroll >>> .mescroll-downwarp .downwarp-progress {
  position: relative;
  width: 28px;
  height: 28px;
  border: none;
}

/*下拉刷新--旋转进度条-箭头*/
.mescroll >>> .mescroll-downwarp .downwarp-progress:after {
  position: absolute;
  top: 5px;
  left: 5px;
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  // background-image: url("../assets/option/mescroll-arrow.png");
  background-size: contain;
  background-position: center;
}

/*下拉刷新--旋转进度条-左右遮罩*/
.mescroll >>> .mescroll-downwarp .downwarp-progress > div {
  display: inline-block;
  width: 14px;
  height: 28px;
  overflow: hidden;
}

/*下拉刷新--旋转进度条-左半圆*/
.mescroll >>> .mescroll-downwarp .progress-left-arc {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid white;
  border-left-color: transparent;
  border-bottom-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

/*下拉刷新--旋转进度条-右半圆*/
.mescroll >>> .mescroll-downwarp .progress-right-arc {
  width: 26px;
  height: 26px;
  margin-left: -14px;
  border-radius: 50%;
  border: 1px solid white;
  border-top-color: transparent;
  border-right-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

/*下拉刷新--旋转进度条-旋转中*/
.mescroll >>> .mescroll-downwarp .mescroll-rotate.downwarp-progress {
  width: 26px;
  height: 26px;
  border: 1px solid white;
  border-top-color: transparent;
}

.mescroll >>> .mescroll-downwarp .mescroll-rotate.downwarp-progress > div,
.mescroll >>> .mescroll-downwarp .mescroll-rotate.downwarp-progress:after {
  display: none;
}

/*下拉刷新--提示*/
.mescroll >>> .mescroll-downwarp .downwarp-tip {
  min-width: 90px;
  color: white;
}

/*二楼*/
/*.mescroll >>> .mescorll-erlou {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/option/mescorll-erlou.jpg");
  background-size: cover;
  background-color: #02040a;
  opacity: 0;
  pointer-events: none;
}*/

/*二楼--淡入显示时接收点击事件*/
.mescroll >>> .mescroll-fade-in {
  pointer-events: auto;
  -webkit-animation: mescrollFadeIn 1.5s linear forwards;
  animation: mescrollFadeIn 1.5s linear forwards;
}
@-webkit-keyframes mescrollFadeIn {
  0% {
    opacity: 0;
    z-index: 9999;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
}
@keyframes mescrollFadeIn {
  0% {
    opacity: 0;
    z-index: 9999;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
}
/*二楼--淡出隐藏时取消接收事件*/
.mescroll >>> .mescroll-fade-out {
  pointer-events: none;
  -webkit-animation: mescrollFadeOut 1.5s linear forwards;
  animation: mescrollFadeOut 1.5s linear forwards;
}

@-webkit-keyframes mescrollFadeOut {
  0% {
    opacity: 1;
    z-index: 9999;
  }
  100% {
    opacity: 0;
    z-index: 9999;
  }
}
@keyframes mescrollFadeOut {
  0% {
    opacity: 1;
    z-index: 9999;
  }
  100% {
    opacity: 0;
    z-index: 9999;
  }
}

/*下拉区域--二楼显示时其高度变化的动画*/
.mescroll >>> .downwarp-erlou-shows {
  -webkit-transition: none;
  transition: none;
  -webkit-animation: downwarpErlouShow 2s;
  animation: downwarpErlouShow 2s;
}

@-webkit-keyframes downwarpErlouShow {
  0% {
    height: 200%;
  }
  100% {
    height: 50%;
  }
}
@keyframes downwarpErlouShow {
  0% {
    height: 200%;
  }
  100% {
    height: 50%;
  }
}

//totop
.home-merscroll >>> .mescroll-totop-all {
  z-index: 1;
  position: fixed;
  bottom: 65px;
  width: 50px;
  height: 50px;
  padding: 10px;
  right: 16px;
  border-radius: 50%;
  // opacity: 0;
  user-select: none;
  outline: none;
  -webkit-appearance: none;
  background-color: #ffcc00;
  -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
$In0: (
  transform: scale(0, 0),
  opacity: 0
);
$Out0: (
  transform: scale(1, 1),
  opacity: 1
);
$mescrollTotopAllFadeOut: (
  0%: $Out0,
  100%: $In0
);
$mescrollTotopAllFadeIn: (
  0%: $In0,
  100%: $Out0
);
.home-merscroll >>> .mescroll-totop-all-fade-in {
  @include animation(mescrollTotopAllFadeIn 1s linear forwards);
  @include keyframes("mescrollTotopAllFadeIn", $mescrollTotopAllFadeIn);
}
.home-merscroll >>> .mescroll-totop-all-fade-out {
  @include animation(mescrollTotopAllFadeOut 1s linear forwards);
  @include keyframes("mescrollTotopAllFadeOut", $mescrollTotopAllFadeOut);
}
</style>
