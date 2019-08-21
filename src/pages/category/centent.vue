<template>
  <div class="content-wrapper">
    <div class="loading-container" v-if="isLoading">
      <div class="loading-wrapper">
        <me-loading />
      </div>
    </div>
    <me-scroll ref="scroll">
      <div class="content">
        <!-- banner -->
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img @load="updateScroll" :src="content.banner.picUrl" alt class="pic-img" />
          </a>
        </div>
        <div class="section" v-for="(section,index) in content.data" :key="index">
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li class="section-item" v-for="(item,i) in section.itemList" :key="i">
              <a :href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img v-lazy="item.picUrl" class="section-img" />
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisible" />
    </div>
  </div>
</template>

<script>
import MeLoading from "base/loading";
import MeScroll from "base/scroll";
import MeBacktop from "base/backtop";
import { getCategoryContent } from "api/category";
import storage from "assets/js/storage";
import {
  CATEGORY_CONTENT_KEY,
  CATEGORY_CONTENT_UPDATE_TIME_INTERVAL
} from "./config";

export default {
  name: "CategoryContent",
  components: {
    MeLoading,
    MeScroll,
    MeBacktop
  },
  props: {
    //传递过来的ID值
    curId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      //获取的数据
      content: {},
      isBacktopVisible: false,
      isLoading: false
    };
  },
  watch: {
    //监听curId
    curId(id) {
      //开始获取数据之前让loading开始加载
      this.isLoading = true;
      //then(() => {this.isLoading = false;}):获取数据完成后返回一个promise对象
      this.getContent(id).then(() => {
        this.isLoading = false;
        this.backToTop();
      });
    }
  },
  methods: {
    getContent(id) {
      //通过键（CATEGORY_CONTENT_KEY）来获取本地内容
      let contents = storage.get(CATEGORY_CONTENT_KEY);
      //声明变量（updateTime）来保存上一次更新时间
      let updateTime;
      //当前时间
      const curTime = new Date().getTime();

      if (contents && contents[id]) {
        updateTime = contents[id].updateTime || 0;
        if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) {
          return this.getContentByLoacalStorage(contents[id]);
        } else {
          //从服务器端获取数据
          return this.getContentByHTTP(id).then(() => {
            //更新数据
            this.updateLocalStorage(contents, id, curTime);
          });
        }
      } else {
        return this.getContentByHTTP(id).then(() => {
          this.updateLocalStorage(contents, id, curTime);
        });
      }

      //从服务器端获取数据
      // return getCategoryContent(id).then(data => {
      //   if (data) {
      //     this.content = data;
      //   }
      // });
    },
    //从缓存中获取数据
    getContentByLoacalStorage(content) {
      this.content = content.data;
      //返回一个Promise对象，表示成功获取到了数据
      return Promise.resolve();
    },
    //从服务器端获取数据
    getContentByHTTP(id) {
      return getCategoryContent(id).then(data => {
        return new Promise(resolve => {
          if (data) {
            this.content = data;
            resolve();
          }
        });
      });
    },
    //更新数据
    updateLocalStorage(contents, id, curTime) {
      contents = contents || {};
      contents[id] = {};
      contents[id].data = this.content;
      contents[id].updateTime = curTime;
      storage.set(CATEGORY_CONTENT_KEY, contents);
    },
    backToTop() {
      this.$refs.scroll && this.$refs.scroll.scrollToTop();
    },
    //图片加载完后触发的事件
    updateScroll() {
      this.$refs.scroll && this.$refs.scroll.update();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.content-wrapper {
  position: relative;
  height: 100%;
}
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $category-popup-z-index;
  @include flex-center();
  width: 100%;
  height: 100%;
  //background-color: $modal-bgc;
}
.loading-wrapper {
  width: 50%;
  padding: 30px 0;
  background-color: $modal-bgc;
  border-radius: 4px;
}
.content {
  padding: 10px;
}
.pic {
  margin-bottom: 12px;
  &-link {
    display: block;
  }
  &-img {
    width: 100%;
  }
}
.section {
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  &-title {
    height: 28px;
    line-height: 28px;
    color: #080808;
    font-weight: bold;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px 10px 0;
  }
  &-item {
    width: (100% / 3);
  }
  &-link {
    display: block;
  }
  &-pic {
    position: relative;
    width: 80%;
    padding-bottom: 80%;
    margin: 0 auto;
  }
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-name {
    height: 36px;
    line-height: 36px;
    text-align: center;
    @include ellipsis();
  }
}
.g-backtop-container {
  bottom: 10px;
}
</style>