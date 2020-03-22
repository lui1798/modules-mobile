<template>
  <div class="demo-all-demo">
    <div v-for="(demo, index) in demos" :key="index">
      <component v-if="demo.name.indexOf(nav) > -1" :is="demo"></component>
    </div>
  </div>
</template>

<script>
import createDemoModule from "../components/create-demo-module";
import ActionBarDemo from "../components/actionBar/ActionBarDemo";
import NativeDemo from "../components/native/NativeDemo";
import GotoDemo from "../components/goTo/GotoDemo";

export default {
  ...createDemoModule("demo-demo-detail", [ActionBarDemo, NativeDemo, GotoDemo])
};
</script>
