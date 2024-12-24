import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";

router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser;
  console.log("用户登入信息" + loginUser);

  // 如果之前没有登入过，就跳转到登入界面
  if (!loginUser || !loginUser.userRole) {
    // await 为了防止用户登入成功之后，还要在继续执行后续代码
    await store.dispatch("user/getLoginUser");
  }

  const neddAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转到的界面必须登入
  if (neddAccess != ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登入或者没有登入权限，就跳转到登入界面
    if (!loginUser || !loginUser.userRole) {
      next("/user/login?redirect=${to.fullPath}");
      return;
    }

    // 如果已经登入并且有个权限,还要判断权限等级是否够,等级不够就跳登入页
    if (!checkAccess(loginUser, neddAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
