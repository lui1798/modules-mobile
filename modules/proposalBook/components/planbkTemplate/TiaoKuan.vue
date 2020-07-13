<template>
  <div class="con-wrap">
    <article class="conditions-wrap">
      <div class="english-dx">CONDITIONS</div>
      <div class="conditions-title">
        <img src="../../assets/images/circle.png" /> 条款详情
        <img src="../../assets/images/circle.png" />
      </div>
      <div v-for="(item, key, i) in tkList" :key="i">
        <div class="conditions-container">
          <div class="tk-desc-circle">
            <span class="circle"></span>
            <div class="tk-name">{{ key }}条款</div>
          </div>
          <n22-button @click="$emit('goWordShow', { name: key, terms: item })" type="default" size="small" round
            >预览</n22-button
          >
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { Button } from "al-mobile";

export default {
  name: "tiao-kuan",
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      tkList: this.data,
    };
  },
  props: {
    data: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    // this.masterProData.forEach(mm => {
    //   this.tkList = this.tkList.concat(mm.product);
    // });
    console.log("%c this.tkList", "color:green;", this.tkList);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
//条款
.conditions-wrap {
  padding-bottom: 20px;
}
.conditions-container {
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  .pro-name {
    max-width: 230px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-left: 30px;
    margin-right: 16px;
    line-height: 20px;
  }
  .tk-name {
    max-width: 240px;
    margin-left: 30px;
    line-height: 20px;
  }
  .tk-desc {
    font-size: 14px;
    color: #333333;
    margin-left: 30px;
    line-height: 20px;
  }
  .tk-desc2 {
    margin-top: 10px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  // .tk-desc-circle {
  //   font-size: 14px;
  //   .circle {
  //     height: 7px;
  //     width: 7px;
  //     background: linear-gradient(180deg, $theme-color, #e68700);
  //     border-radius: 50%;
  //     line-height: 8px;
  //     float: left;
  //     display: block;
  //     margin: 5.5px 10px 0 10px;
  //   }
  // }
  div:first-child {
    // width: 280px;
  }
  .n22-button {
    width: 45px;
    font-size: 10px;
    color: $theme-color;
    line-height: 9px;
    height: 20px;
    &::after {
      border: 1px solid $theme-color;
    }
  }
}
</style>
