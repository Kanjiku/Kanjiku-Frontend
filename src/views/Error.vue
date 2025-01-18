<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
    statusCode: {
        type: Number,
        default: 404
    },
    message: {
        type: String,
        default: "Not Found"
    }
});
</script>

<template>
    <div class="error container d-flex flex-column justify-content-center align-items-center">
        <h1>ERROR {{ props.statusCode }}</h1>
        <p>{{ props.message }}</p>
    </div>
</template>

<style scoped>
.error {
    min-height: 70vh;
}
</style>