<template>
  <div class="entry-person-detail">
    <al-all-head></al-all-head>
    <al-content
      class="entry-person-detail-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="main-blank"></div>
      <!-- 人员基本信息 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            人员基本信息
          </div>
          <div
            @click="isBasicShow = !isBasicShow"
            class="arrow"
            :style="{ transform: isBasicShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_join_item_down_arrow.png" />
          </div>
        </div>
        <div v-show="isBasicShow">
          <item-line></item-line>
          <div class="content-detail-box">
            <div class="content-detail">
              <div class="title">
                姓名：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.name }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                身份证号：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.idNo }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                性别：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.sex | common_dict_filter("gender") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                出生日期：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.birthday | date_10_filter }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                身份证长期有效：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.longValid | common_dict_filter("yes_or_no") }}
              </div>
            </div>
            <div class="content-detail" v-show="detailInfo.entryUserInfo.longValid == '1'">
              <div class="title">
                身份证有效止期：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.expiry | date_10_filter }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                婚姻状况：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.marry | common_dict_filter("yes_or_no") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                手机：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.mobile }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                民族：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.nation | common_dict_filter("ethnic_groups") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                户口所在地：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.householdRegister | common_dict_filter("registered_permanent_residence") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                是否退休返聘：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.rehire | common_dict_filter("yes_or_no") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                政治面貌：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.political | common_dict_filter("politics_status") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                籍贯：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.nativePlace | common_dict_filter("native_place") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                学历：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.education | common_dict_filter("education") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                毕业院校：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.graduatedSchool }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                专业：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.major }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                职称：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.title | common_dict_filter("position_rank") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                联系地址：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.contactAddressProvince | address_dict_filter("1") }}
                {{ detailInfo.entryUserInfo.contactAddressCity | address_dict_filter("2") }}
                {{ detailInfo.entryUserInfo.detailAddress }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                邮政编码：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.zipCode }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                联系电话：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.contactNumber }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                E-mail：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.email }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                原工作单位：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.oldWork }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                紧急联系人：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.emergencyContact }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                紧急联系人电话：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.emergencyMobile }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                原职业：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.oldOccupation | common_dict_filter("old_occupation") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                备注：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.remarks }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                同业经验年限：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.experienceYears | common_dict_filter("years_of_industry_experience") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                金融类培训经验年限：
              </div>
              <div class="detail">
                {{
                  detailInfo.entryUserInfo.financialExperienceYear
                    | common_dict_filter("years_of_financial_training_experience")
                }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                销售经验年限：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.salesExperienceYears | common_dict_filter("years_of_sales_experience") }}
              </div>
            </div>
            <div class="content-detail">
              <div class="title">
                应聘渠道：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.applicationChannels | common_dict_filter("apply_for_the_channel") }}
              </div>
            </div>
            <div class="content-detail" v-show="detailInfo.entryUserInfo.applicationChannels == '3'">
              <div class="title">
                介绍人：
              </div>
              <div class="detail">
                {{ detailInfo.entryUserInfo.introducer }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 人员入司培训信息 -->
      <div class="box" v-show="detailInfo.entryUserTrains.length > 0">
        <div class="title-content">
          <div class="title">
            人员入司培训信息
          </div>
          <div
            @click="isTrainShow = !isTrainShow"
            class="arrow"
            :style="{ transform: isTrainShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_join_item_down_arrow.png" />
          </div>
        </div>
        <div v-show="isTrainShow">
          <div v-for="(item, index) in detailInfo.entryUserTrains" :key="index">
            <item-line></item-line>
            <div class="content-detail-box">
              <div class="content-detail">
                <div class="title">
                  <div class="serial-num">
                    {{ index + 1 }}
                  </div>
                  <div class="main-blank-one"></div>
                  <div>时间：</div>
                </div>
                <div class="detail">{{ item.startTime | date_10_filter }}至{{ item.endTime | date_10_filter }}</div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>举办单位：</div>
                </div>
                <div class="detail">
                  {{ item.company }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>培训内容：</div>
                </div>
                <div class="detail">
                  {{ item.content }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>获何证书：</div>
                </div>
                <div class="detail">
                  {{ item.certificate }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 人员入司学历信息 -->
      <div class="box" v-show="detailInfo.entryUserEdus.length > 0">
        <div class="title-content">
          <div class="title">
            人员入司学历信息
          </div>
          <div
            @click="isEducationShow = !isEducationShow"
            class="arrow"
            :style="{ transform: isEducationShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_join_item_down_arrow.png" />
          </div>
        </div>
        <div v-show="isEducationShow">
          <div v-for="(item, index) in detailInfo.entryUserEdus" :key="index">
            <item-line></item-line>
            <div class="content-detail-box">
              <div class="content-detail">
                <div class="title">
                  <div class="serial-num">
                    {{ index + 1 }}
                  </div>
                  <div class="main-blank-one"></div>
                  <div>时间：</div>
                </div>
                <div class="detail">{{ item.startTime | date_10_filter }}至{{ item.endTime | date_10_filter }}</div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>毕业院校：</div>
                </div>
                <div class="detail">
                  {{ item.graduateSchool }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>所学专业：</div>
                </div>
                <div class="detail">
                  {{ item.major }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>证明人：</div>
                </div>
                <div class="detail">
                  {{ item.witness }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 人员入司工作经历 -->
      <div class="box" v-show="detailInfo.entryUserWorks.length > 0">
        <div class="title-content">
          <div class="title">
            人员入司工作经历
          </div>
          <div
            @click="isWorksShow = !isWorksShow"
            class="arrow"
            :style="{ transform: isWorksShow ? 'rotate(180deg)' : '' }"
          >
            <img src="../assets/images/icon2_join_item_down_arrow.png" />
          </div>
        </div>
        <div v-show="isWorksShow">
          <div v-for="(item, index) in detailInfo.entryUserWorks" :key="index">
            <item-line></item-line>
            <div class="content-detail-box">
              <div class="content-detail">
                <div class="title">
                  <div class="serial-num">
                    {{ index + 1 }}
                  </div>
                  <div class="main-blank-one"></div>
                  <div>时间：</div>
                </div>
                <div class="detail">{{ item.startTime | date_10_filter }}至{{ item.endTime | date_10_filter }}</div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>工作单位：</div>
                </div>
                <div class="detail">
                  {{ item.workCompany }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>职务：</div>
                </div>
                <div class="detail">
                  {{ item.duties }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>离职原因：</div>
                </div>
                <div class="detail">
                  {{ item.leaveReason }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { AllHead, Content } from "al-mobile";
import ItemLine from "../components/ItemLine";

//接口调用导入
import { queryEntryUserMemeber } from "../service/getData";

//导入字典
import {
  provinces,
  cities,
  ethnic_groups,
  education,
  native_place,
  years_of_industry_experience,
  years_of_financial_training_experience,
  years_of_sales_experience,
  gender,
  is_long_time,
  is_restart,
  politics_status,
  position_rank,
  address,
  registered_permanent_residence,
  apply_for_the_channel,
  old_occupation,
  yes_or_no,
} from "../assets/code/codes.js";

//定义字典常量
const options = {
  provinces: provinces,
  cities: cities,
  ethnic_groups: ethnic_groups,
  education: education,
  native_place: native_place,
  years_of_industry_experience: years_of_industry_experience,
  years_of_financial_training_experience: years_of_financial_training_experience,
  years_of_sales_experience: years_of_sales_experience,
  gender: gender,
  is_long_time: is_long_time,
  is_restart: is_restart,
  politics_status: politics_status,
  position_rank: position_rank,
  address: address,
  registered_permanent_residence: registered_permanent_residence,
  apply_for_the_channel: apply_for_the_channel,
  old_occupation: old_occupation,
  yes_or_no: yes_or_no,
};
export default {
  name: "entry-person-detail",
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [ItemLine.name]: ItemLine,
  },
  computed: {},
  mounted() {
    this.initPageData();
  },
  watch: {},
  data() {
    return {
      isBasicShow: true,
      isTrainShow: false,
      isEducationShow: false,
      isWorksShow: false,
      tabs: [
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
      detailInfo: {
        entryUserInfo: {},
        entryUserEdus: [],
        entryUserTrains: [],
        entryUserWorks: [],
      },
    };
  },
  filters: {
    //name 标识字典名称
    common_dict_filter: (value, name) => {
      if (options[name] == undefined) {
        return "未找到对应字典";
      }
      for (let item of options[name]) {
        if (item.value == value) {
          return item.text;
        }
      }
      return "";
    },
    //name 标识1取省 标识2取市
    address_dict_filter: (value, name) => {
      //查询省级
      if (name == "1") {
        for (let item of options.address.options) {
          if (item.value == value) {
            return item.label;
          }
        }
      }
      //查询市级
      if (name == "2") {
        for (let item of options.address.options) {
          for (let childItem of item.children.options) {
            if (childItem.value == value) {
              return childItem.label;
            }
          }
        }
      }
      return "未知";
    },
    //过滤日期取前10位
    date_10_filter: value => {
      return value != undefined ? value.substring(0, 10) : "";
    },
  },
  methods: {
    //初始化页面数据
    initPageData() {
      this.requestQueryEntryUserMemeber(
        this.$route.query["uid"],
        body => {
          console.log(body);
          this.detailInfo = body.data;
        },
        error => {
          console.log(error);
        },
      );
    },
    //获取当前页面所有数据
    requestQueryEntryUserMemeber(uid, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      queryEntryUserMemeber({ id: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-person-detail {
  .entry-person-detail-content {
    .box {
      background: #fff;
      width: 90%;
      margin: 0 auto;
      border-radius: 10px;
      .title-content {
        display: flex;
        justify-content: space-between;
        padding-left: 13px;
        padding-right: 13px;
        .title {
          height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(253, 185, 44, 1);
          margin-top: 16px;
          margin-bottom: 16px;
        }
        .arrow {
          margin-top: 16px;
          margin-bottom: 16px;
          img {
            width: 15px;
            height: 7px;
          }
        }
      }
      .content-detail-box {
        padding-bottom: 9px;
        .content-detail {
          display: flex;
          justify-content: space-between;
          padding-left: 13px;
          padding-right: 13px;
          margin-top: 9px;
          .title {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            display: flex;
            .serial-num {
              width: 18px;
              height: 18px;
              background: rgba(253, 185, 44, 1);
              border-radius: 25px;
              text-align: center;
              color: white;
            }
            .main-blank-one {
              width: 10px;
            }
            .main-blank {
              width: 28px;
            }
          }
          .detail {
            font-size: 3.2vw;
            font-weight: 400;
            color: #969696;
            line-height: 17px;
            max-width: 70%;
            text-align: right;
            overflow: hidden;
          }
        }
      }
    }
    .main-blank {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
