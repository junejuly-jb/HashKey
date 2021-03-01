import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingLocal: false
  },
  mutations: {
    SET_LOADING_LOCAL(state) {
      state.isLoadingLocal = !state.isLoadingLocal
    }
  },
  actions: {
  },
  modules: {
  }
})
