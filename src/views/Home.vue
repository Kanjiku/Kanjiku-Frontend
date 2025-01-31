<script setup lang="ts">
import HomeLatest from "@/components/HomeLatest.vue";
import News from "@/components/News.vue";
import Popular from "@/components/Popular.vue";
import { AlertType, use_alert_store } from "@/stores/alert_store";
import { use_user_store } from "@/stores/user_store";

const alerts = use_alert_store();
const user = use_user_store();

function test() {
	user.check_session()
		.then(response => {
			alerts.add(AlertType.SUCCESS, "Session is valid");
			console.log(response);
		}).catch(error => {
			console.error(error)
			alerts.add(AlertType.DANGER, error.msg);
		})
}

function test2() {
	user.get_all_users()
		.then(user_list => {
			alerts.add(AlertType.SUCCESS, "Got all users");
			console.log(user_list);
		}).catch(error => {
			console.error(error)
			alerts.add(AlertType.DANGER, error.msg);
		})
}
</script>

<template>
	<div class="home container-lg py-4">
		<News />
		<Popular />
		<HomeLatest />
		<button class="btn btn-primary" @click="test()">Check Session</button>
		<button class="btn btn-primary" @click="test2()">All Users</button>
	</div>
</template>

<style scoped>

</style>
