import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vieaxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import VueGeoLocation from 'vue-browser-geolocation'
// import VueSidebarMenu from 'vue-sidebar-menu'
// import 'vue-sidebar-menu / dist / vue-sidebar-menu.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import vueCountryRegionSelect from 'vue-country-region-select'

Vue.use(vuetify)
Vue.use(VueGeoLocation)
Vue.use(vueCountryRegionSelect)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCArg2DQSW_xTXYKWYJE0fIxJCTstJbiNw',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$api_url = 'http://localhost:55268/'
Vue.prototype.$api_Id = '1'

new Vue({
  router,
  store,
  vuetify,
  axios,
  Vieaxios,
  BootstrapVue,
  render: h => h(App),
  template: '<App/>',
  VueGeoLocation,
  VueGoogleMaps,
  vueCountryRegionSelect
}).$mount('#app')
