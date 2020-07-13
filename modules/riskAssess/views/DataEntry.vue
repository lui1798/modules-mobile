<template>
  <div class="riskAssess-data-entry">
    <al-all-head back-url="hybrid-back" hairline></al-all-head>
    <al-content
      class="riskAssess-data-entry-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="box">
        <div class="hd">
          <img class="layer" src="../assets/images/head_bg.png" />
          <img class="entryPic" src="../assets/images/head01.png" />
          <img class="txt" src="../assets/images/head_txt.png" />
          <!-- <span class="txt" :lines="1">风险评估</span> -->
          <div class="color" />
          <div class="colorDiv" />
        </div>
        <div class="block_4">
          <n22-field class="insured-info-c" title="">
            <n22-input-item
              title="姓名:"
              id="insuredname"
              name="insuredname"
              v-model="insured.name"
              data-vv-as="姓名"
              maxlength="10"
              placeholder="请输入您的姓名"
              align="right"
              clearable
            ></n22-input-item>
            <n22-radio-item
              v-model="insured.sex"
              title="性别:"
              name="radio1"
              :isAppendTo="false"
              :options="sexOptions"
            ></n22-radio-item>
            <n22-drop-select
              title="年龄:"
              class="isBorder"
              v-model="insured.age"
              pickerTitle="请选择年龄"
              selectDefaultValue="30"
              :options="ageOptions"
              ispickerValue="请选择年龄"
              type="single"
              :isAppendTo="true"
            ></n22-drop-select>
            <n22-input-item
              title="个人年收入:"
              id="insuredname"
              name="insuredname"
              v-model="insured.familyIncome"
              maxlength="10"
              placeholder="请输入"
              type="money"
              align="right"
              clearable
            ></n22-input-item>
            <n22-input-item
              title="家庭年收入:"
              id="insuredname"
              name="insuredname"
              v-model="insured.personalIncome"
              maxlength="10"
              placeholder="请输入"
              type="money"
              align="right"
              clearable
            ></n22-input-item>
          </n22-field>
        </div>
        <div class="bd">
          <div class="grid">
            <div class="col1">
              <div class="group_5">
                <div class="outer" @click="checkPerson(' 父亲')">
                  <img class="largeIcon" src="../assets/images/tx11.png" />
                  <div class="wrap">
                    <n22-icon v-if="isChecked(' 父亲')" name="checked" class="per_checked"></n22-icon>
                  </div>
                </div>
                <div class="outer" @click="checkPerson(' 母亲')">
                  <img class="largeIcon_2" src="../assets/images/tx12.png" />
                  <div class="wrap">
                    <n22-icon v-if="isChecked(' 母亲')" name="checked" class="per_checked"></n22-icon>
                  </div>
                </div>
              </div>
              <img class="logo" src="../assets/images/tx_line1.png" />
              <div class="div" />
              <div
                class="outer outer_top"
                @click="insured.sex === '2' && checkPerson(insured.sex === '1' ? '本人' : '丈夫')"
              >
                <img class="largeIcon_3" src="../assets/images/tx21.png" />
                <div class="wrap">
                  <n22-icon
                    v-if="isChecked(insured.sex === '1' ? '本人' : '丈夫')"
                    name="checked"
                    class="per_checked"
                  ></n22-icon>
                </div>
              </div>
            </div>
            <div class="col2">
              <div class="container_3">
                <div class="outer" @click="checkPerson('父亲')">
                  <img class="largeIcon_4" src="../assets/images/tx13.png" />
                  <div class="wrap">
                    <n22-icon v-if="isChecked('父亲')" name="checked" class="per_checked"></n22-icon>
                  </div>
                </div>
                <div class="outer" @click="checkPerson('母亲')">
                  <img class="largeIcon_5" src="../assets/images/tx14.png" />
                  <div class="wrap">
                    <n22-icon v-if="isChecked('母亲')" name="checked" class="per_checked"></n22-icon>
                  </div>
                </div>
              </div>
              <img class="logo_2" src="../assets/images/tx_line1.png" />
              <div class="empty" />
              <div
                class="outer outer_top"
                @click="insured.sex === '1' && checkPerson(insured.sex === '2' ? '本人' : '妻子')"
              >
                <img class="largeIcon_6" src="../assets/images/tx22.png" />
                <div class="wrap">
                  <n22-icon
                    v-if="isChecked(insured.sex === '2' ? '本人' : '妻子')"
                    name="checked"
                    class="per_checked"
                  ></n22-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="tagWrap_3">
            <span class="tag_3" :lines="1">{{ insured.sex === "2" ? "本人" : "配偶" }}</span>
          </div>
          <div class="tagWrap_4">
            <span class="tag_4" :lines="1">{{ insured.sex === "1" ? "本人" : "配偶" }}</span>
          </div>
          <img class="bg_6" src="../assets/images/tx_line2.png" />
          <div
            class="group_6"
            :style="{
              'margin-left': `${dealPxToVw(150 - (child - 1) * 33.5)}vw`,
              width: `${dealPxToVw(60 * child)}vw`,
            }"
          >
            <div v-for="(item, i) in child" :key="i">
              <div class="empty_2" :style="{ left: `${dealPxToVw(30 * ((i + 1) * 2 - 1))}vw` }" />
              <div class="container_4" @click="checkPerson(`孩子${i + 1}`)">
                <img class="largeIcon_7" src="../assets/images/tx31.png" />
                <div class="block_5">
                  <n22-icon v-if="isChecked(`孩子${i + 1}`)" name="checked" class="per_checked"></n22-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="block_6">
            <n22-icon name="close" @click="addPer" class="add"></n22-icon>
          </div>
          <div class="color_3" />
          <div class="block_7">
            <div class="colorDiv_2" />
            <span class="info_3" :lines="1">家庭成员信息</span>
          </div>
          <div class="colorDiv_3" />
          <div class="person_message_show">
            <n22-field :class="[i !== 0 ? 'person_message_show_top' : '']" v-for="(item, i) in personArray" :key="i">
              <n22-cell-item title="成员身份：" :addon="item.relation" arrow></n22-cell-item>
              <!-- <n22-cell-item title="成员性别：" v-if="item.isChild" addon="男" arrow></n22-cell-item> -->
              <n22-drop-select
                title="成员性别："
                v-model="item.sex"
                v-if="item.isChild"
                pickerTitle="请选择"
                selectDefaultValue="30"
                :options="sexOptions"
                ispickerValue="请选择"
                type="single"
                :isAppendTo="true"
              ></n22-drop-select>
              <!-- <n22-cell-item title="成员年龄：" :addon="`${item.age}岁`" arrow></n22-cell-item> -->
              <n22-drop-select
                title="成员年龄："
                class="isBorder"
                v-model="item.age"
                pickerTitle="请选择年龄"
                selectDefaultValue="30"
                :options="ageOptions"
                ispickerValue="请选择年龄"
                type="single"
                :isAppendTo="true"
              ></n22-drop-select>
            </n22-field>
          </div>
        </div>
        <div class="assets-ft">
          <n22-button @click="next" type="primary">提交评估</n22-button>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// 基础组件
