<template>
    <div class="user">
        <div class="row justify-content-around">
            <div class="name col-11 order-1 col-md-3 order-md-2 text-center text-md-start align-self-center">
                <h2>Profil von</h2>
                <h3>{{ name }}</h3>
            </div>
            <div class="image col-11 order-2 col-md-3 order-md-1">
                <div class="ratio mx-auto my-4" style="--bs-aspect-ratio: 100%" v-show="img_loaded">
                    <img class="avatar" :src="avatar_url" @load="img_loaded=revoke_url(avatar_url)">
                </div>
            </div>
            <div class="edit order-3 col-md-6 text-center text-md-center ps-md-5 align-self-center" v-if="!editMode && (statusStore.admin || statusStore.username == name)">   
                <button class="btn btn-primary" @click="initEdit()">Edit Profile</button>
            </div>
            <div class="perms order-4 col-11 col-md-12 ps-md-5 mt-3 mb-4" v-if="statusStore.admin">
                <h3 class="text-md-start">Perms</h3>
                <div class="form-check">
                    <div class="text-start ps-2" v-for="(perm) in statusStore.allPerms" :key="perm">
                        <input class="form-check-input" type="checkbox" value="" :id="perm" v-model="perms[perm]" @change="change_perm()">
                        <label class="form-check-label" :for="perm">
                            {{ perm }}
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="!editMode" class="order-4 col-11 col-md-12 ps-md-5">
                <div class="text-md-start" v-show="email">
                    <h3>Email</h3>
                    <p>{{ email }}</p>
                </div>
            </div>
            <div v-else class="order-3 col-12 ps-md-5">
                <form>
                    <fieldset>
                        <!--<div class="form-group mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Username" v-model="editName">
                        </div>-->
                        <div class="form-group mb-3"> 
                            <label for="email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="email" placeholder="Email" v-model="editEmail">
                        </div>
                        <div class="form-group mb-3">
                            <label for="password" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="password" placeholder="New Password" v-model="editPassword">
                        </div>
                        <div class="form-group mb-4">
                            <label for="passwordconfirm" class="form-label">Password Confirmation</label>
                            <input type="password" class="form-control" id="passwordconfirm" placeholder="Confirm Password" v-model="editPasswordconfirm">
                        </div>
                        <button @click.prevent="saveChanges()" type="submit" class="btn btn-success">Save Changes</button>
                        <button @click.prevent="cancelEdit()" type="submit" class="btn btn-danger ms-3">Cancel</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import { post, get_avatar, revoke_url, ResponseGetUser, ResponseGetPerms } from "@/funcs/requests";
import { useStatusStore } from "@/store/statusStore";
import { useRoute, useRouter } from "vue-router";

const statusStore = useStatusStore();
const route = useRoute();
const router = useRouter();

let name = ref("");
let avatar_url = ref("");
let img_loaded = ref(false);
let email = ref("");
let perms: {[key: string] : boolean} = reactive({});
let editMode = ref(false);

//let editName = ref("");
let editEmail = ref("");
let editPassword = ref("");
let editPasswordconfirm = ref("");

function initEdit() {
    if (!(statusStore.admin || (name.value == statusStore.username))) return;
    //editName.value = name.value;
    editEmail.value = email.value;
    editPassword.value = "";
    editPasswordconfirm.value = "";
    editMode.value = true;
}

function saveChanges() {
    //name.value = editName.value;
    email.value = editEmail.value;
    let data: {[key: string]: any} = {email: email.value, perms: {}};
    if (editPassword.value.length > 0) {
        data.password = editPassword.value;
    }
    if (editPasswordconfirm.value.length > 0) {
        data.passwordconfirm = editPasswordconfirm.value;
    }

    post("PUT", data, "user/"+route.params.user)
    .then(response => {
        editMode.value = false;
    });
}

function cancelEdit() {
    editEmail.value = email.value;
    editMode.value = false;
}

function change_perm() {
    post("PUT", {perms: perms}, "user/"+route.params.user);
}

function getUserData() {
    post<ResponseGetUser>("GET",{},"user/"+route.params.user, {redirect: router})
    .then((response) => {
        name.value = response.username;
        email.value = response.email ?? "";
        
        get_avatar(response.avatar).then(url => {
            avatar_url.value = url;
        })

        if (statusStore.admin && response.perms) {
            if (statusStore.allPerms.length > 0) {
                for (const p of statusStore.allPerms) {
                    perms[p] = response.perms.includes(p);
                }
            }
        }
    })
    .catch((_) => ({}));
}

onMounted(() => {
    if (statusStore.loggedIn) {
        getUserData();
    } else {
        let loginWatcher = watch(() => statusStore.checked, (b) => {
            if (!b) return;
            console.log("loggedin", statusStore.loggedIn);
            if (!statusStore.loggedIn) {
                router.push("/");
                return;
            }
            getUserData();
            loginWatcher();
        });
    }
})

watch(() => route.params.user, () => {
    if (route.params.user) {
        getUserData();
    }
})

</script>

<style scoped lang="scss">
.ratio {
    max-width: 200px;
}
</style>