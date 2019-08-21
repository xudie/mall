<template>
  <me-navbar class="header">
    <div slot="center" class="header-title">购物车</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from "../../base/navbar";

export default {
  name: "CarHeader",
  components: {
    MeNavbar
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.header {
  &.mine-navbar {
    background-color: #fff;
  }
  .iconfont {
    font-size: $icon-font-size;
    color: rgb(216, 211, 211);
    position: absolute;
    bottom: 50%;
    right: 50%;
  }
  .header-title {
    text-align: center;
    font-size: 20px;
  }
}
</style>