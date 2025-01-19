<script setup lang="ts">
import { use_theme_store } from "@/stores/theme_store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const theme_store = use_theme_store();
const {messages, t} = useI18n({
    locale: "de",
    fallbackLocale: "en",
    messages: {
        de: {
            title: "Einloggen",
            username: "Benutername",
            password: "Passwort"
        },
        en: {
            title: "Login",
            username: "Username",
            password: "Password"
        }
    }

});

const username = ref("");
const password = ref("");
</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{t("title")}}</h2>
        <form>
            <fieldset>
                <div class="form-group mb-4">
                    <label for="username" class="form-label">{{t("username")}}</label>
                    <input type="text" name="username" id="username" class="form-control" v-model="username">
                </div>
                <div class="form-group mb-4">
                    <label for="password" class="form-label">{{t("password")}}</label>
                    <input type="password" name="password" id="password" class="form-control" v-model="password">
                </div>
                <button class="btn btn-primary" @click.prevent>{{t("title")}}</button>
            </fieldset>
        </form>
    </div>
</template>