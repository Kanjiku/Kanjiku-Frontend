<template>
    <div class="users">
        <div class="mx-auto col-10">
            <div class="d-flex flex-row justify-content-between">
                <h2>Users</h2>
                <div class="form-group mb-4">
                    <label class="form-label">Items Per Page</label>
                    <select class="form-select itemsPerPage" @change="changePerPage($event)">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="40">40</option>
                        <option value="100">100</option>
                        <option value="1000">1000</option>
                    </select>
                </div>
            </div>
            <div class="row gy-4 gx-5 gx-sm-4 p-3 mx-auto">
                <router-link class="user col-6 col-sm-4 col-md-3 text-decoration-none"
                v-for="user in users" :key="user.username" :to="{name: 'User', params: {user: user.username}}" v-show="user.show">
                    <div class="ratio" style="--bs-aspect-ratio: 100%">
                        <img class="avatar" :src="user.url" @load="user.status = revoke_url(user.url ?? '') ? 2 : 0" v-show="user.status != 1">
                    </div>
                    <p class="username my-2 text-center">{{ user.username }}</p>
                </router-link>
            </div>
            <nav class="mt-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <a class="page-link" @click="clickPage(1)">
                            <span>&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" :class="{active: page == curPage}" v-for="page in pages" :key="page"><a class="page-link" @click="clickPage(page)">{{ page }}</a></li>
                    <li class="page-item">
                        <a class="page-link" @click="clickPage(pageCount)">
                            <span>&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch, onMounted, reactive } from 'vue';
import { post, get_avatar, revoke_url, ResponseGetUsers } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from 'vue-router';

const statusStore = useStatusStore();
const router = useRouter();

type User = {
    username: string,
    avatar: string,
    url?: string,
    status?: number,
    show?: boolean
}

const users: Ref<User[]> = ref([]);

let itemsPerPage = 1;
let pageCount = ref(1);
let pages: Ref<number[]> = ref([]);
let curPage = ref(0);
let visiblePages = 3;

function changePerPage(e: Event) {
    const target = e.target as HTMLSelectElement;
    let newN = parseInt(target.value) ?? 24;    
    if (newN == itemsPerPage) return;
    //first item of page should be on page after update
    let newPage = Math.ceil((itemsPerPage * (curPage.value-1) + 1) / newN);
    itemsPerPage = newN;
    pageCount.value = Math.ceil(users.value.length/itemsPerPage);
    updatePage(newPage);
    updatePagination();
}

function updatePagination() {
    let first, last;
    if (curPage.value == 1) {
        first = 1;
        last = Math.min(visiblePages, pageCount.value);
    } else if(curPage.value == pageCount.value) {
        last = pageCount.value;
        first = Math.max(1, pageCount.value-visiblePages+1);
    } else {
        first = curPage.value - 1;
        last = curPage.value + 1;
    }
    let i = 0;
    pages.value = [];
    while (i+first <= last) {
        pages.value[i] = i+first;
        i++;
    }
}

function clickPage(page: number) {
    if (pageCount.value < page || curPage.value == page) return;
    updatePage(page);
    updatePagination();
}

function updatePage(page: number) {
    curPage.value = page;
    for (let i=0; i<itemsPerPage*(curPage.value-1); i++) {
        users.value[i].show = false;
    }
    for (let i=itemsPerPage*(curPage.value-1); i<Math.min(itemsPerPage*curPage.value, users.value.length); i++) {
        if (users.value[i].status == 0) {
            users.value[i].status = 1;
            get_avatar(users.value[i].avatar).then(url => {
                users.value[i].url = url;
            })
        }
        users.value[i].show = true;
    }
    for (let i=itemsPerPage*curPage.value; i<users.value.length; i++) {
        users.value[i].show = false;
    }
}

function getUsers() {
    post<ResponseGetUsers>("GET", {}, "users", {redirect: router})
    .then((response) => {
        for (const user of response.Users) {
            let temp: User = {username: user.username, avatar: user.avatar, status: 0, show: false};
            users.value.push(temp);
        }
        pageCount.value = Math.ceil(users.value.length/itemsPerPage);
        for (let i = 0; i < itemsPerPage; i++) {
            users.value[i].status = 1;
            get_avatar(users.value[i].avatar).then(url => {
                users.value[i].url = url;
            })
            users.value[i].show = true;        
        }
        updatePage(1);
        updatePagination();
    })
    .catch((e) => {
        console.error(e);
        router.push({path:"/"});
    });
}

onMounted(() => {
    if (statusStore.loggedIn) {
        getUsers();
    } else {
        let loginWatcher = watch(() => statusStore.loggedIn, (b) => {
            console.log("loggedIn",b);
            if (!b) return;
            getUsers();
            loginWatcher();
        }, {immediate:true});
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

.page-item {
    cursor: pointer;
}
</style>