<template>
  <div class="home">
    <header class="g-header-container">
      <home-header />
    </header>
    <me-scroll :data="recommends" pullDown @pull-down="pullToRefresh">
      <home-slider />
      <home-nav />
      <home-recommend @loaded="getRecommends" />
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
import { setTimeout } from "timers";

export default {
  name: "Home",
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend
  },
  data() {
    return {
      recommends: []
    };
  },
  methods: {
    updateScroll() {},
    getRecommends(recommends) {
      this.recommends = recommends;
    },
    pullToRefresh(end) {
      setTimeout(() => {
        end();
      }, 1000);
    }
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
