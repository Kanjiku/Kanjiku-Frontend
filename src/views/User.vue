<script setup lang="ts">
import { AlertType, use_alert_store } from '@/stores/alert_store';
import { use_user_store, type UserInfo } from '@/stores/user_store';
import { type Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const user_store = use_user_store();
const alerts = use_alert_store();

let user: Ref<null | UserInfo> = ref(null);

function load_user() {
	user_store.get_by_uid(route.params.uid as string)
		.then(data => {
			user.value = data;
		}).catch(error => {
			alerts.add(AlertType.DANGER, error.msg);
		});
}

load_user();

watch(
	() => route.params.uid,
	_ => {
		load_user
	}
)

</script>

<template>
	<div>
		<h1>{{ user?.username }}</h1>
	</div>
</template>