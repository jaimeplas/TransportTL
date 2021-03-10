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
    // this.ModuloInfo()
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
    ModuloInfo: function () {
      const axiosInstance = axios.create({
        method: 'get',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true
        }
      })
      const UrlVar = '?ModId=' + this.$api_Id
      // alert(this.$api_url + 'GetAppMenu' + UrlVar)
      axiosInstance
        .get('GetAppMenu' + UrlVar)
        .then(response => {
          console.log(response)
          // alert('OK: Response' + JSON.stringify(response))
          this.info = response.data
        })
        .catch(e => console.log('ERROR::!!!' + e))
    }
  }
}
</script>
