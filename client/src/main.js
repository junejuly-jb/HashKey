import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from './auth'
import VueMasonry from 'vue-masonry-css'

// component
Vue.component('AppBar', () => import('./components/Main/AppBar'))
Vue.component('SideBar', () => import('./components/Main/SideBar'))
Vue.component('ConfirmationDialog', () => import('./components/Main/ConfirmationDialog'))


import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(Auth)
Vue.use(VueMasonry)
Vue.use(Vuesax)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()) {
        next('/home')
      }
      else next()
    }
    else if (to.matched.some(record => record.meta.requireAuth)) {
      if (!Vue.auth.isAuthenticated()) {
        next('/')
      }
      else next()
    }
    else next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
