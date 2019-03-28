<template>
  <div id="loginRegister">
    <div v-if="this.$store.state.login.status!==3" class="bgImg">
      <img class="images" src="../../assets/img/loginBG.jpg" alt="">
    </div>
    <div v-if="this.$store.state.login.status!==3" class="menu">
      <span :class="{active:this.$store.state.login.status===1}">
        <router-link to="/loginRegister/login">登录</router-link>
      </span>
      <span :class="{active:this.$store.state.login.status===2}">
        <router-link :to="{name:'register'}">注册</router-link>
      </span>
    </div>
    <router-view v-transition></router-view>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less" src="./loginRegister.less"></style>
