import { login, getInfo, logout } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  setCookie,
  removeCookie
} from "@/utils/cookie"; // get token from cookie
const state = {
  // token: getToken() || sessionStorage.getItem("BimPlatformstokens"),
  token: getToken() || sessionStorage.getItem("BimPlatformstokens"),
  roles: null,
  avatar: "",
  userinfo: {}
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_DXTOKEN: (state, duxiangTokens) => {
    state.duxiangTokens = duxiangTokens;
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, params) {
    const { username, password, checked, captcha,key } = params;
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password, captcha,key })
        .then(response => {
          if (response.code == 1) {
            const { data } = response;
            let token = data.userinfo.token;
            commit("SET_TOKEN", token);
            // if (checked) {
              setToken(token);
            // } else {
            //   sessionStorage.setItem("BimPlatformstokens", token);
            // }
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response;
          if (!data) {
            reject("验证错误，请重新登录.");
          }
          const { group_id, avatar } = data.userinfo;
          commit("SET_USERINFO", data.userinfo);
          commit("SET_ROLES", group_id);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 用户退出登录（走接口退出）
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", null);
          removeToken();
          removeCookie("duxiang-tokens");
          sessionStorage.removeItem("BimPlatformstokens");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 用户退出登录（前端退出登录）
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", null);
      removeToken();
      sessionStorage.removeItem("BimPlatformstokens");
      resolve();
    });
  }
};

const getters = {
  token(state) {
    return state.token;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
