import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as user from './Modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingLocal: false
  },
  mutations: {
    SET_LOADING_LOCAL(state) {
      state.isLoadingLocal = !state.isLoadingLocal
    },
  },
  actions: {
  },
  modules: {
    user
  },
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ]
})
