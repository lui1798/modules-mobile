<template>
  <div class="item-line">
    <div class="line" :style="{ height: value + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: "item-line", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    value: {
      //props定义样例
      type: String,
      default: "1",
    },
  },
  components: {},
  computed: {},
  filters: {},
  data() {
    return {};
  },
  activated() {},
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.item-line {
  .line {
    height: 1px;
    background: #ecedef;
  }
}
</style>
