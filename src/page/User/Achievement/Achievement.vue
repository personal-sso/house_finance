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
        <van-button type="default" class="nav-but" @click="sendInvite">邀请</van-button>
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

    <div ref="achievementMescroll" class="mescroll" v-bind:style="{top: this.isPc() ? pcTop : moveTop}">
      <div ref="achievementScroll" id="scrollWrap">
        <performanceList
          @showIconDescription="showIconDescription"
          v-bind:partnerArr="arr"
        />
      </div>
    </div>

    <van-popup v-model="showWeChat">
      <img src="../../../assets/img/poster/wechat.png" alt="">
    </van-popup>

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
  import * as partnerApi from '../Partner/partnerApi';
  import { mixin } from '../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Achievement',
    components: {
      performanceList,
    },
    data() {
      return {
        pcTop: '8.32rem',
        moveTop: '7.05333rem',
        show: false,
        showWeChat: false,
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
        total: true,
        invicode: '',
        imageUrl: '',
        shareUrl: window.location.href.split('#')[0]
      };
    },
    mounted() {
      this.sendCardFuc();

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
      },

      sendInvite() {
        let nu = navigator.userAgent.toLowerCase();
        let isWechat = nu.indexOf('micromessenger') != -1;
        if(isWechat){
          this.showWeChat = true;
        }else {
          this.$toast('请使用微信浏览器进行分享');
        }
      },

      sendCardFuc() {
        const self = this;
        // if(this.isIos()){
        //   this.shareUrl = window.location.href.split('#')[0];
        //   console.log('iso');
        // }
        partnerApi.shareMyInvitation({}, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            this.invicode = res.data['randomcode'];
            this.imageUrl = res.data['imageUrl'];
            // `http://fj.qkz88.com/#/user/invitation?invicode=${this.invicode}`
            partnerApi.weChatConfig({url: this.shareUrl}, this.$cookie.get('token')).then(res => {
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList: [
                  'checkJsApi',
                  'onMenuShareAppMessage',
                  'onMenuShareTimeline'
                ] // 必填，需要使用的JS接口列表
                // jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData']
              });

              wx.ready(function() {
                let link = 'http://fj.qkz88.com/#/user/invitation?inventNum=' + self.invicode;
                //分享朋友圈
                wx.onMenuShareTimeline({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: self.imageUrl, // 分享图标
                  success(data) {
                    this.$toast({
                      message: '分享成功',
                    });
                  }
                });
                //分享给好友
                wx.onMenuShareAppMessage({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: self.imageUrl, // 分享图标
                  success(data) {
                    this.$toast({
                      message: '分享成功',
                    });
                  }
                })
              });
            });
          }
        });
      },
    }
  }
</script>

<style lang="less" src="./achievement.less"></style>
