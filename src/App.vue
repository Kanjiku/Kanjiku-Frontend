<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Alerts from "@/components/Alerts.vue";
import Footer from "@/components/Footer.vue";
import { use_theme_store } from "@/stores/theme_store";
import { use_user_store } from "./stores/user_store";

const themes = use_theme_store();
const user = use_user_store();

themes.init_themes();
user.check_session();

</script>

<template>
	<div class="app min-vh-100 d-flex flex-column">
		<div class="mb-auto">
			<Navbar />
			<Alerts />
			<RouterView />
		</div>
		<div>
			<Footer />
		</div>
	</div>
</template>

<style scoped>
</style>
