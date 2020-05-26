/* eslint-disable no-unused-vars */
import axios from "axios";
import store from "@/store";
import { getToken, getCookie } from "@/utils/cookie"; // get token from cookie
import { Message, MessageBox } from "element-ui";
import baseConfig from "./baseConfig";
// create an axios instance
// const whiteList = ['webapi']
const _axios = axios.create({
  baseURL: baseConfig.serverUrl // api的base_url
  // timeout: 10000 // request timeout
});
// request interceptor
_axios.interceptors.request.use(
  config => {
    // if (getToken() || sessionStorage.getItem("BimPlatformstokens")) {
    if (getToken() || sessionStorage.getItem("BimPlatformstokens")) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = getCookie("duxiang-tokens");
      config.headers["Token"] =
        getToken() || sessionStorage.getItem("BimPlatformstokens");
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
_axios.interceptors.response.use(
  response => {
    const res = response;
    return res.data;
  },
  error => {
    if (error.response.status === 401) {
      console.log(error);
      MessageBox.confirm(
        error.response.data.content,
        error.response.data.message,
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let store = store;
        store.dispatch("FedLogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    } else if (error.response.status === 404) {
      // if (error.response.data.code === -1001) {
      //   Message({
      //     message: error.response.data.message,
      //     type: "error",
      //     duration: 5 * 1000
      //   });
      // } else {
        Message({
          message: "错误的网络请求",
          type: "error",
          duration: 5 * 1000
        });
      // }
    } else if (error.response.status === 500) {
      Message({
        message: "错误的网络请求",
        type: "error",
        duration: 5 * 1000
      });
    } else {
      Message({
        message: error.response.data.content,
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.resolve();
  }
);

export default _axios;
