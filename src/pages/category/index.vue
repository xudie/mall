<template>
  <div class="category">
    <header class="g-header-container">
      <category-header />
    </header>
    <div class="g-content-container">
      <div class="slidebar">
        <category-tab @switch-tab="getCurrentId" />
      </div>
      <div class="main">
        <category-content :curId="curId" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryHeader from "./header";
import CategoryTab from "./tab";
import CategoryContent from "./centent";
export default {
  name: "Category",
  components: {
    CategoryHeader,
    CategoryTab,
    CategoryContent
  },
  data() {
    return {
      curId: ""
    };
  },
  methods: {
    getCurrentId(id) {
      this.curId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.category {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
.g-content-container {
  display: flex;
  padding-top: $navbar-height;
  overflow: hidden;
  height: 100%;
}
.sidebar {
  width: 80px;
  height: 100%;
}
.main {
  // 占领剩下的宽度
  flex: 1;
  height: 100%;
}
</style>