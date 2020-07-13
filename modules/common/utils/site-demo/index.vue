<template>
  <div class="n22-example agree">
    <section class="n22-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="n22-example-title" v-html="demo.title || '基础'"></div>
      <div class="n22-example-content">
        <component :is="demo"></component>
      </div>
    </section>
  </div>
</template>

<script>
import createDemoModule from "../../../../site/build/create-demo-module";
import Demo0 from "./cases/demo0";
import Demo1 from "./cases/demo1";

export default { ...createDemoModule("site-utils", [Demo0, Demo1]) };
</script>
