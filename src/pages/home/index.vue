<template>
  <div class="home">
    <header class="g-header-container">
      <home-header />
    </header>
    <div></div>
    <!-- 回到顶部 -->
    <div class="g-backtop-container"></div>
    <router-view />
  </div>
</template>

<script>
import HomeHeader from "./header";

export default {
  name: "Home",
  components: {
    HomeHeader
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-clip: $bgc-theme;
}
</style>
