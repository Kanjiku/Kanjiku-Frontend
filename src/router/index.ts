import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Latest from "@/views/Latest.vue";
import Projects from "@/views/Projects.vue";
import Options from "@/views/Options.vue";
import Users from "@/views/Users.vue";
import User from "@/views/User.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
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
			path: "/latest",
			name: "Latest",
			component: Latest
		},
		{
			path: "/projects",
			name: "Projects",
			component: Projects
		},
		{
			path: "/user",
			name: "Users",
			component: Users
		},
		{
			path: "/user/:uid",
			name: "User",
			component: User
		},
		{
			path: "/options",
			name: "Options",
			component: Options
		},
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/signup",
			name: "Signup",
			component: Signup
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
