<template>
  <div class="customer-search" v-show="isShowSeach">
    <!-- 头部导航 -->
    <al-all-head :title="title">
      <template slot="left">
        <span @click="cancel">
          <n22-icon name="back" size="lg"></n22-icon>
        </span>
      </template>
      <div slot="head_bottom">
        <item-line></item-line>
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          :has-ink="true"
          @change="changeTab"
        ></n22-tab-bar>
        <div class="seach-input-conent">
          <div class="input flex " style="position: relative;" @click="$_getSearch">
            <span class="span">请输入姓名/手机号/证件号码</span>
            <div style="position: absolute;right:0;width: 15%;" class="flex flexs">
              <!--            <div style="position: absolute;right:0;width: 15%;top:22px;" class="flex flexs">-->
              <div class="imgs">
                <img src="../assets/images/images/serach.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </al-all-head>
    <al-content-list
      class="customer-search-content"
      v-model="curIndex"
      ref="listSwiper"
      :needSwiper="true"
      :tabs="tabs"
      :swiperTop="swiperTop"
      :isMescrollDown="false"
      :isToTop="true"
      isMescrollLoadList
      :isAutoMescrollDown="false"
      :page="page"
      @loadMoreData="loadMoreData"
      htmlNodata="<p class='upwarp-nodata'>到底了，无更多数据</p>"
    >
      <div>
        <div
          style="width: 100%;"
          class="userInfo"
          v-for="(itm, index) in tabs[curIndex].list"
          :key="index"
          @click="selectedItem(itm)"
        >
          <!--          v-for="(itm, index) in customerInfo.customerInfoList"-->
          <ul class="user_info" v-if="customerType == '1'">
            <li style="width: 15%;margin-right:2%;">
              <img class="avator_img" style="border-radius:50%" v-if="itm.fileurl != undefined" :src="itm.fileurl" />
              <img
                class="avator_img"
                v-if="itm.fileurl == undefined && itm.sex == 1"
                src="../assets/images/images/touxiang_nan.png"
              />
              <img
                class="avator_img"
                v-if="itm.fileurl == undefined && itm.sex == 2"
                src="../assets/images/images/touxiang_nv.png"
              />
              <img
                class="avator_img"
                v-if="itm.fileurl == undefined && (itm.sex == undefined || itm.sex == '')"
                src="../assets/images/images/sex.png"
              />
            </li>
            <li style="width: 15%;text-align: left;">
              <span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);">{{ itm.name }}</span>
              <span style="font-size:14px;font-weight:400;color:rgb(127, 127, 127);">{{ itm.idType | Notype }}</span>
            </li>
            <li style="width:60%;margin-left:10%;">
              <span>{{ itm.birthDay | ageFilter }}岁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ itm.mobile }}</span>
              <span>{{ itm.idNo }}</span>
            </li>
          </ul>
          <ul class="user_info" v-if="customerType == '2'">
            <li style="width: 15%;">
              <img class="avator_img" v-if="itm.sex == 1" src="../assets/images/images/touxiang_nan.png" />
              <img class="avator_img" v-if="itm.sex == 2" src="../assets/images/images/touxiang_nv.png" />
            </li>
            <li style="width: 15%;">
              <span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);">{{ itm.name }}</span>
              <span style="font-size:14px;font-weight:400;color:rgb(127, 127, 127);">{{ itm.idType | Notype }}</span>
            </li>
            <li style="width:60%;margin-left:10%;">
              <span>{{ itm.birthDay | ageFilter }}岁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ itm.mobile }}</span>
              <span>{{ itm.idNo }}</span>
            </li>
          </ul>
        </div>
      </div>
    </al-content-list>
    <SeachCustomer :isShow="isShowInput" @closeFun="closeSideSeach" @seachFun="seachSideSeach"></SeachCustomer>
  </div>
</template>
<script>
import {
  AllHead,
  Icon,
  Button,
  DropSelectItem,
  InputItem,
  Popup,
  ContentList,
  TabBar,
  Content,
  Toast,
} from "al-mobile";
import ItemLine from "./ItemLine";
import SeachCustomer from "./SeachCustomer";
import icon2_join_nodata from "../assets/images/icon2_join_search.png";
import { customerList, customerDetail } from "../service/customerData";

