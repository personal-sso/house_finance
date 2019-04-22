<template>
  <div id="hurry">
    <van-swipe
      vertical
      :loop="false"
    >
      <van-swipe-item v-for="(item, index) in imgArr" :key="index">
          <img :src="item.imgSrc" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgArr: [
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg1.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg2.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg3.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg4.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg5.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg6.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg7.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg8.png") },
        // { imgSrc: require("../../../../assets/img/home/industryBorrow/bg9.png") },
        { imgSrc: require("../../../../assets/img/home/industryBorrow/bg10.png") },
      ]
    };
  }
};
</script>
<style lang="less">
#hurry {
    height: 100%;
    .van-swipe {
        height: 100%;
        .van-swipe__indicators {
            left: 720px;
            .van-swipe__indicator {
                width: 12px;
                height: 12px;
                background-color: #ccc;
                &.van-swipe__indicator--active {
                    background-color: #ff8554;
                }
            }
        }
    }
}
    img {
        width: 100%;
        height: 100%;
    }
</style>