import { defineStore } from "pinia";

type StatusStore = {
    loggedIn: boolean,
    username: string,
    avatar: string,
    checked: boolean,
    admin: boolean,
    allPerms: string[]
}

export const useStatusStore = defineStore("status", {
    state: () => ({
        loggedIn: false,
        username: "",
        avatar: "",
        checked: false,
        admin: false,
        allPerms: []
    } as StatusStore)
});