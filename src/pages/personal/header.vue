<template>
  <me-navbar class="header">
    <div slot="center" class="header-title">我的慕淘</div>
    <i class="iconfont icon-setting iconfont-one" slot="right"></i>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>

<script>
import MeNavbar from "../../base/navbar";

export default {
  name: "PersonalHeader",
  components: {
    MeNavbar
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.header {
  &.mine-navbar {
    background-color: $header-bgc-translucent;
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
    font-size: 16px;
    color: #fff;
  }
}
.iconfont-one {
  margin-right: 30px;
}
</style>