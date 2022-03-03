import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
    state: () => ({
        loggedIn: false,
        username: "",
        checked: false
    })
});