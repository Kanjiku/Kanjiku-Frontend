<template>
    <div class="user">
        <div class="text-center row">
            <div class="name col-12 order-1 col-md-6 order-md-2 pt-5 text-md-start">
                <h2>Profil von</h2>
                <h3>{{ name }}</h3>
            </div>
            <div class="image col-12 order-2 col-md-5 order-md-1">
                <div class="ratio mx-auto my-4" style="--bs-aspect-ratio: 100%" v-show="img_loaded">
                    <img class="avatar" :src="avatar_url" @load="img_loaded=revoke_url(avatar_url)">
                </div>
            </div>
            <div class="perms order-3 col-12 ps-md-5 mt-3 mb-4" v-if="statusStore.admin">
                <h3 class="text-md-start">Perms</h3>
                <div class="form-check" v-if="statusStore.allPerms.length > 0">
                    <div class="text-start ps-2" v-for="(perm) in statusStore.allPerms" :key="perm">
                        <input class="form-check-input" type="checkbox" value="" :id="perm" v-model="perms[perm]" @change="change_perm()">
                        <label class="form-check-label" :for="perm">
                            {{ perm }}
                        </label>
                    </div>
                </div>
                <div v-else class="text-start mb-4 mt-3">
                    No Perms
                </div>
            </div>
            <div class="order-3 col-12 text-md-start ps-md-5" v-show="email">
                <h3>Email</h3>
                <p>{{ email }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import { post, get_avatar, revoke_url, ResponseGetUser, ResponseGetPerms } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRoute, useRouter } from "vue-router";

const statusStore = useStatusStore();
const route = useRoute();
const router = useRouter();

let name = ref("");
let avatar_url = ref("");
let img_loaded = ref(false);
let email = ref("");
let perms: {[key: string] : boolean} = reactive({});

function change_perm() {
    post("PUT", {perms: perms}, "user/"+route.params.user);
}

function getUserData() {
    post<ResponseGetUser>("GET",{},"user/"+route.params.user, {redirect: router})
    .then((response) => {
        name.value = response.username;
        email.value = response.email ?? "";
        
        get_avatar(response.avatar).then(url => {
            avatar_url.value = url;
        })

        if (statusStore.admin && response.perms) {
            if (statusStore.allPerms.length > 0) {
                for (const p of statusStore.allPerms) {
                    perms[p] = response.perms.includes(p);
                }
            }
        }
    })
    .catch((_) => ({}));
}

onMounted(() => {
    if (statusStore.loggedIn) {
        getUserData();
    } else {
        let loginWatcher = watch(() => statusStore.checked, (b) => {
            if (!b) return;
            console.log("loggedin", statusStore.loggedIn);
            if (!statusStore.loggedIn) {
                router.push("/");
                return;
            }
            getUserData();
            loginWatcher();
        });
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