<template>
  <n22-popup v-model="isPopupShow" position="bottom">
    <div class="types_container">
      <a class="needsclickllll link_to" v-for="item in shareModal" :key="item.id">
        <figure class="needsclickxxxxxxx al_figure" @click="$_onBtnClick($event, item)">
          <n22-icon v-if="icon" class="back_icon_share" :name="item.svg" size="lg"></n22-icon>
          <img v-else :src="item.svg" />
          <figcaption>{{ item.desc }}</figcaption>
        </figure>
      </a>
    </div>
  </n22-popup>
</template>

<script>
import { mapState } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Popup, Icon } from "al-mobile";
export default {
  name: "share-popup", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shareModal: {
      type: Array,
      required: true,
    },
    wechatMessage: {
      type: [String, Object],
      default: "",
    },
    icon: {
      type: Array,
      required: false,
    },
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    ...mapState(["proposalBook"]),
  },
  mounted() {},
  watch: {
    value(newVal) {
      this.isPopupShow = newVal;
    },
    isPopupShow(newVal) {
      this.$emit("input", newVal);
    },
  },
  data() {
    return {
      isPopupShow: this.value,
      // shareModal: [//模板对象范例
      //   {
      //     desc: "朋友",
      //     type: "wechat",
      //     url: "http://show.n22.com.cn:8788",
      //     svg: "wechat",
      //     img: "http://show.n22.com.cn:8788/statics/menu/insurce.png"
      //   },
      //   {
      //     desc: "朋友圈",
      //     type: "wechatf",
      //     svg: "wechat_friends",
      //     img: "http://show.n22.com.cn:8788/statics/menu/insurce.png"
      //   },
      //   {
      //     desc: "qq",
      //     type: "qq",
      //     svg: "qq",
      //     img: "http://show.n22.com.cn:8788/statics/menu/insurce.png"
      //   },
      //   {
      //     desc: "支付宝",
      //     type: "alipay",
      //     svg: "alipay",
      //     img: "http://show.n22.com.cn:8788/statics/menu/insurce.png"
      //   },
      //   {
      //     desc: "邮件",
      //     type: "email",
      //     svg: "email",
      //     img: "http://show.n22.com.cn:8788/statics/menu/insurce.png"
      //   }
      // ]
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    //share
    $_onBtnClick(event, action) {
      if (action.onClick) {
        action.onClick(event, action);
      } else {
        this.wechatShare(event, action);
      }
      this.$emit("click", event, action);
    },
    shareStart(action) {
      console.log("%c window.Wechat", "color:#00CD00", window.Wechat);
      if (!(this.wechatMessage && this.wechatMessage.webpageUrl)) {
        console.log("%c 请注入分享对象", "color:red;", "");
        return;
      }
      let shareMessage = this.wechatMessage || {
        title: "保险规划书",
        description: "石磊峰规划师为您制定的专属规划书",
        webpageUrl:
          "https://mitphone.sunlife-everbright.com:8010/com.ifp.ipartner/proposalBook/#/proposalBook/planShow?isShare=2",
        thumb: "http://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdPre/product/listPicture/NPT016.jpg",
      };
      console.log("%c shareMessage", "color:green;", shareMessage);
      if (this.os === "ios" && !(window.GDIJSBridge || window.WebViewJavascriptBridge)) {
        if (!window.Wechat) {
          window.location.href = shareMessage.webpageUrl;
        } else {
          window.Wechat.share({
            message: {
              title: shareMessage.title,
              description: shareMessage.description,
              thumb:
                "https://xinyidongzhanyeguangsubao-st-1254235118.cos.ap-beijing.myqcloud.com/Default/share.jpg" ||
                shareMessage.thumb,
              mediaTagName: "链接",
              media: {
                type: window.Wechat.Type.WEBPAGE,
                webpageUrl: shareMessage.webpageUrl,
              },
            },
            scene: action.type === "wechat" ? window.Wechat.Scene.SESSION : window.Wechat.Scene.TIMELINE, // share to Timeline
          });
        }
      } else {
        this.native.shareWeChat(
          {
            platform: action.type === "wechat" ? "1" : "2",
            webPageUrl: shareMessage.webpageUrl,
            iconUrl:
              "https://xinyidongzhanyeguangsubao-st-1254235118.cos.ap-beijing.myqcloud.com/Default/share.jpg" ||
              shareMessage.thumb,
            title: shareMessage.title,
            desc: shareMessage.description,
          },
          content => {
            alert(JSON.stringify(content));
          },
          error => {
            alert(error);
          },
        );
      }
    },
    wechatShare(event, action) {
      console.log("%c action", "color:#00CD00", action);
      this.$DataPoint("", {
        value: { aa: { module: "PROPOSAl", eventId: "1005", createBy: this.proposalBook.agentCode }, postParms: true },
      });
      if (action.type === "wechat" || action.type === "wechatf") {
        this.shareStart(action);
      } else {
        if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
          this.native.sendMsg(
            {
              phoneNumber: "18311260338",
              msgInfo:
                "石磊峰规划师为您制定的专属规划书:https://yidongzhanyebj-1254235118.cos.ap-beijing.myqcloud.com/GdSit/pdf.jpg",
            },
            content => {
              alert(JSON.stringify(content));
            },
            error => {
              alert(error);
            },
          );
        } else {
          this.$dialog.alert({
            title: "提示",
            content: "功能暂未开放敬请期待！",
            confirmText: "确定",
            onConfirm: () => {},
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.back_icon_share {
  vertical-align: -8px;
  width: 80px;
  height: 40px;
  color: #ffba01;
  font-size: 30px !important;
  // -webkit-animation: fadeInShare 0.3s 0.3s both;
  // animation: fadeInShare 0.3s 0.3s both;
}
@-webkit-keyframes fadeInShare {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInShare {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
.types_container {
  width: 375px;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  .link_to {
    min-width: 25%;
    margin-bottom: 5px;
    // padding: 0.3rem 0rem;
    @include fj(center);
    figure {
      img,
      svg {
        margin-bottom: 7px;
        @include wh(44px, 44px);
      }
      .n22-icon {
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
