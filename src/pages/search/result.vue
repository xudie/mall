<template>
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading />
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <li
        class="g-list-item"
        v-for="(item,index) in results"
        :key="index"
        @click="$_selectItem(item[0])"
      >
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
import MeLoading from "base/loading";
import { getSearchResult } from "api/search";
import { searchMixin } from "assets/js/mixin";
export default {
  name: "SearchResult",
  components: {
    MeLoading
  },
  mixins: [searchMixin],
  data() {
    return {
      results: [],
      loading: false
    };
  },
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  watch: {
    query(query) {
      this.getResult(query);
    }
  },
  methods: {
    getResult(keyword) {
      if (!keyword) {
        return;
      }
      //每一次获取时
      this.loading = true;
      getSearchResult(keyword).then(data => {
        if (data) {
          this.results = data;
          //获取到数据时消失
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>