<template>
  <span
    class="count_down"
    :style="textClass"
    :endTime="endTime"
    :callback="callback"
    :endText="endText"
  >
    <!-- <slot name="title">
      <span v-if="!isShowContent">{{ descText }}</span>
    </slot>
    <slot>
      <span v-if="isShowContent">{{content}}</span>
      <span v-else>
        <span class="time_class" v-if="format.indexOf('dd')>-1">
          <n22-amount
            :value="day"
            :initNum="60"
            :precision="0"
            :duration="800"
            zeroText="00"
            :animateType="2"
            amountNumChangeType="number-subtract"
            transition
            amountNumSty
          ></n22-amount>
          <span>天</span>
        </span>
        <span class="time_class" v-if="format.indexOf('hh')>-1">
          <n22-amount
            :value="hour"
            :initNum="60"
            :precision="0"
            :duration="800"
            zeroText="00"
            :animateType="2"
            :amountNumTemplate="2"
            amountNumChangeType="number-subtract"
            transition
            amountNumSty
          ></n22-amount>
          <span>小时</span>
        </span>
        <span class="time_class" v-if="format.indexOf('mm')>-1">
          <n22-amount
            :value="min"
            :initNum="60"
            :precision="0"
            :duration="800"
            zeroText="00"
            :animateType="2"
            :amountNumTemplate="2"
            amountNumChangeType="number-subtract"
            transition
            amountNumSty
          ></n22-amount>
          <span>分</span>
        </span>
        <span class="time_class" v-if="format.indexOf('ss')>-1">
          <n22-amount
            :value="sec"
            :initNum="60"
            :precision="0"
            :duration="800"
            zeroText="00"
            :animateType="2"
            :amountNumTemplate="2"
            amountNumChangeType="number-subtract"
            transition
            amountNumSty
          ></n22-amount>
          <span>秒</span>
        </span>
      </span>
    </slot> -->
  </span>
</template>
<script>
// import { Amount } from "al-mobile";
/**
 * 时间格式化模块
 * link: http://momentjs.com/
 */
import moment from "moment";
import "moment/locale/zh-cn";

