<template>
  <div class="slider-wrapper">
    <me-slider :loop="loop">
      <swiper-slide>
        <img src />
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from "base/slider";
import { swiperSlide } from "vue-awesome-swiper";
import { sliderOptions } from "./config";
export default {
  name: "ProductSlide",
  components: {
    MeSlider,
    swiperSlide
  },
  created() {},
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      pagination: sliderOptions.pagination
    };
  }
};
</script>

<style>
</style>