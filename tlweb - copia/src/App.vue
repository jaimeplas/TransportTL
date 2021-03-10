<template>
  <component :is="layout"></component>
</template>
<script>
import LoginLayout from './components/layouts/LoginUser'
import PrincipalLayout from './components/layouts/Principal'
import Login from './components/layouts/Login'
import Fotos from './components/layouts/Fotos'
import { mapState } from 'vuex'
export default {
  components: { LoginLayout, PrincipalLayout, Login, Fotos },
  computed: mapState(['layout'])
}
</script>
