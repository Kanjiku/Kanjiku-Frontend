import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from "@/views/Home.vue";
import Mangas from "@/views/Mangas.vue";
import Manga from "@/views/Manga.vue";
import Options from "@/views/Options.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Users from "@/views/Users.vue";
import User from "@/views/User.vue";
import ErrorComp from "@/views/Error.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/manga",
        name: "Mangas",
        component: Mangas
    },
    {
        path: "/manga/:name",
        name: "Manga",
        component: Manga
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
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/users",
        name: "Users",
        component: Users
    },
    {
        path: "/user/:user",
        name: "User",
        component: User
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: ErrorComp,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
