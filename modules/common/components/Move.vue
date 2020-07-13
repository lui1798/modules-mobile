<template>
  <div
    v-if="!isShow"
    class="float_div"
    :style="{ width: `${dealPxToVw(floatWidth)}vw` }"
    :class="'float_div_top' + id"
    :id="'moveDiv' + id"
    @mousedown="down"
    @touchstart="down"
    @mousemove="move"
    @touchmove="move"
    @mouseup="end"
    @touchend="end"
  >
    <slot> </slot>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { ui } from "../utils/tool/dom";

export default {
  name: "move", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    isMove: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
      default: "1",
    },
    floatWidth: {
      //悬浮div的宽度-默认对应当前float_div class样式的width
      //如果引入组件的地方想要更改float_div的样式，则需要使用/deep/的形式覆盖float_div样式类
      type: Number,
      default: 45,
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  data() {
    return {
      isShow: false,
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
    };
  },

  methods: {
    // 实现移动端拖拽
    down(el) {
      if (this.isMove) {
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = el.currentTarget.offsetLeft;
        this.dy = el.currentTarget.offsetTop;
      }
    },
    move(el) {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        // console.log("%c this.xPum", "color:green;", this.xPum);
        // console.log("%c this.yPum", "color:green;", this.yPum);
        if (this.xPum <= 0) {
          console.log("%c xxx", "color:#00CD00", 1);
        } else if (this.xPum >= this.screenWidth - ui.screenWidthR(this.floatWidth)) {
          console.log("%c xxx", "color:#00CD00", 2);
        } else {
          el.currentTarget.style.left = this.xPum + "px";
          el.currentTarget.style.top = this.yPum + "px";
        }

        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        // document.addEventListener(
        //   "touchmove",
        //   function() {
        //     event.preventDefault();
        //   },
        //   { passive: false }
        // );
      }
    },
    //鼠标释放时候的函数
    end(el) {
      this.flags = false;
      // if (this.xPum <= 70) {
      el.currentTarget.style.left = this.screenWidth - ui.screenWidthR(this.floatWidth) + "px";
      // }
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="css" scoped>
.float_div {
  height: 25px;
  /* width: 80px; */
  /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
  z-index: 99;
  position: fixed;
  right: 0px;
  background-color: rgba(0, 0, 0, 0);
}
.float_div_top {
  top: 50%;
}
.circle_div {
  height: 27px;
  width: 27px;
  border: 3px solid rgba(140, 136, 136, 0.5);
  margin: 7px auto;
  color: #000000;
  font-size: 16px;
  line-height: 27px;
  text-align: center;
  border-radius: 100%;
  background-color: #ffffff;
}
</style>
