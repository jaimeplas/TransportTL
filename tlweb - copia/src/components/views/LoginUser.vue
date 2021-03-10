<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 m4 offset-xs0 offset-sm3 offset-m4>
              <v-form>
                <h1>Login--User</h1>
                  <v-text-field label="Usuario" v-model="User" ></v-text-field>
                  <v-text-field label="Contraseña" type="password" v-model="Passw" ></v-text-field>
                  <!--<v-btn block color="primary" @click="$router.push('/principal')">Entrar</v-btn>-->
                  <v-btn block color="primary" @click="Login">Entrar</v-btn>
                  <v-btn @click="ver" large color="primary" class="mx-0">Ver Token</v-btn>
                  <div id="app">{{ info }}</div>
              </v-form>
          </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    User: '',
    Passw: '',
    info: null
  }),
  created () {
    this.$store.commit('SET_LAYOUT', 'Login-layout')
  },
  methods: {
    Login: function () {
      // alert('test fuction called' + this.User)
      const UserLogin = { Username: this.User, Password: this.Passw }
      const axiosInstance = axios.create({
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      axiosInstance
        .get('http://localhost/WebTLApi/api/login/authenticate', UserLogin)
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data)
        })
        .catch(e => console.log(e))
      if (localStorage.getItem('token') == null) {
        alert('ERROR: Token' + localStorage.getItem('token'))
      } else {
        this.$router.push('/principal')
      }
    },
    ver: function () {
      var token = localStorage.getItem('token')
      alert(token)
    }
  }
}
</script>
