<template>
  <div class="riskAssess-ensure-plan">
    <al-all-head hairline></al-all-head>
    <al-content
      class="riskAssess-ensure-plan-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="head-con">
        <div class="assets-actionBg"></div>
        <img class="assets-title" src="../assets/images/全生命周期保障方案.png" />
        <div class="assets-color" />
        <img class="assets-entryPic" src="../assets/images/head03.png" />
        <img class="assets-item" src="../assets/images/head_bg.png" />
      </div>
      <div class="box">
        <div class="hd">
          <div class="color" />
          <div class="view_2">
            <div class="color_2" />
            <span class="txt_3">年交保费</span>
            <span class="word_4">46747.5元</span>
          </div>
          <div class="all_desc">（其中32521.5为20年交、14226为10年交）</div>
          <div class="colorDiv" />
          <span class="txt_4">保障权益</span>
          <table class="my_table">
            <tr class="table_title">
              <td class="ta_bg">
                权益类型
              </td>
              <td>
                权益项目
              </td>
              <td>
                权益说明
              </td>
            </tr>
            <tr v-for="(item, i) in riskArray" :key="i">
              <td v-if="i === 0" rowspan="5" class="ta_bg">
                <div class="line_title">
                  {{ item.title }}
                </div>
              </td>
              <td v-if="i === 5" rowspan="3" class="ta_bg">
                <div class="line_title">
                  增值服务
                </div>
              </td>
              <td class="sec_cor">
                {{ item.ensure.title }}
              </td>
              <td class="table_content">
                <div v-for="(des, d) in item.ensure.desc" :key="d">
                  <div class="con_title">
                    <span class="circle"></span>
                    <span v-html="des.title"></span>
                  </div>
                  <div class="desc" v-html="des.desc"></div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="bd">
          <div class="view_3" @click="isShow = !isShow">
            <div class="colorDiv_10" />
            <span class="text_12">产品明细</span>
            <div :class="['all_toogle', isShow ? 'toogle-down' : '']">
              <!-- <img class="icon" src="../assets/images/up.png" /> -->
              <n22-icon name="right_arrow" size="sm"></n22-icon>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <transition name="n22-fade">
          <div class="bd_con" v-show="isShow">
            <div class="pro_content">
              <div v-for="(item, i) in productMessage" :key="i">
                <div class="tagWrap">
                  <span class="tag">{{ item.type }}</span>
                </div>
                <div
                  class="view_4 active"
                  @click="pro.isCheck = !pro.isCheck"
                  v-for="(pro, pi) in item.productArray"
                  :key="pi"
                >
                  <n22-icon :class="['pro_check', pro.isCheck ? 'pro_checked' : '']" name="correct"></n22-icon>
                  <div class="block_14">
                    <div class="color_12" />
                    <div class="colorDiv_11" />
                    <div class="color_13" />
                    <span class="desc_2">{{ pro.productName }}</span>
                    <div class="colorDiv_12" />
                    <div class="color_14" />
                    <div class="colorDiv_13" />
                  </div>
                  <div class="block_17">
                    <div class="group_10">
                      <div class="container_3">
                        <div class="outer_6">
                          <img class="icon_2" :src="require(`../assets/images/fangan0${pro.img}.png`)" />
                        </div>
                      </div>
                    </div>
                    <div class="group_11">
                      <div class="desc_area" v-for="(de, di) in pro.desc" :key="di">
                        <span class="circle" />
                        <div class="desc_info" v-html="de"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="assets-ft">
        <n22-button class="left-button" @click="goProposalBook" type="primary">生成计划书</n22-button>
        <n22-button class="right-button" @click="next" type="primary">立即投保</n22-button>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, Icon } from "al-mobile";
