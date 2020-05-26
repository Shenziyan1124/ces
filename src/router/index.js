import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NProgress from "nprogress";

Vue.use(Router);
const router = new Router({
  // mode:'history',
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login"),
      meta: {
        title: "登陆"
      }
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/home"),
    }
  ]
});
export default router;
