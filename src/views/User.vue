<template>
    <div class="user">
        <h2>{{ username }}</h2>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

let username = ref("");
let avatar_url = "";

const getUserData = () => {
    store.dispatch("post", ["GET",{},"user/"+route.params.user, {redirect: router}])
    .then(([status, response]) => {
        username.value = response.username;
    })
    .catch((_) => ({}));
}

onMounted(() => {
    if (store.getters.isLoggedIn) {
        getUserData();
    } else {
        let loginWatcher = watch(() => store.getters.isLoggedIn, (b) => {
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