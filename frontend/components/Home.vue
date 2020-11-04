<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-icon @click="drawer = !drawer">mdi-window-close</v-icon>
            <v-img :src="logoSrc"></v-img>
          </v-list-item-title>
          <!-- <v-list-item-subtitle>

          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar hide-on-scroll color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Cloud Temperature Record</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <login></login>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </v-container>
    </v-main>

    <!-- <v-footer app> </v-footer> -->
    <v-bottom-navigation class="justify-space-around hidden-md-and-up" fixed>
      <v-btn class="pa-2">
        <span style="color:teal;">Recents</span>
        <v-icon color="teal">mdi-history</v-icon>
      </v-btn>
      <v-btn class="pa-2">
        <span style="color:teal;">home</span>
        <v-icon color="teal">mdi-home</v-icon>
      </v-btn>
      <v-btn class="pa-2">
        <span style="color:teal;">Nearby</span>
        <v-icon color="teal">mdi-near-me</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>

  <!-- <div>
    <p>
      <router-link to="/user/vue">Go to user vue</router-link>
      <router-link to="/hello">Go to Hello</router-link>
    </p>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <nav-router />
  </div> -->
</template>

<script>
import NavRouter from "./NavRouter.vue";
import Login from "./Login.vue";

import logo from "../img/logo.png";
// import {mdiHistory, mdiHome, mdiNearMe} from '@mdi/js';

export default {
  data() {
    return {
      drawer: null,
      logoSrc: logo,
      // mdiHistory,
      // mdiHome,
      // mdiNearMe,
    };
  },
  components: {
    NavRouter,
    Login
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
