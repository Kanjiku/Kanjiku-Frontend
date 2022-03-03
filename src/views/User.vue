<template>
    <div class="user">
        <h2>{{ user }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { post } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRoute, useRouter } from "vue-router";

const statusStore = useStatusStore();
const route = useRoute();
const router = useRouter();

let user = ref("");
let avatar_url = "";

const getUserData = () => {
    post("GET",{},"user/"+route.params.user, {redirect: router})
    .then(([status, response]) => {
        user.value = response.username;
    })
    .catch((_) => ({}));
}

onMounted(() => {
    if (statusStore.loggedIn) {
        getUserData();
    } else {
        let loginWatcher = watch(() => statusStore.loggedIn, (b) => {
            console.log("loggedin", b);
            if (!b) return;
            getUserData();
            loginWatcher();
        }, {immediate: true});
    }
})

watch(() => route.params.user, () => {
    if (route.params.user) {
        getUserData();
    }
})

</script>

<style scoped lang="scss">
</style>