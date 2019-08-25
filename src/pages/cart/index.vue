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
      <div class="section">
        <!-- shop-->
        <div class="shop-name">
          <div class="select"></div>
          <img src="assets/img/tianmao.png" />
          <span>123</span>
          <img src="assets/img/leftjiantou.png" />
        </div>
        <!-- content -->
        <div class="section-item">
          <!-- 上 -->
          <div class="product-information">
            <!-- 上左 -->
            <div class="product-information-left"></div>

            <img src="assets/img/404.png" />
            <div class="product-information-right">
              <p></p>
              <div class="product-select"></div>
            </div>
          </div>
          <!-- 下 -->
          <div class="buy list">
            <span></span>
          </div>
        </div>
      </div>
    </me-scroll>
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
      // 是否选择优惠券
      isYouhui: true,
      cartData: {
        // 购物车宝贝总数
        totalCount: 6,
        totalMoney: 599.99,
        totalMyMoney: 266.12,
        storeList: [
          {
            id: 123456,
            name: "isabufei衣纱布菲",
            isTianMao: true,
            // 是否被选中
            isSelected: false,
            commodityList: [
              {
                id: 123123123123,
                name: "夏季新款蕾丝性感小睡衣",
                // 是否被选中
                isSelected: false,
                colourList: [
                  {
                    id: 1,
                    name: "灰蓝色"
                  },
                  {
                    id: 2,
                    name: "粉红色"
                  }
                ],
                sizeList: [
                  {
                    id: 1,
                    name: "XS"
                  },
                  {
                    id: 2,
                    name: "S"
                  },
                  {
                    id: 3,
                    name: "M"
                  }
                ],
                colour: 2,
                colourName: "粉红色",
                size: 2,
                sizeName: "S",
                count: 1
              }
            ]
          },
          {
            id: 123456,
            name: "isabufei衣纱布菲",
            isTianMao: true,
            commodityList: [
              {
                id: 123123123123,
                name: "夏季新款蕾丝性感小睡衣",
                colourList: [
                  {
                    id: 1,
                    name: "灰蓝色"
                  },
                  {
                    id: 2,
                    name: "粉红色"
                  }
                ],
                sizeList: [
                  {
                    id: 1,
                    name: "XS"
                  },
                  {
                    id: 2,
                    name: "S"
                  },
                  {
                    id: 3,
                    name: "M"
                  }
                ],
                colour: 2,
                colourName: "粉红色",
                size: 2,
                sizeName: "S",
                count: 1
              },
              {
                id: 123123123123,
                name: "夏季新款蕾丝性感小睡衣",
                colourList: [
                  {
                    id: 1,
                    name: "灰蓝色"
                  },
                  {
                    id: 2,
                    name: "粉红色"
                  }
                ],
                sizeList: [
                  {
                    id: 1,
                    name: "XS"
                  },
                  {
                    id: 2,
                    name: "S"
                  },
                  {
                    id: 3,
                    name: "M"
                  }
                ],
                colour: 2,
                colourName: "粉红色",
                size: 2,
                sizeName: "S",
                count: 1
              }
            ]
          }
        ]
      }
    };
  },
  methods: {}
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

    .select {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid rgb(206, 206, 206);
      margin-right: 10px;
    }
  }
  &-item {
    width: 100%;
  }
}
</style>
