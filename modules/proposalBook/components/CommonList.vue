<template>
  <!-- 培训列表模板 -->
  <div>
    <div class="common_list" v-if="dataList && dataList.length > 0">
      <ul @click="$emit('commonListGo', item)" v-for="(item, $index) in dataList" :key="item.id || $index">
        <div v-if="!item.isDelete">
          <slot name="all" :item="item" :index="$index">
            <!-- 上总 -->
            <div v-if="$scopedSlots.top_all" name="top_all"></div>
            <!-- 上左总 -->
            <slot name="top_left_all" :item="item" :index="$index">
              <li>
                <!-- <img src="static/images/train2/test/zhanwei.jpg"> -->
                <img v-lazy="item.imgPath" />
                <div v-if="item.istag" :style="{ top: '3.458vw', 'background-color': '#4091fb' }" class="common_status">
                  已参加
                </div>
                <div v-if="item.isline" class="isline" style="">
                  <div class="isline_tab">
                    {{ codeLineStatus(item.onlineFlag, "des") }}
                  </div>
                </div>
              </li>
            </slot>
            <!-- 上右总 -->
            <slot
              v-if="
                $scopedSlots.top_right_all ||
                  $scopedSlots.top_right_one ||
                  $scopedSlots.top_right_two ||
                  $scopedSlots.top_right_three
              "
              name="top_right_all"
              :item="item"
              :index="$index"
            >
              <li>
                <!-- 上右1 -->
                <p class="top-right-one" v-if="$scopedSlots.top_right_one">
                  <slot name="top_right_one" :item="item" :index="$index">
                    {{ item.className }}
                  </slot>
                </p>
                <p class="top-right-two" v-if="$scopedSlots.top_right_two">
                  <!-- 上右2 -->
                  <slot name="top_right_two" :item="item" :index="$index">
                    <span class="fas fa-user"></span>
                    <span>{{ item.headmasterName }}</span>
                  </slot>
                </p>
                <p class="top-right-three" v-if="$scopedSlots.top_right_three">
                  <!-- 上右3 -->
                  <slot name="top_right_three" :item="item" :index="$index"> </slot>
                </p>
                <!-- 上右3-默认 -->
                <span v-else class="top-price" :class="[item.money == '0' ? 'price_c' : 'price_c_no']">
                  <span v-if="item.money != '0'" class="tag">¥</span>
                  <n22-amount
                    class="bottom_right_all_amount"
                    v-if="isInitNumAnm"
                    :value="item.money"
                    :initNum="10000"
                    zeroText="免费"
                    zeroIsInit
                    :precision="0"
                    :duration="800"
                    transition
                    amountNumSty
                  ></n22-amount>
                  <span class="tag-wz">起</span>
                </span>
              </li>
            </slot>
            <slot v-if="$scopedSlots.bottom_all" name="bottom_all" :item="item" :index="$index">
              <!-- 上下分割线 -->
              <div class="cut_line"></div>
              <!-- 下 -->
              <p class="bottom_data_status">
                <!-- 下左总 -->
                <slot name="bottom_left_all" :item="item" :index="$index">
                  <!-- 未开始 -->
                  <span class="data_state" style="position: relative;">
                    <b>
                      倒计时区域
                    </b>
                  </span>
                  <!-- 全部培训/进行中 -->
                  <span class="data_state data_status_ing">
                    <!-- 已完成课程节数 -->
                    <span>
                      已学习
                      <b>{{ learnStatus(item.learnCount) }}</b
                      >节课
                    </span>
                    <!-- <span v-else>还未开始学习</span> -->
                  </span>
                  <!-- 已经结束 -->
                  <span class="data_state">
                    <span v-if="item.learnCount > 0">
                      出勤
                      <b>{{ learnStatus(item.learnCount) }}</b
                      >节课
                    </span>
                    <span v-else>未出勤</span>
                  </span>
                </slot>
                <!-- 下右总 -->
                <slot name="bottom_right_all" :item="item" :index="$index">
                  <span class="price" :class="[item.money == '0' ? 'price_c' : 'price_c_no']">
                    <span v-if="item.money != '0'" style="font-size: 12px;">¥</span>
                    <!-- <n22-amount
                      class="bottom_right_all_amount"
                      v-if="isInitNumAnm"
                      :value="item.money"
                      :initNum="10000"
                      zeroText="免费"
                      zeroIsInit
                      :precision="1"
                      :duration="800"
                      transition
                      amountNumSty
                    ></n22-amount> -->
                  </span>
                </slot>
              </p>
            </slot>
          </slot>
        </div>
      </ul>
    </div>
    <!-- <n22-list-svg v-else></n22-list-svg> -->
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Amount } from "al-mobile";
// import ListSvg from "./ListSvg";

