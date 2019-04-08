<template>
  <div class="followUpProcess">
    <div class="wrap-result">
      <ul>
        <li class="flex flex-align-center flex-justify-between">
          <p>沟通结果</p>
          <p><img src="../../../../assets/img/icon_rg.png" class="icon_right"></p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p>预约面审时间</p>
          <p><img src="../../../../assets/img/icon_rg.png" class="icon_right"></p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p>订单结束原因</p>
          <p><img src="../../../../assets/img/icon_rg.png" class="icon_right"></p>
        </li>
      </ul>

      <div class="mg-lr20">
        <van-button block type="default" class="handle-but">提交</van-button>
      </div>
    </div>

    <div class="wrap-time">
      <p class="followUpProcess-record">处理记录</p>

      <ul class="timeLine-wrapper">
        <li class="flex flex-align-center">
          <div class="timeLine-icon">
            1
            <div class="time-border"></div>
          </div>
          <div class="time-reason">电话无人接听</div>
          <p class="flex-1 tr">2019-03-19 15：28</p>
        </li>

        <li class="flex flex-align-center">
          <div class="timeLine-icon">
            2
            <div class="time-border"></div>
          </div>
          <div class="time-reason">客户需求不急</div>
          <p class="flex-1 tr">2019-03-19 15：28</p>
        </li>

        <li class="flex flex-align-center">
          <div class="timeLine-icon">
            3
            <div class="time-border"></div>
          </div>
          <div class="time-reason">
            <p>已预约面审时间</p>
            <p>预约时间：2019-03-18  11：30</p>
          </div>
          <p class="flex-1 tr">2019-03-19 15：28</p>
        </li>

        <li class="flex flex-align-center">
          <div class="timeLine-icon">
            4
            <div class="time-border"></div>
          </div>
          <div class="time-reason">
            <p>订单已结束</p>
            <p>结束原因：方案不接受</p>
          </div>
          <p class="flex-1 tr">2019-03-19 15：28</p>
        </li>
      </ul>




    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/1
  */

  export default {
    name: 'FollowUpProcess',
  }
</script>

<style lang="less" src="./followUpProcess.less"></style>
