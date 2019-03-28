<template>
  <div class="product-brief">
    <!-- <div class="slide">
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
    </div> -->
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
          <!-- <div class="c-item">
            <h3>抵押物准入标准</h3>
            <p>抵押物准入标准：以新贷款发放银行的审批规定。</p>
          </div>
          <div class="c-item">
            <h3>借款人准入标准</h3>
            <p>1、借款人：18~65周岁具有完全民事行为能力的中国大陆公民，且为产权人；如已婚，配偶须作为借款人；</p>
            <p>2、征信：不受理有被执行记录且未结案者、征信记录近12个月出现4次及以上逾期，近6个月出现3次及以上逾期者;当前逾期不能提供结清证明者；</p>
            <p>3、从事行业：不受理房地产开发商，钢贸，娱乐行业（如酒吧、麻将室、游戏厅等），同行业（经营民间借贷、票据经营、pos机等），以及各种带有灰色和非法行为的行业；经营实体在异地等。具体以批复行批复为准。</p>
          </div> -->
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
  </div>
</template>
<script>
import { Dialog,Toast } from "vant";
export default {
  data() {
    return {
      p_selling_point: [],
      p_open_city: "",
      p_access_criteria: {},
      p_flow: {},
      pid: "",
      imgSrc:''
    };
  },
  created() {
    console.log(this.$cookie.get("isAuth"));
    this.$axios.fetchPost('/getProductInfo',{pid:this.$route.params.id}).then(res=>{
      console.log(res);
      this.p_open_city = res.data.p_open_city.substring(1,res.data.p_open_city.length-1).replace(/"/g,'');
      this.p_access_criteria = JSON.parse(res.data.p_access_criteria);
      this.p_flow = JSON.parse(res.data.p_flow);
      this.p_selling_point = JSON.parse(res.data.p_selling_point);
      this.pid = res.data.pid;
      this.imgSrc = JSON.parse(res.data.p_introduction)[0].api_path;
      // this.$store.commit('changeTitle',res.data.p_name);
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
        this.$router.push({name:'subOrderA',params:{id:this.pid}});
      }
    }
  },
  components: {
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  }
};
</script>
<style lang="less" src="./productBrief.less"></style>
