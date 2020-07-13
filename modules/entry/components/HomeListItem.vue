<template>
  <div class="home-list-item">
    <div class="item-content">
      <img :src="item.sex == 0 ? avatar_nan : avatar_nv" class="portrait" />
      <div class="box-content">
        <div>
          <div class="name-agent-content">
            <p class="name">{{ item.name }}</p>
            <p v-show="item.status == 3" class="agent">{{ item.agent }}</p>
          </div>
          <div class="age-phone-content">
            <p class="age">{{ item.age }}岁</p>
            <p class="phone">{{ item.phone }}</p>
          </div>
        </div>
        <n22-button
          @click="$_goto(item.id)"
          class="button"
          :style="{ marginRight: item.status == '1' || item.status == '2' || item.status == '4' ? '0' : '15px' }"
          type="primary"
          round
          >查看</n22-button
        >
      </div>
    </div>
    <img
      v-if="item.status == '1' || item.status == '2' || item.status == '4'"
      :src="
        item.status == '1'
          ? state_save_img
          : item.status == '2'
          ? state_wait_img
          : item.status == '4'
          ? state_exception_img
          : ''
      "
      class="state-img"
    />
  </div>
</template>

<script>
import { Button } from "al-mobile";

export default {
  name: "home-list-item", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    item: {
      //props定义样例
      type: Object,
      required: true,
    },
  },
  components: {
    [Button.name]: Button,
  },
  computed: {},
  filters: {},
  data() {
    return {
      avatar_nan: require("../assets/images/icon2_join_avatar_nan.png"),
      avatar_nv: require("../assets/images/icon2_join_avatar_nv.png"),
      state_wait_img: require("../assets/images/icon2_join_state_wait.png"),
      state_save_img: require("../assets/images/icon2_join_state_save.png"),
      state_exception_img: require("../assets/images/icon2_join_state_exception.png"),
    };
  },
  activated() {},
  methods: {
    $_goto(id) {
      this.$emit("goto", id);
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.home-list-item {
  margin-left: 13px;
  display: flex;
  justify-content: space-between;
  .state-img {
    width: 40px;
    height: 40px;
  }
  .item-content {
    width: 100%;
    background: #ffffff;
    display: flex;
    align-items: center;
    .box-content {
      width: 80%;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .portrait {
      border-radius: 25px;
      width: 50px;
      height: 50px;
    }
    .name-agent-content {
      display: flex;
      align-items: center;
      .name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
        width: 45px;
      }
      .agent {
        margin-left: 5.5px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .age-phone-content {
      display: flex;
      align-items: center;
      .age {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .phone {
        margin-left: 16.5px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }

    .button {
      width: 80px;
      height: 35px;
      box-shadow: 0px 3px 9px 0px rgba(253, 185, 44, 0.6);
    }

    .margin_right {
      margin-right: 13px;
    }
  }
}
</style>
