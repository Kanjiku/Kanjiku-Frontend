<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const {t} = useI18n();
</script>

<template>
    <div class="home container-lg py-4">
        <h2>{{t("latest")}}</h2>
	</div>
</template>