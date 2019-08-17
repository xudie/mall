<template>
  <div class="home">
    <header class="g-header-container">
      <home-header />
    </header>
    <me-scroll
      :data="recmds"
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMroe"
      @scroll-end="scrollEnd"
      ref="scroll"
    >
      <home-slider ref="slider" />
      <home-nav />
      <home-recommend @loaded="getRecommends" ref="recommend" />
    </me-scroll>
    <!-- 回到顶部 -->
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @back-to-top="backToTop" />
    </div>
    <router-view />
  </div>
</template>

<script>
import MeScroll from "../../base/scroll";
import HomeHeader from "./header";
import HomeSlider from "./slider";
import HomeNav from "./nav";
import HomeRecommend from "./recommend";
import MeBacktop from "../../base/backtop";
//import { setTimeout } from "timers";

export default {
  name: "Home",
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeBacktop
  },
  data() {
    return {
      recmds: [],
      isBacktopVisible: false
    };
  },

  methods: {
    updateScroll() {},
    // 2. 定义接收事件的方法
    getRecommends(recommends) {
      // 3. 接收 home-recommend 组件回传的参数 recommends
      // 4. 将参数赋值给 recmds 使其修改
      this.recmds = recommends;
    },
    pullToRefresh(end) {
      this.$refs.slider.update().then(end);
      // 模拟处理逻辑 2000ms 后执行回弹
      // setTimeout(() => {
      //   end();
      // }, 2000);
    },
    pullToLoadMroe(end) {
      this.$refs.recommend
        .update()
        .then(end)
        .catch(err => {
          if (err) {
            this.console.log(err);
          }
          end();
        });
      //模拟处理逻辑 2000ms 后执行回弹
      // setTimeout(() => {
      //   end();
      // }, 2000);
    },
    scrollEnd(transition, scroll) {
      this.isBacktopVisible = transition < 0 && -transition > scroll.height;
    },
    backToTop() {
      //console.log("123");
      this.$refs.scroll && this.$refs.scroll.scrollToTop();
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
