<template>
    <div class="">
        <h3 class="">{{ route.params.name }}</h3>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<style scoped lang="scss">
</style>