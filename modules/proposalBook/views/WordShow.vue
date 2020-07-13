<template>
  <div class="proposalBook-word-show">
    <al-all-head
      :title="title"
      :rightTextIcon="canShare ? 'share' : ''"
      @click-right="shareProposal"
      hairline
      v-if="!($route.query.isShare == 2)"
    ></al-all-head>
    <al-content
      class="proposalBook-word-show-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :isAutoTopMargin="!($route.query.isShare == 2)"
    >
      <!-- <iframe
        v-if="isPdf"
        :src="`./static/lib/pdfjs-2.3.200-dist/web/viewer.html?file=${url}`"
        frameborder="0"
      ></iframe> -->
      <div v-if="isZoom && !isArray" id="imgBox" style="position:fixed;width: 100%;height: 100%;">
        <img :src="url" id="wordImg0" style="width: 100%;" />
      </div>
      <div v-else-if="isZoom && isArray" :id="`imgBox${i}`" v-for="(item, i) in url" :key="i">
        <img :id="`wordImg${i}`" style="width: 100%;" :src="item" />
      </div>
      <img v-else style="width:100%;" :src="url" />
    </al-content>
    <!-- 分享模块 -->
    <share-popup :shareModal="shareModal" :wechatMessage="wechatMessage" v-model="isPopupShowShare" />
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
import SharePopup from "../components/SharePopup.vue";
import Transform from "../components/zoom/transform";
import To from "../components/zoom/to";
import AlloyFinger from "alloyfinger";
import __is from "@t/is";
import { queryPdf } from "../service/getData";

