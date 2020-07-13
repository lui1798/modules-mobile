<template>
  <div class="role_float">
    <!-- 悬浮拖拽 -->
    <move :id="i + 1 + ''" v-show="item.isShow !== false" :floatWidth="70" v-for="(item, i) in role" :key="i">
      <div class="role_button" :class="'role_button' + (1 + i)" @click="$_onClick(item)">{{ item.name }}</div>
    </move>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import Move from "@@/components/Move.vue";

export default {
  name: "role-float", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    roleList: {
      //props定义样例
      type: Array,
      default: () => {
        return [];
      },
    },
    value: [String, Array, Boolean],
  },
  components: {
    [Move.name]: Move, //引入组件样例如此
  },
  computed: {
    ...mapState(["train"]), //引入vuex state样例>>>可通过this.train.roleMark获取vuex-state数据
  },
  data() {
    return {
      role: this.value,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "ROLE_MARK",
    ]),
    $_onClick(role) {
      this.$emit("onClick", role);
    },
  },
  mounted() {},
  activated() {
    console.log("%c 当前 RoleFloat 页面 ", "color:yellow;", "活跃");
  },
  watch: {
    value(val) {
      console.log("%c val", "color:green;", val);
      this.role = val;
      this.role.forEach((r, i) => {
        if (r.type == this.train.roleMark) {
          this.role.splice(i, 1);
        }
      });
    },

    role(val) {
      console.log("%c role", "color:green;", "role更改");
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.role_float ::v-deep .float_div_top1 {
  top: 110px;
}
.role_float ::v-deep .float_div {
  width: 62px;
}
.role_float ::v-deep .float_div_top2 {
  top: 160px;
}
.role_float ::v-deep .float_div_top3 {
  top: 62%;
}

.role_button {
  font-size: 16px;
  text-align: center;
  line-height: 25px;
  border-radius: 15px 0 0 15px;
}
.role_button1 {
  background-color: #390d12;
  color: #ffffff;
  font-size: 12px;
  // box-shadow: 0px 4px 8px #888888;
}
.role_button2 {
  background-color: #390d12;
  color: #ffffff;
  font-size: 12px;
  // box-shadow: 0px 4px 8px #888888;
}
.role_button3 {
  background-color: #ff7300;
  box-shadow: 0px 4px 8px #888888;
}
</style>
