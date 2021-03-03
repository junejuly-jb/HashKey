import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as user from './Modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingLocal: false,
    registration_dialog: true,
  },
  mutations: {
    SET_LOADING_LOCAL(state) {
      state.isLoadingLocal = !state.isLoadingLocal
    },
    SET_REGISTRATION_DIALOG(state) {
      state.registration_dialog = !state.registration_dialog
    }
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
