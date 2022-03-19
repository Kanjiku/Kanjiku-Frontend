<template>
    <div class="login">
        <div class="mx-auto col-12 col-sm-10 col-md-8 mb-4">
            <h2>Perms</h2>
            <div class="form-group mb-3">
                <input type="text" class="form-control" id="username" placeholder="New Perm" v-model="newPerm">
                <button class="btn btn-success mt-3" @click="addPerm()">Add Perm</button>
            </div>
            <div class="text-start ps-2 py-1" v-for="(perm) in statusStore.allPerms" :key="perm">
                <button class="btn btn-danger my-1 mx-3" @click="deletePerm(perm)"><i class="bi bi-trash"></i></button>
                <span>
                    {{ perm }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { post } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";

const router = useRouter();

const statusStore = useStatusStore();

let newPerm = ref("");

function addPerm() {
    if (newPerm.value == "" || statusStore.allPerms.includes(newPerm.value)) return;
    statusStore.allPerms.push(newPerm.value);
    post("POST", {perm: newPerm.value}, "perms");
    newPerm.value = "";
}

function deletePerm(perm: string) {
    const idx = statusStore.allPerms.findIndex(p => p === perm);
    post("DELETE", {perm: perm}, "perms");
    if (idx == -1) return;
    statusStore.allPerms.splice(idx, 1);
}

onMounted(() => {
    if (!statusStore.loggedIn) {
        let loginWatcher = watch(() => statusStore.checked, (b) => {
            if (!b) return;
            console.log("loggedIn",b);
            if (!statusStore.loggedIn) {
                router.push("/");
            }
            loginWatcher();
        });
    }
})

</script>

<style lang="scss" scoped>
</style>