import {
  AllHead,
  Content,
  Button,
  DropSelectItem,
  Field,
  FieldItem,
  InputItem,
  Icon,
  RadioItem,
  CellItem,
} from "al-mobile";
//码表数据
// import masterProData from "../assets/data/masterProData";
import code from "@@/utils/code/";
export default {
  name: "risk-assess-data-entry", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [DropSelectItem.name]: DropSelectItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [RadioItem.name]: RadioItem,
    [CellItem.name]: CellItem,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    isChecked() {
      return relation => {
        console.log("%c isChecked>>>>>>>>>>", "color:#00CD00", relation);
        return this.personArray.findIndex(item => item.relation === relation) > -1;
      };
    },
  },
  mounted() {
    console.log("%c riskAssess-生命周期-mounted", "color:green;", "");
    for (let i = 1; i < 107; i++) {
      this.ageOptions.push({
        text: `${i}岁`,
        value: i + "",
      });
    }
    //设置初始默认年龄
    this.insured.age = "30";
    //设置初始化的人员
    this.personArray = [
      {
        age: "28",
        sex: "2",
        relation: "妻子",
      },
      {
        age: "2",
        sex: "1",
        isChild: true,
        relation: "孩子1",
      },
    ];
  },
  watch: {
    "insured.sex"(newVal) {
      for (let a = 0; a < this.personArray.length; a++) {
        const per = this.personArray[a];
        if (newVal === "1" && per.relation === "丈夫") {
          this.personArray[a].relation = "妻子";
          // this.$set(this.personArray, a, this.personArray[a]);
          break;
        } else if (newVal === "2" && per.relation === "妻子") {
          this.personArray[a].relation = "丈夫";
          break;
        }
      }
    },
  },
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
      insured: {
        //姓名
        name: "",
        //性别
        sex: "1",
        age: "",
        familyIncome: "",
        personalIncome: "",
      },
      sexOptions: code.getCodeData("sex"),
      ageOptions: [],
      child: 1,
      personArray: [],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    checkPerson(relation) {
      let index = this.personArray.findIndex(item => item.relation === relation);
      if (index > -1) {
        this.personArray.splice(index, 1);
      } else {
        let obj = {
          age: "",
          sex: "1",
          relation: relation,
          isChild: relation.indexOf("孩子") > -1,
        };
        this.personArray.push(obj);
      }
    },
    addPer() {
      this.child < 3 && this.child++;
    },
    next() {
      this.go("riskAssess/description");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/assess.scss";
.riskAssess-data-entry {
  .riskAssess-data-entry-content {
    @import "./DataEntry.scss";
    .assets-ft {
      ::v-deep .n22-button.primary {
        background-color: #fff;
        background-image: none;
        color: $theme-color;
        &.active:active {
          background-image: none;
          background-color: rgb(252, 240, 240);
        }
      }
    }
  }
}
</style>
