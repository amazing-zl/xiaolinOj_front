<!-- 全局页面头部模板 -->
<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <!--  将头部的自动换行取消 -->
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :select-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title_bar">
            <img class="logo" src="../assets/ojLogo.jpg" />
            <div class="title">小林oj</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <!-- 根据routes文件中的路由信息进行导航栏的渲染 -->
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登入" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRoute,useRouter } from "vue-router";
import { routes } from "../router/routes";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const store = useStore();
const router = useRouter();

// 路由过滤：将routes路由文件中的路由数组进行过滤，得到有权限，可以展示出来的数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 判断用户的登入权限是否与页面要求的权限匹配
    if (!checkAccess(store.state.user.loginUser, item?.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

/**
 * 测试用例
 */
setTimeout(() => {
  store.dispatch("user/getLoginUser",{
    userName:"小林管理员",
    userRole : ACCESS_ENUM.ADMIN,
  });
},3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title_bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 14px;
}

/* logo样式 */
.logo {
  height: 40px;
  width: 40px;
}
</style>
