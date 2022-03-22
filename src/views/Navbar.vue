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
                    <li class="nav-item" v-if="statusStore.loggedIn">
                        <router-link class="nav-link" :to="{name: 'Users'}">Users</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Admin</a>
                        <div class="dropdown-menu">
                            <router-link class="dropdown-item" :to="{name: 'Perms'}">Perms</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Options'}">Options</router-link>
                    </li>
                    <div v-if="statusStore.loggedIn" class="d-flex flex-row">
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="logout()">Logout</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link avatar" :to="{name: 'User', params: {user: statusStore.username}}">
                                <img :src="avatar_url" @load="avatar_loaded = revoke_url(avatar_url)" v-show="avatar_loaded">
                            </router-link>
                        </li>
                    </div>
                    <div v-else class="d-flex flex-row">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'Register'}">Register</router-link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { post, get_avatar, revoke_url } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from "vue-router";
import { removeCookie } from "tiny-cookie";

const statusStore = useStatusStore();
const router = useRouter();

let avatar_url = ref("");
let avatar_loaded = ref(false);

function logout() {
    post("GET", {}, 'logout', {redirect: router})
    .then(() => {
        statusStore.loggedIn = false;
        statusStore.username = "";
        statusStore.avatar = "";
        statusStore.admin = false;
        removeCookie("token");
    })
    .catch((_) => ({}));
}

function getAvatar() {
    get_avatar(statusStore.avatar).then(url => {
        avatar_url.value = url;
    });
}

watch(() => statusStore.avatar, (b) => {
    if (b) {
        getAvatar();
    } else {
        avatar_url.value = "";
        avatar_loaded.value = false;
    }
});

</script>

<style scoped lang="scss">
.navbar-nav {
    align-items: center;
    .nav-item {
        > * {
            cursor: pointer;
        }

        img {
            max-height: 2.5rem;
            margin-top: -2rem;
            margin-bottom: -1.8rem;
            border-radius: 100%;
            overflow: hidden;
            image-rendering: crisp-edges;
        }
    }
}
</style>