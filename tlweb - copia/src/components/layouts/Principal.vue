<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      enable-resize-watcher
      fixed
    >
      <!--START Menu Lateral  -->
 <v-card
    height="400"
    width="344"
    class="mx-auto overflow-hidden"
  >
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
       <v-system-bar color="deep-purple darken-3"></v-system-bar>
      <v-divider></v-divider>
      <v-list
        dense
        nav
      >
      <v-list-item  class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
          </v-list-item-avatar>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{NombreUsuario}}
          </v-list-item-title>
          <v-list-item-subtitle>{{RolUsuario}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
          <router-link to="{name: '/register'}">Registro</router-link>
          <router-link to="{name: 'LoginUser'}">Logi User</router-link>
        <v-list-item
          v-for="item in itemsMenus"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$this.router.push(item.url)">{{ item.title }}</v-list-item-title>
          <router-link to="/register" exact v-text="item.title"></router-link>
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
      <!--START Body Central  -->
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2021</span>
    </v-footer>
      <!--END Body Central  -->
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    NombreUsuario: 'Nombre de Usuario',
    RolUsuario: 'Administrador',
    itemsMenus: [{
      icon: 'mdi-home',
      title: 'TL Transport HOME',
      url: '/principal'
    },
    {
      icon: 'mdi-image',
      title: 'Usuarios',
      url: '/register'
    },
    {
      icon: 'mdi-home',
      title: 'Guias',
      url: '/LoginUser'
    },
    {
      icon: 'mdi-home',
      title: 'Direcciones',
      url: '/'
    }],
    title: 'TL Transport Logistic'
  }),
  methods: {
    Logout: function () {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>
