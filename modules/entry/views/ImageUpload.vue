<template>
  <div class="entry-image-upload">
    <al-all-head></al-all-head>
    <al-content
      class="entry-image-upload-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="main-blank"></div>
      <!-- 一寸免冠照 -->
      <div class="box">
        <div class="title-content">
          <div class="title">一寸免冠照<span>*</span>：<span style="font-size: 14px;">请上传竖版照片</span></div>
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box">
              <div>
                <div class="camera-box" v-show="!imageList['inchPhoto'].length">
                  <n22-image-reader
                    name="inchPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
                <div
                  class="camera-box camera-box-border"
                  v-for="(img, index) in imageList['inchPhoto']"
                  :key="index"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('inchPhoto', index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 身份证上传 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            身份证上传<span>*</span>：
          </div>
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box">
              <div>
                <div class="camera-box" v-show="!imageList['IDCardFrontPhoto'].length">
                  <n22-image-reader
                    name="IDCardFrontPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">身份证正面</div>
                </div>
                <div
                  class="camera-box camera-box-border"
                  v-for="(img, index) in imageList['IDCardFrontPhoto']"
                  :key="index"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('IDCardFrontPhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="!imageList['IDCardBackPhoto'].length">
                  <n22-image-reader
                    name="IDCardBackPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">身份证反面</div>
                </div>
                <div
                  class="camera-box camera-box-border"
                  v-for="(img, index) in imageList['IDCardBackPhoto']"
                  :key="index"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('IDCardBackPhoto', index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 学历证上传 -->
      <div class="box">
        <div class="title-content">
          <div class="title">学历证上传<span>*</span>：</div>
          <!--          <div class="title">学历证上传<span>*</span>：{{ mes }}</div>-->
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box">
              <div v-for="(img, index) in imageList['diplomaPhoto']" :key="index">
                <div
                  class="camera-box camera-box-border"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('diplomaPhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="imageList['diplomaPhoto'].length < 5">
                  <n22-image-reader
                    name="diplomaPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <!--                  <n22-image-reader-->
                  <!--                    name="diplomaPhoto"-->
                  <!--                    is-multiple-->
                  <!--                    :mime="imgType"-->
                  <!--                    :amount="imgNumber"-->
                  <!--                    @select="onReaderSelect"-->
                  <!--                    @complete="onReaderComplete"-->
                  <!--                    @error="onReaderError"-->
                  <!--                  ></n22-image-reader>-->
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 学位证 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            学位证：
          </div>
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box">
              <div v-for="(img, index) in imageList['degreePhoto']" :key="index">
                <div
                  class="camera-box camera-box-border"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('degreePhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="imageList['degreePhoto'].length < 5">
                  <n22-image-reader
                    name="degreePhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 学位认证/证明 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            学位认证/证明<span>*</span>：
          </div>
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box" v-show="!agreeDegreeConf.checked">
              <div v-for="(img, index) in imageList['degreeProvePhoto']" :key="index">
                <div
                  class="camera-box camera-box-border"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('degreeProvePhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="imageList['degreeProvePhoto'].length < 5">
                  <n22-image-reader
                    name="degreeProvePhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
              </div>
            </div>
            <div class="options" v-show="imageList['degreeProvePhoto'].length == 0">
              <div class="font">
                2000年以前学历请选择无
              </div>
              <div>
                <n22-agree
                  v-model="agreeDegreeConf.checked"
                  :disabled="agreeDegreeConf.disabled"
                  :size="agreeDegreeConf.size"
                  @change="onChange('agreeDegreeConf', agreeDegreeConf.checked, $event)"
                >
                  无
                </n22-agree>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 工资流水/证明 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            工资流水/证明<span>*</span>：
          </div>
        </div>
        <div class="content">
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box" v-show="!agreeWagesConf.checked">
              <div v-for="(img, index) in imageList['wagesProvePhoto']" :key="index">
                <div
                  class="camera-box camera-box-border"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('wagesProvePhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="imageList['wagesProvePhoto'].length < 5">
                  <n22-image-reader
                    name="wagesProvePhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
              </div>
            </div>
            <div class="options" v-show="imageList['wagesProvePhoto'].length == 0">
              <div class="font">
                无收入证明请选择无，并填写备注
              </div>
              <div>
                <n22-agree
                  v-model="agreeWagesConf.checked"
                  :disabled="agreeWagesConf.disabled"
                  :size="agreeWagesConf.size"
                  @change="onChange('agreeWagesConf', agreeWagesConf.checked, $event)"
                >
                  无
                </n22-agree>
              </div>
            </div>
            <div class="input-box" v-show="imageList['wagesProvePhoto'].length == 0">
              <div class="font">
                备注:
              </div>
              <div class="input">
                <input type="text" v-model="incomeRemark" placeholder="请输入备注" maxlength="100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 工作证明 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            工作证明<span>*</span>：
          </div>
        </div>
        <div class="content">
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box" v-show="!agreeWorkConf.checked">
              <div v-for="(img, index) in imageList['workProvePhoto']" :key="index">
                <div
                  class="camera-box camera-box-border"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('workProvePhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="imageList['workProvePhoto'].length < 5">
                  <n22-image-reader
                    name="workProvePhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">上传照片</div>
                </div>
              </div>
            </div>
            <div class="options" v-show="imageList['workProvePhoto'].length == 0">
              <div class="font">
                无工作证明请选择无，并填写备注
              </div>
              <div>
                <n22-agree
                  v-model="agreeWorkConf.checked"
                  :disabled="agreeWorkConf.disabled"
                  :size="agreeWorkConf.size"
                  @change="onChange('agreeWorkConf', agreeWorkConf.checked, $event)"
                >
                  无
                </n22-agree>
              </div>
            </div>
            <div class="input-box" v-show="imageList['workProvePhoto'].length == 0">
              <div class="font">
                备注:
              </div>
              <div class="input">
                <input type="text" v-model="workRemarks" placeholder="请输入备注" maxlength="100" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-blank"></div>
      <!-- 银行卡上传 -->
      <div class="box">
        <div class="title-content">
          <div class="title">
            银行卡上传<span>*</span>：
          </div>
        </div>
        <div>
          <item-line></item-line>
          <div class="content-detail">
            <div class="content-detail-box">
              <div>
                <div class="camera-box" v-show="!imageList['bankCardFrontPhoto'].length">
                  <n22-image-reader
                    name="bankCardFrontPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">银行卡正面</div>
                </div>
                <div
                  class="camera-box camera-box-border"
                  v-for="(img, index) in imageList['bankCardFrontPhoto']"
                  :key="index"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('bankCardFrontPhoto', index)"
                  />
                </div>
              </div>
              <div>
                <div class="camera-box" v-show="!imageList['bankCardBackPhoto'].length">
                  <n22-image-reader
                    name="bankCardBackPhoto"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    :is-camera-only="isCameraOnly"
                  ></n22-image-reader>
                  <img src="../assets/images/icon2_join_camera.png" />
                  <div class="camera-box-hint">银行卡反面</div>
                </div>
                <div
                  class="camera-box camera-box-border"
                  v-for="(img, index) in imageList['bankCardBackPhoto']"
                  :key="index"
                  :style="{
                    backgroundImage: `url('${url_preview_prefix}/${img}')`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }"
                >
                  <img
                    class="close-del"
                    src="../assets/images/icon2_join_del_img.png"
                    @click.stop="onDeleteImage('bankCardBackPhoto', index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <n22-button @click="back()" type="primary">上一步</n22-button>
        <div class="cross-blank"></div>
        <n22-button @click="next()" type="primary">下一步</n22-button>
      </div>
      <n22-image-viewer v-model="isPreviewImg" :list="previewImages" :has-dots="false"></n22-image-viewer>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// import { AllHead, Content, Button, Agree, ImageReader, ImageViewer, Dialog } from "al-mobile";
import { AllHead, Content, Button, Agree, ImageReader, ImageViewer, Dialog, Toast } from "al-mobile";
import ItemLine from "../components/ItemLine";

//接口调用导入
import { cosTmpKey, saveEntryUserInfoFile, queryEntryFile } from "../service/getData";

const __cos = require("@t/cos");

import imageProcessor from "al-mobile/components/image-reader/image-processor";

export default {
  name: "join-company-image-upload", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [Agree.name]: Agree,
    [ImageReader.name]: ImageReader,
    [ImageViewer.name]: ImageViewer,
    [Dialog.name]: Dialog,
    [ItemLine.name]: ItemLine,
  },
  computed: {},
  mounted() {
    //OSpoon 暂时关闭
    //this.isCameraOnly = this.os === "android";
    this.requestCosTmpKey(body => {
      this.authConfig = {
        region: body.data.allowPrefix.substr(0, body.data.allowPrefix.length - 1), // 授权访问的入口目录
        secretId: body.data.secretId,
        secretKey: body.data.secretKey,
        xCosSecurityToken: body.data.token,
        expiredTime: body.data.expiredTime,
      };
    });
    this.initPageData();
  },
  activated() {
    this.initPageData();
  },
  watch: {},
  data() {
    return {
      mime: ["jpeg", "jpg", "bmp"],
      isCameraOnly: false,
      url_preview_prefix:
        "//" + process.env.VUE_APP_COS_BUCKET + ".cos." + process.env.VUE_APP_COS_REGION + ".myqcloud.com",
      authConfig: {
        region: "", // 授权访问的入口目录
        secretId: "",
        secretKey: "",
        xCosSecurityToken: "",
        expiredTime: "",
      },
      incomeRemark: "",
      workRemarks: "",
      agreeDegreeConf: {
        checked: false,
        name: "agreeDegree",
        size: "md",
        disabled: false,
        introduction: "选中状态",
      },
      agreeWagesConf: {
        checked: false,
        name: "agreeWages",
        size: "md",
        disabled: false,
        introduction: "选中状态",
      },
      agreeWorkConf: {
        checked: false,
        name: "agreeWork",
        size: "md",
        disabled: false,
        introduction: "选中状态",
      },
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
      imgNumber: 4,
      imgType: ["jpeg", "PDF", "jpg"],
      isPreviewImg: false,
      previewImages: [],
      imageList: {
        inchPhoto: [],
        IDCardFrontPhoto: [],
        IDCardBackPhoto: [],
        diplomaPhoto: [],
        degreePhoto: [],
        degreeProvePhoto: [],
        wagesProvePhoto: [],
        workProvePhoto: [],
        bankCardFrontPhoto: [],
        bankCardBackPhoto: [],
      },
      imageMessage: {
        inchPhoto: "一寸免冠照",
        IDCardFrontPhoto: "身份证正面",
        IDCardBackPhoto: "身份证反面",
        diplomaPhoto: "学历证",
        degreePhoto: "学位证",
        degreeProvePhoto: "学位认证/证明",
        wagesProvePhoto: "工资流水/证明",
        workProvePhoto: "工作证明",
        bankCardFrontPhoto: "银行卡正面",
        bankCardBackPhoto: "银行卡反面",
      },
      // mes: "",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    onChange(config, checked) {
      if (checked) {
        if (config == "agreeDegreeConf") {
          this.imageList.degreeProvePhoto = [];
        } else if (config == "agreeWagesConf") {
          this.imageList.wagesProvePhoto = [];
        } else if (config == "agreeWorkConf") {
          this.imageList.workProvePhoto = [];
        }
      }
      console.log(`agree name = ${config} is ${checked ? "checked" : "unchecked"}`);
    },
    next() {
      let message = this.imageMessage;
      if (!this.imageList.inchPhoto.length) {
        Toast.info(`${message.inchPhoto}需要上传`);
        return false;
      }
      if (!this.imageList.IDCardFrontPhoto.length) {
        Toast.info(`${message.IDCardFrontPhoto}需要上传`);
        return false;
      }
      if (!this.imageList.IDCardBackPhoto.length) {
        Toast.info(`${message.IDCardBackPhoto}需要上传`);
        return false;
      }
      if (!this.imageList.diplomaPhoto.length) {
        Toast.info(`${message.diplomaPhoto}需要上传`);
        return false;
      }
      // 学位认证/证明
      if (!this.agreeDegreeConf.checked) {
        if (!this.imageList.degreeProvePhoto.length) {
          Toast.info(`${message.degreeProvePhoto}需要上传`);
          return false;
        }
      }
      //工资
      if (!this.agreeWagesConf.checked) {
        if (!this.imageList.wagesProvePhoto.length) {
          Toast.info(`${message.wagesProvePhoto}需要上传`);
          return false;
        }
      } else {
        //incomeRemark
        if (this.incomeRemark == undefined || this.incomeRemark == "") {
          Toast.info("请填写备注信息");
          return false;
        }
      }
      //工作
      if (!this.agreeWorkConf.checked) {
        if (!this.imageList.workProvePhoto.length) {
          Toast.info(`${message.workProvePhoto}需要上传`);
          return false;
        }
      } else {
        //workRemarks
        if (this.workRemarks == undefined || this.workRemarks == "") {
          Toast.info("请填写备注信息");
          return false;
        }
      }
      if (!this.imageList.bankCardFrontPhoto.length) {
        Toast.info(`${message.bankCardFrontPhoto}需要上传`);
        return false;
      }
      if (!this.imageList.bankCardBackPhoto.length) {
        Toast.info(`${message.bankCardBackPhoto}需要上传`);
        return false;
      }
      //转换影像数据格式
      let result = this.imageListToRequest(this.imageList);
      //拼装请求参数
      let parameter = {
        isEduCert: this.agreeDegreeConf.checked ? "Y" : "N",
        isIncomeCert: this.agreeWagesConf.checked ? "Y" : "N",
        incomeRemark: this.incomeRemark,
        isWorkCert: this.agreeWorkConf.checked ? "Y" : "N",
        workRemarks: this.workRemarks,
        files: result,
      };
      //发送请求
      this.requestSaveEntryUserInfoFile(
        parameter,
        body => {
          console.log(body);
          this.go("entry/SignContract?uid=" + this.$route.query["uid"]);
        },
        error => {
          console.log(error);
        },
      );
    },
    onReaderSelect(name, index, { files }) {
      files.forEach(file => {
        console.log("[Al Mobile] ImageReader Selected:", "File Name " + file.name);
      });
    },
    async onReaderComplete(name, index, { dataUrl, file }) {
      console.log("[Al Mobile] ImageReader Complete:", "File Name " + file.name);
      if (this.mime.indexOf(file.type.split("/")[1]) == -1) {
        Toast.info('文件类型仅支持"jpeg", "jpg", "bmp"');
        return;
      }
      //确定是免冠照
      if (name != undefined && name != "" && name === "inchPhoto") {
        let size = await this.getImageWidthAndHeight(dataUrl);
        console.log(size);
        if (size != null && size.width > size.height) {
          //宽度>高度为非法尺寸
          Toast.info("请上传竖版的一寸免冠照片");
          return;
        }
      }
      const imageList = this.imageList[name] || [];
      let requestFile = file;
      //估算尺寸,大于3M进行压缩
      if (file.size / 1024 > 3000) {
        //执行循环压缩
        let data = await this.acmeCompress(dataUrl, 3000);
        //执行压缩
        // let data = await imageProcessor({
        //   dataUrl: dataUrl,
        //   quality: 0.85,
        // });
        data.blob["name"] = file.name;
        requestFile = data.blob;
      }
      //执行上传COS
      let result = await this.uploadFileToCos(requestFile);
      console.log(result);
      if (result.data) {
        imageList.push(result.data.Key);
        this.$set(this.imageList, name, imageList);
      }
    },
    getImageWidthAndHeight(dataUrl) {
      return new Promise(resolve => {
        if (dataUrl == undefined || dataUrl == "") resolve(null);
        let size = {
          width: 0,
          height: 0,
        };
        let image = new Image();
        image.src = dataUrl;
        if (image.complete) {
          size.width = image.width;
          size.height = image.height;
          resolve(size);
        } else {
          image.onload = () => {
            size.width = image.width;
            size.height = image.height;
            resolve(size);
          };
        }
      });
    },
    /**
     * 循环压缩至设置的最大文件大小
     */
    async acmeCompress(base64, maxSize = 2000) {
      let result = await imageProcessor({
        dataUrl: base64,
        quality: 0.95,
      });
      console.log("剩余大小 : ", result.blob.size / 1024);
      if (result.blob.size / 1024 > maxSize) {
        result = await this.acmeCompress(result.dataUrl, maxSize);
      }
      return result;
    },
    onReaderError(name, { code, msg }) {
      console.log("[Al Mobile] ImageReader Error:", name);
      console.log(this.imageMessage[name]);
      console.log(code);
      console.log(msg);
    },
    onDeleteImage(name, index) {
      Dialog.confirm({
        // title: "删除",
        content: "确定要删除？",
        confirmText: "确定",
        onConfirm: () => {
          const imageList = this.imageList[name] || [];
          imageList.splice(index, 1);
          this.$set(this.imageList, name, imageList);
        },
      });
    },
    // previewImg(index, name) {
    // this.previewImages = [];
    // this.previewImages.push(this.imageList[name][index]);
    // this.isPreviewImg = true;
    // },

    //初始化页面数据
    initPageData() {
      this.requestQueryEntryFile(
        this.$route.query["uid"],
        body => {
          console.log(body);
          this.imageList = {
            inchPhoto: [],
            IDCardFrontPhoto: [],
            IDCardBackPhoto: [],
            diplomaPhoto: [],
            degreePhoto: [],
            degreeProvePhoto: [],
            wagesProvePhoto: [],
            workProvePhoto: [],
            bankCardFrontPhoto: [],
            bankCardBackPhoto: [],
          };
          this.filesToImageList(body.data.files);
          this.agreeDegreeConf.checked = body.data.isEduCert == "Y";
          this.agreeWagesConf.checked = body.data.isIncomeCert == "Y";
          this.agreeWorkConf.checked = body.data.isWorkCert == "Y";
          this.incomeRemark = body.data.incomeRemark;
          this.workRemarks = body.data.workRemarks;
        },
        error => {
          console.log(error);
        },
      );
    },
    //将服务器返回的File对象转为imageList
    getFileNameFromUrl(url) {
      if (url == undefined) {
        return "";
      }
      let urlArr = url.split("/");
      return decodeURIComponent(urlArr[urlArr.length - 1]);
    },
    //将页面数据转换为发送请求的数据
    imageListToRequest(imageList) {
      let result = [];
      if (imageList == undefined) {
        return result;
      }
      /**
        影像类型:
        PHOTO:免冠照
        ID_CARD_FRONT:身份证正面
        ID_CARD_BACK:身份证背面
        DIPLOMA:学历证
        GRADUATE_DIPLOMA:学位证
        DIPLOMA_PROVE:学历证明
        PAY_WATER_PROVE:工资流水证明
        POW:工作证明
        BANK_CARD_FRONT:银行卡正面
        BANK_CARD_BACK:银行卡反面
        SIGN:签字
        CONTRACT:代理人合同
        APPLY_FOR:从业申请
       */
      //身份证反面
      imageList.IDCardBackPhoto.forEach(url => {
        //ID_CARD_FRONT
        result.push({
          fileType: "ID_CARD_FRONT",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //身份证正面
      imageList.IDCardFrontPhoto.forEach(url => {
        //ID_CARD_BACK
        result.push({
          fileType: "ID_CARD_BACK",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //银行卡反面
      imageList.bankCardBackPhoto.forEach(url => {
        //BANK_CARD_BACK
        result.push({
          fileType: "BANK_CARD_BACK",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //银行卡正面
      imageList.bankCardFrontPhoto.forEach(url => {
        //BANK_CARD_FRONT
        result.push({
          fileType: "BANK_CARD_FRONT",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //学位证
      imageList.degreePhoto.forEach(url => {
        //GRADUATE_DIPLOMA
        result.push({
          fileType: "GRADUATE_DIPLOMA",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //学位认证/证明
      imageList.degreeProvePhoto.forEach(url => {
        //DIPLOMA_PROVE
        result.push({
          fileType: "DIPLOMA_PROVE",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //学历证
      imageList.diplomaPhoto.forEach(url => {
        //DIPLOMA
        result.push({
          fileType: "DIPLOMA",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //一寸免冠照
      imageList.inchPhoto.forEach(url => {
        //PHOTO
        result.push({
          fileType: "PHOTO",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //工资流水/证明
      imageList.wagesProvePhoto.forEach(url => {
        //PAY_WATER_PROVE
        result.push({
          fileType: "PAY_WATER_PROVE",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      //工作证明
      imageList.workProvePhoto.forEach(url => {
        //POW
        result.push({
          fileType: "POW",
          fileName: this.getFileNameFromUrl(url),
          cosUrl: url,
        });
      });
      return result;
    },
    //将服务器返回的files转为imagelist显示
    filesToImageList(files) {
      if (files == undefined) {
        return;
      }
      files.forEach(file => {
        switch (file.fileType) {
          case "PHOTO":
            //免冠照
            this.imageList.inchPhoto.push(file.cosUrl);
            break;
          case "ID_CARD_FRONT":
            //身份证正面
            this.imageList.IDCardFrontPhoto.push(file.cosUrl);
            break;
          case "ID_CARD_BACK":
            //身份证背面
            this.imageList.IDCardBackPhoto.push(file.cosUrl);
            break;
          case "DIPLOMA":
            //学历证
            this.imageList.diplomaPhoto.push(file.cosUrl);
            break;
          case "GRADUATE_DIPLOMA":
            //学位证
            this.imageList.degreePhoto.push(file.cosUrl);
            break;
          case "DIPLOMA_PROVE":
            //学历证明
            this.imageList.degreeProvePhoto.push(file.cosUrl);
            break;
          case "PAY_WATER_PROVE":
            //工资流水证明
            this.imageList.wagesProvePhoto.push(file.cosUrl);
            break;
          case "POW":
            //工作证明
            this.imageList.workProvePhoto.push(file.cosUrl);
            break;
          case "BANK_CARD_FRONT":
            //银行卡正面
            this.imageList.bankCardFrontPhoto.push(file.cosUrl);
            break;
          case "BANK_CARD_BACK":
            //银行卡反面
            this.imageList.bankCardBackPhoto.push(file.cosUrl);
            break;
          default:
            break;
        }
      });
    },
    //查询COS临时秘钥接口
    requestCosTmpKey(successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        loaddingText: "数据请求中...",
      };
      //构建请求参数
      let request = {};
      cosTmpKey({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //保存当前页面数据接口
    requestSaveEntryUserInfoFile(params, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        userId: this.$route.query["uid"],
        isEduCert: params.isEduCert,
        isIncomeCert: params.isIncomeCert,
        incomeRemark: params.incomeRemark,
        isWorkCert: params.isWorkCert,
        workRemarks: params.workRemarks,
        files: params.files,
      };
      //发起请求
      saveEntryUserInfoFile({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //获取当前页面数据接口
    requestQueryEntryFile(uid, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //发起请求
      queryEntryFile({ userid: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    /**
     * 上传影像到COS
     */
    uploadFileToCos(file) {
      return new Promise(resolve => {
        __cos.cosUtils.sliceUploadFile(
          // Config
          {
            bucket: process.env.VUE_APP_COS_BUCKET,
            region: process.env.VUE_APP_COS_REGION,
          },
          // Auth
          {
            type: "temp", // 认证类型
            region: this.authConfig.region, // 授权访问的入口目录
            secretId: this.authConfig.secretId,
            secretKey: this.authConfig.secretKey,
            xCosSecurityToken: this.authConfig.xCosSecurityToken,
            expiredTime: this.authConfig.expiredTime,
          },
          // Path
          {
            modelName: "entry",
            pageName: "image_page",
          },
          file,
          progress => {
            Toast.loading(" 努力上传中: " + progress.percent * 100);
            console.log(JSON.stringify(progress));
          },
          (data, err) => {
            Toast.hide();
            if (err != null) {
              resolve({ err: err });
            } else {
              resolve({ data: data });
            }
          },
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-image-upload {
  .entry-image-upload-content {
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
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-top: 16px;
          margin-bottom: 16px;
          span {
            color: red;
          }
        }
      }
      .content-detail {
        display: flex;
        flex-direction: column;
      }
      .content-detail {
        width: 100%;
        .content-detail-box {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: 0 10px 10px 10px;
          .camera-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 19px 2px 0 2px;
            height: 90px;
            border-radius: 5px;
            border: 2px solid #e5e2e2;
            position: relative;
            width: 136px;
            .camera-box-hint {
              margin-top: 5px;
              height: 17px;
              font-size: 12px;
              font-weight: 500;
              color: rgba(169, 168, 168, 1);
              line-height: 17px;
            }
            .close_del {
              width: 18px;
              height: 18px;
              position: absolute;
              top: -9px;
              right: -9px;
            }
          }
          .camera-box-border {
            border: none;
          }
          .close-del {
            width: 20px;
            height: 20px;
            position: absolute;
            right: -10px;
            top: -10px;
          }
        }
        .options {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin: 14px;
          .font {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
          ::v-deep .n22-agree-icon {
            margin-top: 4px;
          }
        }
        .input-box {
          display: flex;
          margin: 0 14px 14px 14px;
          align-items: center;
          .font {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
          .input {
            display: flex;
            align-items: center;
            width: 85%;
            height: 30px;
            font-size: 12px;
            margin-left: 5px;
            border-radius: 5px;
            border: 2px solid rgba(229, 226, 226, 1);
            input {
              margin-left: 5px;
              width: 100%;
              background: none;
              outline: none;
              border: none;
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
