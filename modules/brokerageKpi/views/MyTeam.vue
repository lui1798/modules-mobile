<template>
  <div class="brokerageKpi-my-team">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
        <div class="header-title">
          只有直属属员{{ teamsData.directCount }}人，预计晋升{{ teamsData.promoteCount }}人，预计维持{{
            teamsData.holdCount
          }}人，预计降级{{ teamsData.downgradeCount }}人，预计解约{{ teamsData.breakCount }}人。
        </div>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-my-team-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :swiperTop="swiperTop"
    >
      <div class="content">
        <div class="team-content">
          <div class="team-detail">
            <div class="detail-head" :style="{ borderRadius: directlyGroupShow ? '5px' : '5px 5px 0 0' }">
              <div>直辖组</div>
              <div
                class="arrow"
                @click="$_directlyGroupShow"
                :style="{ transform: directlyGroupShow ? 'rotate(180deg)' : '' }"
              >
                <img src="../assets/images/icon2_my_examine_down_arrow.png" />
              </div>
            </div>
            <div
              class="detail-content"
              v-show="directlyGroupShow"
              :style="{ borderRadius: directlyGroupShow ? '5px' : '0 0 5px 5px' }"
            >
              <item-line></item-line>
              <div class="list-detail" v-for="(item, index) in directlyGroupList" :key="index">
                <div class="list-left">
                  <div class="item-img-content">
                    <img :src="item.sex == 0 ? man : woman" />
                  </div>
                  <div class="item-detail">
                    <div class="item-name">
                      <div class="name-text">{{ item.name }}</div>
                      <div>{{ ranks[item.currentlevel] }}</div>
                    </div>
                    <div class="join-time">{{ item.signDate }}签约</div>
                  </div>
                </div>
                <div class="list-right">
                  <div class="maintain" v-if="item.result == 1">维持</div>
                  <div class="downgrade" v-if="item.result == 2">降级</div>
                  <div class="upgrade" v-if="item.result == 3">晋升</div>
                  <div class="cancel" v-if="item.result == 4">解约</div>
                  <div class="list-icon" @click="toHisExamine(item)">
                    <n22-icon name="right_arrow"></n22-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="team-content margin-top" v-for="(item, index) in nurturingGroupList" :key="index">
          <div class="team-detail">
            <div class="detail-head" :style="{ borderRadius: nurturingGroupShow ? '5px' : '5px 5px 0 0' }">
              <div>培育组</div>
              <div
                class="arrow"
                @click="$_nurturingGroupShow"
                :style="{ transform: nurturingGroupShow ? 'rotate(180deg)' : '' }"
              >
                <img src="../assets/images/icon2_my_examine_down_arrow.png" />
              </div>
            </div>
            <div
              class="detail-content"
              v-if="nurturingGroupShow"
              :style="{ borderRadius: nurturingGroupShow ? '5px' : '0 0 5px 5px' }"
            >
              <item-line></item-line>
              <div class="list-detail">
                <div class="list-left">
                  <div class="item-img-content">
                    <img :src="item.sex == 0 ? man : woman" />
                  </div>
                  <div class="item-detail">
                    <div class="item-name">
                      <div class="name-text">{{ item.name }}</div>
                      <div>{{ ranks[item.currentlevel] }}</div>
                    </div>
                    <div class="join-time">{{ item.signDate }}签约</div>
                  </div>
                </div>
                <div class="list-right">
                  <div class="maintain" v-if="item.result == 1">维持</div>
                  <div class="downgrade" v-if="item.result == 2">降级</div>
                  <div class="upgrade" v-if="item.result == 3">晋升</div>
                  <div class="cancel" v-if="item.result == 4">解约</div>
                  <div class="list-icon" @click="toHisExamine(item)">
                    <n22-icon name="right_arrow"></n22-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getMyTeams } from "../service/getData";
import rankName from "../common/rank.json";

