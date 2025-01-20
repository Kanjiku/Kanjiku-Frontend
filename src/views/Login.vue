<script setup lang="ts">
import FormInput, { type ValidationResult } from "@/components/FormInput.vue";
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const {t} = useI18n();

const username = ref("");
const password = ref("");

const username_validation: Ref<ValidationResult | undefined> = ref(undefined);
const password_validation: Ref<ValidationResult | undefined> = ref(undefined);

function login() {
    username_validation.value = {
        valid: false,
        message: t("errors.username_not_found")
    };
    password_validation.value = {
        valid: false,
        message: t("errors.password_incorrect")
    };
}
</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{t("login")}}</h2>
        <form>
            <fieldset>
                <FormInput type="text" name="username" v-model="username" :validation="username_validation">
                    {{t("username")}}
                </FormInput>
                <FormInput type="password" name="password" v-model="password" :validation="password_validation">
                    {{t("password")}}
                </FormInput>
                <button class="btn btn-primary" @click.prevent="login()">{{t("login")}}</button>
            </fieldset>
        </form>
    </div>
</template>