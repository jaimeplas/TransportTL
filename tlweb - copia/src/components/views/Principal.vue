<template>
  <v-container>
     <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
        <v-layout align-center>
            <v-flex>
            <h3 class="display-3">Modulo de cada item del menu principal</h3>
            <span class="subheading">¡Descripcion del Modulo!</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Ayuda:. Ing. Jaime Plascencia V.</div>
            <!--<v-btn @click="$router.push('/')" large color="primary" class="mx-0">Volver al login</v-btn>-->
            <v-btn @click="Logout" large color="primary" class="mx-0">Volver al login</v-btn>
            <v-btn @click="ver" large color="primary" class="mx-0">Ver Token</v-btn>
            <v-btn @click="menu" large color="primary" class="mx-0">Cargar Menu</v-btn>
            <div id="app">{{ info }}</div>
            </v-flex>
        </v-layout>
        </v-container>
    </v-jumbotron>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    User: '',
    info: null
  }),
  created () {
    this.$store.commit('SET_LAYOUT', 'principal-layout')
    var token = localStorage.getItem('token')
    const Authenticate = { Authorization: 'Bearer ' + token }
    axios.defaults.headers.common.Authorization = 'Bearer ' + token
    axios.get('http://localhost/WebTLApi/api/customers', Authenticate)
      .then(response => (
        this.info = response.data
      ))
      .catch(error => {
        this.errorMessage = error.message
        console.error('ERROR>>!!!', error)
      })
  },
  methods: {
    Logout: function () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    ver: function () {
      var token = localStorage.getItem('token')
      console.error('There was an error!!!', token)
      alert(token)
    },
    menu: function () {
      var token = localStorage.getItem('token')
      const Authenticate = { Authorization: 'Bearer ' + token }
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
      axios.get('http://localhost/WebTLApi/api/customers', Authenticate)
        .then(response => (
          this.info = response.data
        ))
        .catch(error => {
          this.errorMessage = error.message
          console.error('ERROR>>!!!', error)
        })
    }
  }
}
</script>
