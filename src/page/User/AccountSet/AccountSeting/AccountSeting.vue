<template>
  <div class="accountSetIng">
    <van-collapse v-model="activeNames">
      <router-link to="/user/account/mobile">
        <van-collapse-item
          title="更改手机号"
          :icon="phone"
          disabled
        />
      </router-link>
    </van-collapse>

    <div class="text-ag-center btn-wrap">
      <van-button type="default" v-on:click="outUserFuc">退出账户</van-button>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/20
  */

  export default {
    name: 'AccountSetIng',
    data() {
      return {
        phone: require( '../../../../assets/img/phone.png'),
        activeNames: ['1']
      };
    },
    methods: {
      outUserFuc() {
        this.$cookie.delete('token');
        this.$cookie.delete('uid');
        this.$cookie.delete('isAuth');
        this.$cookie.delete('ewm_path');
        this.$cookie.delete('userPhone');
        this.$cookie.delete('inventNum');
        this.$cookie.delete('openID');
        this.$router.push({name:'homePage'});
      }
    }
  }
</script>

<style lang="less" src="./accountSetIng.less"></style>
