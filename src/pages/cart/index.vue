<template>
  <div class="car">
    <div class="car-header">
      <car-header />
    </div>
    <me-scroll :scrollbar="true">
      <div class="car-repeat">
        <div class="car-repeat-one">
          <div class="car-map">
            <img src="~assets/img/map.png" />
            <span>朝阳区管庄</span>
          </div>
          <span>编辑商品</span>
        </div>
        <div class="car-repeat-two">
          <i class="isYouhui" :class="{ 'active' : isYouhui }" @click="isYouhui = !isYouhui"></i>
          <label>优惠券</label>
        </div>
        <div class="car-repeat-three">
          <span>商品用券前已免运费</span>
        </div>
      </div>
      <!-- section -->
      <div class="section" v-for="(shop,shopindex) in cartData.shopList" :key="shopindex">
        <!-- shop-->
        <div class="shop-name">
          <div
            class="select"
            :class="{'select-active' : shop.isSelected}"
            @click="selectedShop(shopindex)"
          >
            <div class="select-selected" v-show="shop.isSelected"></div>
          </div>
          <img src="~assets/img/tianmao.png" v-if="shop.isTianMao" />
          <span>{{shop.name}}</span>
          <img src="~assets/img/leftjiantou.png" />
        </div>
        <!-- content -->
        <div class="section-item" v-for="(item,itemindex) in shop.commodityList" :key="itemindex">
          <!-- 上 -->
          <div class="product-information">
            <!-- 上左 -->
            <div
              class="select"
              :class="{'select-active' : item.isSelected}"
              @click="selectedCommodity(shopindex,itemindex)"
            >
              <div class="select-selected" v-show="item.isSelected"></div>
            </div>

            <img :src="item.imgSrc" />
            <div class="product-information-right">
              <p>{{item.name}}</p>
              <div class="product-select" @click="buyShow=!buyShow">
                <span>蓝色</span>
                <span>s</span>
                <img src="~assets/img/bottom.png" />
              </div>
              <!-- 下 -->
              <div class="buy">
                <span>￥{{item.money}}</span>
                <div class="buy-num">
                  <p class="plus" @click="countLess(shopindex,itemindex)">-</p>
                  <p class="number">{{item.count}}</p>
                  <p class="less" @click="countAdd(shopindex,itemindex)">+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </me-scroll>
    <div class="car-footer">
      <div class="car-footer-left">
        <div class="select" :class="{'select-active' :cartData.allSelected }" @click="selectedAll">
          <div class="select-selected" v-show="cartData.allSelected"></div>
        </div>
        <p>全选</p>
      </div>
      <div class="car-footer-right">
        <p>
          合计:
          <span>￥{{cartData.totalMoney.toFixed(2)}}&nbsp;&nbsp;</span>
        </p>
        <div class="settlement">
          <span>结算({{cartData.totalCount}})</span>
        </div>
      </div>
    </div>
    <!-- 商品型号选择页 -->
    <div class="buy-item" :v-show="buyShow">
      <div class="buy-item-top">
        <img src="~assets/img/404.png" />
        <div class="select-content">
          <p class="select-content-price">￥</p>
          <p class="select-content-reserve">库存</p>
          <p class="select-content-selected">已选：</p>
        </div>
        <i class="iconfont icon-delete"></i>
      </div>
      <!-- color -->
      <div class="buy-item-color">
        <p>颜色分类</p>
        <div class="color-item">
          <div class="color-list">
            <img src="~assets/img/404.png" />
            <span>灰蓝色（现货）</span>
          </div>
        </div>
      </div>
      <!-- size -->
      <div class="buy-item-size">
        <p>尺码</p>
        <div class="size-item">
          <div class="size-list">
            <span>s</span>
          </div>
        </div>
      </div>

      <!-- sure -->
      <div class="buy-item-footer">
        <p class="sure">
          <span>确定</span>
        </p>
        <p class="see-details">
          <span>查看详情</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CarHeader from "./header";
