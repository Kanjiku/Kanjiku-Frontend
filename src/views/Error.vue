<script setup lang="ts">
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { message, status_code } = defineProps<{
    status_code?: number,
    message?: string
}>();
</script>

<template>
    <div class="error container d-flex flex-column justify-content-center align-items-center">
        <h1>ERROR {{ status_code ?? 404 }}</h1>
        <p>{{ message ?? t("error.404") }}</p>
    </div>
</template>

<style scoped>
.error {
    min-height: 70vh;
}
</style>