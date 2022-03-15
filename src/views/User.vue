<template>
    <div class="user">
        <div class="text-center">
            <h2>Profil von</h2>
            <h3>{{ name }}</h3>
            <div class="ratio mx-auto my-4" style="--bs-aspect-ratio: 100%" v-show="img_loaded">
                <img class="avatar" :src="avatar_url" @load="img_loaded=revoke_url(avatar_url)">
            </div>
            <div v-show="email">
                <h3>Email</h3>
                <p>{{ email }}</p>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { post, get_avatar, revoke_url, ResponseGetUser } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRoute, useRouter } from "vue-router";

const statusStore = useStatusStore();
const route = useRoute();
const router = useRouter();

let name = ref("");
let avatar_url = ref("");
let img_loaded = ref(false);
let email = ref("");

function getUserData() {
    post<ResponseGetUser>("GET",{},"user/"+route.params.user, {redirect: router})
    .then((response) => {
        name.value = response.username;
        email.value = response.email ?? "";
        
        get_avatar(response.avatar).then(url => {
            avatar_url.value = url;
        })
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
.ratio {
    max-width: 200px;
}
</style>