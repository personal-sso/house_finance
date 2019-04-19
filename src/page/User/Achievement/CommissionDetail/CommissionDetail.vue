<template>
  <div class="commissionDetail">
    <header class="flex flex-align-center flex-justify-center">
      <p>下级名称</p>
      <p>申请人</p>
      <p>放款金额(元)</p>
      <p>放款时间</p>
      <p>佣金(元)</p>
    </header>

    <div ref="mescroll" class="mescroll">
      <div ref="scrollWrap" id="scrollWrap">
        <ul class="flex flex-align-center flex-justify-center main-ul-warp" v-for="(obj, index) in newArr" :key="index">
          <li class="wd-175">{{obj.p_name}}</li>
          <li class="wd-141">{{obj.borrower_name}}</li>
          <li class="wd-170">{{obj['actual_loan_amount']}}</li>
          <li class="wd-188">{{obj.loan_date}}</li>
          <li class="wd-99">{{obj['commission_amount']}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/18
  */

  import * as achievementApi from '../achievementApi';
  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'

  export default {
    name: 'CommissionDetail',
    data() {
      return {
        page: 0,
        total: true,
        mescroll: null,
        newArr: []
      }
    },
    mounted() {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        down: {
          auto: false,
          callback: this.downCallback,
        },
        up: {
          auto: true,
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">---- 老底都被你看到啦 ----</p>',
          loadFull: {
            use: false,
            delay: 500
          }
        },
      })
    },
    methods: {
      /*
       下拉刷新
       */
      downCallback() {
        achievementApi.myCommissionNew({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.newArr = res.data['orderCommissions'];
          this.$nextTick(() => {
            if(this.newArr.length >= this.total) {
              this.mescroll.endUpScroll(true);
              this.mescroll.endSuccess();
            } else {
              this.mescroll.endSuccess(res.data['orderCommissions'].length, true);
            }
            if(this.$refs.scrollWrap.offsetHeight < 568) {
              this.mescroll.triggerUpScroll();
            }
          })
        });
      },
      /*
       上拉加载
       */
      upCallback() {
        achievementApi.myCommissionNew({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orderCommissions'].forEach((item) => {
            this.newArr.push(item);
          });
          this.$nextTick(() => {
            this.mescroll.endSuccess();
            if(this.$refs.scrollWrap.offsetHeight < 568) {
              this.mescroll.triggerUpScroll();
            }
            if(this.newArr.length >= this.total) {
              this.mescroll.endUpScroll(true)
            } else {
              this.mescroll.endUpScroll(false)
            }
          })
        });
      }
    }
  }
</script>

<style lang="less" src="./commissionDetail.less"></style>
