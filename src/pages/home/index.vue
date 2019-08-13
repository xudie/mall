<template>
  <div class="home">
    <header class="g-header-container">
      <home-header />
    </header>
    <me-scroll>
      <home-slider />
      <home-nav></home-nav>
      <home-recommend></home-recommend>
    </me-scroll>
    <!-- 回到顶部 -->
    <div class="g-backtop-container"></div>
    <router-view />
  </div>
</template>

<script>
import MeScroll from "../../base/scroll";
import HomeHeader from "./header";
import HomeSlider from "./slider";
import HomeNav from "./nav";
import HomeRecommend from "./recommend";

export default {
  name: "Home",
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend
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
