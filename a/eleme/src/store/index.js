import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopping_cart:[],
    goods:[],
    keyword:'',
  },
  mutations: {
    update_keyword(state,payload){
      console.log(payload);
      state.keyword = payload

    },
    update_goods(state,payload){
      state.goods = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
