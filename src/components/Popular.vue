<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const {t} = useI18n();
</script>

<template>
	<h3>{{t("popular")}}</h3>
</template>