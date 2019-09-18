<template>
  <!-- 商品型号选择页 -->
  <div class="buy-item" v-show="buyShow">
    <div class="buy-item-top">
      <img src="~assets/img/404.png" />
      <div class="select-content">
        <p class="select-content-price">￥{{}}</p>
        <p class="select-content-reserve">库存</p>
        <p class="select-content-selected">已选：</p>
      </div>
      <i class="iconfont icon-delete" @click="hide"></i>
    </div>
    <!-- color -->
    <div class="buy-item-color" v-for="pro in props" :key="pro">
      <p>{{pro.name}}</p>
      <div class="color-item" v-for="(val,valIndex) in pro.values" :key="valIndex">
        <div class="color-list">
          <img src="~assets/img/404.png" />
          <span>{{val.name}}</span>
        </div>
      </div>
    </div>
    <!-- size -->
    <!-- v-for="(propsItem,propsI) in props " :key="propsI" -->
    <!-- <div class="buy-item-size">
      <p>propsItem.name</p>
      <div class="size-item">
        <div class="size-list">
          <span>s</span>
        </div>
      </div>
    </div>-->

    <!-- sure -->
    <div class="buy-item-footer">
      <p class="sure">
        <span>确定</span>
      </p>
      <p class="see-details">
        <span>查看详情</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductModel",
  data() {
    return {
      buyShow: false
    };
  },
  props: {
    props: {
      type: Array,
      default: function() {
        return new Array();
      }
    },
    money: {
      type: Number,
      default: 0
    }
  },
  methods: {
    show(commodity) {
      window.console.log(commodity);
      this.buyShow = true;
    },
    hide() {
      this.buyShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.buy-item {
  width: 100%;
  height: 100%;
  background-color: #fff;
  //margin-top: 50px;
  position: absolute;
  top: 100px;
  left: 0;
  z-index: $search-popup-z-index;
  &-top {
    height: 100px;
    padding: 10px 20px;
    position: relative;
    @include flex-between(flex-start);
    border-bottom: 1px solid #eee;

    img {
      width: 80px;
      height: 80px;
      //margin: 0 10px;
      border: 1px solid rgb(173, 173, 173);
    }
    .select-content {
      height: 80px;
      padding: 0 20px;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      &-price {
        color: rgb(245, 93, 4);
      }
      &-reserve {
        padding: 5px 0;
      }
      &-selected {
        color: #000;
      }
    }
    .iconfont {
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgb(206, 204, 204);
      font-size: 12px;
    }
  }

  &-color {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
    p {
      padding-bottom: 5px;
      color: #000;
    }
    .color-item {
      height: 30px;

      .color-list {
        height: 25px;
        padding: 5px 0px;
        padding-right: 10px;
        margin-right: 10px;
        background-color: #eee;
        border-radius: 5px;
        @include flex-between(flex-start);
        img {
          width: 16px;
          height: 16px;
          margin: 0 5px;
        }
        span {
          color: #000;
        }
      }
    }
  }

  //footer
  &-footer {
    width: 100%;
    height: 40px;
    padding: 30px 10px;
    position: absolute;
    bottom: 160px;

    @include flex-center();
    .sure {
      border-radius: 10px 0 0 10px;
      background: -webkit-linear-gradient(
        left,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: -o-linear-gradient(
        right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: -moz-linear-gradient(
        right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
      background: linear-gradient(
        to right,
        rgb(233, 131, 36),
        rgb(241, 112, 52)
      );
    }
    .see-details {
      border-radius: 0 10px 10px 0;
      background-color: rgb(245, 80, 4);
    }
    .sure,
    .see-details {
      width: 40%;
      height: 30px;
      @include flex-center();
      span {
        color: #fff;
      }
    }
  }
}
</style>