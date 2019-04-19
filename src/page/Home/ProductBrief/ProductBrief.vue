<template>
  <!-- <div class="product-brief">
    <div class="slide">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item>
          <img
            src="../../../assets/img/home/newbar2.jpg"
            alt=""
          >
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="../../../assets/img/home/newbar2.jpg"
            alt=""
          >
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="../../../assets/img/home/newbar2.jpg"
            alt=""
          >
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="../../../assets/img/home/newbar2.jpg"
            alt=""
          >
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="slide">
      <img :src="imgSrc" alt="">
    </div>
    <div class="light-spot">
      <ul>
        <li
          v-for="item in p_selling_point"
          :key="item.pid"
        >
          <div>
            <img
              :src="item.api_path"
              alt=""
            >
          </div>
          <span>{{item.content}}</span>
        </li>
      </ul>
    </div>
    <div class="open-city">
      <div class="title">
        <img
          src="../../../assets/img/home/loca.png"
          alt=""
        >
        <span class="open">开通城市</span>
        <span class="city">{{p_open_city}}</span>
      </div>
      <div class="norm">
        <div class="title">
          <img
            src="../../../assets/img/home/biaozhun.png"
            alt=""
          >
          <span>准入标准</span>
        </div>
        <div class="content">
          <img :src="p_access_criteria.api_path" alt="">
          <div class="c-item">
            <h3>抵押物准入标准</h3>
            <p>1、抵押物属性：可交易的普通住宅，40㎡≤建筑面积≤200㎡；</p>
            <p>2、房龄：普通住宅≤25年（贷款到期日不超过25年）；</p>
            <p>3、产权： 已成年自然人单独所有或共同所有；房产处于有效或抵押状态，无网签备案、查封、扣押等法律纠纷，房产正常交易过户，产权持有半年以上；</p>
            <p>4、估值：搜房网/安居客/链家网、世联评估、抵押物周边房屋中介三者中较低的价格。</p>
          </div>
          <div class="c-item">
            <h3>借款人准入标准</h3>
            <p>1、借款人：18~65周岁具有完全民事行为能力的中国大陆公民，且为产权人；如已婚，配偶须作为借款人；</p>
            <p>2、征信：不受理征信记录近24个月出现5次及以上逾期，近12个月出现4次及以上逾期，近6个月出现3次及以上逾期者;近12月单笔信用卡或单笔贷款累计逾期次数不超过6次；当前逾期不能提供结清证明者；</p>
            <p>3、借款用途：消费/经营；</p>
            <p>4、从事行业：不受理房地产开发商，钢贸，娱乐行业（如酒吧、麻将室、游戏厅等），同行业（经营民间借贷、票据经营、pos机等），以及各种带有灰色和非法行为的行业。</p>
          </div>
        </div>
      </div>
      <div class="flow">
        <div class="title">
          <img
            src="../../../assets/img/home/liuc.png"
            alt=""
          >
          <span>流程</span>
        </div>
        <div class="content">
          <img
            :src="p_flow.api_path"
            alt=""
          >
        </div>
      </div>
      <div class="button">
        <button
          class="submit"
          @click="subOrder"
        >我要提单</button>
      </div>
    </div>
  </div> -->
  <div id="proBrief">
    <van-tabs v-model="active" color="#ff7c12" animated :line-width='60' :line-height='2' @click="getTitle">
      <van-tab :title="item.p_name" v-for="(item, index) in productList" :key="index">
        <div class="merit">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/cup@2x.png" alt="">
            </i>
            <span>产品优势</span>
          </div>
          <div class="content-bar">
            <ul class="flex-ul">
              <li v-for="(item2, index) in item.p_selling_point" :key="index">
                <img :src="item2.api_path" alt="">
                <p>{{item2.content}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="info">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/item@2x.png" alt="">
            </i>
            <span>产品介绍</span>
          </div>
          <div class="content-bar" v-html="item.p_introduction_txt">
          </div>
        </div>
        <div class="enter">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/house@2x.png" alt="">
            </i>
            <span>准入条件</span>
          </div>
          <div class="content-bar" v-html="item.p_access_criteria">
          </div>
        </div>
        <div class="data">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/data@2x.png" alt="">
            </i>
            <span>申请资料</span>
          </div>
          <div class="content-bar" v-html="item.p_apply">
          </div>
        </div>
        <div class="flow">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/flow@2x.png" alt="">
            </i>
            <span>业务流程</span>
          </div>
          <div class="content-bar">
            <img width="97%" :src="item.p_flow.api_path" alt="">
          </div>
        </div>
        <div class="tips">
          ————&nbsp;&nbsp;&nbsp;中国山东高速金融集团(00412.HK)旗下品牌&nbsp;&nbsp;&nbsp;————
        </div>
        <div class="order">
          <van-button type="default" @click="subOrder">我要提单</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Dialog,Toast,Tab, Tabs } from "vant";
export default {
  data() {
    return {
      p_selling_point: [],
      p_open_city: "",
      p_access_criteria: {},
      p_flow: {},
      pid: "",
      imgSrc:'',
      active:0,
      productList:[],
      product:'',
      index:0,
    };
  },
  created() {
    console.log(this.$cookie.get("isAuth"));
    // this.$axios.fetchPost('/getProductInfo',{pid:this.$route.params.id}).then(res=>{
    //   console.log(res);
    //   this.p_open_city = res.data.p_open_city.substring(1,res.data.p_open_city.length-1).replace(/"/g,'');
    //   this.p_access_criteria = JSON.parse(res.data.p_access_criteria);
    //   this.p_flow = JSON.parse(res.data.p_flow);
    //   this.p_selling_point = JSON.parse(res.data.p_selling_point);
    //   this.pid = res.data.pid;
    //   this.imgSrc = JSON.parse(res.data.p_introduction)[0].api_path;
    //   // this.$store.commit('changeTitle',res.data.p_name);
    // })
    this.$axios.fetchPost('/getProductList2').then(res=>{
      console.log(res);
      res.data.forEach((v,i)=>{
        v.p_selling_point = JSON.parse(v.p_selling_point);
        v.p_flow = JSON.parse(v.p_flow);
        if(i === 0){
          this.product = v.p_name;
        }
      })
      this.productList = res.data;
    })
  },
  methods: {
    subOrder() {
      if(!this.$cookie.get('token')){
        Toast('请先登录');
        this.$router.push({name:'login'});
        return;
      }
      if(this.$cookie.get("isAuth") === null){
        Toast('请先登录');
        this.$router.push({name:'login'});
        return;
      }
      if (!JSON.parse(this.$cookie.get("isAuth"))) {
        Dialog.confirm({
          title: "温馨提示",
          message: "实名认证才能提单，现在去认证？"
        })
          .then(() => {
            // on confirm
            this.$router.push('/user/cash/certification?opType=1');
            return;
          })
          .catch(() => {
            // on cancel
            return;
          });
      }else {
        this.$router.push({name:'subOrderA',query:{index:this.index,product:this.product}});
      }
    },
    getTitle(i,v){
      this.index = i;
      this.product = v;
    }
  },
  components: {
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>
<style lang="less" src="./productBrief.less"></style>
