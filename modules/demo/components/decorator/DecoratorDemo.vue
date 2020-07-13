<template>
  <div class="demo-decorator-demo">
    <al-all-head></al-all-head>
    <al-content class="demo-native-demo-content" ref="insureMessage">
      {{ message }}
      <n22-button @click="hello(987)">ddd</n22-button>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import Vue from "vue";
import Component from "vue-class-component";
import { Log } from "@m/demo/assets/lib/decorators";
import { AllHead, Content, Button } from "al-mobile";

@Component({
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
  },
})
class DecoratorDemo extends Vue {
  message = "Hello World!";
  // It prints a log when `hello` method is invoked.
  @Log
  hello(value) {
    console.log("%c hello", "color:#00CD00", value);
    this.message = "Hello World222!";
  }
}
export default DecoratorDemo;
</script>

<style lang="scss" scoped>
.demo-decorator-demo {
  .demo-decorator-demo-content {
  }
}
</style>
