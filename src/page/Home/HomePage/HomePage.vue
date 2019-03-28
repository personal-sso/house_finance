<template>
  <div class="home-page">
    <div class="slide">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item
          v-for="(item,index) in bannerList"
          :key="item.content"
        >
          <a v-if="index==0" href="javascript:void(0);">
            <img
              class="images"
              :src="item.src"
              alt=""
            >
          </a>
          <a v-else-if="index==1" :href="item.url">
            <img
              class="images"
              :src="item.src"
              alt=""
            >
          </a>
          <a href="javascript:void(0);" v-else  @click="saveImg(item.url,item.title)">
            <img
              class="images"
              :src="item.src"
              alt=""
            >
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="notice-box">
      <img
        src="../../../assets/img/home/notice.png"
        alt=""
      >
      <van-swipe
        :autoplay="3000"
        vertical
        :show-indicators="false"
        class="notice"
      >
        <van-swipe-item
          class="sub-notice"
          v-for="item in messageList"
          :key="item.pid"
        >
          <router-link :to="{name:'Notify'}">{{item.content}}</router-link>
        </van-swipe-item>
        <van-swipe-item
          class="sub-notice"
          v-if="messageList.length == 0"
        >
          <router-link :to="{name:'Notify'}">暂无消息通知。</router-link>
        </van-swipe-item>
        <!-- <van-swipe-item
          class="sub-notice"
          v-if="uToken == undefined"
        >
          <router-link :to="{name:'Notify'}">未登录，点击登录。</router-link>
        </van-swipe-item> -->
      </van-swipe>
    </div>
    <div v-if="uToken == undefined" class="state-bar">
      <div class="not-log">
        <van-button class="logBtn" @click="goLogin" type="default">登录/注册</van-button>
        <p>加入山高房金经纪人，让赚钱变的更简单</p>
      </div>
    </div>
    <div v-if="uToken != undefined && isAuth == 'false'" class="state-bar">
      <div class="not-bind">
        <div class="cover">
          <img src="../../../assets/img/photo.png" alt="">
        </div>
        <div class="text">
          <p class="small">实名认证 > 推荐客户 > 赚取佣金</p>
          <p class="big">完成实名认证就能赚取佣金啦</p>
        </div>
        <van-button class="go" @click="goBank" type="default">GO</van-button>
      </div>
    </div>
    <div class="spread ">
      <div
        class="sBottom"
        v-for="(item,index) in productInfo"
        :key="item.p_introduction[0].pid"
      >
        <router-link :to="{name:'productBrief',params:{id:item.pid}}">
          <img
            class="images"
            :src="item.p_introduction[0].api_path"
            alt=""
            @click="setProInfo(item)"
          >
        </router-link>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li
          v-for="item in getEntryList"
          :key="item.order_num"
          
        >
          <router-link :to="item.router">
            <i>
              <img
                class="images"
                @click="setTitle"
                :src="item.icon"
                alt=""
              >
            </i>
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>

    </div>
    <div class="order">
      <div class="order-title">
        <img
          src="../../../assets/img/home/order.png"
          alt=""
        >
        <span>
          共享订单&nbsp;&nbsp;(<i>{{shareOrderList.length}}</i>)
        </span>
      </div>
      <div
        class="order-info"
        v-for="item in shareOrderList"
        :key="item.pid"
      >
        <div class="user">
          <div class="name"><img
              src="../../../assets/img/home/people.png"
              alt=""
            > 推单人：<span class="b">{{item.push_user_name}}</span></div>
          <div class="number">{{item.order_no}}</div>
        </div>
        <div class="info">
          <div class="info-top">
            <p class="price"><span class="p-number1">{{item.loan_amount}}</span> 万</p>
            <p class="times"><span class="p-number2">{{item.borrowing_period}} </span> 个月</p>

          </div>
          <div class="info-middle">

            <div class="flex">
              <div class="flex-1">
                <p class="site"><i>房产地址：</i><span>{{item.address || '无'}}</span></p>
                <p class="area"><i>房产面积：</i><span>{{item.area || '无'}}</span></p>
                <!-- <p class="values"><i>房产估值：</i><span>{{item.total_price || '无'}}</span></p> -->
                <p class="brief"><i>项目简介：</i><span>{{item.project_desc || '无'}}</span></p>
              </div>
              <div class="flex-1 ml20">
                <p class="condition"><i>征信情况：</i><span class="line-clamp-2">{{credit1(item.credit_information)}}</span></p>
                <p class="dates"><i>推单日期：</i><span>{{item.push_time || '无'}}</span></p>
              </div>
            </div>

          </div>
          <div class="info-bottom">
            <button
              @click="popUp(item.push_user_name,item.order_no,item.pid)"
              class="single"
              v-if="uid != item.fk_user_id"
            >抢&nbsp;&nbsp;&nbsp;单</button>
          </div>
        </div>
      </div>
      <div
        class="empty"
        v-if="shareOrderList.length == 0"
      >暂无最新的共享订单消息了~</div>
    </div>
    <van-popup v-model="show">
      <div class="pop-up">
        <h2 class="p-title">
          <img
            class="p-share"
            src="../../../assets/img/home/share.png"
            alt=""
          > 共享订单抢单
        </h2>
        <div class="p-container">
          <p class="p-info">
            <span>推单人：{{orderInfo.uName}}</span>
            <span>{{orderInfo.uNum}}</span>
          </p>
          <p class="p-tips">
            <img
              src="../../../assets/img/home/tips.png"
              alt=""
            > 此借款信息为经纪人提供，平台仅做信息展示。
          </p>
          <van-button
            @click="grabOrder(orderInfo.uPid)"
            class="p-btn"
          >确&nbsp;&nbsp;&nbsp;&nbsp;定</van-button>
        </div>
      </div>
    </van-popup>
    <vueToTop
      type="13"
      top="500"
      bottom="70"
      duration="200"
    ></vueToTop>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      bannerList: [],
      getEntryList: [],
      messageList: [],
      productInfo: [],
      shareOrderList: [],
      orderInfo: {},
      uToken: "",
      isAuth: "",
      city: "",
      uid: ""
    };
  },
  created() {
    // 获取当前定位城市
    // if (window.BMap) {
    //   var myCity = new BMap.LocalCity();
    //   myCity.get(result => {
    //     this.city = result.name;
    //     // 根据定位获取共享订单列表
    //     alert(this.city);
    //     this.$axios
    //       .fetchPost("/getShareOrderList?t=" + Date.now(), {
    //         city: this.city
    //       })
    //       .then(res => {
    //         this.shareOrderList = res.data;
    //       });
    //   });
    // } else {
    //   this.$axios
    //     .fetchPost("/getShareOrderList?t=" + Date.now(), {
    //       city: ""
    //     })
    //     .then(res => {
    //       this.shareOrderList = res.data;
    //     });
    // }

    this.$axios
      .fetchPost("/getShareOrderList?t=" + Date.now())
      .then(res => {
        this.shareOrderList = res.data;
      });

    // 获取token
    this.uToken = this.$cookie.get("token");
    // 获取用户id
    this.uid = this.$cookie.get("uid");
    // 获取用户是否实名
    this.isAuth = this.$cookie.get("isAuth");
    // 获取轮播图
    this.$axios.fetchPost("/getBannerList?t=" + Date.now()).then(res => {
      this.bannerList = res.data;
    });
    // 获取快捷入口
    this.$axios.fetchPost("/getEntryList?t=" + Date.now()).then(res => {
      this.getEntryList = res.data;
    });
    // 获取最新消息
    this.$axios
      .fetchPost(
        "/messageNotification",
        {
          page: 1
        },
        this.uToken
      )
      .then(res => {
        if (res.code === "1") {
          this.messageList = res.data.messages;
        }
      });
    // 获取产品介绍
    this.$axios.fetchPost("/getProductList?t=" + Date.now()).then(res => {
      res.data.forEach(v => {
        v.p_introduction = JSON.parse(v.p_introduction);
      });
      console.log(res.data);
      this.productInfo = res.data;
    });
  },
  methods: {
    setTitle(){
      let info = {
        p_name:'宅业贷一押'
      }
      this.$store.commit("changePInfo", info);
      localStorage.setItem(
        "p_info",
        JSON.stringify(this.$store.state.home.p_info)
      );
    },
    popUp(uName, uNum, uPid) {
      if (this.uToken) {
        if (this.isAuth === "true") {
          this.orderInfo = {
            uName,
            uNum,
            uPid
          };
          this.show = true;
        } else {
          Dialog.confirm({
            title: "温馨提示",
            message: "完成绑卡实名认证才能抢单，是否绑定?"
          })
            .then(() => {
              // on confirm
              this.$router.push("/user/cash/certification?opType=1");
            })
            .catch(() => {
              // on cancel
            });
        }
      } else {
        Toast("请先登录");
        this.$router.push({ name: "login" });
      }
    },
    setProInfo(info) {
      this.$store.commit("changePInfo", info);
      localStorage.setItem(
        "p_info",
        JSON.stringify(this.$store.state.home.p_info)
      );
    },
    grabOrder(pid) {
      this.$axios
        .fetchPost(
          "/grabShareOrder",
          {
            pid
          },
          this.uToken
        )
        .then(res => {
          if (res.code === "1") {
            this.show = false;
            this.shareOrderList.forEach((v, i) => {
              if (this.orderInfo.uNum == v.order_no) {
                this.shareOrderList.splice(i, 1);
              }
            });
            Toast.success(res.msg);
          }
        });
    },
    credit1(data) {
      let obj = JSON.parse(data);
      let str = `近12个月贷款逾期${obj.loc ? obj.loc : 0}笔、信用卡逾期${
        obj.coc ? obj.coc : 0
      }笔;`;
      return str;
    },
    saveImg(src,title){
      this.$store.commit("changeImg", src);
      this.$store.commit("changeTitle", title);
      localStorage.setItem(
        "bannerImg",
        JSON.stringify(this.$store.state.home.bannerImg)
      );
      localStorage.setItem(
        "title",
        JSON.stringify(this.$store.state.home.title)
      );
      this.$router.push('/banner');
    },
    goBank(){
      this.$router.push("/user/cash/certification?opType=1");
    },
    goLogin(){
      this.$router.push("/loginRegister");
    }
  },
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  }
};
</script>

<style lang="less" src="./homePage.less">
</style>
