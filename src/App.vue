<template>
    <div class="main d-flex-column container-fluid p-0">
        <Navbar />
        <Alerts />
        <router-view class="container col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mt-sm-4 mb-4" />
    </div>
</template>

<script setup lang="ts">
import { post, ResponseGetHeader } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useThemeStore } from "@/store/themeStore";
import { getCookie, removeCookie } from "tiny-cookie";

import Navbar from "@/views/Navbar.vue";
import Alerts from "@/components/Alerts.vue";

const statusStore = useStatusStore();
const themeStore = useThemeStore();

if (getCookie("token") ? true : false) {
    post<ResponseGetHeader>("GET", {}, "header")
        .then(([status, response]) => {
            if (Math.floor(status / 100) != 2) return;
            statusStore.loggedIn = true;
            statusStore.username = response.username;
            statusStore.avatar = response.avatar;
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


<style scoped lang="scss">
.main {
    min-height: 100vh;
    overflow-x: hidden;
}
.navbar {
    margin-bottom: 2rem;
}
</style>
