<template>
    <div class="register">
        <h2>Register</h2>
        <form>
            <fieldset>
                <div class="form-group">
                    <label for="username" class="form-label mt-4">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                </div>
                <div class="form-group">
                    <label for="email" class="form-label mt-4">Email</label>
                    <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password" class="form-label mt-4">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                    <label for="passwordconfirm" class="form-label mt-4">Password Confirmation</label>
                    <input type="password" class="form-control" id="passwordconfirm" placeholder="Confirm Password" v-model="passwordconfirm">
                </div>
                <button @click.prevent="register()" type="submit" class="btn btn-primary">Register</button>
            </fieldset>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { setCookie } from "tiny-cookie";

const store = useStore();
const router = useRouter();


let username = ref("");
let email = ref("");
let password = ref("");
let passwordconfirm = ref("");


const register = () => {
    const data = {
        "action":"register",
        "password": password.value,
        "passwordconfirm": passwordconfirm.value,
        "username": username.value,
        "email": email.value
    };

    store.dispatch("post", ["POST",data,'register'])
    .then(([status, response]) => {
        const loginData = {
            "action": "login",
            "password": data.password,
            "username": data.username,
            "remember_me": false
        };

        store.dispatch("post", ["POST",loginData,"login", {redirect: router}])
        .then(([status,response]) => {
            setCookie("token", response.Login.token, { expires: "1D" });
            store.commit("setUsername", response.Redirect.redirect_url.slice(response.Redirect.redirect_url.lastIndexOf("/")+1));
            store.commit("setLoggedIn", true);
        })
        .catch((_) => ({}));
    })
    .catch((_) => ({}));
};
</script>

<style lang="scss" scoped>
.register {
    width: 40vw;
    margin: auto;
    padding: 2rem;

    button {
        margin-top: 2rem;
    }
}
</style>
