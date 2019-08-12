<template>
  <swiper :options="swiperOption">
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper } from "vue-awesome-swiper";
export default {
  name: "MeSlider",
  components: {
    swiper
  },
  props: {
    // 滑动方向
    direction: {
      type: String,
      // 水平滑动
      default: "horizontal",
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) > -1;
      }
    },
    // 滑动速度
    interval: {
      type: Number,
      default: 3000,
      validator(value) {
        return value >= 0;
      }
    },
    // 无缝滚动
    loop: {
      type: Boolean,
      default: true
    },
    // 分页器
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      swiperOption: {
        // 如果只有一张图片就不让滑动了
        watchOverflow: true,
        // 滑动方向
        direction: this.direction,
        // 自动切换
        autoplay: this.interval
          ? {
              delay: this.interval
            }
          : false,
        slidesPerView: 1, //设置容器同时显示几张图片
        loop: this.loop,
        pagination: {
          el: this.pagination ? ".swiper-pagination" : null
        }
      }
    };
  },
  mounted() {
    this.onsole.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>