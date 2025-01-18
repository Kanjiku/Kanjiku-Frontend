import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Options from "@/views/Options.vue";
import ErrorComp from "@/views/Error.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
		},
		{
			path: "/options",
			name: "Options",
			component: Options
		},
		{
			path: "/:pathMatch(.*)*",
			name: "Error",
			component: ErrorComp,
			props: true
		}
	],
})

export default router
