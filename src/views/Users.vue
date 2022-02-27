<template>
    <div class="users">
        <h2>Users</h2>
        <div class="user-container">
            <div class="user" v-for="user in users" :key="user.username" @click="to_user(user.username)" v-show="user.loaded">
                <img class="avatar" :src="user.url" @load="revoke_url(user)">
                <p class="username">{{ user.username }}</p>
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
    user.loaded = true;
    URL.revokeObjectURL(user.url);
}

const to_user = (username: string) => {
    router.push({ name: "User", params: { user: username } });
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
.users {
    width: max(720px, 50vw);
    margin: auto;
    padding: 2rem;

    .user-container {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 2rem;
        grid-gap: 2rem;

        .user {
            cursor:pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .avatar {
                width: 100%;
                aspect-ratio: 1;
                outline-style: none;
            }

            .username {
                margin-top: .5rem;
                text-align: center;
            }
        }
    }
}
</style>