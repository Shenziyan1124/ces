import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/assets/css/main.css";
import "@/assets/scss/main.scss";
import "@/plugins/element.js";
// 权限控制
import "./permission";
import request from "@/api/request";
Vue.prototype.request = request;
// 全局注册筛选器
import * as filters from "./filters"; // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
import VueFullscreen from "vue-fullscreen";

Vue.use(VueFullscreen);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
