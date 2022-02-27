<template>
    <div class="login">
        <h2>Login</h2>
        <form>
            <fieldset>
                <div class="form-group">
                    <label for="username" class="form-label mt-4">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                </div>
                <div class="form-group">
                    <label for="password" class="form-label mt-4">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
                </div>
                <button @click.prevent="login()" type="submit" class="btn btn-primary">Login</button>
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
let password = ref("");

const login = () => {
    let data = {
        "action": "login",
        "password": password.value,
        "username": username.value,
        "remember_me": false
    };

    store.dispatch("post", ["POST", data, 'login', {alert: false, redirect: router}])
        .then(([_,response]) => {
        setCookie("token", response.Login.token, { expires: "1D"});
        store.commit("setUsername", username.value)
        store.commit("setLoggedIn", true);

        router.push({name:"User", params: {user: username.value}});
    }).catch((_) => _);
}
</script>

<style lang="scss" scoped>
.login {
    width: max(500px, 40vw);
    margin: auto;
    padding: 2rem;

    button {
        margin-top: 2rem;
    }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .login {
      width: min(100%, 500px);
  }
}
</style>