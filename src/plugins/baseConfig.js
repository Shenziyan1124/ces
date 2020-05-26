/**
 * 接口域名的管理
 * 暂且不用
 */
let env = "online";
const configList = {
  test: {
    serverUrl: "http://10.25.51.44:8080"
  },
  online: {
    serverUrl: "http://bim.checc.com.cn"
  },
  zy: {
    serverUrl: "http://10.25.106.132:8888"
  }
};
const baseConfig = configList[env];
export default baseConfig;
