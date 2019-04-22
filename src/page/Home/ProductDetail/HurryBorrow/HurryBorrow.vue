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
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg1.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg2.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg3.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg4.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg5.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg6.png") },
        // { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg7.png") },
        { imgSrc: require("../../../../assets/img/home/hurryBorrow/bg8.png") },
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
                    background-color: #1989fa;
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