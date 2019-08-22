<template>
  <div class="info">
    <div class="info-top">
      <i class="iconfont icon-personal"></i>
    </div>
    <div class="info-bottom">
      <p>注册</p>
      <span>|</span>
      <p>登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo"
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

.info {
  width: 100%;
  background-color: $header-bgc-translucent;
  border-top: 1px solid rgb(243, 164, 164);
  &-top {
    @include flex-center();
    padding: 10px 0;

    .iconfont {
      font-size: 60px;
      color: #fff;
    }
  }
  &-bottom {
    @include flex-center();
    padding-bottom: 20px;

    p,
    span {
      color: #fff;
      font-size: 16px;
    }
    span {
      padding: 0 20px;
    }
  }
}
</style>