export default {
  name: "proposal-book-word-show", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    // isZoom: {
    //   //props定义样例
    //   type: Boolean,
    //   default: false,
    // },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [SharePopup.name]: SharePopup,
  },
  computed: {
    ...mapState(["proposalBook"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    isArray() {
      return __is("Array", this.url);
    },
  },
  mounted() {
    console.log("%c word-show>生命周期>mounted", "color:green;", "");
    if (this.$route.query.isShare == 2) {
      this.queryPdfFun();
    } else {
      if (this.proposalBook.wordShow) {
        console.log("%c this.proposalBook.wordShow", "color:#00CD00", this.proposalBook.wordShow);
        this.title = this.proposalBook.wordShow.title;
        this.url = this.proposalBook.wordShow.url;
        if (this.proposalBook.wordShow.shareMes) {
          this.wechatMessage = {
            title: "保险规划书",
            description: `${this.proposalBook.wordShow.shareMes.agentName}规划师为您制定的专属规划书`,
            webpageUrl: `${window.globalConfig.rootUrl.replace(
              "/api",
              "",
            )}/app/proposalBook/#/proposalBook/wordShow?proposalId=${this.$route.query.proposalId}&isShare=2`,
            thumb: `//${this.proposalBook.wordShow.shareMes.img}`,
          };
        }
        if (this.isPdf) {
          this.dealPdf();
        }
      } else {
        // this.title = "福运至尊 相伴人生";
        // this.url = ls.url || "https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdSit/pdf.jpg";
      }
    }
  },
  watch: {
    url() {
      this.$nextTick(() => {
        if (this.isZoom) {
          if (this.isArray) {
            for (let i = 0; i < this.url.length; i++) {
              this.initArray(i);
            }
          } else {
            this.init(0);
          }
        }
      });
    },
  },
  data() {
    return {
      isZoom: this.$route.query.isZoom == false ? false : true,
      canShare: this.$route.query.canShare || false,
      isPdf: this.$route.query.isPdf || false,
      title: "",
      url: [],
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
      isPopupShowShare: false,
      wechatMessage: {},
      shareModal: [
        {
          desc: "微信",
          type: "wechat",
          url: "http://show.n22.com.cn:8788",
          svg: require("../assets/images/wechat.png"),
        },
        {
          desc: "朋友圈",
          type: "wechatf",
          url: "http://show.n22.com.cn:8788",
          svg: require("../assets/images/wechat_p.png"),
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    dealPdf() {
      // window.open(this.url);
    },
    shareProposal() {
      this.isPopupShowShare = true;
    },
    queryPdfFun() {
      const axiosParams = {
        isShare: this.$route.query.isShare == 2,
        isLoadding: true,
        loaddingText: "规划书加载中...",
      };
      const params = {
        proposalId: this.$route.query.proposalId,
      };
      queryPdf({ data: params, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c createPDF>>>>data", "color:green;", data);
          this.title = "光大永明人寿保险规划书";
          this.url = data.data;
        },
        err => {
          console.log("%c createPDF>>>>err", "color:green;", err);
        },
      );
    },
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
    init(i) {
      let _this = this;
      // eslint-disable-next-line no-unused-vars
      var topPx;
      this.imageLoaded(`#wordImg${i}`, function(w, h) {
        document.querySelector(`#imgBox`).style.display = "block";
        topPx = window.innerHeight / 2 - (h * window.innerWidth) / w / 2;
        this.style.top = _this.allHeadTopPx + "px";
      });

      function ease(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
      }

      var el = document.getElementById(`wordImg${i}`);
      el.style.transformOrigin = `${_this.screenWidth / 2}px ${_this.screenHeight / 2}px`;
      Transform(el);
      // 测试放大倍数
      // el.scaleX = 1.5;
      // el.scaleY = 1.5;
      var initScale = 1;
      new AlloyFinger(el, {
        multipointStart: function() {
          To.stopAll();
          initScale = el.scaleX;
        },
        // rotate: function(evt) {
        // el.rotateZ += evt.angle;
        // },
        pinch: function(evt) {
          let zoom = initScale * evt.zoom;
          el.scaleX = el.scaleY = zoom;
          console.log("%c el.scaleX", "color:#00CD00", el.scaleX);
        },
        multipointEnd: function() {
          To.stopAll();
          if (el.scaleX < 1) {
            new To(el, "scaleX", 1, 500, ease);
            new To(el, "scaleY", 1, 500, ease);
          } else if (el.scaleX > 2) {
            new To(el, "scaleX", 2, 500, ease);
            new To(el, "scaleY", 2, 500, ease);
          } else {
            let canMoveX = (el.offsetWidth * (el.scaleX - 1)) / 2;
            let canMoveY = (_this.screenHeight * (el.scaleX - 1)) / 2;
            let maxHeight = -el.offsetHeight + document.documentElement.clientHeight - _this.allHeadTopPx;
            // console.log("%c multipointEnd-canMoveX", "color:#00CD00", canMoveX);
            // console.log("%c multipointEnd-canMoveY", "color:#00CD00", canMoveY);
            // console.log("%c multipointEnd-maxHeight", "color:#00CD00", maxHeight - canMoveY);
            // console.log("%c multipointEnd-el.translateX", "color:#00CD00", el.translateX);
            // console.log("%c multipointEnd-el.translateY", "color:#00CD00", el.translateY);
            if (el.translateX > canMoveX) {
              new To(el, "translateX", canMoveX, 500, ease);
            } else if (el.translateX < -canMoveX) {
              new To(el, "translateX", -canMoveX, 500, ease);
            }
            if (el.translateY > canMoveY) {
              new To(el, "translateY", canMoveY, 500, ease);
            }
            if (el.translateY < maxHeight) {
              new To(el, "translateY", maxHeight - canMoveY, 500, ease);
            }
          }
        },
        pressMove: function(evt) {
          // console.log("%c el", "color:#00CD00", el);
          // console.log("%c el.translateX", "color:#00CD00", el.translateX);
          // console.log("%c el.translateY", "color:#00CD00", el.translateY);
          // console.log("%c el.offsetHeight", "color:#00CD00", el.offsetHeight);
          el.translateX += evt.deltaX;
          let canMoveY = (_this.screenHeight * (el.scaleY - 1)) / 2;
          // console.log("%c multipointEnd-canMoveY", "color:#00CD00", canMoveY);
          let maxHeight = -el.offsetHeight + document.documentElement.clientHeight - _this.allHeadTopPx;
          el.scaleY !== 1 && (maxHeight = maxHeight - canMoveY);
          if (el.translateY < maxHeight && evt.deltaY < 0) {
            return;
          }
          el.translateY += evt.deltaY;
          let ory = 0;
          if (el.translateY < 0) {
            ory = -el.translateY;
          }
          el.style.transformOrigin = `${_this.screenWidth / 2}px ${ory + _this.screenHeight / 2}px`;
          evt.preventDefault();
        },
        // eslint-disable-next-line no-unused-vars
        tap: function(evt) {
          //console.log(el.scaleX + "_" + el.scaleY + "_" + el.rotateZ + "_" + el.translateX + "_" + el.translateY);
          //console.log("tap");
        },
        // eslint-disable-next-line no-unused-vars
        doubleTap: function(evt) {
          To.stopAll();
          if (el.scaleX > 1.5) {
            new To(el, "scaleX", 1, 500, ease);
            new To(el, "scaleY", 1, 500, ease);
            // new To(el, "translateX", 0, 500, ease);
            // new To(el, "translateY", 0, 500, ease);
          } else {
            // var box = el.getBoundingClientRect();
            // var y =
            //   box.height -
            //   (evt.changedTouches[0].pageY - topPx) * 2 -
            //   (box.height / 2 - (evt.changedTouches[0].pageY - topPx));
            // var x = box.width - evt.changedTouches[0].pageX * 2 - (box.width / 2 - evt.changedTouches[0].pageX);
            new To(el, "scaleX", 2, 500, ease);
            new To(el, "scaleY", 2, 500, ease);
            // new To(el, "translateX", x, 500, ease);
            // new To(el, "translateY", y, 500, ease);
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
    initArray(i) {
      let _this = this;
      // eslint-disable-next-line no-unused-vars
      var topPx;
      this.imageLoaded(`#wordImg${i}`, function(w, h) {
        document.querySelector(`#imgBox${i}`).style.display = "block";
        topPx = window.innerHeight / 2 - (h * window.innerWidth) / w / 2;
        this.style.top = _this.allHeadTopPx + "px";
      });

      function ease(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
      }

      var el = document.getElementById(`wordImg${i}`);
      const imgHeight = _this.screenHeight;
      el.style.transformOrigin = `${_this.screenWidth / 2}px ${_this.screenHeight / 2}px`;
      Transform(el);
      // 测试放大倍数
      // el.scaleX = 1.5;
      // el.scaleY = 1.5;
      var initScale = 1;
      new AlloyFinger(el, {
        multipointStart: function() {
          To.stopAll();
          initScale = el.scaleX;
        },
        // rotate: function(evt) {
        // el.rotateZ += evt.angle;
        // },
        pinch: function(evt) {
          let zoom = initScale * evt.zoom;
          el.scaleX = zoom;
          el.style.height = `${imgHeight * zoom}px`;
          console.log("%c el.style.height", "color:#00CD00", el.style.height);
        },
        multipointEnd: function() {
          if (el.scaleX < 1) {
            new To(el, "scaleX", 1, 500, ease);
            // new To(el, "scaleY", 1, 500, ease);
            el.style.height = `${imgHeight}px`;
          } else if (el.scaleX > 2) {
            new To(el, "scaleX", 2, 500, ease);
            // new To(el, "scaleY", 2, 500, ease);
            el.style.height = `${imgHeight * 2}px`;
          }
        },
        pressMove: function(evt) {
          el.translateX += evt.deltaX;
        },
        // eslint-disable-next-line no-unused-vars
        tap: function(evt) {
          //console.log(el.scaleX + "_" + el.scaleY + "_" + el.rotateZ + "_" + el.translateX + "_" + el.translateY);
          //console.log("tap");
        },
        // eslint-disable-next-line no-unused-vars
        doubleTap: function(evt) {
          To.stopAll();
          if (el.scaleX > 1.5) {
            new To(el, "scaleX", 1, 500, ease);
            new To(el, "scaleY", 1, 500, ease);
            // new To(el, "translateX", 0, 500, ease);
            // new To(el, "translateY", 0, 500, ease);
          } else {
            // var box = el.getBoundingClientRect();
            // var y =
            //   box.height -
            //   (evt.changedTouches[0].pageY - topPx) * 2 -
            //   (box.height / 2 - (evt.changedTouches[0].pageY - topPx));
            // var x = box.width - evt.changedTouches[0].pageX * 2 - (box.width / 2 - evt.changedTouches[0].pageX);
            new To(el, "scaleX", 2, 500, ease);
            new To(el, "scaleY", 2, 500, ease);
            // new To(el, "translateX", x, 500, ease);
            // new To(el, "translateY", y, 500, ease);
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
  },
};
</script>

<style lang="scss">
.myPreview {
  .van-swipe__track {
    overflow: auto;
  }
  .van-image-preview__image {
    img {
      height: auto;
    }
  }
}
.proposalBook-word-show {
  .n22-icon-share {
    font-size: 20px !important;
    color: $theme-color;
  }
  .proposalBook-word-show-content {
    .mescroll {
      background-color: #feffff;
    }
  }
}
</style>
