<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>
    <input
      type="text"
      class="mine-search-box"
      title="搜索框"
      :placeholder="placeholder"
      ref="input"
      v-model="query"
      v-if="!fake"
    />
    <i class="iconfont icon-close" @click="reset" v-show="query"></i>
  </div>
</template>

<script>
import { debonce } from "../../assets/js/until";

export default {
  name: "MeSearchBox",
  data() {
    return {
      query: ""
    };
  },
  watch: {
    query: debonce(function() {
      this.$emit("query", this.query);
    })
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    fake: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },
    clear() {
      this.query = "";
    },
    reset() {
      this.clear();
      this.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
$search-box-height: 30px;
.mine-search-box-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: $search-box-height;
  padding: 0 7px;
  background-color: #eee;
  border-radius: $search-box-height / 2;
}
.iconfont {
  color: $icon-color;
  font-size: $icon-font-size-sm;
  font-weight: bold;
}
.mine-search-box {
  flex: 1;
  background: none;
  border: none;
  margin: 0 6px;
  color: #666;
  line-height: 1.5;
}
</style>