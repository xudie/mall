<template>
  <me-navbar class="product-header">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <div slot="center" class="header-title">商品详情</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from "base/navbar";
export default {
  name: "ProductHeader",
  components: {
    MeNavbar
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product-header {
  width: 100%;
  background-color: $header-bgc-translucent;
  // position: absolute;
  // left: 0;
  // top: 0;
  .header-title {
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .iconfont {
    color: #fff;
  }
}
</style>