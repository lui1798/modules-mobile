<template>
  <!-- 咨询列表数据模板 -->
  <div class="gong_ge">
    <slot name="title">
      <p v-if="title" class="common">
        <span class="span_first">{{ title }}</span>
        <span @click="$_titleButton" :class="titleButtonClass">
          {{ titleButton }}
        </span>
      </p>
    </slot>
    <div class="notice_list" v-if="dataLists && dataLists.length > 0">
      <ul @click="goDetail(item)" v-for="(item, i) in dataLists" :key="i">
        <li>
          <p class="content_title">{{ item.content }}.</p>
          <p class="interaction_p">
            <span
              class="interaction_span"
              v-for="(it, ia) in interactionList"
              :key="ia"
            >
              <span class="svg_span">
                <!-- <n22-icon :name="it.myselect"></n22-icon> -->
              </span>
              <span class="num_span">{{ it.num }}</span>
            </span>
          </p>
        </li>
        <li>
          <img v-lazy="item.imgUrl" />
        </li>
      </ul>
    </div>
    <!-- <ul v-else>
      <n22-pullLoading v-model="show"></n22-pullLoading>
      <li class="list_back_li" v-for="item in 3" :key="item.id">
				<div class="list_back_svg">
					<svg-icon icon-class="shopback"></svg-icon>
				</div>
			</li>
    </ul>-->
    <n22-list-svg
      typeSvg="noticeListSvg"
      v-for="item in 3"
      :key="item.id"
      v-else
    ></n22-list-svg>
  </div>
</template>

<script>
// import pullLoading from "@/components/common/pullLoading";
import ListSvg from "@/components/common/ListSvg";
// import { Icon } from "al-mobile";

export default {
  name: "notice-list", //使用xx-xx-xx命名方式具体看操作文档
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
    size: {
      type: Number,
      default: 3
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    // [pullLoading.name]: pullLoading, //loading
    [ListSvg.name]: ListSvg //ListSvg
    // [Icon.name]: Icon //ListSvg
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
      num: 1,
      dataLists: [],
      interactionList: [
        {
          num: "2000",
          myselect: "mess_no"
        },
        {
          num: "1000",
          myselect: "like_yes"
        },
        {
          num: "400",
          myselect: "notlike_no"
        }
      ]
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    goDetail(item) {
      this.$router.push("/noticeDetail?outLink=" + item.outLink);
    },
    $_titleButton(code) {
      console.log("%c _titleButton", "color:green;", this.num + code);
      // if(this.titleButton!="更多")this.dataList = []
      this.dataLists = window.utils.utilsPlugin.getPageData(
        1,
        this.size,
        this.dataList
      );
      // this.$emit(
      //   "selectListByPage",
      //   this.num,
      //   this.size,
      //   curPageData => {
      //     if(curPageData.length>0){
      //       if (this.num === 1) this.dataList = []; // 如果是第一页需手动制空列表
      //       this.dataList = this.dataList.concat(curPageData); // 追加新数据
      //       this.dataList = curPageData; // 换一换新数据
      //       this.num++;
      //     }else{
      //       this.num = 1
      //       this.$_titleButton()
      //     }
      //   },
      //   () => {
      //   }
      // )
    }
  },
  mounted() {
    console.log("%c this.dataList", "color:green;", this.dataList);
    this.$_titleButton(1);
  },
  watch: {
    dataList() {
      this.$_titleButton(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.interaction_p .interaction_span:not(:first-child) {
  margin-left: 19px;
}
.interaction_p .num_span {
  margin-left: 6px;
}
.num_span {
  font-size: 10px;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.svg_span svg {
  height: 12px;
  width: 12px;
}

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
}
.change {
  font-size: 12px;
  color: #4091fb;
  text-align: right;
  float: right;
}

.list_back_li {
  height: 87.3px;
  .list_back_svg {
    @include wh(100%, 100%);
  }
}

.notice_list {
  // background-color: #efeeee;
  margin-top: 0;
  // background-color: #efeeee;
  // padding-top: 13px;
}

.notice_list ul {
  overflow: hidden;
  background-color: #fff;
  width: 355px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  // margin-bottom: 13px;
  // padding-bottom: 10px;
}

.notice_list ul li {
  float: left;
}

.notice_list ul li:first-child {
  position: relative;
  font-size: 14px;
}

.notice_list ul li img {
  display: inline-block;
  width: 115px;
  height: 70px;
  margin-top: 12px;
  margin-left: 27px;
  border-radius: 3px;
}

.notice_list ul li:nth-child(1) p:first-child {
  width: 210px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 23px;
}

.notice_list ul > p span:first-child {
  float: left;
  font-size: 12px;
}

.price_c_no {
  float: right;
  font-size: 14px;
  color: #4091fb;
}

.price_c {
  float: right;
  font-size: 14px;
  color: #ffab3f;
}

.notice_list ul > p b {
  color: #4091fb;
}

.notice_list ul > p {
  overflow: hidden;
  clear: both;
  padding-left: 15px;
  padding-top: 24px;
  padding-right: 14px;
}

.notice_list ul li:nth-child(2) p:not(:first-child) {
  text-align: left;
  margin-bottom: 0;
}

.notice_list ul li:nth-child(2) p:nth-child(2) {
  margin-top: 4px;
}

.notice_list ul li:nth-child(2) p:nth-child(3) {
  margin-top: 2px;
}

.notice_list ul li:nth-child(2) p:not(:first-child) span:first-child {
  color: #ccc;
  display: inline-block;
  font-size: 12px;
}

.notice_list ul li:nth-child(2) p:not(:first-child) span:last-child {
  color: #999;
  font-size: 12px;
  margin-left: 6px;
}
</style>
