<template>
  <div class="user card">
    <h3 class="card-title">{{ username }}</h3>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { post } from "@/funcs/essentials";

const store = useStore();
const route = useRoute();
const router = useRouter();

let username = ref("");
let avatar_url = "";

const getUserData = () => {
  store.dispatch("post", ["GET",{},"user/"+route.params.user])
    .then(([status, response]) => {
      if (response.Redirect) {
        console.log(response.Redirect.redirect_url);
        router.push(response.Redirect.redirect_url);
      }
      if (Math.floor(status / 100) != 2) {
        username.value = "Unknown User";
        return;
      }
      username.value = response.username;
  });
}

onMounted(() => {
  getUserData();
});

watch(() => route.params.user, () => {
  if (route.params.user) {
    getUserData();
  }
})

</script>

<style scoped lang="scss">
.card {
  width: 50vw;
  margin: auto;
  padding: 2rem;
}
</style>