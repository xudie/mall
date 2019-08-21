import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/scss/index.scss'
//import fastclick from 'fastclick'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'

//fastclick用于消除300毫秒延迟
//fastclick.attach(document.body)
Vue.use(VueLazyload, {
  //完全显示的时候加载
  preLoad: 1,
  //失败时显示的图片
  error: require('assets/img/error.png'),
  //加载时显示的GIF图
  loading: require('assets/img/loading.gif'),
  //尝试加载几次
  attempt: 1
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')