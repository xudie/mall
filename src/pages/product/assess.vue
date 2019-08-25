<template>
  <div class="assess-show">
    <div class="assess-show-classfly">
      <p class="all">
        <span>12</span>
      </p>
      <p class="append-assess">
        <span>23</span>
      </p>
      <p class="picture">
        <span>34</span>
      </p>
    </div>
    <div class="assess-show-item">
      <div class="assess-show-list">
        <p class="assess-show-list-username">12131</p>
        <p class="assess-show-list-content">123244</p>
        <img src="~assets/img/404.png" />
        <span class="assess-show-list-date">123243</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "productAssess"
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.assess-show {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: #fff;

  &-classfly {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(236, 236, 236);
    @include flex-between(flex-start);

    p {
      margin-right: 5px;
      padding: 5px;
      border: 1px solid rgb(236, 236, 236);
    }
    .all-cative {
      background-color: rgb(70, 69, 69);
      color: #fff;
    }
  }

  &-item {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid rgb(236, 236, 236);

    .assess-show-list {
      &-username {
        color: #000;
      }
      &-content {
        color: rgb(54, 54, 54);
        font-size: 13px;
        line-height: 120%;
      }

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
}
</style>