import Vue from 'vue'
import Vuex from 'vuex'

// 目录解构
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 购物车list
    cartList: []
  },
  getters,
  // mutations适合做单一的事件，复杂的交给actions
  mutations,
  actions,
  modules: {
  }
})
