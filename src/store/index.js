import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as user from './Modules/user'
import * as password from './Modules/password'
import * as wifi from './Modules/wifi'
import * as note from './Modules/note'
import * as card from './Modules/card'
import * as contact from './Modules/contact'
import * as license from './Modules/license'
import * as access from './Modules/access'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingLocal: false,
    registration_dialog: false,
    loading_screen: '',
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
    user, password, wifi, note, card, access, contact, license
  },

  plugins: [
    createPersistedState({
      paths: ['user', 'access']
    })
  ]
  
})
