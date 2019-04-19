<template>
  <div class="achievement">
    <header>
      <ul class="flex flex-align-center flex-justify-center">
        <li class="text-ag-center">
          <router-link to="/user/achievement/detail">
            <p>下级人数</p>
            <strong>{{data['totalCount']}}</strong>
          </router-link>
        </li>

        <li class="text-ag-center">
          <p>提单总数</p>
          <strong>{{data['totalOrderCount']}}</strong>
        </li>

        <li class="text-ag-center">
          <router-link to="/user/achievement/commission">
            <p>放款总额(元)</p>
            <strong>{{data['totalActualLoanAmount']}}</strong>
          </router-link>
        </li>

        <li class="text-ag-center">
          <router-link to="/user/achievement/commission">
            <p>佣金总额(元)</p>
            <strong>{{data['totalCommissionAmount']}}</strong>
          </router-link>
        </li>
      </ul>

      <div class="flex flex-justify-between nav-but-wrap">
        <van-button type="default" class="nav-but">邀请</van-button>
        <router-link to="/user/commission">
          <van-button type="default" class="nav-but">
            提现
          </van-button>
        </router-link>
      </div>
    </header>

    <ul class="leader-wrap">
      <li class="flex flex-align-center">
        <img src="../../../assets/achievement/user.png" class="user-icon">
        <p class="width-35">我的上级</p>
        <p class="color-9a672b width-32">{{this.data['mySuperior']}}</p>
        <a :href="'tel:'+data['mySuperiorMobile']" class="telephone-but">
          <img src="../../../assets/achievement/phone.png" class="phone-icon">
          <span>电话联系</span>
        </a>
      </li>

      <li class="flex flex-align-center">
        <img src="../../../assets/achievement/user.png" class="user-icon">
        <p class="width-35">我的房金经理</p>
        <p class="color-9a672b width-32">{{data['myHc']}}</p>
        <a :href="'tel:'+data['myHcMobile']" class="telephone-but">
          <img src="../../../assets/achievement/phone.png" class="phone-icon">
          <span>电话联系</span>
        </a>
      </li>
    </ul>

    <div ref="achievementMescroll" class="mescroll">
      <div ref="achievementScroll" id="scrollWrap">
        <performanceList
          @showIconDescription="showIconDescription"
          v-bind:partnerArr="arr"
        />
      </div>
    </div>

    <van-dialog
      v-model="show"
      title="图标说明"
      :show-confirm-button="false"
      :show-cancel-button="false"
      block
    >
      <ul class="dialog-ul">
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_fang2.png" class="commission-icon2">
          <p>房金市场经理</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_zhi2.png" class="commission-icon2">
          <p>直营业务员</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2">
          <p>公司员工</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_one2.jpg" class="commission-icon2">
          <p>一级经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_two2.jpg" class="commission-icon2">
          <p>二级经纪人</p>
        </li>
      </ul>

      <van-button type="default" class="icon-but" v-on:click="showIconDescription">知道了</van-button>
    </van-dialog>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/22
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as achievementApi from './achievementApi';
  import performanceList from '../../../components/performanceList';

  export default {
    name: 'Achievement',
    components: {
      performanceList,
    },
    data() {
      return {
        show: false,
        data: {
          myHc: '',
          myHcMobile: '',
          mySuperior: '',
          mySuperiorMobile: '',
          totalActualLoanAmount: '',
          totalCommissionAmount: '',
          totalCount: '',
          totalOrderCount: '',
        },
        arr: [],
        page: 0,
        total: true
      };
    },
    mounted() {
      this.achievementMescroll = new MeScroll(this.$refs.achievementMescroll, {
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
      });

      achievementApi.myAchievementNew({}, this.$cookie.get('token')).then(res => {
        Object.assign(this.data, res.data);
      });
    },
    methods: {
      showIconDescription() {
        this.show = !this.show;
      },

      downCallback() {
        achievementApi.myPartnerNew({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['myPartners'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.achievementMescroll.endUpScroll(true);
              this.achievementMescroll.endSuccess();
            } else {
              this.achievementMescroll.endSuccess(res.data['myPartners'].length, true);
            }
            // if(this.$refs.achievementScroll.offsetHeight < 568) {
            //   this.achievementMescroll.triggerUpScroll();
            // }
          })
        });
      },

      upCallback() {
        achievementApi.myPartnerNew({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['myPartners'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.achievementMescroll.endSuccess();
            // if(this.$refs.achievementScroll.offsetHeight < 568) {
            //   this.achievementMescroll.triggerUpScroll();
            // }
            if(this.arr.length >= this.total) {
              this.achievementMescroll.endUpScroll(true)
            } else {
              this.achievementMescroll.endUpScroll(false)
            }
          })
        });
      }
    }
  }
</script>

<style lang="less" src="./achievement.less"></style>
