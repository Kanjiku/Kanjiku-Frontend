<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{name: 'Home'}">Kanjiku</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Releases</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Mangas'}">Manga</router-link>
                    </li>
                    <li class="nav-item" v-if="store.getters.isLoggedIn">
                        <router-link class="nav-link" :to="{name: 'Users'}">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Options'}">Options</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="loggedIn">
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="logout()">Logout</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="gotoProfile()">Profile</a>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Register'}">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { removeCookie } from "tiny-cookie";

const store = useStore();
const router = useRouter();


const loggedIn = computed(() => store.getters.isLoggedIn);
const logout = () => {
    store.dispatch("post", ["GET", {}, 'logout', {alert: false, redirect: router}])
    .then(() => {
        store.commit("setLoggedIn", false);
        store.commit("setUsername", "");
        removeCookie("token");
    })
    .catch((_) => ({}));
}

const username = computed(() => store.getters.getUsername);
const gotoProfile = () => {
    router.push({ name: "User", params: {user: username.value}});
}
</script>

<style scoped lang="scss">
.navbar-nav {
    cursor: pointer;
}
</style>