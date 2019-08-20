<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header></search-header>
      </header>
      <div class="g-content-container">
        <me-scroll>
          <search-hot />
          <search-history @show-confirm="showConfirm" />
          <search-result />
        </me-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchHeader from "./header";
import SearchHistory from "./history";
import SearchHot from "./hot";
import SearchResult from "./result";
import MeScroll from "../../base/scroll/index";

export default {
  name: "Search",
  components: {
    SearchHeader,
    SearchHistory,
    SearchResult,
    SearchHot,
    MeScroll
  },
  methods: {
    showConfirm() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.search {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $search-z-index;
  background-color: $bgc-theme;
}
.search-enter-active,
.search-leave-active {
  transition: all 0.3s;
}
.search-enter,
.search-leave-to {
  transform: translate3d(100%, 0, 0);
}
.g-content-container {
  height: 100%;
}
</style>