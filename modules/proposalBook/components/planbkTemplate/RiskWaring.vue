<template>
  <div class="risk-wrap">
    <article class="riskwaring-wrap">
      <div class="english-dx">CONDITIONS</div>
      <div class="riskwaring-title">
        <img src="../../assets/images/circle.png" /> 温馨提示
        <img src="../../assets/images/circle.png" />
      </div>
      <div
        class="riskwaring-container"
        :style="{ height: isShowDetail ? '100%' : '20vw', overflow: isShowDetail ? '' : 'hidden' }"
      >
        <p v-if="proposalBookData.dividend">
          该利益演示是基于公司的精算及其他假设，不代表公司的历史经营业绩，也不代表对公司未来经营业绩的预期，保单的红利分配是不确定的。演示使用的红利累积利率为3.5%，实际使用的累积利率根据本公司当时公布的值而定，投保人可拨打客服电话查询。
        </p>
        <p v-if="proposalBookData.powerful">
          <span v-for="(item, i) in proposalBookData.powerfulNames" :key="i">《{{ item }}》</span
          >万能保险，结算利率超过最低保证利率的部分是不确定的，实际个人账户利益可能低于中、高档利益演示水平。假设结算利率为：低档
          3.0%；中档 4.5%；高档 6.0%。
        </p>
        <p>
          投保人在保单犹豫期后解除合同会遭受一定损失，具体保单利益请以保单合同为准；若投保人犹豫期后解除保险合同（退保），退保金额为保险合同终止时的现金价值净额。
        </p>
        <p>
          以上保险金给付，均假设保险事故发生在等待期过后；给付条件请详见相关产品条款。
        </p>
      </div>
      <a @click="isShowDetail = !isShowDetail" class="toggle-desc toggle-table toggle-tip-warning">
        <span>{{ isShowDetail ? "收起明细" : "展开明细" }}</span>
        <span class="svg_icon" :class="isShowDetail ? 'is_show_detail' : 'is_show_detail_close'">
          <n22-icon name="right_arrow"></n22-icon>
        </span>
      </a>
    </article>
    <div class="foot-tips">
      本资料仅供您理解产品时参考，我们与您的一切权利与义务以保险合同为准。
      <span v-if="proposalBookData.agentInfo.chongQing">保险公司不得违规销售非保险金融产品，请勿参与非法集资</span>
    </div>
  </div>
</template>

<script>
import { Icon } from "al-mobile";
export default {
  name: "risk-waring",
  data() {
    return {
      isShowDetail: false,
    };
  },
  props: {
    proposalBookData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    [Icon.name]: Icon,
  },
};
</script>

<style lang="scss" scoped>
//风险提示
.riskwaring-wrap {
  // padding-bottom: 20px;
}
.riskwaring-container {
  text-indent: 2em;
  margin: 14px 17px;
  font-size: 14px;
  line-height: 20px;
}
.toggle-tip-warning {
  background-color: #ffffff;
  height: 30px;
}
.foot-tips {
  font-size: 10px;
  margin: 0 20px;
}
</style>
