<template>
    <div class="error">
        <h1>ERROR {{ props.status }}</h1>
        <p>{{ props.text }}</p>
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
    width: 50vw;
    height: 70vh;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 4rem;
    }
}
</style>