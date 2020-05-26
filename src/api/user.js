import axios from "@/plugins/axios";
import api from "@/api/api";
import qs from "qs";

export function login(data) {
  return axios({
    url: api.login,
    method: "post",
    data: qs.stringify(data)
  });
}

export function getInfo() {
  return axios({
    url: api.get_userinfo,
    method: "get"
  });
}

export function logout(data) {
  return axios({
    url: api.logout,
    method: "post",
    data: qs.stringify(data)
  });
}
