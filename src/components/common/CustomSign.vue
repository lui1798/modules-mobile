<!-- 
  使用说用:
    1. 导入组件
      ```js
      import CustomSign from "@/components/common/CustomSign";

      export default {
        components: {
          [CustomSign.name]: CustomSign,
        },
      }
      ```
    2. 组件设置
      ```vue
      //title:设置标题,可不设置,默认`请您横向签字`
      //ref:需通过`this.$refs.sign.show();`打开签字页面
      //@result: 接收签字内容
      <custom-sign :title="`标题`" ref="sign" @result="result"></custom-sign>
      ```
    3. 返回值介绍
      ```js
      //返回值带有前缀(data:image/png;base64,),接口传递数据需注意
      result(data) {
        console.log(data);
      },
      ```
-->
<template>
  <div class="custom_sign" v-show="isShow">
    <p>{{ title }}</p>
    <canvas class="custom_sign_canvas">您当前浏览器不支持canvas，建议更换浏览器！</canvas>
    <div>
      <button @click="confirm" :disabled="close">确定</button>
      <button @click="clear">清空</button>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "custom-sign",
  props: {
    title: {
      type: String,
      default: "请您横向签字",
    },
  },
  data() {
    return {
      isShow: false,
      imgSrc: "",
      close: false,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };
  },
  watch: {},
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      let canvasArr = document.getElementsByClassName("custom_sign_canvas");
      canvasArr.forEach(element => {
        let ctx = element.getContext("2d");
        let _x = 0,
          _y = 0,
          x = 0,
          y = 0;
        element.width = this.screenWidth - 142;
        element.height = this.screenHeight - 122;
        this.setContentSize();
        element.addEventListener("touchstart", function(e) {
          // 开始绘制
          e.preventDefault();
          (_x = e.touches[0].pageX), (_y = e.touches[0].pageY);
          ctx.beginPath(); // 路径开始
          ctx.lineWidth = 5;
          ctx.moveTo(_x - 70, _y - 35);
          this.addEventListener("touchmove", function(e) {
            // 路径移动
            (x = e.touches[0].pageX), (y = e.touches[0].pageY);
            ctx.lineTo(x - 70, y - 35);
            ctx.stroke();
          });
        });
      });
    },
    setContentSize() {
      let _$ = window.$;
      this.screenWidth = _$(window).width();
      this.screenHeight = _$(window).height();

      //计算操作按钮right值
      let content_button_width_half = _$(window).width() / 2;
      let content_button_height_half = 35 / 2;
      let content_button_right = "-" + (content_button_width_half - content_button_height_half - 15) + "px";

      _$(".custom_sign div").css("right", content_button_right);

      //计算操作标题left值
      let content_p_width_half = _$(window).width() / 2;
      let content_p_height_half = 30 / 2;
      let content_p_left = "-" + (content_p_width_half - content_p_height_half - 15) + "px";

      _$(".custom_sign p").css("left", content_p_left);

      _$(".custom_sign_canvas").attr("width", this.screenWidth - 142);
      _$(".custom_sign_canvas").attr("height", this.screenHeight - 122);
    },
    //调整画布方向,获取画板数据
    rotate(data, callBack) {
      let edg = 90;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let imgW; //图片宽度
      let imgH; //图片高度
      let size; //canvas初始大小
      if (edg % 90 != 0) {
        console.error("旋转角度必须是90的倍数!");
        throw "旋转角度必须是90的倍数!";
      }
      edg < 0 && (edg = (edg % 360) + 360);
      const quadrant = (edg / 90) % 4; //旋转象限
      const cutCoor = {
        sx: 0,
        sy: 0,
        ex: 0,
        ey: 0,
      }; //裁剪坐标
      let image = new Image();
      let result = this.getiPhoneVersion();
      if (result && result.indexOf("10.1") > -1) {
        console.log("");
      } else {
        image.crossOrigin = "anonymous";
      }
      image.src = data;
      let than = this;
      image.onload = function() {
        imgW = image.width;
        imgH = image.height;
        size = imgW > imgH ? imgW : imgH;
        canvas.width = size * 2;
        canvas.height = size * 2;
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        ctx.translate(size, size);
        ctx.rotate((edg * Math.PI) / 180);
        ctx.drawImage(image, 0, 0);
        let imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
        for (let i = 0; i < imgData.data.length; i += 4) {
          // 当该像素是透明的，则设置成白色
          if (imgData.data[i + 3] == 0) {
            imgData.data[i] = 255;
            imgData.data[i + 1] = 255;
            imgData.data[i + 2] = 255;
            imgData.data[i + 3] = 255;
          }
        }
        if (quadrant % 2 == 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        ctx.putImageData(imgData, 0, 0);
        //系统获取一个空canvas对象
        let blank = document.createElement("canvas");
        blank.width = canvas.width;
        blank.height = canvas.height;
        let blankctx = blank.getContext("2d");
        let blankimgData = blankctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
        for (let i = 0; i < blankimgData.data.length; i += 4) {
          // 当该像素是透明的，则设置成白色
          if (blankimgData.data[i + 3] == 0) {
            blankimgData.data[i] = 255;
            blankimgData.data[i + 1] = 255;
            blankimgData.data[i + 2] = 255;
            blankimgData.data[i + 3] = 255;
          }
        }
        blankctx.putImageData(blankimgData, 0, 0);
        let blankSrc = blank.toDataURL("image/png");
        than.imgSrc = canvas.toDataURL("image/png");
        if (blankSrc != than.imgSrc) {
          callBack(than.imgSrc);
        }
      };
    },
    //获取iPhone版本,部分办法会存在属性不兼容问题
    getiPhoneVersion: () => {
      let userAgent = navigator.userAgent.toLowerCase();
      let result = userAgent.match(/cpu iphone os (.*?) like mac os/);
      if (result) {
        return result[1].replace(/_/g, ".");
      } else {
        return null;
      }
    },
    //显示签字页面
    show() {
      this.isShow = true;
      this.initialize();
    },
    //清空画布数据并关闭签字页面
    goBack() {
      this.clear();
      this.isShow = false;
    },
    //清空画布数据
    clear() {
      let canvasArr = document.getElementsByClassName("custom_sign_canvas");
      canvasArr.forEach(canvas => {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    },
    //确定事件,获取数据返回父组件
    confirm() {
      let num = 0;
      this.close = true;
      let interval = setInterval(() => {
        console.log("签字页面确定按钮已禁止,请稍等3秒...");
        num++;
        if (num >= 3) {
          this.close = false;
          clearInterval(interval);
        }
      }, 1000);
      let canvasArr = document.getElementsByClassName("custom_sign_canvas");
      canvasArr.forEach(canvas => {
        let ctx = canvas.getContext("2d");
        let oImg = new Image();
        ctx.drawImage(oImg, 0, 0);
        let imgSrc = canvas.toDataURL("image/png");
        this.rotate(imgSrc, data => {
          if (data != undefined && data != "") {
            this.$emit("result", data);
          }
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
      this.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.custom_sign {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 10000;
  .custom_sign_canvas {
    border: 2px solid #666666;
    border-radius: 5px;
    margin: 35px 0px 0px 60px;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 30px;
    transform: rotate(270deg);
    position: absolute;
    top: 40%;
    left: -13%;
  }
  div {
    transform: rotate(270deg);
    width: 100%;
    position: absolute;
    top: 45%;
    right: -43%;
    text-align: center;

    button {
      background: #eb9d41;
      height: 35px;
      line-height: 35px;
      width: 100px;
      color: #fff;
      border-radius: 5px;
      outline: none;
      border: none;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}
</style>
