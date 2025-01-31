<script setup lang="ts">
import FormInput from "@/components/FormInput.vue";
import { AlertType, use_alert_store } from "@/stores/alert_store";
import { use_user_store } from "@/stores/user_store";
import { type ValidationResult } from "@/utils/utils";
import { isRegularExpressionLiteral } from "typescript";
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { return_afterwards } = defineProps<{
    return_afterwards?: boolean
}>();

const { t } = useI18n();
const router = useRouter();
const alerts = use_alert_store();
const user = use_user_store();

const username = ref("");
const password = ref("");

const username_validation: Ref<ValidationResult | undefined> = ref(undefined);
const password_validation: Ref<ValidationResult | undefined> = ref(undefined);

function login() {
    user.login(username.value, password.value)
        .then(_ => {
            if (return_afterwards) {
                router.back();
            } else {
                router.push({ name: "Home" });
            }
        }).catch(error => {
            alerts.add(AlertType.DANGER, error.msg);
        });
}
</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{ t("login") }}</h2>
        <form>
            <fieldset>
                <FormInput :label_str="t('username_email')" name="username" :placeholder="t('username_email')"
                    :validation="username_validation" v-model="username" />
                <FormInput type="password" :label_str="t('password')" name="password" :placeholder="t('password')"
                    :validation="password_validation" v-model="password" />

                <button class="btn btn-primary" @click.prevent="login()">{{ t("login") }}</button>
            </fieldset>
        </form>
    </div>
</template>