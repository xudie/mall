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
      <div class="car-commodity"></div>
    </me-scroll>
    <!-- section -->
    <div class="section">
      <div class="shop-name">
        <div class="select"></div>
        <img src alt />
        <span></span>
        <img src alt />
      </div>
      <div class="section-item">
        <div class="product-information">
          <div class="product-information-left"></div>
          <img src alt />
          <div class="product-information-right">
            <p></p>
            <div class="product-select"></div>
          </div>
        </div>
        <div class="buy list">
          <span></span>
        </div>
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
      isYouhui: true
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
  .car-commodity {
    border-top: 1px solid rgb(224, 224, 224);
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

  .shop-name {
    width: 100%;
    height: 40px;

    .select {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid #eee;
    }
  }
  &-item {
    width: 100%;
  }
}
</style>
