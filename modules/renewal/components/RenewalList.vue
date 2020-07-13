<template>
  <div>
    <ul class="list" v-for="(item, $index) in dataList" :key="item.id">
      <slot name="head_massage" :item="item" :index="$index">
        <li>
          <span>
            <!-- 占位标签 -->
          </span>
          <span>{{ item.field1 }}</span>
        </li>
      </slot>
      <slot name="content_list" :item="item" :index="$index">
        <li>
          <div>
            <span>保 单 号：</span>
            <span>{{ item.field2 }}</span>
          </div>
          <div>
            <span>投 保 人：</span>
            <span>{{ item.field3 }}</span>
          </div>
          <div>
            <span>应收日期：</span>
            <span>{{ item.field4 }}</span>
          </div>
          <div>
            <span>保 费：</span>
            <span>{{ item.field5 }}</span>
          </div>
        </li>
      </slot>
      <slot name="bottom_button" :item="item" :index="$index">
        <li class="clearfix">
          <div style="float:right">
            <!-- 功能按钮 -->
            <button v-for="(item, index) in buttonList" :key="index" @click="buttonConfig(item.functionName)">
              {{ item.name }}
            </button>
          </div>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "renewal-list",
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
  mounted() {},
  watch: {
    swiperIndex(val) {
      console.log("%c idswiperIndex", "color:green;", val);
    },
  },
  data() {
    return {
      buttonList: [
        { name: "保单详情", functionName: "policyDetails" },
        { name: "续收服务", functionName: "renewalService" },
        { name: "服务历史", functionName: "historyService" },
      ],
    };
  },
  methods: {
    buttonConfig(functionName) {
      if (functionName) {
        eval("this." + functionName + "()");
      }
    },
    policyDetails() {
      this.$emit("policyDetails");
    },
    renewalService() {
      this.$emit("renewalService");
    },
    historyService() {
      this.$emit("historyService");
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  background: #fff;
  margin-top: 10px;
  li:first-child {
    padding: 12px 0 12px 14px;
    border-bottom: 1px solid rgba(236, 237, 239, 1);
    display: flex;
    align-items: center;
    span {
      display: inline-block;
    }
  }
}
.list li:first-child span:first-child {
  width: 4px;
  height: 12px;
  background: rgba(253, 194, 72, 1);
  border-radius: 2px;
  margin-right: 12px;
}
.list li:first-child span:nth-child(2) {
  font-size: 15px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(253, 194, 72, 1);
}
.list li:nth-child(2) {
  padding-top: 11px;
}
.list li:nth-child(2) div {
  padding: 0 20px 6px 13px;
  display: flex;
  justify-content: space-between;
}
.list li:nth-child(2) div span:first-child {
  width: 78px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.list li:nth-child(2) div span:last-child {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(181, 181, 181, 1);
  line-height: 20px;
  text-align: right;
}
.list li:nth-child(3) {
  border-top: 1px solid rgba(236, 237, 239, 1);
  position: relative;
}
.list li:nth-child(3) button {
  width: 85px;
  height: 35px;
  background: rgba(253, 194, 72, 1);
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 251, 251, 1);
  line-height: 20px;
  margin: 14px 10px 14px 0;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
</style>
