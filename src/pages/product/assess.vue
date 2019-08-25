<template>
  <div class="assess-show">
    <div class="assess-show-classfly">
      <p class="all" :class="{'assess-active' :allActive}" @click="allActives">
        <span>全部({{feedAllCount}})</span>
      </p>
      <p class="append-assess" :class="{'assess-active' :appendActive}" @click="appendActives">
        <span>追加评论({{feedAppendCount}})</span>
      </p>
      <p class="picture" :class="{'assess-active' :pictureActive}" @click="pictureActives">
        <span>有图({{feedPicCount}})</span>
      </p>
    </div>
    <div class="assess-show-item" v-for="(i,index) in rateList" :key="index">
      <div class="assess-show-list">
        <p class="assess-show-list-username">{{i.userNick}}</p>
        <p class="assess-show-list-content">{{i.feedback}}</p>
        <img :src="img" v-for="img in i.feedPicPathList" :key="img" />
        <span class="assess-show-list-date">{{i.feedbackDate}}</span>
      </div>
    </div>
    <div class="pagg-turning">
      <p class="pagg-turning-on">上一页</p>
      <select name="assess-page" class="pagg-turning-item">
        <option value="one">第1页</option>
        <option value="one">第2页</option>
        <option value="one">第2页</option>
        <option value="one">第2页</option>
      </select>
      <p class="pagg-turning-under" @click="nextPage">下一页</p>
    </div>
  </div>
</template>

<script>
import { getCommentListById } from "api/home";
export default {
  name: "productAssess",
  data() {
    return {
      porid: 0,
      pageIndex: 1,
      pageSize: 10,
      rateList: [],
      feedAllCount: 0,
      feedAppendCount: 0,
      feedPicCount: 0,
      allActive: true,
      appendActive: false,
      pictureActive: false
    };
  },
  methods: {
    load(pid) {
      this.porid = pid;
      //window.console.log(this.porid);
      let list = getCommentListById(this.porid, this.pageIndex, this.pageSize);
      window.console.log(list);
      this.rateList = list.data.rateList;
      this.feedAllCount = list.data.feedAllCount;
      this.feedAppendCount = list.data.feedAppendCount;
      this.feedPicCount = list.data.feedPicCount;
    },
    allActives() {
      this.allActive = true;
      this.appendActive = false;
      this.pictureActive = false;
    },
    appendActives() {
      this.allActive = false;
      this.appendActive = true;
      this.pictureActive = false;
    },
    pictureActives() {
      this.pictureActive = true;
      this.allActive = false;
      this.appendActive = false;
    },
    nextPage() {
      this.pageIndex++;
      this.load(this.porid);
    }
  }
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
    .assess-active {
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
        padding: 5px 0;
      }

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
      .img-active {
        width: 100%;
        height: 100%;
        z-index: $search-popup-z-index;
      }
      &-date {
        display: block;
      }
    }
  }
}

.pagg-turning {
  width: 100%;
  height: 50px;
  @include flex-center();

  p,
  &-item {
    padding: 3px 10px;
    border: 1px #000 solid;
    border-radius: 5px;
    font-size: #000;
  }
  &-item {
    margin: 0 10px;
    background-color: #fff;
  }
}
</style>