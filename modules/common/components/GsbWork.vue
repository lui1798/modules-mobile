<template>
  <n22-popup v-model="isPopupShow" position="bottom" @maskClick="cancel" class="work-popup">
    <n22-popup-title-bar title="请选择" @confirm="cancel">
      <template slot="confirm">
        <n22-icon name="close" size="lg"></n22-icon>
      </template>
    </n22-popup-title-bar>
    <div class="work-content">
      <!-- <div class="search">
        <div class="input flex flexs" style="position: relative;">
          <input type="text" placeholder="请输入您的职业" v-model="searchParameter" />
          <div style="position: absolute;right:0px;top:15px;width: 15%;" class="flex flexs">
            <p
              class="fa fa-microphone"
              aria-hidden="true"
              style="color:#feb101;font-size:1.2rem;"
              @click="speechRec(100)"
              v-if="_props.audioActive == true"
            ></p>
            <div class="imgs" @click="search()">
              <img src="../../../src/assets/images/home/search.png" alt />
            </div>
          </div>
        </div>
      </div> -->
      <div class="search">
        <n22-input-item
          v-model="searchParameter"
          placeholder="关键词搜索"
          class="search_query search_query_icon"
          style="position: relative; vertical-align: top;"
        ></n22-input-item>
      </div>
      <div v-show="!toggle.isSearch" v-for="(itm, index) in occupationList.occupation.itemOne" :key="`a${index}`">
        <p @click="itm.isopen = !itm.isopen" class="title">
          <span>{{ itm.descr }}</span>
          <n22-icon
            name="right_arrow"
            class="icon-trans"
            :style="{ '-webkit-transform': itm.isopen ? 'rotate(-90deg)' : '' }"
          ></n22-icon>
        </p>
        <div
          v-show="itm.isopen"
          v-for="(itmtwo, index) in itm.itemTwo"
          :key="`b${index}`"
          style="display: flex;justify-content: flex-start;flex-wrap: wrap;"
        >
          <p
            v-for="(itmThree, index) in itmtwo.itemThree"
            :key="`c${index}`"
            @click="selectedItem(itmThree)"
            :class="itm.descr == '常用职业' ? 'changyongItem' : 'otherItem'"
          >
            {{ itmThree.level }}类 &nbsp;&nbsp;&nbsp; {{ itmThree.descr }}
          </p>
        </div>
        <div style="height: 9px;background: whitesmoke;"></div>
      </div>
      <p
        v-show="toggle.isSearch"
        class="searchItem"
        v-for="(itm, index) in temp.occupationList.occupation.item"
        :key="`d${index}`"
        @click="selectedItem(itm)"
      >
        {{ itm.level }}类 &nbsp;&nbsp;&nbsp; {{ itm.descr }}
      </p>
    </div>
  </n22-popup>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Popup, Icon, InputItem, PopupTitleBar } from "al-mobile";
