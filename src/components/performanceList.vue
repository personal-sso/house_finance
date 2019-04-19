<template>
  <div class="per-list">
    <div class="flex flex-align-center flex-justify-center ft-item-div">
      <strong>下级名称</strong>
      <strong>下级人数</strong>
      <strong>提单总数</strong>
      <strong>放款总额(元)</strong>
      <strong>佣金总额(元)</strong>
    </div>

    <div v-for="(item, index) in partnerArr" :key="index" v-on:click="subordinateDataFuc(item.pid, index)">
      <ul class="flex flex-align-center ft-item-ul">
        <li class="width-96">{{item['userName']}}</li>
        <li class="width-96">{{item['partnerCount']}}</li>
        <li class="width-96">{{item['orderCount']}}</li>
        <li class="width-136">{{item['actualLoanAmount']}}</li>
        <li class="width-136">
          {{item['commissionAmount']}}
          <img v-if="item.userRole === 'A'" src="../assets/achievement/icon_yuan.jpg" class="commission-icon" v-on:click="showDialogChi">
          <img v-if="item.userRole === 'A+'" src="../assets/achievement/icon_one.jpg" class="commission-icon" v-on:click="showDialogChi">
          <img v-if="item.userRole === 'B'" src="../assets/achievement/icon_two.jpg" class="commission-icon" v-on:click="showDialogChi">
          <img v-if="item.userRole === 'C'" src="../assets/achievement/icon_fang2.png" class="commission-icon" v-on:click="showDialogChi">
          <img v-if="item.userRole === 'D'" src="../assets/achievement/icon_zhi2.png" class="commission-icon" v-on:click="showDialogChi">
        </li>
      </ul>

      <div ref="objLevel" :class="arrLevel.length === 0 ? '' : 'second-level'" :data-pid="item.pid" v-show="current === item.pid">
        <div>
          <ul v-for="(item2, index2) in arrLevel" :key="index2" class="flex flex-align-center ft-item-ul ft-item-level">
            <li class="width-96">{{item2['userName']}}</li>
            <li class="width-96">{{item2['partnerCount']}}</li>
            <li class="width-96">{{item2['orderCount']}}</li>
            <li class="width-136">{{item2['actualLoanAmount']}}</li>
            <li class="width-136">
              {{item2['commissionAmount']}}
              <img v-if="item.userRole === 'A'" src="../assets/achievement/icon_yuan.jpg" class="commission-icon" v-on:click="showDialogChi">
              <img v-if="item.userRole === 'A+'" src="../assets/achievement/icon_one.jpg" class="commission-icon" v-on:click="showDialogChi">
              <img v-if="item.userRole === 'B'" src="../assets/achievement/icon_two.jpg" class="commission-icon" v-on:click="showDialogChi">
              <img v-if="item.userRole === 'C'" src="../assets/achievement/icon_fang2.png" class="commission-icon" v-on:click="showDialogChi">
              <img v-if="item.userRole === 'D'" src="../assets/achievement/icon_zhi2.png" class="commission-icon" v-on:click="showDialogChi">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/17
  */

  import * as achievementApi from '../page/User/Achievement/achievementApi';

  export default {
    props: ['partnerArr'],
    name: 'performanceList',
    data() {
      return {
        current: '',
        arrLevel: []
      }
    },
    methods: {
      showDialogChi() {
        this.$emit('showIconDescription')
      },
      subordinateDataFuc(pid, index) {
        achievementApi.myPartnerNew({uid: pid}, this.$cookie.get('token')).then(res => {
          this.arrLevel = res.data['myPartners']
        });
        this.current = this.$refs.objLevel[index].dataset.pid;
      }
    }
  }
</script>

<style lang="less">
  .per-list {
    background-color: #f6f6f7;
  }
  .ft-item-div {
    margin-top: 28px;
    strong {
      margin-right: 36px;
    }
    strong:last-child {
      margin-right: 0;
    }
  }
  .commission-icon {
    width: 28px;
    height: 28px;
  }
  .commission-icon2 {
    width: 35px;
    height: 35px;
  }
  .ft-item-ul {
    margin: 38px 23px 0 23px;
    li {
      text-align: center;
      word-wrap:break-word
    }
    li:last-child {
      margin-right: 0;
    }
  }
  .second-level ul:first-child {
    margin-top: 0;
  }
  .second-level {
    background-color: #ffffff;
    padding: 24px 0 24px 20px;
    margin-top: 38px;
    min-height: 80px;
    max-height: 400px;
    overflow: scroll;
  }
</style>
