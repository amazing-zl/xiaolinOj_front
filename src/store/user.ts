import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";

export default {
  // 用于导出模块的默认值
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登入",
      // userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
