<template>
  <div class="card">
    <h3 class="card-title">{{ route.params.name }}</h3>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<style scoped lang="scss">
.card {
  width: 50vw;
  margin: auto;
  padding: 2rem;
}
</style>