export default {
  name: "common-list", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    dataList: {
      //props定义样例
      type: Array,
      default: () => {
        return [];
      },
    },
    swiperIndex: {
      //   type: String,
      default: "0",
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [Amount.name]: Amount,
    // [ListSvg.name]: ListSvg
  },
  computed: {
    learnStatus() {
      return function(item) {
        if (item == null) {
          return 0;
        }
        return item;
      };
    },

    timeToTimeStamp() {
      return function(time) {
        return new Date(time).getTime() + "";
      };
    },
    codePassStatus() {
      return function(value, code) {
        const codeStatusList = [
          // {
          //   code: "1",
          //   des: "已参加",
          //   top: "3.458vw",
          //   bgcorlor: "#4091fb"
          // },
          {
            code: "2",
            des: "通过",
            top: "3.458vw",
            bgcorlor: "#12B887",
          },
          {
            code: "3",
            des: "未通过",
            top: "3.458vw",
            bgcorlor: "#ccc",
          },
        ];
        for (let index = 0; index < codeStatusList.length; index++) {
          const el = codeStatusList[index];
          if (value == el.code) {
            return el[code];
          }
        }
      };
    },
    codeLineStatus() {
      return function(value, code) {
        const codeStatusList = [
          {
            code: "0",
            des: "线上",
          },
          {
            code: "1",
            des: "线下",
          },
        ];
        for (let index = 0; index < codeStatusList.length; index++) {
          const el = codeStatusList[index];
          if (value == el.code) {
            return el[code];
          }
        }
      };
    },
  },
  filters: {},
  data() {
    return {
      amountNum: 1000,
      isInitNumAnm: true,
    };
  },
  activated() {
    this.initNumAnm();
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    initNumAnm() {
      this.isInitNumAnm = false;
      setTimeout(() => {
        this.isInitNumAnm = true;
      }, 300);
    },
  },
  mounted() {
    // console.log("%c this.$slots", "color:green;", this.$slots);
    // console.log("%c this.$scopedSlots", "color:green;", this.$scopedSlots);
  },
  watch: {
    swiperIndex(val) {
      console.log("%c idswiperIndex", "color:green;", val);
      this.initNumAnm();
    },
  },
};
</script>

<style lang="scss" scoped>
.cut_line {
  width: 325px;
  clear: both;
  border-bottom: rgb(239, 238, 238) solid 1px;
  margin: auto;
}
.common_list {
  background-color: #efeeee;
  margin-top: 0;
  // padding-top: 8px;
}

.common_list ul {
  overflow: hidden;
  background-color: #fff;
  // width: 351px;
  // border-radius: 5px;
  // margin-left: 12px;
  // margin-bottom: 13px;
  border-top: 1px solid #efeeee;
}

.common_list ul li {
  float: left;
}

.common_list ul li:first-child {
  position: relative;
}

.isline {
  position: absolute;
  right: 12px;
  top: 12px;
  /* margin-top: 10px; */
  overflow: hidden;
  height: 54px;
  width: 73px;
  > .isline_tab {
    height: 5.333vw;
    margin-top: 3px;
    margin-left: 20px;
    background-color: #effb40;
    color: #fff;
    font-size: 3.2vw;
    text-align: center;
    width: 21.333vw;
    border-bottom-right-radius: 0.8vw;
    border-top-right-radius: 0.8vw;
    line-height: 5.333vw;
    transform: rotate(36deg);
    -ms-transform: rotate(36deg);
    -moz-transform: rotate(36deg);
    -webkit-transform: rotate(36deg);
    -o-transform: rotate(36deg);
  }
}

.common_list ul li img {
  display: inline-block;
  width: 127px;
  height: 69px;
  margin: 16px 12px 10px 15px;
  // margin-top: 12px;
  // margin-left: 14px;
  // margin-right: 12px;
  border-radius: 3px;
}

.common_list ul li:nth-child(2) p:first-child {
  width: 210px;
  // font-weight: bold;
  text-align: left;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 19px;
}

.bottom_data_status {
  height: 30px;
  line-height: 30px;
}

.data_state {
  color: #999;
  float: left;
  font-size: 12px;
  width: 50%;
  // height: 30px;
}
// .bottom_right_all_amount {
// }
::v-deep .n22-amount-num {
  color: #fdb92c;
  text-shadow: 1px 1px 1px #fcb220;
}
.bottom_data_status b {
  color: #4091fb;
}

.top-price {
  margin-top: 10px;
  font-size: 18px;
  display: inline-block;
  .tag {
    font-size: 12px;
    margin-right: 1px;
  }
  .tag-wz {
    font-size: 12px;
    color: #999999;
    margin-left: 1px;
  }
}

.price {
  float: right;
  font-size: 12px;
}
.price_c_no {
  color: #fdb92c;
}

.price_c {
  color: #ffab3f;
}

.common_list ul > p b {
  color: #4091fb;
}

.common_list ul > p {
  overflow: hidden;
  clear: both;
  padding-left: 15px;
  padding-right: 14px;
  // padding-top: 15px;
  // margin-top: 0px;
  // margin-bottom: 0;
  // height: 40px;
}

.common_list ul li:nth-child(2) p:not(:first-child) {
  text-align: left;
  margin-bottom: 0;
}

.common_list ul li:nth-child(2) p:nth-child(2) {
  margin-top: 4px;
}

.common_list ul li:nth-child(2) p:nth-child(3) {
  margin-top: 2px;
}

.common_list ul li:nth-child(2) p:not(:first-child) span:first-child {
  color: #cccccc;
  display: inline-block;
  font-size: 12px;
}

.common_list ul li:nth-child(2) p:not(:first-child) span:last-child {
  color: #999999;
  font-size: 12px;
  // margin-left: 6px;
  white-space: nowrap;
}

.train_status {
  position: absolute;
  top: 13px;
  left: 15px;
  height: 21px;
  // background-color: #4091fb;
  color: #fff;
  padding-left: 10px;
  font-size: 12px;
  width: 54px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  line-height: 21px;
}
</style>
