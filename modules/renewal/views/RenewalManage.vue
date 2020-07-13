<template>
  <div class="renewal-renewal-manage">
    <al-all-head></al-all-head>
    <al-content
      class="renewal-renewal-manage-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <ul class="list">
        <li @click="goPage('renewalTask')" class="borderRight">
          <div class="rotundity" :style="{ background: listModules[0].backgroundColor }">
            <img :src="listModules[0].Icon" />
          </div>
          <span>{{ listModules[0].name }}</span>
        </li>
        <li @click="goPage('renewalService')">
          <div class="rotundity" :style="{ background: listModules[1].backgroundColor }">
            <img :src="listModules[1].Icon" />
          </div>
          <span>{{ listModules[1].name }}</span>
        </li>
      </ul>
    </al-content>
  </div>
</template>

<script>
import { AllHead, Content } from "al-mobile";
export default {
  name: "renewal-renewal-manage",
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  data() {
    return {
      tabs: [
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      listModules: [
        { name: "续期任务", Icon: require("../assets/images/task.png"), backgroundColor: "#B9E2A4" },
        { name: "续期服务", Icon: require("../assets/images/service.png"), backgroundColor: "#FFDA8E" },
      ],
    };
  },
  methods: {
    goPage(path) {
      switch (path) {
        case "renewalTask":
          this.$router.push({
            path: path,
          });
          break;
        default:
          this.$router.push({
            path: "renewalService",
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.renewal-renewal-manage {
  .renewal-renewal-manage-content {
    .list {
      display: flex;
      width: 100%;
      margin-top: 10px;
      li {
        flex-grow: 1;
        height: 100px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        .rotundity {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 13px 0;
          img {
            display: block;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
.borderRight {
  border-right: 1px solid #ecedef;
}
</style>
