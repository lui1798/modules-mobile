<template>
  <div class="brokerageKpi-history-details">
    <al-all-head>
      <div slot="head_bottom">
        <item-line></item-line>
        <div class="header-title">佣金月：{{ indexcalno }}</div>
      </div>
    </al-all-head>
    <al-content
      class="brokerageKpi-history-details-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :swiperTop="swiperTop"
    >
      <div class="bk-content">
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">首年佣金FYC</div>
            <div class="list-right">
              <div class="list-num">{{ res.monthfyc ? res.monthfyc : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">续期佣金</div>
            <div class="list-right">
              <div class="list-num">{{ res.monthryc }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">服务费</div>
            <div class="list-right">
              <div class="list-num">{{ res.serverfee }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">ABC佣金</div>
            <div class="list-right">
              <div class="list-num">{{ res.abcfee }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">季度展业奖</div>
            <div class="list-right">
              <div class="list-num">{{ res.athrperpolnum ? res.athrperpolnum : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">增员辅导奖</div>
            <div class="list-right">
              <div class="list-num">{{ res.coachbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">营销主任管理津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.dmarketebonus ? res.dmarketebonus : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">直辖组管理津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.deptmagbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">精英辅导奖</div>
            <div class="list-right">
              <div class="list-num">{{ res.elitebouns ? res.elitebouns : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">属员辅导奖</div>
            <div class="list-right">
              <div class="list-num">{{ res.shuyuanbouns ? res.shuyuanbouns : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">职务津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.dutybonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">直辖部管理津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.deptmagbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">直辖区管理津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.areamagbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育组津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.developbonus ? res.developbonus : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育部津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.deptraisebonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">培育区津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.chiefraisebonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">团队传承</div>
            <div class="list-right">
              <div class="list-num">{{ res.teaminher ? res.teaminher : "0" }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">社保津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.socialbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">长期服务金</div>
            <div class="list-right">
              <div class="list-num">{{ res.longserbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">新人津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.newbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">组织发展津贴</div>
            <div class="list-right">
              <div class="list-num">{{ res.orgbonus }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税前加扣款</div>
            <div class="list-right">
              <div class="list-num">{{ res.taxbefmoney }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">实物加扣款</div>
            <div class="list-right">
              <div class="list-num">{{ res.goodspunish }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">上期税前余额</div>
            <div class="list-right">
              <div class="list-num">{{ res.lasttaxbefmoney }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税前净收入转下期</div>
            <div class="list-right">
              <div class="list-num">{{ res.taxbeftrans }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税前收入</div>
            <div class="list-right">
              <div class="list-num">{{ res.befshouldmoney }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">增值税及附加</div>
            <div class="list-right">
              <div class="list-num">{{ res.saletax }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">个人所得税</div>
            <div class="list-right">
              <div class="list-num">{{ res.persontax }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税后收入</div>
            <div class="list-right">
              <div class="list-num">{{ res.afttaxmoney }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税后扣款</div>
            <div class="list-right">
              <div class="list-num">{{ res.taxaftfmoney }}</div>
            </div>
          </div>
        </div>
        <!--        <div class="bk-detail">-->
        <!--          <div class="bk-detail-list">-->
        <!--            <div class="list-left">实物加扣款</div>-->
        <!--            <div class="list-right">-->
        <!--              <div class="list-num">{{ res.goodspunish }}</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">上期税后余额</div>
            <div class="list-right">
              <div class="list-num">{{ res.lasttaxaftfmoney }}</div>
            </div>
          </div>
        </div>
        <div class="bk-detail">
          <div class="bk-detail-list">
            <div class="list-left">税后净收入转下期</div>
            <div class="list-right">
              <div class="list-num">{{ res.taxaftfmoneytrans }}</div>
            </div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";
import { getBrokeHisinfo } from "../service/getData";
export default {
  name: "bkge-examine-history-details", //使用xx-xx-xx命名方式具体看操作文档
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
    ...mapState(["brokerageKpi"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c history-details>生命周期>mounted", "color:green;", "");
    if (this.brokerageKpi.agentCode && this.brokerageKpi.agentCode != "") {
      this.getBrokeHisinfo();
    } else {
      Toast.info("请返回重试！");
    }
  },
  watch: {},
  data() {
    return {
      swiperTop: 54,
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
      indexcalno: this.$route.query["indexcalno"],
      res: {},
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations(["AGENTCODE"]),
    getBrokeHisinfo() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        agentCode: this.brokerageKpi.agentCode,
        indexcalno: this.indexcalno,
      };
      //isParms
      getBrokeHisinfo({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getBrokeHisinfo", "color:#00CD00", data.data);
          this.res = data.data.detail;
        },
        error => {
          console.log("%c getBrokeHisinfo", "color:#00CD00", error);
          Toast.info(error.message);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.brokerageKpi-history-details {
  .header-title {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding-left: 17px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    background-color: #ffffff;
  }
  .brokerageKpi-history-details-content {
    .bk-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      margin: 10px 0 30px 0;
      .bk-detail {
        width: 100%;
        height: 44px;
        border-bottom: 1px solid rgba(236, 237, 239, 1);
        display: flex;
        align-items: center;
        .bk-detail-list {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 0 19px 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          .list-title {
            font-weight: 500;
            color: rgba(253, 185, 44, 1);
          }
          .list-right {
            display: flex;
            height: 100%;
            align-items: center;
            color: rgba(150, 150, 150, 1);
            font-size: 12px;
            .list-num {
              text-align: right;
            }
            .list-icon {
              height: 100%;
              width: 10px;
              margin-left: 15px;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
