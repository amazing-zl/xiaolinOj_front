<!-- 基础页面布局 -->
<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';
</script>

<template>
  <div id = "basicLayOut">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://blog.csdn.net/weixin_48652541" target="_blank">
          xiaooj  by 小林同学不爱coding
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
  
</template>

<!-- scoped :将样式局限在这个类中 -->
<style scoped>

#basicLayOut .header{
  margin-bottom: 10px;
  box-shadow: #453d53 0px 1px 5px;
}

#basicLayOut .content {
   /* 渐变效果 */
  background: linear-gradient(to right,#fff,#a39e9e); 
  /* 边框底 */
  margin-bottom: 20px;
  /* 边距填充 */
  padding: 20px;
}

#basicLayOut .footer {
  background: rgb(10, 223, 223);
  padding: 13px;
  position: sticky;
  /* 底边距 */
  bottom: 0;
  /* 左边距 */
  left: 0;
  /* 右边距 */
  right: 0;
  text-align: center;
}
</style>
