<script setup lang="ts">
import FormInput from "@/components/FormInput.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const {t} = useI18n();

const username = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("");
</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{t("signup")}}</h2>
        <form>
            <fieldset>
                <FormInput type="text" name="username" v-model="username">{{t("username")}}</FormInput>
                <FormInput type="text" name="email" v-model="email">{{t("email")}}</FormInput>
                <FormInput type="password" name="password" v-model="password">{{t("password")}}</FormInput>
                <FormInput type="password" name="password_confirm" v-model="password_confirm">{{t("password_confirm")}}</FormInput>
                <button class="btn btn-primary" @click.prevent>{{t("signup")}}</button>
            </fieldset>
        </form>
    </div>
</template>