import occupationList from "../data/codedata/common/json/occupation_sunlife.js";
export default {
  name: "gsb-work", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    isPopupShowWork: {
      //props定义样例
      type: Boolean,
      default: false,
    },
  },
  components: {
    [Icon.name]: Icon, //引入组件样例如此
    [Popup.name]: Popup,
    [InputItem.name]: InputItem,
    [PopupTitleBar.name]: PopupTitleBar,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {},
  watch: {
    isPopupShowWork(newVal) {
      this.isPopupShow = newVal;
    },
    searchParameter() {
      this.search();
    },
    value: {
      handler(val) {
        if (val.speechRecVal != "") {
          this.searchParameter = val.speechRecVal;
        } else {
          this.searchParameter = "";
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isPopupShow: this.isPopupShowWork,
      occupationList,
      temp: {
        occupationList: {
          occupation: {
            item: [],
          },
        },
      },
      toggle: {
        isSearch: false, //是否为查询
      },
      searchParameter: "",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    search: function() {
      //对传入的查询条件进行字符串过滤
      this.searchParameter = this.searchParameter.replace(/\s+/g, "");
      if (this.searchParameter != undefined && this.searchParameter != "") {
        //每次有查询条件时查询初始化次数组
        this.temp.occupationList.occupation.item = [];
        //大类
        var i;
        let itemOneList = this.occupationList.occupation.itemOne;
        for (i = 0; i < itemOneList.length; i++) {
          //中类
          let itemTwoList = itemOneList[i].itemTwo;
          if (itemTwoList != null && itemTwoList.length > 0) {
            for (var j = 0; j < itemTwoList.length; j++) {
              //小类
              let itemThree = itemTwoList[j].itemThree;
              if (itemThree != null && itemThree.length > 0) {
                for (var k = 0; k < itemThree.length; k++) {
                  //字符包含输入字符时插入数组
                  if (itemThree[k].descr.indexOf(this.searchParameter) > -1) {
                    this.toggle.isSearch = true;
                    this.temp.occupationList.occupation.item.push(itemThree[k]);
                    console.log(this.temp.occupationList.occupation.item);
                  }
                }
              }
            }
          }
        }
        //检查数组是否存在内容不存在说明查询为空,予以提示
        let tempList = this.temp.occupationList.occupation.item;
        if (tempList == undefined || tempList.length == 0) {
          this.$toast({
            content: "未查询到相关职业",
            position: "string",
            confirmText: "确定",
            duration: 3000,
          });
        }
      } else {
        this.toggle.isSearch = false;
        this.temp.occupationList.occupation.item = [];
      }
      console.log(this.temp.occupationList.occupation.item);

      //去掉重复选取的数据
      for (var ia = 0; i < this.temp.occupationList.occupation.item.length; ia++) {
        for (var ja = i + 1; ja < this.temp.occupationList.occupation.item.length; ) {
          if (this.temp.occupationList.occupation.item[ia].code == this.temp.occupationList.occupation.item[ja].code) {
            //通过id属性进行匹配；
            this.temp.occupationList.occupation.item.splice(ja, 1); //去除重复的对象；
          } else {
            ja++;
          }
        }
      }
      console.log(this.temp.occupationList.occupation.item);
    },
    //选中职业事件
    selectedItem(item) {
      this.isPopupShow = !this.isPopupShow;
      // this.value.occItem = item;
      // this.value.speechRecVal = "";
      this.$emit("selectedWork", item);
      this.searchParameter = "";
    },
    //取消选中事件
    cancel: function() {
      this.isPopupShow = !this.isPopupShow;
      this.$emit("selectedWork", "");
      console.log("取消选择职业===>", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.work-popup {
  ::v-deep .n22-popup-box {
    background: #fff;
  }
  ::v-deep.n22-popup-title-bar {
    height: 50px;
  }
  .work-content {
    height: 550px;
    overflow: auto;
    p {
      margin: 0px;
      // padding: 20px;
    }
    .icon-trans {
      color: $theme-color;
      transition: all 0.2s ease-out;
      -webkit-transition: all 0.2s ease-out;
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
    }
  }
}

.search {
  background-color: #f5f5f5;
  text-align: center;
  padding: 12px;
  height: 30px;
  .search_query {
    width: 351px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 15px 0 30px;
    border: 1px solid #e3e3e3;
    color: #2c3e50;
    outline: none;
    border-radius: 13px;
    font-size: 14px;
    transition: border-color 0.2s ease;
    vertical-align: middle !important;
    ::v-deep.n22-field-item-content {
      min-height: 28px;
      .n22-field-item-control {
        height: 28px;
        .n22-input-item-input {
          height: 28px;
        }
      }
    }
    &::-webkit-input-placeholder {
      color: #bcbcbc;
      font-size: 12px;
      line-height: 28px;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #bcbcbc;
      font-size: 12px;
      line-height: 28px;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #bcbcbc;
      font-size: 12px;
      line-height: 28px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #bcbcbc;
      font-size: 12px;
      line-height: 28px;
    }
  }
  .search_query_icon {
    background: #fff url(../../../src/assets/images/home/search.png) left 10px center no-repeat;
    background-size: 20px;
  }
}

.title {
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
}

.changyongItem {
  margin: 4px 10px !important;
  height: 30px !important;
  line-height: 30px !important;
  padding: 0 10px;
  margin: 5px 10px;
  background: #f8f8f8;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
}

.otherItem {
  width: 100%;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  padding: 0 17px;
  border-bottom: 1px solid #efefef;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
}

.searchItem {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background: #f8f8f8;
  border: 2px solid #dadada;
  border-bottom: 1px solid #efefef;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-sizing: border-box;
}
</style>
