<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <!-- 将<router-view />放在 <keep-alive>里面，这样页面之间来回切换就不需要重新加载了 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>

    <div class="g-footer-container">
      <c-tabbar />
    </div>
  </div>
</template>

<script>
import CTabbar from "./components/tabbar";
export default {
  name: "App",
  components: {
    CTabbar
  }
};
</script>

<style>
</style>
