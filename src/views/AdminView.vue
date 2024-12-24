<template>
  <div class="home">
    (测试)仅管理员可见的页面
    <HelloWorld msg="Welcome to Your Vue.js + Typescript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "HomeValue",
  components: {
    HelloWorld,
  },
});
</script>
