<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer" app persistent enable-resize-watcher>
      <!--START Menu Lateral  -->
      <v-card height="400" width="344" class="mx-auto overflow-hidden">
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-system-bar color="deep-purple darken-3"></v-system-bar>
          <v-divider></v-divider>
          <v-list dense nav>
            <v-list-item  class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{NombreUsuario}}
                </v-list-item-title>
                <v-list-item-subtitle>{{RolUsuario}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
              <!--<router-link to="{name: '/register'}">Registro</router-link>
              <router-link to="{name: 'LoginUser'}">Logi User</router-link>-->
              <v-list-item v-for="item in itemsMenus" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <!--
                <v-list-item-title @click="$this.router.push(item.url)">{{ item.title }}</v-list-item-title>
              -->
              <router-link v-bind:to="'/' + item.url" exact v-text="item.title"></router-link>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <!--END Menu vertical  -->
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="error" @click="Logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <!--START Body Central  <v-content>-->
      <router-view/>
      <!--</v-content> END Body Central  -->
      <!--START Footer  -->
      <v-footer app>
        <span>&copy; 2021</span>
      </v-footer>
    </v-main>
  </v-app>
  <!--<component :is="layout"></component>-->
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    drawer: null,
    NombreUsuario: localStorage.getItem('user'),
    RolUsuario: localStorage.getItem('userRol'),
    itemsMenus: [{}],
    title: 'TL Transport Logistic'
  }),
  created () {
    this.menu()
  },
  methods: {
    Logout: function () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    menu: function () {
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
      const UrlVar = '?AppId=' + this.$api_Id
      // alert(this.$api_url + 'GetAppMenu' + UrlVar)
      axiosInstance
        .get('GetAppMenu' + UrlVar)
        .then(response => {
          this.itemsMenus.push({
            icon: 'mdi-home',
            title: 'Inicio',
            url: 'Principal'
          })
          for (var i in response.data) {
            this.itemsMenus.push({
              icon: response.data[i].Icon,
              title: response.data[i].Name,
              url: response.data[i].Url
            })
          }
          this.itemsMenus.push({
            icon: 'mdi-photo',
            title: 'Fotos',
            url: 'fotos/1'
          })
          this.itemsMenus.push({
            icon: 'mdi-User',
            title: 'Login',
            url: ''
          })
        })
        .catch(e => console.log('ERROR::!!!' + e))
    }
  }

}
</script>
