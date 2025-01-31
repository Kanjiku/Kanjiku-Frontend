<script setup lang="ts">
import { use_user_store } from '@/stores/user_store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const user = use_user_store();

</script>

<template>
	<div>
		<h1>{{ t("user", 2) }}</h1>
	</div>
</template>