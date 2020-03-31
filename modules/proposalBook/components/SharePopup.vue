<template>
  <n22-popup v-model="isPopupShow" position="bottom">
    <div class="types_container">
      <a class="needsclickllll link_to" v-for="item in shareModal" :key="item.id">
        <figure class="needsclickxxxxxxx al_figure" @click="$_onBtnClick($event, item)">
          <n22-icon class="back_icon_share" :name="item.svg" size="lg"></n22-icon>
          <figcaption>{{ item.desc }}</figcaption>
        </figure>
      </a>
    </div>
  </n22-popup>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Popup, Icon } from "al-mobile";
export default {
  name: "share-popup", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      //props定义样例
      type: Boolean,
      default: false,
    },
    shareModal: {
      //props定义样例
      type: Array,
      required: true,
    },
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
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
      action.onClick && action.onClick(event, action);
      this.$emit("click", event, action);
    },
    // $_onBtnClick(item) {
    //   console.log("%c item", "color:green;", item);
    //   if (item.type === "wechat") {
    //     let shareMes = {
    //       message: {
    //         title: item.title || "N22",
    //         description: item.description || "欢迎使用",
    //         thumb: item.thumb || "http://show.n22.com.cn:8787/fileservice/local/preview/2019/8/a9cfb159-1b0a-4b4c-9c59-8cfbc0e46636.jpg?ts=1571825848&sign=453208254bcc75c4132d81249fb0c3cc",
    //         mediaTagName: item.mediaTagName||"TEST-TAG-001",
    //         messageExt: item.messageExt||"1",
    //         messageAction: item.messageAction||"<action>dotalist</action>",
    //         media: {
    //           type: Wechat.Type.WEBPAGE,
    //           webpageUrl: item.url
    //         }
    //       },
    //       scene: Wechat.Scene.SESSION
    //     };
    //     // 微信分享 好友
    //     window.utils.native
    //       .wechatShare(shareMes)
    //       .then(
    //         result => {
    //           utils.ui.toast({
    //             message: result,
    //             position: "middle",
    //             duration: 3000
    //           });
    //         },
    //         error => {
    //           utils.ui.toast({
    //             message: error,
    //             position: "middle",
    //             duration: 3000
    //           });
    //         }
    //       );
    //   }
    // }
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
