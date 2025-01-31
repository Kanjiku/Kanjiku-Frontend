<script setup lang="ts">
import FormInput from "@/components/FormInput.vue";
import { AlertType, use_alert_store } from "@/stores/alert_store";
import { createInvalid, createValid, request, type ValidationResult } from "@/utils/utils";
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const alerts = use_alert_store();

const username = ref("");
const email = ref("");
const birthday = ref("");
const password = ref("");
const password_confirm = ref("");

const username_validation: Ref<null | ValidationResult> = ref(null);
const email_validation: Ref<null | ValidationResult> = ref(null);
const password_validation: Ref<null | ValidationResult> = ref(null);
const password_confirm_validation: Ref<null | ValidationResult> = ref(null);

function signup() {
    if (username.value.length < 5) {
        username_validation.value = createInvalid(t("error.username_too_short"));
    } else if (username.value.length > 30) {
        username_validation.value = createInvalid(t("error.username_too_long"));
    } else {
        username_validation.value = createValid();
    }

    if (!email.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
        email_validation.value = createInvalid(t("error.email_invalid"))
    } else {
        email_validation.value = createValid();
    }

    if (password.value.length < 7) {
        password_validation.value = createInvalid(t("error.password_too_short"))
    } else {
        password_validation.value = createValid();
    }

    if (password.value != password_confirm.value) {
        password_confirm_validation.value = createInvalid(t("error.password_confirm_not_matching"));
    } else {
        password_confirm_validation.value = createValid();
    }

    if (!(username_validation.value.valid && email_validation.value.valid && password_validation.value.valid && password_confirm_validation.value.valid)) {
        return;
    }

    request<any>("/api/v1/User/register", "POST", {
        username: username.value,
        password: password.value,
        birthday: birthday.value,
        email: email.value,
    }).then(_ => {
        alerts.add(AlertType.SUCCESS, t("alert.activation_email_0") + email.value + t("alert.activation_email_1"), -1);
    }).catch(error => {
        alerts.add(AlertType.DANGER, error.msg);
    });
}

</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{ t("signup") }}</h2>
        <form>
            <fieldset>
                <FormInput :label_str="t('username')" name="username" :placeholder="t('username')"
                    :required="true" :validation="username_validation" v-model="username" />
                <FormInput :label_str="t('email')" name="email" :placeholder="t('email')"
                    :required="true" :validation="email_validation" v-model="email" />
                <FormInput type="date" :label_str="t('birthday')" name="birthday"
                    v-model="birthday" />
                <FormInput type="password" :label_str="t('password')" name="password"
                    :placeholder="t('password')" :required="true" :validation="password_validation" v-model="password" />
                <FormInput type="password" :label_str="t('password_confirm')" name="password_confirm"
                    :placeholder="t('password_confirm')" :required="true" :validation="password_confirm_validation"
                    v-model="password_confirm" />

                <p><small class="text-body-secondary"><span class="text-danger">*</span>{{ t("required_fields") }}</small></p>
                <button class="btn btn-primary" @click.prevent="signup()">{{ t("signup") }}</button>
            </fieldset>
        </form @keyup.enter.prevent="signup()">
    </div>
</template>