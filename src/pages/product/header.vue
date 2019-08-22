<template>
  <me-navbar class="header">
    <i class="iconfont icon-back" slot="left"></i>
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
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.header {
  background-color: $header-bgc-translucent;
  &-title {
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .iconfont {
    color: #fff;
  }
}
</style>