<template>
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hots.length">
      <me-loading />
    </div>
    <ul class="hot-list" v-else>
      <li
        class="hot-item"
        v-for="(item,index) in hots"
        :key="index"
        @click="$_selectItem(item.hotWord)"
      >{{item.hotWord}}</li>
    </ul>
  </div>
</template>

<script>
import MeLoading from "base/loading";
import { getSearchHotKeyword } from "api/search";
import { searchMixin } from "assets/js/mixin";

export default {
  name: "SearchHot",
  components: {
    MeLoading
  },
  mixins: [searchMixin],
  data() {
    return {
      hots: []
    };
  },
  created() {
    this.getHotKeyword().then(() => {
      this.$emit("loaded");
    });
  },
  methods: {
    getHotKeyword() {
      return getSearchHotKeyword().then(data => {
        return new Promise(resolve => {
          if (data) {
            this.hots = data;
            resolve();
          }
        });
      });
    }
    // selectItem(keyword) {
    //   let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
    //   if (keywords.length !== 0) {
    //     keywords = keywords.filter(val => val !== keyword);
    //   }
    //   keywords.unshife(keyword);
    //   storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);
    //   //location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.hot {
  padding-left: 10px;
  background-color: #fff;
  border-bottom: 1px solid $border-color;
  margin-top: $navbar-height + 10px;
  margin-bottom: 10px;
  &-title {
    height: 34px;
    line-height: 34px;
    font-size: $font-size-l;
    font-weight: bold;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    padding: 8px;
    background-color: #f0f2f5;
    border-radius: 4px;
    margin: 0 10px 10px 0;
    color: #686868;
  }
}
.loading-container {
  padding: 10px 0;
}
</style>