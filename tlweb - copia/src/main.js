import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vieaxios from 'vue-axios'
// import VueSidebarMenu from 'vue-sidebar-menu'
// import 'vue-sidebar-menu / dist / vue-sidebar-menu.css'

Vue.use(vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  axios,
  Vieaxios,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')
