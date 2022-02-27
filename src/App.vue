<template>
    <div class="main" v-if="!store.getters.isLoading">
        <Navbar />
        <TransitionGroup tag="div" class="alerts" name="alerts">
            <div v-for="(alert) in alerts" :key="alert.id" :class="[alert.type]" class="alert alert-dismissible">
                <button @click="store.commit('removeAlert', alert.id)" type="button" class="btn-close"></button>
                <p class="mb-0">{{ alert.text }}</p>
            </div>
        </TransitionGroup>
        <router-view />
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

store.dispatch("initThemes");

</script>


<style scoped lang="scss">
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
    }
}

.alerts-move, .alerts-enter-active, .alerts-leave-active {
    transition: all 0.5s ease;
}

.alerts-leave-active {
    transition: all 0.5s;
    position: absolute;
}
.alerts-enter-from {
    opacity: 0;
}
.alerts-leave-to {
    opacity: 0;
    transform: translateX(70px);
}
.navbar {
    margin-bottom: 2rem;
}
</style>
