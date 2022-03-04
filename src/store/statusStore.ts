import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
    state: () => ({
        loggedIn: false,
        username: "",
        avatar: "",
        checked: false
    })
});