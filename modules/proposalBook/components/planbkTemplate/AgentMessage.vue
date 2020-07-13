<template>
  <div class="agent-wrap">
    <div class="agent-container">
      <img v-lazy="agentInfo.photo" />
      <div class="agent-mes">
        <div>{{ agentInfo.name }}</div>
        <div @click="phone">
          <!-- <n22-icon name="phone" size="lg"></n22-icon> -->
          联系我：{{ agentInfo.mobile }}
        </div>
        <!-- <div class="my-line"></div> -->
        <div @click="phone">
          <n22-icon style="color:#FFC21E" name="phone" size="lg"></n22-icon>
          <!-- <n22-icon name="card" size="lg"></n22-icon> -->
          <!-- 查看名片 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "al-mobile";

export default {
  name: "agent-message",
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      agentInfo: this.data,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    phone() {
      console.log(this.$route.query.isShare);
      let code = "1009";
      if (this.$route.query.isShare == 2) {
        code = "1010";
      }
      this.$DataPoint("", {
        value: { aa: { module: "PROPOSAl", eventId: code, createBy: this.proposalBook.agentCode }, postParms: true },
      });

      if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
        this.native.callPhone(
          {
            phoneNumber: this.agentInfo.mobile,
            extensionNumber: "",
          },
          content => {
            alert(JSON.stringify(content));
          },
          error => {
            alert(error);
          },
        );
      } else {
        window.location.href = `tel://${this.agentInfo.mobile}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.agent-wrap {
  .agent-container {
    width: 94.667%;
    margin: 0 auto 10px;
    border-radius: 10px;
    background-color: #fff;
    img {
      float: left;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: red;
      margin: 13px 20px 13px 15px;
    }
    .agent-mes {
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      margin-right: 10px;
      padding: 13px 0;
      font-size: 14px;
      .my-line {
        width: 1px;
        height: 24px;
        background: #efefef;
        margin: auto 0;
      }
    }
  }
}
</style>
