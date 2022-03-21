<template>
    <div class="login">
        <div class="mx-auto col-12 col-sm-10 col-md-8 mb-4">
            <h2>Login</h2>
            <form>
                <fieldset>
                    <div class="form-group mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-group mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                    </div>
                    <button @click.prevent="login()" type="submit" class="btn btn-primary">Login</button>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { post, ResponseLogin, ResponseGetHeader, ResponseGetPerms } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from "vue-router";
import { setCookie } from "tiny-cookie";

const statusStore = useStatusStore();
const router = useRouter();

let username = ref("");
let password = ref("");

function login() {
    let data = {
        "action": "login",
        "password": password.value,
        "username": username.value,
        "remember_me": false
    };

    statusStore.checked = false;
    post<ResponseLogin>("POST", data, 'login', {redirect: router})
        .then((response) => {
            setCookie("token", response.Login.token, { expires: "1D"});
            statusStore.username = username.value;
            statusStore.loggedIn = true;

            post<ResponseGetHeader>("GET", {}, "header")
            .then((response) => {
                statusStore.avatar = response.avatar;
                statusStore.admin = response.admin;
                if (response.admin) {
                    post<ResponseGetPerms>("GET", {}, "perms")
                    .then(response => {
                        statusStore.allPerms = response;
                    })
                }
            })
            statusStore.checked = true;
            router.push({name:"User", params: {user: username.value}});
        }).catch((_) => {
            statusStore.checked = true;
        });
}
</script>

<style lang="scss" scoped>
</style>