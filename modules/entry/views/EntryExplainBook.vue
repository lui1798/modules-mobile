<template>
  <div class="entry-entry-explain-book">
    <al-all-head></al-all-head>
    <al-content
      class="entry-entry-explain-book-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="entry-entry-explain-book-box">
        <div class="title">
          光大永明人寿保险有限公司
        </div>
        <div class="title-child">
          入职声明书
        </div>
        <div class="content">
          <p>
            一、公司已详细介绍并且本人已经清楚了解创新银保业务人员的工作内容、性质和用工方式等重要权益。本人知悉，如果通过面试以及公司其他考核后，将与公司签署保险代理合同。
          </p>
          <p>
            二、本人向公司出示、陈述的任何有关自身情况的说明都是真实有效的，包括但不限于身份证、学历、学位，工作经历、身体状况，联系地址、联系方式等等。上述信息或陈述如有虚假，公司可解除代理合同并不支付任何赔偿，如给公司造成损失，本人承担相应的赔偿责任。
          </p>
          <p>
            三、于本声明签署之日起，本人与其他任何单位不存在任何劳动、劳务关系，未在其他公司执业，且本人受聘于公司不违反任何竞业限制义务，不将任何涉及第三方的商业秘密带入公司，并不在公司使用。公司不会因此引发任何纠纷或诉讼，因此引起的任何法律责任由本人承担。
          </p>
          <p>
            四、本人已收到、阅读并完全理解、同意公司的现有的各项规章制度，包括但不限于《创新银保业务人员管理办法》、《创新银保业务人员签约解约管理流程》、《银保业务人员品质管理办法》等。本人清楚公司将根据具体经营情况对规章制度进行更新，将对其严格遵守。如果违反公司制度，愿意按照相关规定接受处理。
          </p>
          <p>
            五、如本人被证实有下述情形之一的，公司可以随时批评、警示，直至解除代理合同：
          </p>
          <p>
            (一) 在以往从业经历中，存在严重欺诈或违规行为；
          </p>
          <p>
            (二) 工作态度不端，行为散漫，迟到、早退月累计达三次或无故缺勤月累计达三天；
          </p>
          <p>
            (三) 不按要求开展银保展业工作，工作不及时、不主动；
          </p>
          <p>
            (四) 沟通、经营和应变能力差，难以有效服务客户；
          </p>
          <p>
            (五) 无法达成《创新银保业务人员管理办法》中的考核标准。
          </p>
          <p>
            六、本声明书作为本人与公司签订《保险代理合同》前的承诺保证，与《保险代理合同》具有同等法律效力。
          </p>
          <p>
            以上声明内容为本人自愿，独立，真实的意愿表示。
          </p>
          <p>
            特立此声明书。
          </p>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { AllHead, Content } from "al-mobile";
export default {
  name: "entry-entry-explain-book",
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  computed: {
    ...mapState(["entry"]),
  },
  mounted() {
    this.ENTRY_STATEMENT(true);
    console.log("%c entry-explain-book>生命周期>mounted", "color:green;", "");
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
    ...mapMutations(["ENTRY_STATEMENT"]),
  },
};
</script>

<style lang="scss" scoped>
.entry-entry-explain-book {
  .entry-entry-explain-book-content {
    .entry-entry-explain-book-box {
      background: #fff;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      padding: 16px;
      .title {
        margin: auto;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .title-child {
        margin: auto;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .content {
        margin-top: 20px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
        p {
          text-indent: 2em;
        }
      }
    }
  }
}
</style>
