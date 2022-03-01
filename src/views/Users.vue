<template>
    <div class="users">
        <div class="mx-auto col-10">
            <h2>Users</h2>
            <div class="row gy-4 gx-5 gx-sm-4 p-3 mx-auto">
                <router-link class="user col-6 col-sm-4 col-md-3 text-decoration-none"
                v-for="user in users" :key="user.username" :to="{name: 'User', params: {user: user.username}}" v-show="user.loaded">
                    <div class="ratio" style="--bs-aspect-ratio: 100%">
                        <img class="avatar" :src="user.url" @load="revoke_url(user)">
                    </div>
                    <p class="username my-2 text-center">{{ user.username }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();


type User = {
    username: string,
    avatar: string,
    url?: string,
    loaded?: boolean
}

const users: Ref<User[]> = ref([]);

const getUsers = () => {
    store.dispatch("post", ["GET", {}, "users"])
    .then(([status, response]) => {
        users.value = response.Users;
        for (const user of users.value) {
            user.loaded = false;
            store.dispatch("get_avatar", user.avatar).then(url => {
                user.url = url;
            });
        }
    })
    .catch((_) => {
        router.push({path:"/"});
    });
}

const revoke_url = (user: User) => {
    if (!user.url) return;
    URL.revokeObjectURL(user.url);
    user.loaded = true;
}

const init = () => {
    if (!store.getters.isLoggedIn) {
        router.push({path:"/"});
        return;
    }
    getUsers();
}

store.dispatch("awaitChecked").then(() => {
    init();
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