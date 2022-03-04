<template>
    <div class="users">
        <div class="mx-auto col-10" v-show="loaded">
            <h2>Users</h2>
            <div class="row gy-4 gx-5 gx-sm-4 p-3 mx-auto">
                <router-link class="user col-6 col-sm-4 col-md-3 text-decoration-none"
                v-for="user in users" :key="user.username" :to="{name: 'User', params: {user: user.username}}" v-show="user.loaded">
                    <div class="ratio" style="--bs-aspect-ratio: 100%">
                        <img class="avatar" :src="user.url" @load="user.loaded = revoke_url(user.url ?? '')">
                    </div>
                    <p class="username my-2 text-center">{{ user.username }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch, onMounted } from 'vue';
import { post, get_avatar, revoke_url, ResponseGetUsers } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from 'vue-router';

const statusStore = useStatusStore();
const router = useRouter();

type User = {
    username: string,
    avatar: string,
    url?: string,
    loaded?: boolean
}

let loaded = ref(false);

const users: Ref<User[]> = ref([]);

function getUsers() {
    post<ResponseGetUsers>("GET", {}, "users", {redirect: router})
    .then(([status, response]) => {
        users.value = response.Users;
        for (const user of users.value) {
            user.loaded = false;
            get_avatar(user.avatar).then(url => {
                user.url = url;
            });
        }
        loaded.value = true;
    })
    .catch((_) => {
        router.push({path:"/"});
    });
}

onMounted(() => {
    if (statusStore.checked) {
        getUsers();
    } else {
        let loginWatcher = watch(() => statusStore.checked, (_, b) => {
            if (!b) return;
            getUsers();
            loginWatcher();
        });
    }
})
</script>

<style scoped lang="scss">
.user {
    cursor: default;
}

.avatar {
    cursor: pointer;
    border-radius: 100%;
}
.username {
    cursor: pointer;
    color: var(--bs-body-color);
}
</style>