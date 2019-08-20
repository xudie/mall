<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header @query="getQuery" />
      </header>
      <div class="g-content-container">
        <me-scroll ref="scroll">
          <search-hot v-show="!query" @loaded="updateScroll" />
          <search-history
            @show-confirm="showConfirm"
            ref="history"
            v-show="!query"
            @remove-item="updateScroll"
          />
          <search-result v-show="query" :query="query" />
        </me-scroll>
      </div>
      <me-confirm msg="确定要清空吗？" ref="confirm" @confirm="clearAllSearchHistorys"></me-confirm>
    </div>
  </transition>
</template>

<script>
import SearchHeader from "./header";
import SearchHistory from "./history";
import SearchHot from "./hot";
import SearchResult from "./result";
import MeScroll from "../../base/scroll/index";
import MeConfirm from "../../base/confirm/index";

export default {
  name: "Search",
  components: {
    SearchHeader,
    SearchHistory,
    SearchResult,
    SearchHot,
    MeScroll,
    MeConfirm
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    showConfirm() {
      this.$refs.confirm.show();
    },
    clearAllSearchHistorys() {
      this.$refs.history.clear();
      this.$refs.history.update();
    },
    getQuery(query) {
      this.query = query;
    },
    updateScroll() {
      this.$refs.scroll.update();
    }
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