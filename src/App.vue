<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { use_theme_store } from "@/stores/theme_store";

const theme_store = use_theme_store();
theme_store.init_themes();

</script>

<template>
	<div class="app min-vh-100 d-flex flex-column">
		<div class="mb-auto">
			<Navbar />
			<RouterView />
		</div>
		<div>
			<Footer />
		</div>
	</div>
</template>

<style scoped>
</style>
