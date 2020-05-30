<template>
  <div class="login_box">
    <div class="top_title">
      <p>基于BIM技术+专业分包的精益管理平台</p>
      <img src="@/views/login/image/LOGO-new.png" alt />
    </div>
    <div class="content">
      <div class="keepPX-middle_login">
        <p class="login">登录</p>
        <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
              placeholder="用户名"
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
              prefix-icon="iconfont icon-zhanghao"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="ruleForm.password"
              autocomplete="off"
              prefix-icon="iconfont icon-mima"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="keepPX-imgbox">
              <el-input
                type="text"
                v-model="ruleForm.captcha"
                autocomplete="off"
                prefix-icon="iconfont icon-checkcode"
              ></el-input>
              <div class="captcha-box" @click="getCode()">
                <!-- <captcha :captcha="captcha_code" v-if="captcha_code!=''"></captcha> -->
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="title_menu">
        <p>版权所有（c）2020 中国公路工程咨询集团有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
import captcha from "./captcha";
import { mapState } from "vuex";

export default {
  name: "index",
  components: { captcha },
  data() {
    return {
      checked: true,
      disabled: false,
      ruleForm: {
        username: "",
        password: "",
        captcha: ""
      },
      checkImgIndex: 0,
      showCheckImg: false,
      checkImg: "",
      checkKey: "",
      redirect: undefined,
      otherQuery: {},
      captcha_code: ""
    };
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  mounted() {
    this.getCode();
  },
  methods: {
    // 登录
    submitForm() {
      let that = this;
      that.disabled = true;
      let params = {
        username: that.ruleForm.username,
        password: that.ruleForm.password,
        captcha: that.ruleForm.captcha,
        checked: that.checked,
        key: that.checkKey
      };
      that.$store.dispatch("user/login", params).then(res => {
        console.log(res);
        if (res.code == 1) {
          console.log(that.otherQuery);
          that.$router.push({
            path: that.redirect || "/",
            query: that.otherQuery
          });
          that.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          that.$message({
            message: res.msg,
            type: "error",
            duration: 5 * 1000
          });
          that.disabled = false;
          that.checkImgIndex++;
        }
      });
      // that.$store.dispatch("user/duxiangLogin", params);
    },
    rememberPwd() {
      let that = this;
      that.checked = !that.checked;
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    getCode() {
      const that = this;
      console.log(1);
      let params = {
        t: new Date().getTime()
      };
      return that.request
        .getCode(params)
        .then(function(response) {
          that.checkImg = response;
          console.log(response);
          if (response.code == 1) {
            console.log(response.data);
            that.captcha_code = response.data.string;
            // that.checkImg=response.content.image;
            // that.checkImg =
            //   response.content.image + "&t=" + new Date().getTime();
            that.checkKey = response.data.key;
          }
        })
        .catch(function(error) {
          that.fetchError = error;
        });
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
.login_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: url("./image/bgc.jpg") no-repeat center;
  background-size: 100% 100%;

  .top_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 140px;

    p {
      font-size: 36px;
      color: #fff;
    }

    img {
      width: 480px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
    padding-top: 80px;
    box-sizing: border-box;

    .keepPX-middle_login {
      display: flex;
      flex-direction: column;
      width: 450px;
      height: 340px;
      padding: 0 90px;
      background-color: #fff;
      border-radius: 10px;

      .demo-ruleForm {
        padding-top: 20px;
      }

      p.login {
        text-align: center;
        padding-top: 20px;
        font-size: 30px;
        font-weight: 700;
        color: #333;
      }
    }
  }
}

.keepPX-imgbox {
  display: flex;
  height: 40px;

  .captcha-box {
    width: 100px;
    height: 40px;
    margin-left: 10px;
  }
}

.checkcode {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
}

.title_menu p {
  margin-top: 20px;
  line-height: 30px;
  font-size: 16px;
  color: #ffffff;
}
</style>
