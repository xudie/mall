<template>
  <swiper :options="swiperOption" :key="keyId">
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
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keyId: Math.random()
    };
  },
  watch: {
    data(newData) {
      //当传进来的数组为空数组
      if (newData.length === 0) {
        return;
      }
      //每一次更新都更新一下loop的值
      this.swiperOption.loop = newData.length === 1 ? false : this.loop;

      this.keyId = Math.random();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.swiperOption = {
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
        //当幻灯片只有一张时不进行无缝轮播
        loop: this.data.length <= 1 ? false : this.loop,
        pagination: {
          el: this.pagination ? ".swiper-pagination" : null
        }
      };
    }
  },
  mounted() {
    //this.console.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>