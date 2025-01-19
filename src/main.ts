import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";

import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(createI18n({
    legacy: false,
    locale: "de",
    fallbackLocale: "en",
    availableLocales: ["de", "en"],
    messages: {
        de: {
            full_language: "Deutsch"
        },
        en: {
            full_language: "English"
        }
    }
}));
app.use(router);

app.mount("#app");
