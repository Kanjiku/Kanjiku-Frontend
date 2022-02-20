<template>
  <div class="error card">
      <h1 class="card-title">ERROR {{ props.status }}</h1>
      <p>{{ props.text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: "404"
  },
  text: {
    type: String,
    default: "Not Found"
  }
})

</script>

<style scoped lang="scss">
.error.card {
  width: 50vw;
  height: 70vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .card-title {
    font-size: 4rem;
  }
}
</style>