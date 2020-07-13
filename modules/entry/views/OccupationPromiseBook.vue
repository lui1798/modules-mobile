<template>
  <div class="entry-occupation-promise-book">
    <al-all-head></al-all-head>
    <al-content
      class="entry-occupation-promise-book-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="entry-occupation-promise-book-box">
        <div class="title">
          光大永明人寿保险有限公司
        </div>
        <div class="title-child">
          职业行为声明和承诺书
        </div>
        <div class="content">
          <p>
            郑重承诺依法合规开展业务活动，诚实守信，尽职尽责，履行岗位职责。本人对下列事项作出严正声明并承诺：
          </p>
          <p>
            一、依照国家法律法规、行政规章、制度、政策性文件要求，合法合规开展业务活动，在遵守公司各项规章制度的前提下开展保险服务工作。
          </p>
          <p>
            二、本人恪守职业道德，规范展业，不欺诈误导客户，不欺骗公司，对本人一切不诚信行为承担法律、监管责任。
          </p>
          <p>
            三、本人将严格自律，规范销售活动：
          </p>
          <p>
            （一）未经公司书面授权，未向所属机构所在地保监局报备，不向客户销售或推介非保险金融产品，更不在公司营业场所销售或推介非保险金融产品。
          </p>
          <p>
            （二）不违背客户意愿、不以欺骗、误导、违规搭售等方式销售；不向超出其需求和风险承受能力的客户销售。
          </p>
          <p>
            （三）不与合作银行网点、保险专业中介机构恶意串通从事有损客户、公司利益的行为。
          </p>
          <p>
            （四）不组织或参与非法集资或集资诈骗活动，不使用非法集资资金，自觉遵守相关法律、法规，依法经营，诚信自律，自觉远离和抵制非法集资。积极响应政府部门开展的反对非法集资培训和宣传活动，关注和了解反对非法集资知识。坚决抵制并检举非法集资活动，接受并配合相关单位查处非法集资工作。
          </p>
          <p>
            （五）合规使用新型传播工具，杜绝通过新型传播工具散播非法集资、抵损公司、销售误导相关信息的行为。
          </p>
          <p>
            （六）不从事《保险代理合同》/《创新银保业务人员基本法》/《银保业务人员品质管理办法》中其他被禁止的行为。
          </p>
          <p>
            四、本人如果违反以上声明及承诺，同意公司对本人依照公司管理制度进行处理，包括解除保险代理人合同（或劳务派遣合同），自愿承担相应法律责任并对因参与违规销售活动所造成的经济损失负全部责任。
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
  name: "entry-occupation-promise-book",
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  computed: {
    ...mapState(["entry"]),
  },
  mounted() {
    this.OCCUPATION_STATEMENT(true);
    console.log("%c occupation-promise-book>生命周期>mounted", "color:green;", "");
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
    ...mapMutations(["OCCUPATION_STATEMENT"]),
  },
};
</script>

<style lang="scss" scoped>
.entry-occupation-promise-book {
  .entry-occupation-promise-book-content {
    .entry-occupation-promise-book-box {
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
