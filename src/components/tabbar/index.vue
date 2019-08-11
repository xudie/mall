<template>
  <div class="g-tabbar">
    <router-link class="g-tabbar-item" to="/home">
      <img src="@/assets/icons/home.svg" />
      <span>首页</span>
    </router-link>

    <router-link class="g-tabbar-item" to="/home">
      <img src="@/assets/icons/appstore.svg" />
      <span>分类</span>
    </router-link>

    <router-link class="g-tabbar-item" to="/home">
      <img src="@/assets/icons/shopping.svg" />
      <span>购物车</span>
    </router-link>

    <router-link class="g-tabbar-item" to="/home">
      <img src="@/assets/icons/user.svg" />
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  //C: Common:公共
  name: "CTabbar"
};
</script>

<style lang="scss" scoped>
// scoped:只作用于当前页面
@import "~@/assets/scss/mixins";

.g-tabbar {
  width: 100%;
  display: flex;
  height: $tabbar-height;
  background-color: #fff;

  &-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: $icon-img-size;
      height: $icon-img-size;
    }
  }
}
</style>
