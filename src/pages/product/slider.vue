<template>
  <div class="slider-wrapper">
    <me-slider
      :loop="loop"
      :direction="direction"
      :interval="interval"
      :pagination="pagination"
      :data="images"
    >
      <swiper-slide v-for="imgurl in images" :key="imgurl">
        <img :src="imgurl" />
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
  // 定义接受图片列表
  props: {
    imageList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      pagination: sliderOptions.pagination,
      interval: sliderOptions.interval,
      images: []
    };
  },
  watch: {
    imageList(list) {
      this.images = list;
      this.init();
    }
  },
  methods: {
    init() {
      //window.console.log(this.images);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>