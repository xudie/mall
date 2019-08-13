<template>
  <div class="home">
    <header class="g-header-container">
      <home-header />
    </header>
    <me-scroll></me-scroll>
    <div>
      <home-slider />
    </div>
    <!-- 回到顶部 -->
    <div class="g-backtop-container"></div>
    <router-view />
  </div>
</template>

<script>
import MeScroll from "base/scroll";
import HomeSlider from "./slider";
import HomeScoll from "./scoll";

export default {
  name: "Home",
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider
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
