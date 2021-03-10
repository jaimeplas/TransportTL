<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 m4 offset-xs0 offset-sm3 offset-m4>
              <v-form>
                <h1>Login--Usuario</h1>
                  <v-text-field label="Usuario" v-model="User" ></v-text-field>
                  <v-text-field label="Contraseña" type="password" v-model="Passw" ></v-text-field>
                  <!--<v-btn block color="primary" @click="$router.push('/principal')">Entrar</v-btn>-->
                  <v-btn block color="primary" @click="Login">Entrar</v-btn>
                  <v-btn @click="ver" large color="primary" class="mx-0">Ver Token</v-btn>
                  <v-btn @click="ValAPI" large color="error" class="mx-0">Validar API</v-btn>
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
    ValAPI: function () {
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
      const UrlVar = '' // '?id=' + this.$api_Id
      // alert(this.$api_url + 'All' + UrlVar)
      axiosInstance
        .get('All' + UrlVar)
        .then(response => {
          console.log(response)
          // alert('OK: Response' + JSON.stringify(response))
        })
        .catch(e => console.log('ERROR::!!!' + e))
    },
    Login: function () {
      // alert('test fuction called' + this.User)
      const UserLogin = { LoginId: '0', UsuarioId: '0', Usuario: this.User, Password: this.Passw, Token: '0', IdApp: this.$api_Id }
      // alert(JSON.stringify(UserLogin))
      const axiosInstance = axios.create({
        method: 'Post',
        mode: 'cors',
        baseURL: this.$api_url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Header': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Credentials': true
        }
      })
      // this.$api_url + 'echoping', UserLogin)
      axiosInstance
        .post('login',
          UserLogin
        )
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', response.data.UserFullName)
          localStorage.setItem('userRol', response.data.Roles)

          // alert('OK: Response' + JSON.stringify(response.data))

          if (localStorage.getItem('token') == null) {
            alert('ERROR: Token' + localStorage.getItem('token'))
          } else {
            this.$router.push('/principal')
            // alert('OK: Token' + localStorage.getItem('token'))
          }
        })
        .catch(e => {
          console.log('ERROR!!!!!::..' + e)
        })
    },
    ver: function () {
      var token = localStorage.getItem('token')
      alert(token)
    }
  }
}
</script>
