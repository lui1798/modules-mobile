<template>
  <!-- 九宫格数据模板 -->
  <div class="gong_ge">
    <slot name="title">
      <p v-if="title" class="common">
        <span class="span_first">{{ title }}</span>
        <button
          id="gong_ge_List_Title_Button"
          @click="$_titleButton"
          :class="titleButtonClass"
        >
          {{ titleButton }}
        </button>
      </p>
    </slot>
    <template v-if="dataList.length > 0 && dataList.length % 2 == 0">
      <ul class="gong_ge_list_ul">
        <li
          :class="item.dataClass ? item.dataClass : 'gong_ge_list_ul_li'"
          v-for="(item, $index) in dataList"
          :key="$index"
          @click="$emit('gongge_go', item, $index)"
        >
          <!-- 数据图片 -->
          <slot name="img" :item="item">
            <p>
              <img v-lazy="item.image" />
            </p>
          </slot>
          <!-- 数据标题 -->
          <slot name="ggtitle" :item="item">
            <p>{{ item.title }}</p>
          </slot>
          <!-- 数据状态 -->
          <slot name="status" :item="item" :dataList="dataList">
            <p v-if="item.state == 4">
              <n22-count-down
                endTimeType="ss"
                endTime="1551782400"
                :callback="() => {}"
                endText="已结束"
                formatProps="hh-mm-ss"
              ></n22-count-down>
            </p>
            <p v-if="item.state">{{ item.state }}</p>
          </slot>
          <!-- 数据标签 -->
          <slot name="meta" :item="item">
            <div v-if="item.meta">{{ item.meta }}</div>
          </slot>
        </li>
      </ul>
    </template>
    <template v-else-if="dataList.length > 0 && dataList.length % 2 != 0">
      <ul
        class="gong_ge_list_ul gong_ge_list_ul_j"
        v-for="(item, $index) in dataList"
        :key="$index"
        @click="$emit('gongge_go', item)"
      >
        <li>
          <!-- 数据图片 -->
          <slot name="img" :item="item">
            <p>
              <img v-lazy="item.image" />
            </p>
          </slot>
        </li>
        <li :class="item.dataClass ? item.dataClass : 'gong_ge_list_ul_li_one'">
          <!-- 数据标题 -->
          <slot name="ggtitle" :item="item">
            <p>{{ item.title }}</p>
          </slot>
          <!-- 数据状态 -->
          <slot name="status" :item="item" :dataList="dataList">
            <p v-if="item.state == 4">
              <n22-count-down
                endTimeType="ss"
                endTime="1551782400"
                :callback="() => {}"
                endText="已结束"
                formatProps="hh-mm-ss"
              ></n22-count-down>
            </p>
            <p v-else>{{ item.state }}</p>
          </slot>
          <!-- 数据标签 -->
          <slot name="meta" :item="item">
            <div v-if="item.meta">{{ item.meta }}</div>
          </slot>
        </li>
      </ul>
    </template>
    <!-- <ul v-else style="position: relative;">
      <n22-pullLoading v-model="show"></n22-pullLoading>
      <li class="list_back_li" v-for="item in 3" :key="item.id">
        <div class="list_back_svg">
          <svg-icon icon-class="shopback"></svg-icon>
        </div>
      </li>
    </ul> -->
    <n22-list-svg
      typeSvg="noticeListSvg"
      v-for="item in 3"
      :key="item.id"
      v-else
    ></n22-list-svg>
  </div>
</template>

<script>
import CountDown from "@/components/common/CountDown";
// import pullLoading from "@/components/common/pullLoading";
import ListSvg from "@/components/common/ListSvg";

