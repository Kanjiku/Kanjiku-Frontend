<template>
    <div class="main d-flex-column container-fluid p-0">
        <Navbar />
        <Alerts />
        <router-view class="container col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mt-sm-4 mb-4" />
    </div>
</template>

<script setup lang="ts">
import { post, ResponseGetHeader, ResponseGetPerms } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useThemeStore } from "@/store/themeStore";
import { getCookie, removeCookie } from "tiny-cookie";

import Navbar from "@/views/Navbar.vue";
import Alerts from "@/components/Alerts.vue";

const statusStore = useStatusStore();
const themeStore = useThemeStore();

if (getCookie("token") ? true : false) {
    post<ResponseGetHeader>("GET", {}, "header")
        .then((response) => {
            statusStore.loggedIn = true;
            statusStore.username = response.username;
            statusStore.avatar = response.avatar;
            statusStore.admin = response.admin;
            if (response.admin) {
                post<ResponseGetPerms>("GET", {}, "perms")
                .then(response => {
                    statusStore.allPerms = response;
                })
            }
            statusStore.checked = true;
        }).catch((e) => {
            console.error(e);
            statusStore.checked = true;
            removeCookie("token")
        });
} else {
    statusStore.checked = true;
}

themeStore.initThemes();

</script>

<style lang="scss">
.main {
    min-height: 100vh;
    overflow-x: hidden;
}
.navbar {
    margin-bottom: 2rem;
}

.popup {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    margin: auto;
    background-color: rgba(0,0,0,.5);
    
    > div {
        background-color: var(--bs-secondary);
        .popup-title, .popup-buttons {
            background-color: rgba(0,0,0,.2);
        }
    }

}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
</style>
