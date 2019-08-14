<template>
  <swiper :options="swiperOption" ref="swiper">
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "MeScroll",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      swiperOption: {
        //滚动方向
        direction: "vertical",
        //一页里面可以看到的图片
        slidesPerView: "auto",
        //自由模式，可以随意滚动
        freeMode: true,
        //给swiper-wrapper设置高度
        setWrapperSize: true,
        //scrollbar是否存在
        scrollbar: {
          el: this.scrollbar ? ".swiper-scrollbar" : null,
          //是否自动隐藏
          hide: true
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      }
    };
  },
  watch: {
    data() {
      this.update();
    }
  },
  methods: {
    update() {
      this.$refs.swiper && this.swiper.swiper.update();
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.swiper-slide {
  height: auto;
}
</style>