export default {
  name: "gong-ge-list", //使用xx-xx-xx命名方式具体看操作文档
  components: {
    // [pullLoading.name]: pullLoading, //loading
    [ListSvg.name]: ListSvg, //ListSvg
    [CountDown.name]: CountDown
  },
  props: {
    title: {
      //props定义样例
      type: String,
      default: ""
    },
    titleButton: {
      type: String,
      default: val => {
        if (val) {
          return val;
        } else {
          return "更多";
        }
      }
    },
    dataListProp: {
      type: Array,
      default: () => {
        return [];
      }
    },
    size: {
      type: Number,
      default: 4
    }
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    titleButtonClass() {
      if (this.titleButton != "更多") {
        return "change";
      } else {
        return "more";
      }
    }
  },
  data() {
    return {
      show: true,
      dataList: [],
      dataListAll: [],
      num: 1
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    dealData() {
      this.$emit(
        "selectListByPage",
        this.num,
        this.size,
        curPageData => {
          if (curPageData.length > 0) {
            if (this.num === 1) this.dataList = []; // 如果是第一页需手动制空列表
            // if (this.titleButton == "更多") {
            //   this.dataList = this.dataList.concat(curPageData); // 追加新数据
            // } else {
            this.dataListAll = curPageData; // 换一换新数据
            this.dataList = window.utils.utilsPlugin.getPageData(
              this.num,
              this.size,
              curPageData,
              ""
            ); // 换一换新数据
            // }
            this.num++;
          } else {
            this.num = 1;
            this.$_titleButton();
          }
        },
        () => {}
      );
    },
    $_titleButton(code) {
      console.log("%c _titleButton", "color:green;", this.num);
      if (this.titleButton == "更多") {
        this.dealData();
      } else if (this.titleButton == "more" && code != 1) {
        this.$router.push("/productList");
      } else {
        //换一换逻辑
        this.dataList = [];
        if (this.num > 1) {
          this.dataList = window.utils.utilsPlugin.getPageData(
            this.num,
            this.size,
            this.dataListAll,
            ""
          );
          if (this.dataList.length <= 0) {
            this.num = 1;
            this.$_titleButton();
            return;
          }
          this.num++;
        } else {
          this.dealData();
        }
      }
    }
  },
  mounted() {
    this.$_titleButton(1);
  },
  watch: {
    dataListProp(newVal) {
      if (newVal && newVal.length > 0) {
        this.dataList = this.dataListProp;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gong_ge >>> .loading_container {
  position: absolute;
  margin-top: 104px;
  top: auto;
}

.common {
  padding: 12px 12px;
  margin: 0;
  overflow: hidden;
}
.span_first {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  text-align: left;
  float: left;
}
.more {
  font-size: 12px;
  color: #ccc;
  text-align: right;
  float: right;
  //消除button的默认样式
  margin: 0;
  padding: 0;
  border: 1px solid transparent; //自定义边框
  outline: none; //消除默认点击蓝色边框效果
  background-color: #ffffff;
}
.change {
  font-size: 12px;
  color: #4091fb;
  text-align: right;
  float: right;
  //消除button的默认样式
  margin: 0;
  padding: 0;
  border: 1px solid transparent; //自定义边框
  outline: none; //消除默认点击蓝色边框效果
  background-color: #ffffff;
}

.gong_ge_list_ul {
  height: auto;
  overflow: hidden;
  // margin-bottom: 45px;
  // float: left;
}
.gong_ge_list_ul_j:not(:first-child) {
  margin-top: 10px;
}
.gong_ge_list_ul li {
  width: 168px;
  float: left;
  position: relative;
}
.gong_ge_list_ul li img {
  display: inline-block;
  width: 168px;
  height: 100px;
}
.gong_ge_list_ul li p {
  line-height: 20px;
  height: 40px;
  font-size: 14px;
  color: #000;
  padding: 0;
  margin: 0;
  margin-top: 7px;
  text-align: left;
}
.gong_ge_list_ul li:nth-child(2n-1) {
  margin-left: 12px;
}
.gong_ge_list_ul li:nth-child(2n) {
  margin-left: 15px;
}
.gong_ge_list_ul li p:not(:first-child) {
  margin: 0;
  margin: 7px 8px;
}
.gong_ge_list_ul li p:last-child {
  font-size: 12px;
  // color: #000;
}
.gong_ge_list_ul li p:first-child {
  width: 168px;
  margin: 0;
  height: 100px;
}

.list_back_li {
  height: 87.3px;
  .list_back_svg {
    @include wh(100%, 100%);
  }
}

.gong_ge_list_ul div {
  position: absolute;
  top: 63px;
  left: 0px;
  height: 21px;
  font-size: 12px;
  color: #fff;
  line-height: 21px;
  padding: 0px 18px 0 5px;
}
.gong_ge_list_ul .ongoing div {
  display: none;
}
.gong_ge_list_ul .end1 div {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid #12b887;
  background-color: #12b887;
}
.gong_ge_list_ul .end div {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid #cccccc;
  background-color: #cccccc;
}

.gong_ge_list_ul_li p:nth-child(3) {
  color: #666666;
}
.ongoing p:nth-child(3) {
  color: #4091fb;
}
.count_down p:nth-child(3) {
  color: #ffab3f;
}
.end p:nth-child(3) {
  color: #999999;
}
.end1 p:nth-child(3) {
  color: #999999;
}
.gong_ge_list_ul_li_one p:nth-child(1) {
  margin: 10px 0 0 0 !important;
  height: 20px !important;
}
.gong_ge_list_ul_li_one p:nth-child(2) {
  margin: 7px 0 !important;
}
</style>
