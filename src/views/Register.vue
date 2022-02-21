<template>
  <div class="card register">
    <h3>Register</h3>
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

<script setup>
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
  var data = {"action":"register"};

  data["password"] = password.value;
  data["passwordconfirm"] = passwordconfirm.value;
  data["username"] = username.value;
  data["email"] = email.value;

  store.dispatch("post", ["POST",data,'register'])
    .then(([status, response]) => {
      if (Math.floor(status/100) != 2) return;
      var loginData = {"action":"login"};
      loginData["password"] = data.password;
      loginData["username"] = data.username;
      loginData["remember_me"] = false;

      store.dispatch("post", ["POST",loginData,"login"])
        .then(([status,response]) => {
          if (Math.floor(status/100) != 2) return;
          setCookie("token", response.Login.token, { expires: "1D" });
          var username = response.Redirect.redirect_url.slice(response.Redirect.redirect_url.lastIndexOf("/")+1);
          store.commit("setUsername", username);
          store.commit("setLoggedIn", true);

          router.push({name:"User", params: {user: username}});
      });
  });
};
</script>

<style lang="scss" scoped>
.register {
  width: 50vw;
  margin: auto;
  padding: 2rem;

  button {
    margin-top: 2rem;
  }
}
</style>
