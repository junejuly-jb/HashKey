import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from './auth'
import VueMasonry from 'vue-masonry-css'
import VueClipboard from 'vue-clipboard2'
import VueQRCodeComponent from 'vue-qr-generator'


export const bus = new Vue()

// components
Vue.component('AppBar', () => import('./components/Main/AppBar'))
Vue.component('SideBar', () => import('./components/Main/SideBar'))
Vue.component('ConfirmationDialog', () => import('./components/Main/ConfirmationDialog'))
Vue.component('qr-code', VueQRCodeComponent)


import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Auth)
Vue.use(VueMasonry)
Vue.use(Vuesax)
Vue.use(VueClipboard)


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()) {
        next('/home')
      }
      else if(store.state.access.lockdown.lockdown) {
        next('/lock')
      }
      else next()
    }
    else if (to.matched.some(record => record.meta.requireAuth)) {
      if (!Vue.auth.isAuthenticated()) {
        next('/')
      }
      else next()
    }
    else if (to.matched.some(record => record.meta.forLockdown)) {
      if (store.state.access.lockdown.lockdown) {
        next()
      }
      else next('/')
    }
    else next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