export default {
  name: "CustomerSearch",
  props: {
    value: {
      //props定义样例
      type: Object,
      default() {
        return {};
      },
    },
  },

  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Icon.name]: Icon,
    [ContentList.name]: ContentList,
    [Button.name]: Button,
    [TabBar.name]: TabBar,
    [InputItem.name]: InputItem,
    [Popup.name]: Popup,
    [DropSelectItem.name]: DropSelectItem,
    [ItemLine.name]: ItemLine,
    [SeachCustomer.name]: SeachCustomer,
  },
  computed: {},
  data() {
    return {
      isShowSeach: this.value.isopen,
      searchParameter: {
        customerName: "",
        phoneNumber: "",
        idNo: "",
      },
      title: "客户查询",
      swiperTop: 104,
      curIndex: 0,
      tabs: [
        //content组件对象
        {
          label: "本地客户",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "loadMoreData",
          emptyProp: {
            icon: icon2_join_nodata, //数据为空时的图片
            tip: "未查询到相关人员", // 提示
          },
        },
        {
          label: "核心客户",
          name: 1,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "loadMoreData",
          emptyProp: {
            icon: icon2_join_nodata, //数据为空时的图片
            tip: "未查询到相关人员", // 提示
          },
        },
      ],
      aa: true,
      customerType: "1",
      search_tag: "",
      hideHxKh: true,
      customerInfo: {
        customerInfoList: [],
      },
      page: {
        size: 10,
        time: null,
        pageNo: 0, //起始页面
        pageSize: 10, //每页显示条数
      },
      currentCusListLength: 0, //最新查到客户条数
      isShowInput: false,
      agentCode: "",
    };
  },
  activated() {},
  methods: {
    //查询框关闭
    closeSideSeach(item) {
      this.isShowInput = !this.isShowInput;
      this.searchParameter = item;
      this.tabs[this.curIndex].mescroll.resetUpScroll(false);
      // this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(this.curIndex);
    },
    cancel(event) {
      // this.searchParameter = {
      //   customerName: "",
      //   phoneNumber: "",
      //   idNo: "",
      // };
      this.$emit("closeSeachCuster");
      event.stopPropagation();
    },
    $_getSearch() {
      console.log("%c $_getSearch", "color:green;", "");
      this.searchParameter = {
        customerName: "",
        phoneNumber: "",
        idNo: "",
      };
      this.isShowInput = !this.isShowInput;
    },
    loadMoreData(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      console.log("上拉加载");
      console.log(item);
      console.log(tabIndex, pageNum, pageSize);
      // if (this.currentCusListLength == this.page.pageLength) {
      this.search(
        pageNum,
        pageSize,
        body => {
          console.log(body);
          successCallback && successCallback(body);
        },
        error => {
          Toast.info(error.message);
          errorCallback && errorCallback(error);
        },
      );
    },
    changeTab(item, i, curIndex) {
      console.log("%c curIndex", "color:#00CD00", curIndex);
      this.searchParameter = {
        customerName: "",
        phoneNumber: "",
        idNo: "",
      };
      if (i == "1") {
        this.customerType = "2";
        this.title = "核心客户查询";
      } else {
        this.customerType = "1";
        this.title = "本地客户查询";
      }
      console.log("%c curIndex", "color:#00CD00", i, item);
      this.$refs.listSwiper.$children[0].changeTab && this.$refs.listSwiper.$children[0].changeTab(i);
      this.tabs[i].mescroll.triggerDownScroll();
    },
    seachSideSeach(seach) {
      this.isShowInput = !this.isShowInput;
      this.searchParameter = seach;
      this.tabs[this.curIndex].mescroll.resetUpScroll(false);
    },
    search(page = 0, pageSize = 10, successCallback, errorCallback) {
      console.log(this.customerType);
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        agentCode: this.agentCode,
        type: this.customerType, //姓名
        pageNumber: page, //性别
        pageSize: pageSize, //身份证号
        name: this.searchParameter.customerName,
        mobile: this.searchParameter.phoneNumber,
        idNo: this.searchParameter.idNo,
      };
      //发起请求
      customerList({ data: request, config: axiosParams, method: "post" }).then(
        data => {
          console.log(data.data);
          successCallback && successCallback(data.data);
        },
        error => {
          Toast.info(error.message);
          errorCallback && errorCallback(error);
        },
      );
      // if (this.customerType == "1") {
      //   Toast.loading();
      //   let requ = {
      //     data: {
      //       agentCode: this.agentCode,
      //       certificateNo: this.searchParameter.idNo,
      //       name: this.searchParameter.customerName,
      //       pageNo: page,
      //       phone: this.searchParameter.phoneNumber,
      //       relationship: this.value.relationship,
      //       sex: this.value.sex,
      //       infoId: this.value.infoId,
      //     },
      //     methodName: "InsuranceProcessCustomerInquiry",
      //     modelName: "customerManagementListQueryService",
      //   };
      //   // console.log(JSON.stringify(requ));
      //   utils.http.postFast(
      //     "BusinessService",
      //     requ,
      //     body => {
      //       Toast.hide();
      //       if (body.data.customerQueryList != "") {
      //         successCallback && successCallback(body.data.customerQueryList);
      //         console.log(this.customerInfo);
      //       }
      //     },
      //     error => {
      //       errorBack && errorBack(error);
      //     },
      //   );
      // } else {
      //   let requ = {
      //     cus: {
      //       agentCode: this.agentCode,
      //       clientName: this.searchParameter.customerName,
      //       phoneNumber: this.searchParameter.phoneNumber,
      //       clientType: "",
      //       endIndex: "2147483648",
      //       startIndex: "1",
      //       customerType: this.customerType, //1本地 2核心
      //       certificateNo: this.searchParameter.idNo,
      //       pageNo: page,
      //     },
      //   };
      //   utils.http.postFast(
      //     "MOHQCUSTOMER",
      //     requ,
      //     body => {
      //       Toast.hide();
      //       if (body.customerInfo.resultCode == 0) {
      //         console.log(this.customerInfo);
      //         successCallback && successCallback(body.customerInfo.customerInfoList);
      //       } else {
      //         Toast(body.customerInfo.resultMessage);
      //       }
      //     },
      //     error => {
      //       errorBack && errorBack(error);
      //     },
      //   );
      // }
    },
    selectedItem(item) {
      if (this.customerType == "1") {
        this.customerType = "1";
        this.title = "本地客户查询";
        this.value.cusItem = item;
        this.value.infoId = item.infoId;
        console.log("选中本地客户===>", this.value);
        this.$emit("changeCustomerValue", this.value);
      } else if (this.customerType == "2") {
        const axiosParams = {
          isLoadding: true,
          loaddingText: "努力请求中...",
        };
        //构建请求参数
        let request = {
          agentCode: this.agentCode,
          infoId: item.infoId,
        };
        //发起请求
        customerDetail({ data: request, config: axiosParams, method: "post" }).then(
          data => {
            console.log(data);
            this.value.cusItem = data.data;
            this.value.infoId = item.infoId;
            this.$emit("changeCustomerValue", this.value);
            console.log("选中核心客户===>", this.value);
          },
          error => {
            Toast.info(error.message);
          },
        );
      }
    },
  },
  mounted() {},
  watch: {
    value: {
      handler(val) {
        this.isShowSeach = val.isopen;
        this.agentCode = val.agentCode;
        if (val.isopen) {
          if (val.productCode == "QJF2019" || val.productCode == "AAT046") {
            this.hideHxKh = false;
          }
          this.customerType = "1";
          this.title = "本地客户查询";
          this.curIndex = 0;
          this.search_tag = this.$route.params.tags;
          this.searchParameter.customerName = "";
          this.searchParameter.phoneNumber = "";
          this.searchParameter.idNo = "";
          this.tabs[this.curIndex].mescroll.triggerDownScroll();
        }
      },
      deep: true,
    },
  },
  filters: {
    Notype(value, type) {
      let Notype;
      if (type == "3") {
        if (value == 11) {
          Notype = "身份证";
        } else if (value == 12) {
          Notype = "户口本";
        } else if (value == 17) {
          Notype = "中国护照";
        } else if (value == 24) {
          Notype = "外国护照";
        } else if (value == 23) {
          Notype = "台胞证";
        } else if (value == 26) {
          Notype = "港澳通行证";
        } else if (value == 20) {
          Notype = "出生证";
        } else if (value == 29) {
          Notype = "外国人永久居留身份证";
        } else if (value == 30) {
          Notype = "港澳台居住证";
        }
      } else {
        if (value == 11) {
          Notype = "身份证";
        } else if (value == 12) {
          Notype = "户口本";
        } else if (value == 17) {
          Notype = "中国护照";
        } else if (value == 24) {
          Notype = "外国护照";
        } else if (value == 23) {
          Notype = "台胞证";
        } else if (value == 26) {
          Notype = "港澳通行证";
        } else if (value == 20) {
          Notype = "出生证";
        } else if (value == 27) {
          Notype = "外国人永久居留身份证";
        } else if (value == 29) {
          Notype = "港澳居住证";
        } else if (value == 30) {
          Notype = "台居住证";
        }
      }
      return Notype;
    },
    ageFilter(value) {
      const birthday = new Date(value);
      const now = new Date();
      let age = now.getFullYear() - birthday.getFullYear() - 1;
      if (now.getMonth() - birthday.getMonth() > 0) {
        age++;
      } else if (now.getMonth() == birthday.getMonth() > 0 && now.getDate() - birthday.getDate() >= 0) {
        age++;
      }
      return age;
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-search {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  background: #ffffff;
  z-index: $popup-zindex; //使用n22-popup的默认
  ::v-deep .n22-nav-bar {
    background-color: #ffffff !important;
    z-index: 3000;
  }
  ::v-deep .n22-tab-bar {
    background-color: #ffffff !important;
  }

  .seach-input-conent {
    background: #f8f8f8;
    width: 100%;
    margin: auto;
    position: relative;

    .img {
      height: 18px;
      width: 18px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .imgs {
      width: 18px;
      height: 18px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .input {
      text-align: center;
      padding: 10px 0;
      display: flex;

      input {
        width: 100%;
        padding-left: 5%;
        background: white !important;
        line-height: 33px;
        height: 33px;
        border-radius: 33px;
        margin-left: 3%;
      }

      .span {
        flex: 1;
        padding-left: 12%;
        line-height: 33px;
        height: 33px;
        border-radius: 33px;
        margin: 0 3%;
        text-align: left;
        background-color: white !important;
        font-size: 16px;
        font-weight: 400;
        color: #cccccc;
      }
    }
  }
  .customer-search-content {
    background: #fff;
    ::v-deep .mescroll {
      background: #fff;
      .seach-input-conent {
        background: #f8f8f8;
        width: 100%;
        margin: auto;
        position: relative;

        .img {
          height: 18px;
          width: 18px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .imgs {
          width: 18px;
          height: 18px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .input {
          text-align: center;
          padding: 15px 0;
          display: flex;

          input {
            width: 100%;
            padding-left: 5%;
            background: white !important;
            line-height: 33px;
            height: 33px;
            border-radius: 33px;
            margin-left: 3%;
          }

          .span {
            flex: 1;
            padding-left: 12%;
            line-height: 33px;
            height: 33px;
            border-radius: 33px;
            margin: 0 3%;
            text-align: left;
            background-color: white !important;
            font-size: 16px;
            font-weight: 400;
            color: #cccccc;
          }
        }
      }
      .empty-icon {
        width: 68px;
        height: 72px;
        margin-top: 100px;
        margin-bottom: 39px;
      }
      .userInput_box + input {
        width: 65%;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 5px 0 5px 4%;
        line-height: 36px;
        padding-left: 10px;
        background: #fff;
      }
      .userInfo {
        width: 100%;
        height: 65px;
        border-bottom: 1px solid #efefef;
        text-align: center;
        line-height: 65px;
      }
      .user_info {
        display: flex;
        margin-left: 15px;
        height: 65px;
        box-sizing: border-box;
        justify-content: space-between;
      }
      .avator_img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
      li {
        color: #746e69;
        font-size: 14px;
      }
      .user_info > li:nth-child(2) {
        color: #746e69;
        font-size: 12px;
        font-weight: bold;
        height: 65px;
        span {
          display: block;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .user_info > li:nth-child(3) {
        font-size: 12px;
        font-weight: bold;
        height: 65px;
        text-align: left;

        span {
          color: rgb(127, 127, 127);
          display: block;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      input::-webkit-input-placeholder {
        font-size: 16px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
      }
    }
  }
}
</style>
