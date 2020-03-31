<template>
  <div class="proposalBook-word-show">
    <al-all-head></al-all-head>
    <al-content
      class="proposalBook-word-show-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <!-- <img style="width:100%;" :src="proposalBook.workShowUrl" /> -->
      <div id="imgBox" style="position:fixed;width: 100%;height: 100%;left:0;top:0;background:black;display: none;">
        <img :src="proposalBook.workShowUrl" id="testImg" alt="" style="width: 100%;position: absolute; " />
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
import Transform from "../components/zoom/transform";
import To from "../components/zoom/to";
import AlloyFinger from "alloyfinger";
export default {
  name: "proposal-book-word-show", //使用xx-xx-xx命名方式具体看操作文档
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
  },
  computed: {
    ...mapState(["proposalBook"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c word-show>生命周期>mounted", "color:green;", "");
    let _this = this;
    var topPx;
    this.imageLoaded("#testImg", function(w, h) {
      document.querySelector("#imgBox").style.display = "block";
      topPx = window.innerHeight / 2 - (h * window.innerWidth) / w / 2;
      this.style.top = _this.allHeadTopPx + "px";
    });

    function ease(x) {
      return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    var el = document.getElementById("testImg");
    Transform(el);
    var initScale = 1;
    new AlloyFinger(el, {
      multipointStart: function() {
        To.stopAll();
        initScale = el.scaleX;
      },
      rotate: function(evt) {
        el.rotateZ += evt.angle;
      },
      pinch: function(evt) {
        el.scaleX = el.scaleY = initScale * evt.zoom;
      },
      multipointEnd: function() {
        To.stopAll();
        if (el.scaleX < 1) {
          new To(el, "scaleX", 1, 500, ease);
          new To(el, "scaleY", 1, 500, ease);
        }
        if (el.scaleX > 2) {
          new To(el, "scaleX", 2, 500, ease);
          new To(el, "scaleY", 2, 500, ease);
        }
        var rotation = el.rotateZ % 360;

        if (rotation < 0) rotation = 360 + rotation;
        el.rotateZ = rotation;

        if (rotation > 0 && rotation < 45) {
          new To(el, "rotateZ", 0, 500, ease);
        } else if (rotation >= 315) {
          new To(el, "rotateZ", 360, 500, ease);
        } else if (rotation >= 45 && rotation < 135) {
          new To(el, "rotateZ", 90, 500, ease);
        } else if (rotation >= 135 && rotation < 225) {
          new To(el, "rotateZ", 180, 500, ease);
        } else if (rotation >= 225 && rotation < 315) {
          new To(el, "rotateZ", 270, 500, ease);
        }
      },
      pressMove: function(evt) {
        el.translateX += evt.deltaX;
        el.translateY += evt.deltaY;
        evt.preventDefault();
      },
      // eslint-disable-next-line no-unused-vars
      tap: function(evt) {
        //console.log(el.scaleX + "_" + el.scaleY + "_" + el.rotateZ + "_" + el.translateX + "_" + el.translateY);
        //console.log("tap");
      },
      doubleTap: function(evt) {
        To.stopAll();
        if (el.scaleX > 1.5) {
          new To(el, "scaleX", 1, 500, ease);
          new To(el, "scaleY", 1, 500, ease);
          new To(el, "translateX", 0, 500, ease);
          new To(el, "translateY", 0, 500, ease);
        } else {
          var box = el.getBoundingClientRect();
          var y =
            box.height -
            (evt.changedTouches[0].pageY - topPx) * 2 -
            (box.height / 2 - (evt.changedTouches[0].pageY - topPx));

          var x = box.width - evt.changedTouches[0].pageX * 2 - (box.width / 2 - evt.changedTouches[0].pageX);
          new To(el, "scaleX", 2, 500, ease);
          new To(el, "scaleY", 2, 500, ease);
          new To(el, "translateX", x, 500, ease);
          new To(el, "translateY", y, 500, ease);
        }
        //console.log("doubleTap");
      },
      // eslint-disable-next-line no-unused-vars
      longTap: function(evt) {
        //console.log("longTap");
      },
      // eslint-disable-next-line no-unused-vars
      swipe: function(evt) {
        //console.log("swipe" + evt.direction);
      },
    });
  },
  watch: {},
  data() {
    return {
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    imageLoaded(selector, onload) {
      var img = new Image();
      var dom = document.querySelector(selector);
      img.onload = function() {
        //real_width,real_height
        onload.call(dom, this.width, this.height);
        img.onload = null;
        img = null;
      };
      img.src = dom.getAttribute("src");
    },
  },
};
</script>

<style lang="scss" scoped>
.proposalBook-word-show {
  .proposalBook-word-show-content {
  }
}
</style>
