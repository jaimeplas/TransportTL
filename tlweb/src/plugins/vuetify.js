import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Vue.use(Vuetify)

import transitions from 'vuetify/es5/components/transitions'
import VApp from 'vuetify/es5/components/VApp'
import VBtn from 'vuetify/es5/components/VBtn'
import VFooter from 'vuetify/es5/components/VFooter'
import VGrid from 'vuetify/es5/components/VGrid'
import VIcon from 'vuetify/es5/components/VIcon'
import VList from 'vuetify/es5/components/VList'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VToolbar from 'vuetify/es5/components/VToolbar'
// import Vuetify from 'vuetify/es5/components/Vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#008940',
    accent: '#0279D7',
    secondary: '#9F9F9F',
    info: '#0279D7',
    warning: '#B71C1C',
    error: '#B71C1C',
    success: '#4CAf50'
  },
  customProperties: true,
  iconfont: 'md'
})
export default new Vuetify({
  icons: {
    iconfont: 'md' || 'fa'
  }
})
