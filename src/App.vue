<template>
    <div class="main d-flex-column container-fluid p-0" v-if="!store.getters.isLoading">
        <Navbar />
        <TransitionGroup tag="div" class="alerts row flex-column w-100 gy-5 p-0 mx-auto align-items-center position-absolute" name="alerts">
            <div v-for="(alert) in alerts" :key="alert.id" :class="[alert.type]" class="my-1 col-sm-10 col-12 alert alert-dismissible">
                <button @click="store.commit('removeAlert', alert.id)" type="button" class="btn-close"></button>
                <p class="mb-0">{{ alert.text }}</p>
            </div>
        </TransitionGroup>
        <router-view class="container col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mt-sm-4 mb-4" />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { getCookie } from "tiny-cookie";

import Navbar from "@/views/Navbar.vue";

const store = useStore();

const alerts = computed(() => store.getters.getAlerts);

if (getCookie("token") ? true : false) {
    store.dispatch("post", ["GET", {}, "header"])
        .then(([status, response]) => {
        if (Math.floor(status / 100) != 2) return;
        store.commit("setLoggedIn", true);
        store.commit("setUsername", response.username);
        store.commit("setChecked", true);
    });
} else {
    store.commit("setChecked", true);
}

store.commit("addAlert", ["alert-info", "Hello World", 300000])

store.dispatch("initThemes");

</script>


<style scoped lang="scss">
.main {
    min-height: 100vh;
    overflow-x: hidden;
}
.alerts {
    position: fixed;
    //width: 100vw;
    z-index: 1;
    margin-top: -1rem;
}

.alerts-move, .alerts-enter-active, .alerts-leave-active {
    transition: all 0.5s ease;
}

.alerts-leave-active {
    transition: all 0.5s;
    position: absolute;
}
.alerts-enter-from, .alerts-leave-to {
    opacity: 0;
}
.navbar {
    margin-bottom: 2rem;
}
</style>
