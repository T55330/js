import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue';
import detail from '../views/detail.vue';
Vue.use(VueRouter)

const routes = [
  {path: '/',component: index},
  {path: '/detail',component: detail}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
