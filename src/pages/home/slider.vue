<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide v-for="(item,index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from "base/slider";
import { swiperSlide } from "vue-awesome-swiper";
import { sliderOptions } from "./config";
import { getHomeSlider } from "api/home.js";
import MeLoading from "base/loading/index";

export default {
  name: "HomeSlider",
  components: {
    MeSlider,
    swiperSlide,
    MeLoading
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: []
    };
  },
  //获取远程数据
  created() {
    this.getSliders();
  },
  methods: {
    // API 外部使用的幻灯片接口
    update() {
      return this.getSliders();
    },
    //内部使用的幻灯片接口
    getSliders() {
      //成功之后
      return getHomeSlider().then(data => {
        this.sliders = data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  height: 183px;
}

.slider-link {
  display: block;
}
.slider-link,
.slider-img {
  width: 100%;
  height: 100%;
}
</style>