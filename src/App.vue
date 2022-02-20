<template>
  <div class="main" v-if="!$store.getters.isLoading">
    <Navbar />
    <div class="alerts">
      <div v-for="(alert, id) in alerts" :key="id" :class="[{fading: alert.fading}, alert.type]" class="alert alert-dismissible">
        <button @click="removeAlert(id)" type="button" class="btn-close"></button>
        <p class="mb-0">{{ alert.text }}</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import { post, getCookie } from '@/funcs/essentials';

import Navbar from "@/views/Navbar.vue";

const store = useStore();

const alerts = computed(() => store.getters.getAlerts);

const removeAlert = (id) => store.commit("removeAlert", id);

if (getCookie("token") ? true : false) {
  post("GET", {}, "header").then(([status, response]) => {
    if (Math.floor(status / 100) != 2) return;
    store.commit("setLoggedIn", true);
    store.commit("setUsername", response.username);
  });
}

store.dispatch("initThemes");

</script>

<style lang="scss">
.main {
  min-height: 100vh;
}
.alerts {
  position: fixed;
  width: 100vw;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -1rem;
  .alert {
    width: 60vw;
    opacity: 1;
    transition: all .3s ease-in-out;

    &.fading {
      opacity: 0;
      transform: scale(0.2, 0); 
    }
  }
}
.navbar {
  margin-bottom: 2rem;
}
</style>
