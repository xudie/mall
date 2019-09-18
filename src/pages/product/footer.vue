<template>
  <div class="g-footer-container">
    <ul class="options">
      <li class="options-item">
        <i class="iconfont icon-shop"></i>
        <p>店铺</p>
      </li>
      <li class="options-item">
        <i class="iconfont icon-service"></i>
        <p>客服</p>
      </li>
      <li class="options-item">
        <i class="iconfont icon-collect"></i>
        <p>收藏</p>
      </li>
    </ul>
    <div class="join-car">
      <p @click="addShoppingCar">加入购物车</p>
    </div>
    <div class="buy">
      <p>立即购买</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductFooter",
  methods: {
    addShoppingCar() {
      this.$emit("add-shopping-car");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.g-footer-container {
  @include flex-center();
  height: 50px;
  background-color: #fff;
  .options {
    width: 40%;
    height: 100%;
    @include flex-center();
    &-item {
      flex: 1;
      @include flex-center(column);

      .iconfont {
        padding-bottom: 5px;
        font-size: 20px;
      }
    }
  }
  .buy,
  .join-car {
    width: 30%;
    height: 100%;
    @include flex-center();
  }
  .join-car {
    background-color: rgb(236, 176, 64);
    p {
      color: #fff;
      font-size: 14px;
    }
  }
  .buy {
    background-color: rgb(231, 14, 14);
    color: #fff;
    font-size: 14px;
  }
}
</style>