export default {
  name: "risk-assess-ensure-plan", //使用xx-xx-xx命名方式具体看操作文档
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
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c ensure-plan>生命周期>mounted", "color:green;", "");
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
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      isShow: false,
      riskTitleArray: ["风险保障", "增值服务"],
      riskArray: [
        {
          title: "风险保障",
          ensure: {
            title: "身价保障",
            desc: [
              {
                title: `最少<span class="money">84.98万</span>的身价保障`,
                desc: "（身价账户每年3.5%递增，75岁现价 115.04万，加上63万身故保障，合计身价保障178.04万）",
              },
              {
                title: `最少<span class="money">63万</span>的高残保障`,
                desc: "孩子身价保障为教育金账户保费与现价 较大值（预计18岁保障可超20万）",
              },
            ],
          },
        },
        {
          title: "风险保障",
          ensure: {
            title: "疾病保障",
            desc: [
              {
                title: `<span class="money">35种轻症</span>保障最高<span class="money">113.4万元</span>`,
                desc: "（每次28.35万，最多给付4次）",
              },
              {
                title: `<span class="money">20种中症</span>保障最高<span class="money">75.6万元</span>`,
                desc: "（每次37.8万，最多给付2次）",
              },
              {
                title: `<span class="money">100种重疾</span>保障最高<span class="money">378万元</span>`,
                desc: "（分六组，间隔期180天，每次63万， 最多给付6次）",
              },
              {
                title: `<span class="money">疾病终末期</span>保障<span class="money">63万元</span>`,
                desc: "",
              },
            ],
          },
        },
        {
          title: "风险保障",
          ensure: {
            title: "固定领取",
            desc: [
              {
                title: `孩子7-8岁每年可领生存金<span class="money">14226元</span>`,
                desc: "",
              },
              {
                title: `孩子9-16岁每年可领生存金<span class="money">9246.9元</span>`,
                desc: "",
              },
              {
                title: `第17岁可领取满期金<span class="money">58753.38元</span>`,
                desc: "",
              },
            ],
          },
        },
        {
          title: "风险保障",
          ensure: {
            title: "万能账户",
            desc: [
              {
                title: `教育金账户保底利益<span class="money">3%</span>`,
                desc: "",
              },
              {
                title: `孩子18岁预计账户价值<span class="money">20.13万</span>`,
                desc: "（以中档利率计算）",
              },
            ],
          },
        },
        {
          title: "风险保障",
          ensure: {
            title: "其他权益",
            desc: [
              {
                title: `保费豁免`,
                desc: "",
              },
            ],
          },
        },
        {
          title: "增值服务",
          ensure: {
            title: "健康管理",
            desc: [
              {
                title: `健康体检、专家预约、快速协调、</br>二次诊疗、电话医生、基因检测`,
                desc: ``,
              },
            ],
          },
        },
        {
          title: "增值服务",
          ensure: {
            title: "意外急救",
            desc: [
              {
                title: `境外医疗救援服务`,
                desc: ``,
              },
              {
                title: `国内医疗紧急救援`,
                desc: ``,
              },
            ],
          },
        },
        {
          title: "增值服务",
          ensure: {
            title: "旅行出行",
            desc: [
              {
                title: `国际旅行管家`,
                desc: ``,
              },
              {
                title: `个人游、跟团游`,
                desc: ``,
              },
              {
                title: `酒店预定、机票预定`,
                desc: ``,
              },
            ],
          },
        },
      ],
      productMessage: [
        {
          type: "身故保障",
          productArray: [
            {
              productName: "光大永明锦裕传家终身寿险",
              isCheck: true,
              img: "1",
              desc: [
                `<span class="text_13">75岁账户价值106000，</span>保费18000/年`,
                `20年交，增额终身寿险`,
                `<span class="text_13">92%的光大客户选择该产品</span>`,
              ],
            },
          ],
        },
        {
          type: "疾病保障",
          productArray: [
            {
              productName: "光大永明童佳保（尊享版）重大疾病保险",
              isCheck: true,
              img: "2",
              desc: [
                `<span class="text_13">保额 630000，</span>保费12521.5/年`,
                `20年交，保至终身`,
                `<span class="text_13">95%的光大客户选择该产品</span>`,
              ],
            },
            {
              productName: "光大永明爱多多重大疾病保险",
              isCheck: false,
              img: "3",
              desc: [
                `<span class="text_13">保额 630000，</span>保费27775.00/年`,
                `多次重疾（6次）`,
                `<span class="text_13">88%的光大客户选择该产品</span>`,
              ],
            },
          ],
        },
        {
          type: "子女教育",
          productArray: [
            {
              productName: "光大永明福运连年（B款）年金保险",
              isCheck: true,
              img: "4",
              desc: [
                `<span class="text_13">孩子18岁账户价值200000,</span>保费14226/年`,
                `10年交，15年期`,
                `<span class="text_13">90%的光大客户选择该产品</span>`,
              ],
            },
            {
              productName: "光大永明福运连年（A款）年金保险",
              isCheck: false,
              img: "4",
              desc: [
                `<span class="text_13">保额200000，</span>保费14417.18/年起`,
                `5年交，10年期`,
                `<span class="text_13">95%的光大客户选择该产品</span>`,
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    goProposalBook() {
      // this.go("proposalBook/planShow?proposalId=8252", undefined, undefined, "proposalBook");
      this.native.openBrowser(
        {
          mode: 1,
          url: `${window.location.origin}${window.globalConfig.modulePrefix}/proposalBook/#/proposalBook/planShow?proposalId=8252&isModulesGo=1`,
        },
        content => {
          alert(JSON.stringify(content));
        },
        error => {
          alert(error);
        },
      );
    },
    next() {
      // this.go("riskAssess/result");
      this.$dialog.alert({
        title: "提示",
        content: "功能暂未开放，敬请期待",
        confirmText: "确定",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.riskAssess-ensure-plan {
  .riskAssess-ensure-plan-content {
    @import "./EnsurePlan.scss";
    table,
    table tr th,
    table tr td {
      border: 1px solid #ffdea3;
      padding: 10px;
    }
    .my_table {
      font-size: 12px;
      color: #333232;
      border-collapse: collapse;
      text-align: center;
      margin: 10px auto;
      .table_title {
        font-weight: 500;
      }
      .line_title {
        width: 20px;
        margin: 0 auto;
        color: #323435;
        font-weight: 500;
        font-size: 14px;
      }
      td {
        padding: 13px auto;
      }
      tr td:last-child,
      .ta_bg {
        background-color: #fff7e9;
      }
      tr td:first-child:not(.ta_bg),
      .sec_cor {
        color: #ffb83d;
        font-weight: 500;
      }
      .table_content {
        max-width: 210px;
        line-height: 16px;
        text-align: left;
        padding: 0px 0 10px 10px;
        .con_title {
          margin-top: 10px;
          span:last-child {
            margin-left: 7px;
            display: block;
          }
          ::v-deep .money {
            color: #ffb500;
          }
        }
        .desc {
          color: #ea773b;
          font-size: 13px;
          width: 220px;
          transform: scale(0.85);
          transform-origin: bottom left;
          // width: 230px;
        }
      }
      .circle {
        height: 4px;
        width: 4px;
        background: #ffb83d;
        border-radius: 50%;
        float: left;
        display: block;
        margin: 5px 4px 0 0;
      }
    }
    .pro_check {
      position: absolute;
      right: 0px;
      color: #ffffff;
      height: 18px;
      width: 35px;
      text-align: center;
      background-color: #dcdcdc;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .pro_checked {
      background-color: #ff3d3d;
    }
    .assets-ft {
      width: 320px;
    }
    .left-button {
      width: 136px;
      float: left;
    }
    .right-button {
      width: 136px;
      float: right;
    }
  }
}
</style>
