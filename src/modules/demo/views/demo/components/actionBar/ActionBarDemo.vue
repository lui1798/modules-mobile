<template>
  <div class="">
    <al-all-head title="action-bar" :headBottom="true"></al-all-head>
    <al-content
      >xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      <br />
      {{ options }}
    </al-content>
    <n22-action-bar :actions="data" @click="onBtnClick">
      <span class="price">
        &yen;128.00
        <small>起</small>
      </span>
    </n22-action-bar>
  </div>
</template>

<script>
import { AllHead, Content, ActionBar, Dialog } from "al-mobile";
import code from "@@/utils/code/";

export default {
  name: "demo-action-bar-demo",
  components: {
    [ActionBar.name]: ActionBar,
    [AllHead.name]: AllHead,
    [Content.name]: Content
  },
  data() {
    return {
      options: code.getCodeData("", "", "test"),
      data: [
        {
          text: "主要按钮"
        }
      ]
    };
  },
  methods: {
    onBtnClick(event, action) {
      Dialog.alert({
        content: `${action.text}点击`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.price {
  font-weight: 500;
  font-size: 24px;
  color: #FF823A;

  small {
    margin-left: 10px;
    font-size: 16px;
    color: #858B9C;
  }
}
</style>
