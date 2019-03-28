<template>
  <div id="houseFinance">
    <top v-if="show" :title="this.meta"/>
    <div id="app" v-bind:class="{'active-footer': $route.meta.showFooter,'pt':show}">
      <router-view v-wechat-title="$route.meta.title"/>
    </div>
    <tabFoot v-if="$route.meta.showFooter" :activeOn="activeOn"/>
  </div>
</template>

<script>
import Top from "./components/top";
import TabFoot from "./components/tabFoot";
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {
      activeOn: 0,
      meta: "",
      show: false,
      token: "",
      openID: ""
    };
  },
  created() {
    let nu = navigator.userAgent.toLowerCase();
    let isWechat = nu.indexOf("micromessenger") != -1;
    if (isWechat) {
      this.show = false;
    } else {
      this.show = true;
    }
    const WeChatCode = this.getQueryValue("code", location.search);
    this.token = this.$cookie.get("token") || "";
    this.openID = this.$cookie.get("openID") || "";
    console.log('token='+ this.token,"opebID="+this.openID,WeChatCode)
    if (!WeChatCode && !this.openID) {
      this.bindUse();
    } else if (WeChatCode&&!this.openID) {
     
      this.$axios
        .request({
          url: "weChatUserAccessToken",
          data: {
            WeChatCode
          },
          token: this.token
        })
        .then(res => {
          if (res.code === "1") {
            location.search = ""
            const {
              openID,
              token,
              ewm_path,
              inventNum,
              userPhone,
              uid,
              isAuth,
              isLogin
            } = res.data;
            token &&
              this.$cookie.set("token", token, { paht: "/", expires: 7 });
            this.$cookie.set("openID", openID, { paht: "/", expires: 7 });
            if (!isLogin) {
              this.$router.push("/loginRegister/login");
            } else {
              this.$cookie.set("uid", uid, { paht: "/", expires: 7 });
              this.$cookie.set("ewm_path", ewm_path, { paht: "/", expires: 7 });
              this.$cookie.set("userPhone", userPhone, {
                paht: "/",
                expires: 7
              });
              this.$cookie.set("inventNum", inventNum, {
                paht: "/",
                expires: 7
              });
              this.$cookie.set("isAuth", isAuth, { paht: "/", expires: 7 });
            }
          } else {
            Toast(res.msg);
          }
        });
    } else {
      this.$axios.fetchPost("/getUserInfo", {}, this.token).then(res => {
        const { isAuth } = res.data;
        this.$cookie.set("isAuth", isAuth, { paht: "/", expires: 7 });
      });
    }
  },

  components: {
    Top,
    TabFoot
  },
  watch: {
    $route(to) {
      this.meta = to.meta["title"];
      this.activeOn = to.meta["active"];
    }
  },
  methods: {
    bindUse() {
      const userAgent = window.navigator.userAgent;
      const isWechat =
        /MicroMessenger/i.test(userAgent) || /WindowsWechat/i.test(userAgent);
      if (!isWechat) {
        return;
      } else {
        this.$axios
          .request({
            url: "weChatOauth",
            data: {
              backUrl: location.origin
            }
          })
          .then(res => {
            if (res.code === "1") {
              location.href = res.data;
            }
          });
      }
    },
    getQueryValue(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return " ";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }
};
</script>

<style src="./style/base.css"></style>
