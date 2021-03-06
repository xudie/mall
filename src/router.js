import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/home',
      name: 'home',
      //component:Home
      component: () => import('pages/home'),
      children: [{
        path: 'product/:id',
        name: 'home-product',
        component: () => import('pages/product'),
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('pages/cart'),
    }, {
      path: '/category',
      name: 'category',
      component: () => import('pages/category'),
    }, {
      path: '/personal',
      name: 'personal',
      component: () => import('pages/personal'),
    }, {
      path: '/search',
      name: 'search',
      component: () => import('pages/search'),
    }, {
      path: '*',
      redirect: '/home'
    }
  ]
})