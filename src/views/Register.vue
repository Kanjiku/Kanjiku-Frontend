<template>
    <div class="register">
        <div class="mx-auto col-12 col-sm-10 col-md-8 mb-4">
            <h2>Register</h2>
            <form>
                <fieldset>
                    <div class="form-group mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-group mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-group mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                    </div>
                    <div class="form-group mb-4">
                        <label for="passwordconfirm" class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" id="passwordconfirm" placeholder="Confirm Password" v-model="passwordconfirm">
                    </div>
                    <button @click.prevent="register()" type="submit" class="btn btn-primary">Register</button>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { post, ResponseLogin, ResponseGetHeader } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from "vue-router";
import { setCookie } from "tiny-cookie";

const statusStore = useStatusStore();
const router = useRouter();

let username = ref("");
let email = ref("");
let password = ref("");
let passwordconfirm = ref("");


function register() {
    const data = {
        "action":"register",
        "password": password.value,
        "passwordconfirm": passwordconfirm.value,
        "username": username.value,
        "email": email.value
    };

    post("POST",data,'register')
    .then((response) => {
        const loginData = {
            "action": "login",
            "password": data.password,
            "username": data.username,
            "remember_me": false
        };

        post<ResponseLogin>("POST",loginData,"login", {redirect: router})
        .then((response) => {
            setCookie("token", response.Login.token, { expires: "1D" });
            statusStore.username = data.username;
            statusStore.loggedIn = true;

            post<ResponseGetHeader>("GET", {}, "header")
            .then((response) => {
                statusStore.avatar = response.avatar;
                statusStore.perms.admin = response.admin;
            })
        })
        .catch((_) => ({}));
    })
    .catch((_) => ({}));
}
</script>

<style lang="scss" scoped>
</style>
