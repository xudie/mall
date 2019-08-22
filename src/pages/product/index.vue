<template>
  <div class="product">
    <div class="header">
      <product-header />
    </div>

    <me-scroll>
      <product-slide :imageList="images" />
    </me-scroll>

    <product-footer />
  </div>
</template>

<script>
import ProductHeader from "./header";
import ProductFooter from "./footer";
import ProductSlide from "./slider";
import MeScroll from "base/scroll";
import { getProductInfoById } from "api/home";

export default {
  data() {
    return {
      productInfo: {},
      images: []
    };
  },
  name: "Pruduct",
  components: {
    ProductHeader,
    ProductFooter,
    ProductSlide,
    MeScroll
  },
  created() {
    let pid = this.$route.params.id;
    window.console.log(pid);
    getProductInfoById(pid).then(result => {
      window.console.log(result);
      this.productInfo = result;
      this.images = result.data.item.images;
    });
  },
  methods: {}
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