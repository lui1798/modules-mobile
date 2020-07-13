<template>
  <div class="entry-detail-infor-entry">
    <al-all-head></al-all-head>
    <al-content
      class="entry-detail-infor-entry-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="main-blank"></div>
      <!-- 人员入司前培训信息 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            人员入司前培训信息
          </div>
          <div @click="gotoNewItem(1)" class="add">
            <img src="../assets/images/icon2_join_add.png" />
          </div>
        </div>
        <div v-if="detailInfo.training == undefined || detailInfo.training.length == 0">
          <item-line></item-line>
          <div class="content-detail-box">
            <div class="nodata-box">
              （从首次参加培训开始填写）
            </div>
          </div>
        </div>
        <div v-else-if="detailInfo.training != undefined && detailInfo.training.length > 0">
          <div v-for="(item, index) in detailInfo.training" :key="index">
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
                <div class="detail-date">{{ item.startDate }}/{{ item.endDate }}</div>
                <div class="content-detail-option">
                  <div><img @click="gotoEditItem(1, item)" src="../assets/images/icon2_join_edit.png" /></div>
                  <div>
                    <img @click="openDelBox('training', item)" src="../assets/images/icon2_join_del.png" />
                  </div>
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>举办单位：</div>
                </div>
                <div class="detail">
                  {{ item.hostUnits }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>培训内容：</div>
                </div>
                <div class="detail">
                  {{ item.training }}
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
      <!-- 人员入司前学历信息 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            人员入司前学历信息
          </div>
          <div @click="gotoNewItem(2)" class="add">
            <img src="../assets/images/icon2_join_add.png" />
          </div>
        </div>
        <div v-if="detailInfo.educationBackground == undefined || detailInfo.educationBackground.length == 0">
          <item-line></item-line>
          <div class="content-detail-box">
            <div class="nodata-box">
              （从第一学历开始填写）
            </div>
          </div>
        </div>
        <div v-else-if="detailInfo.educationBackground != undefined && detailInfo.educationBackground.length > 0">
          <div v-for="(item, index) in detailInfo.educationBackground" :key="index">
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
                <div class="detail-date">{{ item.startDate }}/{{ item.endDate }}</div>
                <div class="content-detail-option">
                  <div>
                    <img @click="gotoEditItem(2, item)" src="../assets/images/icon2_join_edit.png" />
                  </div>
                  <div>
                    <img @click="openDelBox('educationBackground', item)" src="../assets/images/icon2_join_del.png" />
                  </div>
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>毕业院校：</div>
                </div>
                <div class="detail">
                  {{ item.schoolOfGraduation }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>所学专业：</div>
                </div>
                <div class="detail">
                  {{ item.profession }}
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
      <!-- 是否应届毕业生 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            是否应届毕业生
          </div>
          <div class="add">
            <!-- <n22-switch v-model="detailInfo.isFreshGraduates"></n22-switch> -->
            <n22-switch v-model="detailInfo.isFreshGraduates" :options="options.switchOptions"></n22-switch>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 人员入司前工作经历 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            人员入司前工作经历
          </div>
          <div @click="gotoNewItem(3)" class="add">
            <img src="../assets/images/icon2_join_add.png" />
          </div>
        </div>
        <div v-if="detailInfo.workExperience == undefined || detailInfo.workExperience.length == 0">
          <item-line></item-line>
          <div class="content-detail-box">
            <div class="nodata-box">
              （从首次参加工作开始填写）
            </div>
          </div>
        </div>
        <div v-else-if="detailInfo.workExperience != undefined && detailInfo.workExperience.length > 0">
          <div v-for="(item, index) in detailInfo.workExperience" :key="index">
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
                <div class="detail-date">{{ item.startDate }}/{{ item.endDate }}</div>
                <div class="content-detail-option">
                  <div>
                    <img @click="gotoEditItem(3, item)" src="../assets/images/icon2_join_edit.png" />
                  </div>
                  <div>
                    <img @click="openDelBox('workExperience', item)" src="../assets/images/icon2_join_del.png" />
                  </div>
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>工作单位：</div>
                </div>
                <div class="detail">
                  {{ item.company }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>职务：</div>
                </div>
                <div class="detail">
                  {{ item.position }}
                </div>
              </div>
              <div class="content-detail">
                <div class="title">
                  <div class="main-blank"></div>
                  <div>离职原因：</div>
                </div>
                <div class="detail">
                  {{ item.why }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <div class="button">
        <n22-button @click="back()" type="primary">上一步</n22-button>
        <div class="cross-blank"></div>
        <n22-button @click="next" type="primary">下一步</n22-button>
      </div>
    </al-content>
    <del-box :value="isShowDelBox" :models="delBoxModels" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { AllHead, Content, Button, Switch, Dialog } from "al-mobile";
import ItemLine from "../components/ItemLine";
import DelBox from "../components/DelBox";

//导入当前页面所使用的到的接口
import {
  queryEntryUserAdditional,
  updateIsFreshGraduates,
  delEntryUserEducation,
  delEntryUserTrain,
  deleteEntryUserWork,
} from "../service/getData";

export default {
  name: "join-company-detail-infor-entry", //使用xx-xx-xx命名方式具体看操作文档
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [ItemLine.name]: ItemLine,
    [DelBox.name]: DelBox,
    [Switch.name]: Switch,
    [Dialog.name]: Dialog,
  },
  computed: {
    ...mapState(["entry"]),
  },
  mounted() {
    console.log("%c detail-infor-entry>生命周期>mounted", "color:green;", "");
    this.initPageData();
  },
  activated() {
    this.initPageData();
  },
  watch: {},
  data() {
    return {
      uid: "",
      options: {
        switchOptions: [
          {
            text: "是",
            value: "0",
          },
          {
            text: "否",
            value: "1",
          },
        ],
      },
      selectDelInfo: {
        type: "",
        obj: {},
      },
      detailInfo: {
        training: [],
        educationBackground: [],
        isFreshGraduates: false,
        workExperience: [],
      },
      isShowDelBox: false,
      delBoxModels: [
        {
          desc: "取消",
          type: "cancel",
          onClick: this.delBoxClick,
        },
        {
          desc: "确定",
          type: "confirm",
          onClick: this.delBoxClick,
        },
      ],
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
    ...mapActions(["getDetailInfo"]), //vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "DETAILINFOSTATE",
    ]),
    gotoItemPage(index, item) {
      if (index == 1) {
        if (item == undefined) {
          this.go("entry/TrainingInformation?uid=" + this.uid);
        } else {
          this.go("entry/TrainingInformation?uid=" + this.uid + "&item=" + JSON.stringify(item));
        }
      } else if (index == 2) {
        if (item == undefined) {
          this.go("entry/EducationBackground?uid=" + this.uid);
        } else {
          this.go("entry/EducationBackground?uid=" + this.uid + "&item=" + JSON.stringify(item));
        }
      } else if (index == 3) {
        if (item == undefined) {
          this.go("entry/WorkExperience?uid=" + this.uid);
        } else {
          this.go("entry/WorkExperience?uid=" + this.uid + "&item=" + JSON.stringify(item));
        }
      }
    },
    gotoNewItem(index) {
      this.gotoItemPage(index);
    },
    //跳转到编辑页面
    gotoEditItem(index, item) {
      this.gotoItemPage(index, item);
    },
    //打开删除组件
    openDelBox(type, item) {
      this.isShowDelBox = !this.isShowDelBox;
      this.selectDelInfo.type = type;
      this.selectDelInfo.obj = item;
      console.log("当前准备要删除的对象", this.selectDelInfo);
    },
    //执行删除事件
    delBoxClick(event, action) {
      this.isShowDelBox = !this.isShowDelBox;
      this.isShowVerifyCode = !this.isShowVerifyCode;
      if (action.type == "confirm") {
        console.log(this.selectDelInfo.type);
        if (this.selectDelInfo.type == "training") {
          this.requestDelEntryUserTrain(
            this.selectDelInfo.obj.id,
            body => {
              console.log(body);
              this.initPageData();
            },
            error => {
              console.log(error);
            },
          );
        } else if (this.selectDelInfo.type == "educationBackground") {
          this.requestDelEntryUserEducation(
            this.selectDelInfo.obj.id,
            body => {
              console.log(body);
              this.initPageData();
            },
            error => {
              console.log(error);
            },
          );
        } else if (this.selectDelInfo.type == "workExperience") {
          this.requestDeleteEntryUserWork(
            this.selectDelInfo.obj.id,
            body => {
              console.log(body);
              this.initPageData();
            },
            error => {
              console.log(error);
            },
          );
        }
      }
    },
    //跳转下一页面
    next() {
      console.log(this.detailInfo);
      let result = this.checkData(this.detailInfo);
      if (result) {
        this.requestUpdateIsFreshGraduates(
          this.uid,
          this.detailInfo.isFreshGraduates ? "0" : "1",
          body => {
            console.log(body);
            this.go("entry/ImageUpload?uid=" + this.uid);
          },
          error => {
            console.log(error);
          },
        );
      }
    },
    alert(message) {
      Dialog.alert({
        title: "温馨提示",
        content: message,
        cancelText: "取消",
        confirmText: "确定",
        onConfirm: () => console.log("[Dialog.alert] confirm clicked"),
      });
    },
    /*
      校验录入数据
    */
    checkData(data) {
      if (data == undefined) {
        return false;
      }
      /* 学历必填 */
      if (data.educationBackground.length == 0) {
        this.alert("请填写学历信息");
        return false;
      }
      /* 非应届学历必填 */
      if (!data.isFreshGraduates) {
        if (data.workExperience.length == 0) {
          this.alert("请填写工作经历");
          return false;
        }
      }
      return true;
    },
    //初始化页面数据
    initPageData() {
      //获取UID
      this.uid = this.$route.query["uid"];
      if (this.uid != undefined && this.uid !== "") {
        this.requestQueryEntryUserAdditional(
          this.uid,
          body => {
            console.log(body.data);
            this.$nextTick(() => {
              console.log(body.data);
              //更新培训经历节点
              this.detailInfo.training = [];
              body.data.entryUserTrains.forEach(item => {
                this.detailInfo.training.push({
                  id: item.id,
                  startDate: item.startTime != undefined ? item.startTime.substring(0, 10) : "",
                  endDate: item.endTime != undefined ? item.endTime.substring(0, 10) : "",
                  hostUnits: item.company,
                  training: item.content,
                  certificate: item.certificate,
                });
              });
              //更新教育学历节点
              this.detailInfo.educationBackground = [];
              body.data.entryUserEducations.forEach(item => {
                this.detailInfo.educationBackground.push({
                  id: item.id,
                  startDate: item.startTime != undefined ? item.startTime.substring(0, 10) : "",
                  endDate: item.endTime != undefined ? item.endTime.substring(0, 10) : "",
                  schoolOfGraduation: item.graduateSchool,
                  profession: item.major,
                  witness: item.witness,
                });
              });
              //更新工作经历节点
              this.detailInfo.workExperience = [];
              body.data.entryUserWorks.forEach(item => {
                this.detailInfo.workExperience.push({
                  id: item.id,
                  startDate: item.startTime != undefined ? item.startTime.substring(0, 10) : "",
                  endDate: item.endTime != undefined ? item.endTime.substring(0, 10) : "",
                  company: item.workCompany,
                  position: item.duties,
                  why: item.leaveReason,
                });
              });
              //更新应届毕业生节点
              let freshGraduates = body.data.entryUserInfoGraduatesDTO.freshGraduates;
              if (freshGraduates != undefined) {
                this.detailInfo.isFreshGraduates = freshGraduates == "0";
              } else {
                this.detailInfo.isFreshGraduates = false;
              }
            });
          },
          error => {
            console.log(error);
          },
        );
      }
    },
    //查询信息接口
    requestQueryEntryUserAdditional(uid, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: false,
        loaddingText: "努力请求中...",
      };
      //发起请求
      queryEntryUserAdditional({ id: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //更新信息接口
    requestUpdateIsFreshGraduates(id, freshGraduates, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        id: id,
        freshGraduates: freshGraduates,
      };
      //发起请求
      updateIsFreshGraduates({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //删除学历信息接口
    requestDelEntryUserEducation(id, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      delEntryUserEducation({ data: id, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //删除培训经历信息接口
    requestDelEntryUserTrain(id, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      delEntryUserTrain({ data: id, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //删除工作经历信息接口
    requestDeleteEntryUserWork(id, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      deleteEntryUserWork({ data: id, config: axiosParams }).then(
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
.entry-detail-infor-entry {
  .entry-detail-infor-entry-content {
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
        .add {
          margin-top: 16px;
          margin-bottom: 16px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .content-detail-box {
        padding-bottom: 9px;
        .nodata-box {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(143, 143, 143, 1);
          line-height: 20px;
          text-align: center;
          margin-top: 25px;
          margin-bottom: 23px;
        }
        .content-detail {
          display: flex;
          justify-content: left;
          padding-left: 13px;
          padding-right: 13px;
          margin-top: 9px;
          .title {
            width: 108px;
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
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(150, 150, 150, 1);
            line-height: 17px;
            width: 60%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .detail-date {
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(150, 150, 150, 1);
            line-height: 17px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .content-detail-option {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 20%;
            img {
              margin-left: 4px;
              margin-right: 4px;
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    .main-blank {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .button {
      display: flex;
      justify-content: space-around;
      padding: 30px;
      .cross-blank {
        margin-left: 20px;
        margin-right: 20px;
      }
      .n22-button {
        height: 44px;
      }
    }
  }
}
</style>
