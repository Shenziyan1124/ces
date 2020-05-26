import axios from "@/plugins/axios";
import api from "./api";
import qs from "qs";

export default {
  getCode(params) {
    return axios({
      url: api.get_captcha,
      method: "get",
      params: params
    });
  }
};
