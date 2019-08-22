<template>
  <div class="product">
    <div class="header">
      <product-header />
    </div>
    <me-scroll></me-scroll>
    <product-footer />
  </div>
</template>

<script>
import ProductHeader from "./header";
import ProductFooter from "./footer";
import MeScroll from "base/scroll";
export default {
  name: "Pruduct",
  components: {
    ProductHeader,
    ProductFooter,
    MeScroll
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
</style>