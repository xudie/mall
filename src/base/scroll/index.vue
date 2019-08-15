<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading" />
    </div>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUPText" inline ref="pullUPLoading" />
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MeLoading from "../loading/index";
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from "../scroll/config";

export default {
  name: "MeScroll",
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    // 更新滚动条：参数类型
    // 5. home 改变了这里也会改变
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pulling: false, //是否正在下拉或上拉
      pullDownText: "PULL_DOWN_TEXT_INIT",
      pullUPText: "PULL_UP_TEXT_INIT",
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
        on: {
          // 配置: 滚动事件
          sliderMove: this.scroll,
          // 配置：手指松开事件
          touchEnd: this.touchEnd
        }
      }
    };
  },
  watch: {
    // 6. 监听 data 的变化
    data() {
      // 7. 更新滚动条
      this.update();
    }
  },
  methods: {
    update() {
      // 8. 使用 swiper api 更新 swiper
      this.$refs.swiper && this.swiper.swiper.update();
    },

    scroll() {
      //this.$refs.swiper :获取swiper组件
      const swiper = this.$refs.swiper.swiper;

      if (this.pulling) {
        return;
      }
      //下拉
      if (swiper.translate > 0) {
        if (!this.pullDown) {
          return;
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
        }
      }
      //上拉
      else if (swiper.isEnd) {
        if (!this.pullUp) {
          return;
        }

        //是否达到上拉的触发条件
        const isPullUp =
          Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
          parseInt;

        if (isPullUp) {
          this.$refs.pullUPLoading.setText(PULL_UP_TEXT_START);
        } else {
          this.$refs.pullUPLoading.setText(PULL_UP_TEXT_INIT);
        }
      }
    },
    touchEnd() {
      const swiper = this.$refs.swiper.swiper;

      if (this.pulling) {
        return;
      }

      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return;
        }

        this.pulling = true;
        swiper.allowTouchMove = false; //禁止触摸
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(PULL_DOWN_HEIGHT);
        swiper.params.virtualTranslate = true; //定住不回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
        this.$emit("pull-down", this.pullDownEnd);
      }
      //上拉
      else if (swiper.isEnd) {
        const totalHeight = parseInt(swiper.$wrapperEl.css("height"));
        //判断是否满足上拉的条件
        const isPullUp =
          Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
          totalHeight;

        if (isPullUp) {
          if (!this.pullUp) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false;
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
          swiper.params.virtualTranslate = true; //定住不回弹
          this.$refs.pullUPLoading.setText(PULL_UP_TEXT_ING);
          this.$emit("pull-up", this.pullUpEnd);
        }
      }

      // 根据调用组件传参，是否需要下拉刷新 （默认是 flase）
    },
    pullDownEnd() {
      const swiper = this.$refs.swiper.swiper;

      this.pulling = false;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
      swiper.allowTouchMove = true; //允许触摸
      swiper.params.virtualTranslate = false; //回弹
      swiper.setTransition(swiper.params.speed);
      swiper.setTranslate(0);
    },
    pullUpEnd() {
      const swiper = this.$refs.swiper.swiper;

      this.pulling = false;
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      swiper.allowTouchMove = true; //允许触摸
      swiper.params.virtualTranslate = false; //回弹
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
.mine-scroll-pull-down,
.mine-scroll-pull-up {
  width: 100%;
  position: absolute;
  left: 0;
}
.mine-scroll-pull-down {
  height: 80px;
  //出可视区 bottom 是针对高度
  bottom: 100%;
}
.mine-scroll-pull-up {
  height: 30px;
  //出可视区 top 是针对高度
  top: 100%;
}
</style>