export default {
  name: "bkge-examine-my-team", //使用xx-xx-xx命名方式具体看操作文档
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
    [Icon.name]: Icon,
    [ItemLine.name]: ItemLine,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    ...mapState(["brokerageKpi"]),
  },
  mounted() {
    console.log("%c my-team>生命周期>mounted", "color:green;", "");
    this.teamsData = this.brokerageKpi.myExamine;
    if (this.brokerageKpi.agentCode && this.brokerageKpi.agentCode != "") {
      this.getMyTeams();
    }
  },
  watch: {},
  data() {
    return {
      swiperTop: 52,
      ranks: rankName,
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
      directlyGroupShow: true,
      nurturingGroupShow: false,
      teamsData: {},
      directlyGroupList: [],
      nurturingGroupList: [],
      woman: require("../assets/images/icon2_sex_nv.png"),
      man: require("../assets/images/icon2_sex_nan.png"),
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "HISTABS",
      "HISAGENTCODE",
    ]),
    $_directlyGroupShow() {
      this.directlyGroupShow = !this.directlyGroupShow;
    },
    $_nurturingGroupShow() {
      this.nurturingGroupShow = !this.nurturingGroupShow;
    },
    toHisExamine(item) {
      console.log("%c toHisExamine TOTA的考核", "color:green;", item);
      this.HISTABS(item.tabs);
      this.go("brokerageKpi/hisExamine?hisAgentCode=" + item.agentCode);
    },
    getMyTeams() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.brokerageKpi.agentCode,
      };
      getMyTeams({ data: request, config: axiosParams, method: "get", isParams: false }).then(
        data => {
          // console.log("%c getMyTeams", "color:#00CD00", data.data);
          let res = data.data;
          this.directlyGroupList = res.directs;
          this.nurturingGroupList = res.breeds;
        },
        error => {
          console.log("%c getMyTeams", "color:#00CD00", error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-my-team {
  .header-title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    background-color: #ffffff;
    line-height: 1.5;
    text-align: left;
  }
  .brokerageKpi-my-team-content {
    ::v-deep .n22-icon {
      color: #979797;
    }
    .content {
      width: 100%;
      padding-bottom: 70px;
      .team-content {
        width: 100%;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .team-detail {
          width: 350px;
          background-color: #ffffff;
          border-radius: 5px;
          .detail-head {
            height: 47px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 10px;
            background: rgba(255, 255, 255, 1);
            font-size: 16px;
            font-weight: 500;
            color: rgba(253, 185, 44, 1);
            border-radius: 5px 5px 0 0;
            .arrow {
              margin-top: 16px;
              margin-bottom: 16px;
              img {
                width: 15px;
                height: 7px;
              }
            }
          }
          .detail-content {
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 6px;
            .list-detail {
              width: 100%;
              height: 70px;
              border-bottom: 1px solid rgba(236, 237, 239, 1);
              box-sizing: border-box;
              padding: 0 14px 0 11px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .list-left {
                height: 100%;
                display: flex;
                align-items: center;
                flex: 1;
                .item-img-content {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  margin-right: 20px;
                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }
                }
                .item-detail {
                  height: 100%;
                  /*flex: 1;*/
                  display: flex;
                  flex-direction: column;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                  justify-content: center;
                  .item-name {
                    display: flex;
                    height: 20px;
                    margin-bottom: 13px;
                    align-items: center;
                    justify-content: center;
                    .name-text {
                      font-size: 14px;
                      font-weight: 400;
                      color: rgba(51, 51, 51, 1);
                      min-width: 60px;
                      margin-right: 10px;
                    }
                  }
                  .join-time {
                    height: 18px;
                  }
                }
              }
              .list-right {
                display: flex;
                height: 100%;
                align-items: center;
                color: rgba(150, 150, 150, 1);
                font-size: 12px;
                .list-num {
                  text-align: right;
                  min-width: 40px;
                }
                .list-icon {
                  height: 100%;
                  width: 20px;
                  display: flex;
                  align-items: center;
                }
                .waring {
                  margin-right: 16px;
                }
                .upgrade {
                  margin-right: 16px;
                  color: rgba(53, 190, 76, 1);
                }
                .downgrade {
                  margin-right: 16px;
                  color: rgba(247, 63, 63, 1);
                }
                .cancel {
                  margin-right: 16px;
                  color: #333333;
                }
                .maintain {
                  margin-right: 16px;
                  color: rgba(74, 126, 255, 1);
                }
              }
            }
            .list-detail:last-child {
              border-bottom: none;
            }
          }
        }
      }
      .margin-top {
        margin-top: 20px;
      }
    }
  }
}
</style>
