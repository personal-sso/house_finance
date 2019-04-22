<template>
  <div class="lowerDetail">
    <div class="lowerDetail-hed">
      <header class="flex flex-align-center">
        <p class="mr-33">统计时间</p>
        <van-field v-model="startTimeValue" v-on:focus="startTimeFuc('start')" readonly/>
        <span class="cl-7f7f7f">&nbsp;—&nbsp;</span>
        <van-field v-model="endTimeValue" v-on:focus="startTimeFuc('end')" readonly/>
        <van-button type="default" class="screen-but" v-on:click="showTerm">筛选</van-button>
      </header>

      <div class="flex flex-align-center">
        <p class="mr-33">下级名称</p>
        <van-field class="junior-name" v-model="value"/>
        <van-button type="default" class="confirm-but" v-on:click="downCallback()">确定</van-button>
      </div>
    </div>

    <div class="deployment-screen" v-if="term">
      <div class="flex flex-align-center">
        <img src="../../../../assets/achievement/px.png" class="icon-px">
        <p class="ft-32">&nbsp;&nbsp;排序</p>
      </div>

      <ul class="sort-wrap">
        <li v-bind:class="{'sort-bg':1 === sortBg}" v-on:click="selectScreen(1, 'sub_low_to_high')">下级人数由低到高</li>
        <li v-bind:class="{'sort-bg':2 === sortBg}" v-on:click="selectScreen(2, 'sub_high_to_low')">下级人数由高到低</li>
        <li v-bind:class="{'sort-bg':3 === sortBg}" v-on:click="selectScreen(3, 'loan_amount_low_to_high')">放款金额由低到高</li>
        <li v-bind:class="{'sort-bg':4 === sortBg}" v-on:click="selectScreen(4, 'loan_amount_high_to_low')">放款金额由高到低</li>
      </ul>

      <div class="flex flex-align-center">
        <img src="../../../../assets/achievement/fl.png" class="icon-fl">
        <p class="ft-32">&nbsp;&nbsp;分类</p>
      </div>

      <ul class="sort-wrap2">
        <li v-on:click="selectScreen2('A')">公司员工</li>
        <li v-on:click="selectScreen2('A+')">一级经纪人</li>
        <li v-on:click="selectScreen2('B')">二级经纪人</li>
      </ul>
    </div>

    <div ref="LowerMescroll" class="mescroll" v-bind:style="{top: this.isPc() ? pcTop : moveTop}">
      <div ref="LowerScroll" id="scrollWrap">
        <performanceList
          @showIconDescription="showIconDescription"
          v-bind:partnerArr="arr"
        />
      </div>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="onCancelDate"
        @confirm="selectDate"
      />
    </van-popup>

    <van-dialog
      v-model="show2"
      title="图标说明"
      :show-confirm-button="false"
      :show-cancel-button="false"
      block
    >
      <ul class="dialog-ul">
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../../assets/achievement/icon_fang2.png" class="commission-icon2">
          <p>房金市场经理</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../../assets/achievement/icon_zhi2.png" class="commission-icon2">
          <p>直营业务员</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2">
          <p>公司员工</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../../assets/achievement/icon_one2.jpg" class="commission-icon2">
          <p>一级经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../../assets/achievement/icon_two2.jpg" class="commission-icon2">
          <p>二级经纪人</p>
        </li>
      </ul>

      <van-button type="default" class="icon-but" v-on:click="showIconDescription">知道了</van-button>
    </van-dialog>

    <div class="van-overlay2" v-if="term" v-on:click="showTerm"></div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/15
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as achievementApi from '../achievementApi';
  import performanceList from '../../../../components/performanceList';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'LowerDetail',
    components: {
      performanceList,
    },
    data() {
      return {
        pcTop: '4.34667rem',
        moveTop: '3.08rem',
        show2: false,
        startTimeValue: '',
        endTimeValue: '',
        show: false,
        minDate: new Date(2018, 10 ,1),
        value: '',
        currentDate: new Date(),
        statusTime: '',
        dialogStatus: false,
        arr: [],
        page: 0,
        total: true,
        term: false,
        sort: '',
        sortBg: '',
        category: ''
      }
    },
    mounted() {
      this.LowerMescroll = new MeScroll(this.$refs.LowerMescroll, {
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
    },
    methods: {
      showIconDescription() {
        this.show2 = !this.show2;
      },
      onCancelDate() {
        this.show = false;
      },
      selectDate(value) {
        let time = new Date(value);
        let month = new Date(value).getMonth();
        let getDate = new Date(value).getDate();
        let getMonth;
        let getDay;
        let final;
        this.show = false;

        if(month + 1 < 10) {
          getMonth = '0' + (new Date(value).getMonth() + 1);
        } else {
          getMonth = new Date(value).getMonth() + 1;
        }

        if(getDate < 10) {
          getDay = '0' + getDate;
        } else {
          getDay = getDate;
        }
        final = time.getFullYear() + '-' + getMonth + '-' + getDay;
        if(this.statusTime === 'start') {
          this.startTimeValue = final;
        } else {
          this.endTimeValue = final;
        }
        this.postTimePartnerNew();
      },
      postTimePartnerNew() {
        let status = new Date(this.startTimeValue).getTime() > new Date(this.endTimeValue).getTime();
        if(status) {
          this.$toast({
            message: '起始时间不能大于结束时间'
          });
        } else if(this.startTimeValue !== '' && this.endTimeValue !== '' && !status) {
          this.downCallback();
        }
      },
      startTimeFuc(str) {
        this.statusTime = str;
        this.show = true;
      },
      selectScreen(num, str) {
        this.sortBg = num;
        this.sort = str;
        this.showTerm();
        this.downCallback()
      },
      selectScreen2(str) {
        this.category = str;
        this.showTerm();
        this.downCallback()
      },
      showTerm() {
        this.term = !this.term
      },
      downCallback() {
        achievementApi.myPartnerNew({
          start: 1,
          startDate: this.startTimeValue,
          endDate: this.endTimeValue,
          user_name: this.value,
          sort: this.sort,
          category: this.category
        }, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['myPartners'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.LowerMescroll.endUpScroll(true);
              this.LowerMescroll.endSuccess();
            } else {
              this.LowerMescroll.endSuccess(res.data['myPartners'].length, true);
            }
            // if(this.$refs.achievementScroll.offsetHeight < 568) {
            //   this.achievementMescroll.triggerUpScroll();
            // }
          })
        });
      },
      upCallback() {
        achievementApi.myPartnerNew({
          start: ++this.page,
          startDate: this.startTimeValue,
          endDate: this.endTimeValue,
          user_name: this.value,
          sort: this.sort,
          category: this.category
        }, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['myPartners'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.LowerMescroll.endSuccess();
            // if(this.$refs.achievementScroll.offsetHeight < 568) {
            //   this.achievementMescroll.triggerUpScroll();
            // }
            if(this.arr.length >= this.total) {
              this.LowerMescroll.endUpScroll(true)
            } else {
              this.LowerMescroll.endUpScroll(false)
            }
          })
        });
      },
    }
  }
</script>

<style lang="less" src="./lowerDetail.less"></style>