export default {
  name: "n22-count-down",
  data() {
    return {
      items: [60],
      nextNum: 60,
      timer: {},
      amountNumType: "number-add",

      format: this.formatProps,
      content: "",
      isShowContent: false,
      day: "",
      hour: "",
      min: "",
      sec: "",
      textClass: "",
      allTime: this.endTime + "-" + this.startTime
    };
  },
  components: {
    // [Amount.name]: Amount
  },
  props: {
    item: [String, Object], //如果组件加载在列表中，需要改变列表的数据，需要传入的item
    list: [Array], //如果组件加载在列表中，需要改变列表的数据，需要传入的列表数组
    index: [String, Number], //如果组件加载在列表中，需要改变列表的数据，需要传入的item的下标
    endTime: [String, Object, Date],
    startTime: [String, Object, Date],
    nowTime: [String, Object],
    // 传入时间格式--默认传入的为yyyy-mm-dd hh:mm:ss
    // ss-出入秒数
    endTimeType: {
      type: String,
      default: "yyyy-mm-dd hh:mm:ss"
    },
    endText: {
      type: String,
      default: "已结束"
    },
    beginText: {
      type: String,
      default: "进行中"
    },
    descText: {
      type: String,
      default: "倒计时："
    },
    endTextClass: {
      type: Object,
      default: () => {
        return {
          color: "#999999"
        };
      }
    },
    onGoingTextClass: {
      type: Object,
      default: () => {
        return {
          color: "#4091fb"
        };
      }
    },
    beginTextClass: {
      type: Object,
      default: () => {
        return {
          color: "#ffab3f"
        };
      }
    },
    timeRemind: {
      type: Array,
      default: () => {
        return [];
      }
    },
    callback: {
      type: Function
    },
    // 传入时间格式(yyyy-MM-dd-hh-mm-ss)--默认传入的为dd-hh-mm-ss
    formatProps: {
      type: String,
      default: "dd-hh-mm-ss"
    },
    anm: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    endTime() {
      console.log(
        "%c this.startTime this.endTime",
        "color:green;",
        this.startTime + "---" + this.endTime
      );
      this.countdowm(
        this.getDealTime(this.startTime),
        this.getDealTime(this.endTime),
        this.nowTime
      );
    }
  },
  mounted() {
    console.log(
      "%c this.startTime this.endTime",
      "color:green;",
      this.startTime + "---" + this.endTime
    );
    this.countdowm(
      this.getDealTime(this.startTime),
      this.getDealTime(this.endTime),
      this.nowTime
    );
  },
  activated() {
    console.log("%c 当前 CountDown 页面 ", "color:yellow;", "活跃");
    this.countdowm(
      this.getDealTime(this.startTime),
      this.getDealTime(this.endTime),
      this.nowTime
    );
  },
  //组件的销毁考虑到正常跳转、返回和历史跳转、返回---需要两个销毁方法进行处理销毁的逻辑
  deactivated() {
    //deactivated会在正常跳转路由的时候进行触发
    console.log("%c 当前 CountDown 页面 ", "color:yellow;", "销毁");
    //计时器销毁的时候进行清空计时器
    clearInterval(this.timer);
  },
  beforeDestroy() {
    //beforeDestroy会在历史返回的时候进行触发
    console.log("%c 当前 CountDown 页面 ", "color:yellow;", "销毁前");
    //计时器销毁的时候进行清空计时器
    clearInterval(this.timer);
  },
  methods: {
    getDealTime(stamp) {
      let time = "";
      if (stamp) {
        if (typeof stamp == "string") {
          time =
            this.endTimeType == "ss"
              ? new Date(stamp * 1000)
              : moment(stamp, moment.ISO_8601).toDate();
        } else if (typeof stamp == "object") {
          time = stamp;
        }
        // console.log("%c time.getTime()", "color:red;", time.getTime())
        return time.getTime();
      } else {
        // console.log("%c time.getTime()", "color:red;", "空空空空"+time.getTime())
        return "";
      }
    },
    countdowm(starttimepram, endtimepram, nowtimestamp) {
      if (!endtimepram) {
        console.log("%c 终点时间不能为空", "color:red;", endtimepram);
        return;
      }
      // //处理传入开始or结束or开始结束时间
      // let endtimestamp = endtimepram
      // let nowtimels = this.getDealTime(
      //   nowtimestamp ? new Date(nowtimestamp) : new Date()
      // )
      // if (starttimepram && starttimepram < endtimepram) {
      //   if (nowtimels < starttimepram) {
      //     //现在时间-->开始时间-->结束时间
      //     this.textClass = this.beginTextClass
      //     endtimestamp = starttimepram
      //   } else if (nowtimels > starttimepram && nowtimels < endtimepram) {
      //     //开始时间-->现在时间-->结束时间
      //     this.textClass = this.onGoingTextClass
      //     this.content = this.beginText
      //     this.isShowContent = true
      //     return
      //   } else if (nowtimels > endtimepram) {
      //     //开始时间-->结束时间-->现在时间
      //     this.textClass = this.endTextClass
      //     this.content = this.endText
      //     this.isShowContent = true
      //     return
      //   } else {
      //     this.isShowContent = false
      //   }
      // } else if (starttimepram && starttimepram > endtimepram) {
      //   console.log("%c 开始时间不能大于结束时间", "color:red;", starttimepram+"-"+endtimepram)
      //   return
      // }
      // console.log("%c endtimestamp", "color:green;", endtimestamp)

      let self = this;
      self.timer = setInterval(function() {
        let nowTime = nowtimestamp ? new Date(nowtimestamp) : new Date();
        //处理传入开始or结束or开始结束时间
        let endtimestamp = endtimepram;
        let nowtimels = self.getDealTime(
          nowtimestamp ? new Date(nowtimestamp) : new Date()
        );
        if (starttimepram && starttimepram < endtimepram) {
          if (nowtimels < starttimepram) {
            //现在时间-->开始时间-->结束时间
            self.textClass = self.beginTextClass;
            endtimestamp = starttimepram;
          } else if (nowtimels > starttimepram && nowtimels < endtimepram) {
            //开始时间-->现在时间-->结束时间
            self.textClass = self.onGoingTextClass;
            self.content = self.beginText;
            self.isShowContent = true;
            return;
          } else if (nowtimels > endtimepram) {
            //开始时间-->结束时间-->现在时间
            self.textClass = self.endTextClass;
            self.content = self.endText;
            self.isShowContent = true;
            return;
          } else {
            self.isShowContent = false;
          }
        } else if (starttimepram && starttimepram > endtimepram) {
          console.log(
            "%c 开始时间不能大于结束时间",
            "color:red;",
            starttimepram + "-" + endtimepram
          );
          return;
        } else {
          self.textClass = self.beginTextClass;
        }
        let endTime = endtimestamp;

        let t = endTime - nowTime.getTime();
        // console.log('%c tttttttttttttttttttttttt','color:green;',endTime.getTime());
        // console.log('%c tttttttttttttttttttttttt','color:green;',t);
        // console.log('%c tttttttttttttttttttttttt','color:green;',t);
        if (t > 0) {
          self.isShowContent = false;
          self.day = Math.floor(t / 86400000);
          self.hour = Math.floor((t / 3600000) % 24);
          self.min = Math.floor((t / 60000) % 60);
          self.sec = Math.floor((t / 1000) % 60);
          self.hour = self.hour < 10 ? "0" + self.hour : self.hour;
          self.min = self.min < 10 ? "0" + self.min : self.min;
          self.sec = self.sec < 10 ? "0" + self.sec : self.sec;
          if (!self.anm) {
            let formatContent = "";
            if (self.day > 0) {
              formatContent = `${self.day}天${self.hour}小时${self.min}分${self.sec}秒`;
            }
            if (self.day <= 0 && self.hour > 0) {
              formatContent = `${self.hour}小时${self.min}分${self.sec}秒`;
            }
            if (self.day <= 0 && self.hour <= 0) {
              formatContent = `${self.min}分${self.sec}秒`;
            }
            self.content = formatContent;
          }
          //默认进行了大于24小时一天的逻辑
          // 当倒计时时间大于一天的时候不取传入的formatProps即显示 **天**小时（后期扩充为动态）
          if (t > 86400000) {
            clearInterval(self.timer);
            self.format = "dd-hh";
            // self.content = self.beginText;
            // self._callback();
          } else {
            self.format = self.formatProps;
          }
          //时间提醒点--毫秒数数组
          self.timeRemind.forEach(s => {
            // console.log('%c timeRemind','color:green;',s+':'+parseInt(t/1000));
            if (parseInt(t / 1000) == s) {
              self._callback(s, "", self.item, self.list, self.index);
            }
          });
        } else {
          clearInterval(self.timer);
          // self.format = 'yyyy-MM'
          self.isShowContent = true;
          self.content = self.endText;
          self._callback(
            parseInt(t / 1000),
            "end",
            self.item,
            self.list,
            self.index
          );
        }
      }, 1000);
    },
    _callback(p, type, item, list, index) {
      if (this.callback && this.callback instanceof Function) {
        this.callback(p, type, item, list, index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.count_down > span {
  margin-right: -3px;
}
.time_class {
  margin: 0 2px 0 2px;
}
</style>