import MeScroll from "base/scroll";
export default {
  name: "Cart",
  components: {
    CarHeader,
    MeScroll
  },
  data() {
    return {
      buyShow: false,
      // 是否选择优惠券
      isYouhui: true,
      cartData: {}
    };
  },
  created() {
    this.cartData = JSON.parse(window.localStorage.getItem("shoppingCarData"));
  },
  mounted() {
    this.cartData = JSON.parse(window.localStorage.getItem("shoppingCarData"));
  },
  methods: {
    countLess(shopindex, itemindex) {
      if (
        this.cartData.shopList[shopindex].commodityList[itemindex].count > 1
      ) {
        this.cartData.shopList[shopindex].commodityList[itemindex].count--;
      }
      this.updateTotalMoney();
    },
    countAdd(shopindex, itemindex) {
      this.cartData.shopList[shopindex].commodityList[itemindex].count++;
      this.updateTotalMoney();
    },
    selectedShop(shopindex) {
      window.console.log("shopindex:" + shopindex);
      this.cartData.shopList[shopindex].isSelected = !this.cartData.shopList[
        shopindex
      ].isSelected;
      window.console.log(this.cartData.shopList[shopindex].isSelected);

      this.cartData.shopList[shopindex].commodityList.forEach(item => {
        item.isSelected = this.cartData.shopList[shopindex].isSelected;
        window.console.log(item.count);
        //money
        // if (item.isSelected) {
        //   this.cartData.totalMyMoney += item.money * item.count;
        //   window.console.log(item.count);
        // } else {
        //   this.cartData.totalMyMoney -= item.money * item.count;
        // }
      });

      this.checkedSelectedAll();
      // 当你的数剧层次太多，数据是变化了的，但是dom没有更新，没有自动双向数据驱动
      this.updateTotalMoney();
      this.$forceUpdate();
    },
    selectedCommodity(shopindex, itemindex) {
      window.console.log("shopindex:" + shopindex + " itemindex:" + itemindex);
      this.cartData.shopList[shopindex].commodityList[
        itemindex
      ].isSelected = !this.cartData.shopList[shopindex].commodityList[itemindex]
        .isSelected;

      // 逆向思维;
      if (
        this.cartData.shopList[shopindex].commodityList.filter(
          item => !item.isSelected
        ).length == 0
      ) {
        window.console.log("都选了");
        this.cartData.shopList[shopindex].isSelected = true;
      } else {
        this.cartData.shopList[shopindex].isSelected = false;
      }

      this.checkedSelectedAll();
      this.updateTotalMoney();
      this.$forceUpdate();
    },
    checkedSelectedAll() {
      if (this.cartData.shopList.filter(item => !item.isSelected).length == 0) {
        window.console.log("都选了");
        this.cartData.allSelected = true;
      } else {
        this.cartData.allSelected = false;
      }
    },
    selectedAll() {
      this.cartData.allSelected = !this.cartData.allSelected;
      this.cartData.shopList.forEach(shop => {
        shop.isSelected = this.cartData.allSelected;
        shop.commodityList.forEach(item => {
          item.isSelected = this.cartData.allSelected;
        });
      });
      window.console.log(this.cartData.allSelected);
      this.updateTotalMoney();
      this.$forceUpdate();
    },
    updateTotalMoney() {
      // 计算价格和数量 ： 依次循环每一家店中的每一件商品 判断选中则 累加数量 和 money
      // 初始化
      this.cartData.totalMoney = 0;
      this.cartData.totalCount = 0;

      this.cartData.shopList.forEach(shop => {
        if (shop.isSelected) {
          shop.commodityList.forEach(item => {
            if (item.isSelected) {
              this.cartData.totalMoney += item.money * item.count;
              this.cartData.totalCount++;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.car {
  width: 100%;
  height: 100%;
  //background-color: #fff;

  &-header {
    width: 100%;
  }
  &-repeat {
    background-color: #fff;
    div {
      height: 50px;
      border-top: 1px solid rgb(224, 224, 224);
    }
    &-one,
    &-two,
    &-three {
      @include flex-between();
      padding: 0 10px;
    }
    &-one {
      .car-map {
        height: 100;
        @include flex-center();
        border-top: 0;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.isYouhui {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;

  &.active {
    background-color: green;
  }
}

//
.section {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  padding: 0 10px;

  .shop-name {
    width: 100%;
    height: 40px;
    @include flex-between(flex-start);

    img {
      width: 14px;
      height: 14px;
    }
    span {
      color: #000;
      font-size: 14px;
      padding: 0 5px;
    }
  }
  &-item {
    width: 100%;
    padding-bottom: 10px;
    .product-information {
      height: 80px;
      @include flex-between(flex-start);
      img {
        width: 80px;
        height: 100%;
      }
      &-right {
        width: 70%;
        height: 100%;
        padding: 0 10px;

        p {
          color: #000;
          line-height: 15px;
          padding-top: 2px;
          padding-bottom: 10px;
        }

        .product-select {
          background-color: #eee;
          padding: 3px 5px;
          position: absolute;

          img {
            width: 12px;
            height: 12px;
          }
        }
        .buy {
          width: 100%;
          padding-top: 25px;
          @include flex-between();
          span {
            color: red;
          }
          &-num {
            height: 20px;
            border-radius: 5px;
            border: 1px solid #eee;
            @include flex-center();
            .plus,
            .less {
              width: 18px;
              height: 100%;
            }
            .number {
              width: 30px;
              height: 100%;
              border-left: 1px solid #eee;
              border-right: 1px solid #eee;
            }
            p {
              text-align: center;
            }
          }
        }
      }
    }
  }
}

//car-footer
.car-footer {
  width: 100%;
  height: 40px;
  position: absolute;
  left: 0;
  bottom: 50px;
  z-index: $tabbar-z-index;
  background-color: #fff;
  border-top: 1px solid rgb(206, 206, 206);
  border-bottom: 1px solid rgb(206, 206, 206);
  @include flex-between();
  padding: 0 10px;

  &-left,
  &-right {
    @include flex-center();
  }
  &-right {
    p {
      color: #000;
      span {
        color: rgb(245, 93, 4);
      }
    }
    .settlement {
      width: 70px;
      height: 30px;
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      background: -webkit-linear-gradient(
        left,
        rgb(233, 131, 36),
        rgb(245, 80, 4)
      );
      background: -o-linear-gradient(right, rgb(233, 131, 36), rgb(245, 80, 4));
      background: -moz-linear-gradient(
        right,
        rgb(233, 131, 36),
        rgb(245, 80, 4)
      );
      background: linear-gradient(to right, rgb(233, 131, 36), rgb(245, 80, 4));

      span {
        color: #fff;
      }
    }
  }
}

//buy-item
.buy-item {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 10px;
  position: relative;
  //top: -700px;
  z-index: $search-popup-z-index;
  &-top {
    height: 100px;
    padding: 10px 20px;
    @include flex-between(flex-start);
    border-bottom: 1px solid #eee;

    img {
      width: 80px;
      height: 80px;
      //margin: 0 10px;
      border: 1px solid rgb(173, 173, 173);
    }
    .select-content {
      height: 80px;
      padding: 0 20px;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      &-price {
        color: rgb(245, 93, 4);
      }
      &-reserve {
        padding: 5px 0;
      }
      &-selected {
        color: #000;
      }
    }
    .iconfont {
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgb(206, 204, 204);
      font-size: 12px;
    }
  }

  &-color {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
    p {
      padding-bottom: 5px;
      color: #000;
    }
    .color-item {
      height: 30px;

      .color-list {
        height: 25px;
        padding: 5px 0px;
        padding-right: 10px;
        margin-right: 10px;
        background-color: #eee;
        border-radius: 5px;
        @include flex-between(flex-start);
        img {
          width: 16px;
          height: 16px;
          margin: 0 5px;
        }
        span {
          color: #000;
        }
      }
    }
  }

  //footer
  &-footer {
    height: 40px;
    padding: 30px 10px;
    @include flex-center();
    .sure {
      border-radius: 10px 0 0 10px;
      background: -webkit-linear-gradient(
        left,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: -o-linear-gradient(
        right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: -moz-linear-gradient(
        right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: linear-gradient(
        to right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
    }
    .see-details {
      border-radius: 0 10px 10px 0;
      background-color: rgb(245, 80, 4);
    }
    .sure,
    .see-details {
      width: 40%;
      height: 30px;
      @include flex-center();
      span {
        color: #fff;
      }
    }
  }
}
//公共样式
.select {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid rgb(206, 206, 206);
  margin-right: 10px;
}
.select-active {
  border: none;
  background-color: rgb(233, 131, 36);
}
.select-selected {
  width: 6px;
  height: 9px;
  border: #fff 1px solid;
  border-left: none;
  border-top: none;
  margin-left: 4px;
  margin-top: 1px;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
