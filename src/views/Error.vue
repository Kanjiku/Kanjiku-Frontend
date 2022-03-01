<template>
    <div class="error container d-flex flex-column justify-content-center">
        <h1 class="text-center fs-1">ERROR {{ props.status }}</h1>
        <p class="text-center">{{ props.text }}</p>
    </div>
</template>

<script lang="ts" setup>
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
.error {
    height: 70vh;
}
</style>