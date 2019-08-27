<template>
  <div class="product">
    <div class="header">
      <product-header />
    </div>
    <!-- scroll -->
    <me-scroll class="g-content-container" ref="scroll" @scroll-end="scrollEnd">
      <product-slide :imageList="images" />
      <div class="price-sold">
        <p class="price">￥{{price}}</p>
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
        <p @click="currbox = 1">详情</p>
        <p @click="showProductAssess">评价</p>
        <p @click="currbox = 3">参数</p>
      </div>
      <div>
        <div v-show="currbox == 1">
          <span>详情</span>
        </div>
        <div v-show="currbox == 2">
          <product-assess ref="productAssess" :pid="pid" />
        </div>
        <div v-show="currbox == 3">
          参数
          <product-parameter />
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @back-to-top="backToTop" />
    </div>
    <!-- footer -->
    <product-footer @add-shopping-car="addShoppingCar" />
  </div>
</template>

<script>
import ProductHeader from "./header";
import ProductFooter from "./footer";
import ProductSlide from "./slider";
import productAssess from "./assess";
import productParameter from "./parameter";
import MeScroll from "base/scroll";
import { getProductInfoById } from "api/home";
import MeBacktop from "base/backtop";

export default {
  data() {
    return {
      pid: 0,
      productInfo: {},
      images: [],
      title: "",
      price: 0.0,
      mockData: {},
      stack: {},
      favcount: 0,
      rateTotal: 0,
      rateList: [],
      shopId: 0,
      shopIcon: "",
      shopName: "",
      evaluates: [],
      currbox: 1,
      isBacktopVisible: false
    };
  },
  name: "Pruduct",
  components: {
    ProductHeader,
    ProductFooter,
    ProductSlide,
    productAssess,
    productParameter,
    MeScroll,
    MeBacktop
  },
  created() {
    //window.console.log(this.$route);

    // this.$route.params.id
    // 是取路由中（地址栏中）的参数 id 默认是不用这样写（?id=001）
    this.pid = this.$route.params.id;
    //window.console.log(pid);
    getProductInfoById(this.pid).then(result => {
      //window.console.log(result);
      this.productInfo = result;
      this.images = result.data.item.images;
      this.title = result.data.item.title;
      // 把json字符串转成对象
      this.mockData = JSON.parse(result.data.mockData);
      window.console.log(this.mockData);
      this.stack = JSON.parse(result.data.apiStack[0].value);
      window.console.log(this.stack);
      this.price = this.mockData.price.price.priceText;
      this.favcount = result.data.item.favcount;
      this.rateTotal = result.data.item.commentCount;
      this.rateList = result.data.rate.rateList;
      this.shopId = result.data.seller.shopId;
      this.shopIcon = result.data.seller.shopIcon;
      this.shopName = result.data.seller.shopName;
      this.evaluates = result.data.seller.evaluates;
    });
  },
  mounted() {
    this.$refs.scroll.update();
  },
  methods: {
    showProductAssess() {
      this.currbox = 2;
      // 调用子组件中的 load 方法 传入ID
      this.$refs.productAssess.load(this.pid);
    },
    backToTop() {
      this.$refs.scroll && this.$refs.scroll.scrollToTop();
    },
    scrollEnd(translate, scroll) {
      window.console.log(
        `translate:${translate} height:${scroll.height} visible:${this.isBacktopVisible}`
      );
      this.isBacktopVisible = translate < 0 && -translate > scroll.height;
    },
    addShoppingCar() {
      // 加入购物车逻辑
      let shoppingCarData = JSON.parse(
        window.localStorage.getItem("shoppingCarData")
      );

      if (shoppingCarData == null) {
        shoppingCarData = {
          // 购物车宝贝总数
          totalCount: 0,
          totalMoney: 0,
          allSelected: false,
          shopList: []
        };

        let shop = {
          id: this.shopId,
          name: this.shopName,
          isSelected: false,
          commodityList: []
        };

        let commodity = {
          pid: this.pid,
          money: this.price,
          name: this.title,
          isSelected: false,
          imgSrc: this.images[0],
          props:
            typeof this.stack.skuBase == "undefined"
              ? {}
              : typeof this.stack.skuBase.props == "undefined"
              ? {}
              : this.stack.skuBase.props,
          count: 1
        };

        shop.commodityList.push(commodity);
        shoppingCarData.shopList.push(shop);
      } else {
        let shopList = shoppingCarData.shopList.filter(
          shop => shop.id == this.shopId
        );
        if (
          // 判断是否存在这个门店
          shopList.length > 0
        ) {
          window.console.log("存在该门店");
          if (
            // 判断门店中是否存在这个商品
            shopList[0].commodityList.filter(item => item.pid == this.pid)
              .length > 0
          ) {
            window.console.log("存在该商品");
            shoppingCarData.shopList
              .filter(shop => shop.id == this.shopId)[0]
              .commodityList.filter(item => item.pid == this.pid)[0].count++;
          } else {
            window.console.log("不存在该商品");
            let commodity = {
              pid: this.pid,
              money: this.price,
              name: this.title,
              isSelected: false,
              imgSrc: this.images[0],
              props:
                typeof this.stack.skuBase == "undefined"
                  ? {}
                  : typeof this.stack.skuBase.props == "undefined"
                  ? {}
                  : this.stack.skuBase.props,
              count: 1
            };
            shoppingCarData.shopList
              .filter(shop => shop.id == this.shopId)[0]
              .commodityList.push(commodity);
          }
        } else {
          window.console.log("不存在该门店");
          let shop = {
            id: this.shopId,
            name: this.shopName,
            isSelected: false,
            commodityList: []
          };

          let commodity = {
            pid: this.pid,
            money: this.price,
            name: this.title,
            isSelected: false,
            imgSrc: this.images[0],
            props:
              typeof this.stack.skuBase == "undefined"
                ? {}
                : typeof this.stack.skuBase.props == "undefined"
                ? {}
                : this.stack.skuBase.props,
            count: 1
          };
          shop.commodityList.push(commodity);
          shoppingCarData.shopList.push(shop);
        }
      }

      // 把购物车数据对象转换成JSON
      let json = JSON.stringify(shoppingCarData);
      window.localStorage.setItem("shoppingCarData", json);
    }
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
  padding-bottom: $tabbar-height;
  overflow: hidden;
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