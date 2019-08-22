<template>
  <div class="personal">
    <header class="g-header-container">
      <personal-header />
    </header>
    <div class="g-content-container">
      <me-scroll>
        <personal-info />
        <div class="order">
          <div class="order-inquiry">
            <div class="order-inquiry-left">
              <img src="~assets/img/dingdan.png" />
              <span>我的订单</span>
            </div>
            <div class="order-inquiry-right">
              <span>查看我的全部订单</span>
              <img src="~assets/img/leftjiantou.png" />
            </div>
          </div>
          <ul class="order-service">
            <li class="order-service-item">
              <img src="~assets/img/daifukuan.png" />
              <p>待付款</p>
            </li>
            <li class="order-service-item">
              <img src="~assets/img/daishouhuo.png" />
              <p>待收货</p>
            </li>
            <li class="order-service-item">
              <img src="~assets/img/daipingjia.png" />
              <p>待评价</p>
            </li>
            <li class="order-service-item">
              <img src="~assets/img/tuikuan.png" />
              <p>退货/退款</p>
            </li>
          </ul>
        </div>
        <div class="assets">
          <div class="assets-title">
            <img src="~assets/img/zichan.png" />
            <span>我的资产</span>
          </div>
          <div class="assets-service">
            <span>现金券</span>
            <span>红包</span>
            <span>余额</span>
            <span>礼品卡</span>
          </div>
        </div>
        <div class="other">
          <div class="other-item">
            <div class="other-item-left">
              <img src="~assets/img/shouhoukefu.png" />
              <span>我的订单</span>
            </div>
            <img src="~assets/img/leftjiantou.png" />
          </div>
          <!-- <div class="other-item">
            <div class="other-item-left">
              <img src="~assets/img/shouhoukefu.png" />
              <span>意见反馈</span>
            </div>
            <img src="~assets/img/leftjiantou.png" />
          </div>
          <div class="other-item">
            <div class="other-item-left">
              <img src="~assets/img/shouhoukefu.png" />
              <span>收货地址</span>
            </div>
            <img src="~assets/img/leftjiantou.png" />
          </div>
          <div class="other-item">
            <div class="other-item-left">
              <img src="~assets/img/shouhoukefu.png" />
              <span>退出登录</span>
            </div>
            <img src="~assets/img/leftjiantou.png" />
          </div>
          <div class="other-item">
            <div class="other-item-left">
              <img src="~assets/img/shouhoukefu.png" />
              <span>400-124-8888</span>
            </div>
            <img src="~assets/img/leftjiantou.png" />
          </div>-->
        </div>
      </me-scroll>
    </div>
  </div>
</template>

<script>
import PersonalHeader from "./header";
import PersonalInfo from "./info";
import MeScroll from "base/scroll/index.vue";
export default {
  name: "Personal",
  components: {
    PersonalHeader,
    PersonalInfo,
    MeScroll
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.personal {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;

  .g-content-container {
    //display: flex;
    padding-top: $navbar-height;
    overflow: hidden;
    height: 100%;

    .order,
    .assets {
      width: 100%;
      background-color: #fff;
      margin-top: 10px;
      &-inquiry {
        // height: 30px;
        border-bottom: 1px solid rgb(212, 211, 211);
        @include flex-between();

        &-left,
        &-right {
          @include flex-center();
          img {
            width: 20%;
            height: 20%;
            margin: 0 10px;
          }
        }
        &-left {
          span {
            color: #000;
            font-size: 13px;
          }
        }
      }
      &-service {
        //height: 80px;
        padding: 10px 0;
      }

      .order-service {
        @include flex-center();
        // justify-content: space-around;
        &-item {
          flex: 1;
          @include flex-center(column);

          img {
            padding-bottom: 5px;
          }
        }
      }
    }
    //资产
    .assets {
      width: 100%;
      &-title {
        //height: 30px;
        width: 100%;
        border-bottom: 1px solid rgb(212, 211, 211);
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 7%;
          height: 7%;
          margin: 0 10px;
        }
        span {
          color: #000;
          font-size: 13px;
        }
      }
      &-service {
        //height: 50px;
        padding: 20px 0;
        @include flex-center();
        justify-content: space-around;
      }
    }

    //
    .other {
      width: 100%;
      margin-top: 10px;
      &-item {
        //height: 30px;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid rgb(212, 211, 211);
        @include flex-between();

        &-left {
          @include flex-center();

          span {
            color: #000;
            font-size: 13px;
          }
          img {
            width: 20%;
            height: 20%;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
