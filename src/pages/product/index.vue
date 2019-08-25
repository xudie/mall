<template>
  <div class="product">
    <div class="header">
      <product-header />
    </div>
    <!-- scroll -->
    <me-scroll class="g-content-container">
      <product-slide :imageList="images" />
      <div class="price-sold">
        <p class="price">￥5888</p>
        <p class="sold">{{favcount}}件已售</p>
      </div>
      <!-- product -info-->
      <div class="product-info">
        <div class="product-info-title">
          <img src="~assets/img/tianmao.png" />
          <span>{{title}}</span>
        </div>
        <div class="product-info-item">
          <span class="postage">包邮</span>
          <span class="sales-volume">月售量34567件</span>
          <span class="address">湖北鄂州</span>
        </div>
      </div>
      <!-- 配送地址 -->
      <div class="delivery-address">
        <span>配送至:</span>
        <img src="~assets/img/leftjiantou.png" />
      </div>
      <!-- 评价 -->
      <div class="assess">
        <div class="assess-quantity">
          <p>
            {{rateTotal}}
            <span>条评价</span>
          </p>
          <img src="~assets/img/leftjiantou.png" />
        </div>
        <div class="assess-content" v-for="rate in rateList" :key="rate.feedId">
          <p class="username">{{rate.userName}}</p>
          <p class="content">{{rate.content}}</p>
          <span class="date">{{rate.dateTime}}</span>
        </div>
      </div>
      <!-- shop -->
      <div class="shop">
        <div class="shop-info">
          <div class="shop-logo">
            <img :src="shopIcon" />
          </div>
          <div class="shop-name">
            <p class="name">{{shopName}}</p>
            <p class="tmall">
              天猫
              <span>TMALL.COM</span>
            </p>
          </div>
        </div>
        <div class="shop-credit">
          <div class="shop-credit-item" v-for="(evaluate,index) in evaluates" :key="index">
            <span>{{evaluate.title}}:</span>
            <span class="score">{{evaluate.score}}</span>
            <p>{{evaluate.levelText}}</p>
          </div>
        </div>
      </div>
      <!-- 详情 评价 参数 -->
      <div class="sort">
        <p>详情</p>
        <p>评价</p>
        <p>参数</p>
      </div>
      <product-assess />
    </me-scroll>
    <!-- footer -->
    <product-footer />
  </div>
</template>

<script>
import ProductHeader from "./header";
import ProductFooter from "./footer";
import ProductSlide from "./slider";
import productAssess from "./assess";
import MeScroll from "base/scroll";
import { getProductInfoById } from "api/home";

export default {
  data() {
    return {
      productInfo: {},
      images: [],
      title: "",
      favcount: 0,
      rateTotal: 0,
      rateList: [],
      shopIcon: "",
      shopName: "",
      evaluates: []
    };
  },
  name: "Pruduct",
  components: {
    ProductHeader,
    ProductFooter,
    ProductSlide,
    productAssess,
    MeScroll
  },
  created() {
    let pid = this.$route.params.id;
    //window.console.log(pid);
    getProductInfoById(pid).then(result => {
      //window.console.log(result);
      this.productInfo = result;
      this.images = result.data.item.images;
      this.title = result.data.item.title;
      this.favcount = result.data.item.favcount;
      this.rateTotal = result.data.item.commentCount;
      this.rateList = result.data.rate.rateList;
      this.shopIcon = result.data.seller.shopIcon;
      this.shopName = result.data.seller.shopName;
      this.evaluates = result.data.seller.evaluates;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
.header {
  width: 100%;
  position: absolute;
  z-index: $tabbar-z-index;
}
.g-content-container {
  padding-top: $navbar-height;
  overflow: hidden;
  height: 100%;
}
.price-sold {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  background: -webkit-linear-gradient(
    left,
    rgb(240, 92, 166),
    rgb(240, 44, 70)
  );
  background: -o-linear-gradient(left, rgb(240, 92, 166), rgb(240, 44, 70));
  background: -moz-linear-gradient(left, rgb(240, 92, 166), rgb(240, 44, 70));
  background: linear-gradient(to right, rgb(240, 92, 166), rgb(240, 44, 70));
  @include flex-between();

  .price {
    color: #fff;
    font-size: 16px;
  }
  .sold {
    color: #fff;
  }
}

.product-info {
  width: 100%;
  height: 90px;
  background-color: #fff;

  &-title {
    color: #000;
    padding: 15px 10px;
    img {
      width: 16px;
      height: 16px;
    }
    span {
      font-size: 14px;
      padding-left: 5px;
    }
  }
  &-item {
    padding: 10px 10px;
    @include flex-between();
  }
}

//配送地址
.delivery-address {
  width: 100%;
  height: 40px;
  background-color: #fff;
  margin-top: 8px;
  padding: 0 10px;
  @include flex-between();

  span {
    color: #000;
  }
  img {
    width: 16px;
    height: 16px;
  }
}

//assess 用户评价
.assess {
  width: 100%;
  //height: 100px;
  margin-top: 8px;
  padding: 0 10px;
  background-color: #fff;

  &-quantity {
    width: 100%;
    height: 30px;
    @include flex-between();
    border-bottom: 1px solid rgb(236, 236, 236);

    p {
      color: #000;
      span {
        color: rgb(126, 126, 126);
      }
    }
    img {
      width: 16px;
      height: 16px;
    }
  }

  &-content {
    width: 100%;
    //height: 60px;
    padding: 10px 0;
    p {
      color: #000;
      font-size: 13px;
    }
    .content {
      padding: 5px 0;
      line-height: 120%;
    }
  }
}

//shop
.shop {
  width: 100%;
  margin-top: 8px;
  padding: 0 10px;
  background-color: #fff;

  &-info {
    width: 100%;
    padding: 10px 0;
    @include flex-between(flex-start);

    .shop-name {
      padding: 0 20px;
      p {
        font-size: 14px;
        color: #000;
      }

      .tmall {
        color: red;
        padding-top: 10px;
        font-size: 13px;

        span {
          font-size: 12px;
        }
      }
    }
  }

  &-credit {
    width: 100%;
    @include flex-between(flex-start);
    flex-direction: culumn;
    padding-bottom: 12px;

    &-item {
      @include flex-center();
      padding-right: 10px;
      span {
        color: rgb(126, 126, 126);
      }
      .score {
        color: red;
        padding: 0 2px;
      }

      p {
        width: 16px;
        height: 20px;
        background-color: red;
        border-radius: 4px;
        line-height: 18px;
        text-align: center;
        color: #fff;
      }
    }
  }
}

//sort
.sort {
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-bottom: 1px solid rgb(212, 212, 212);
  display: flex;
  margin-top: 10px;

  p {
    font-size: 15px;
    flex: 1;
    @include flex-center();
  }
}
</style>