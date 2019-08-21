<template>
  <div class="car">
    <car-header />
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
  background-color: #fff;

  &-repeat {
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
</style>
