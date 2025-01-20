<script setup lang="ts">
import { use_theme_store } from "@/stores/theme_store";
import { useI18n } from "vue-i18n";

const theme_store = use_theme_store();
const {messages, t} = useI18n({
    locale: "de",
    fallbackLocale: "en",
    messages: {
        de: {
            options: "Optionen",
            theme: "Design",
            language: "Sprache",
            apply: "Anwenden"
        },
        en: {
            options: "Options",
            theme: "Theme",
            language: "Language",
            apply: "Apply"
        }
    }

});

const language_names = new Map([
    ["en", "English"],
    ["de", "Deutsch"]
])
</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>{{t("options")}}</h2>
        <form>
            <fieldset>
                <div class="form-group mb-4">
                    <label for="theme" class="form-label">{{t("theme")}}</label>
                    <select name="theme" id="theme" class="form-select" :value="theme_store.get_current_instant()"
                        @change="theme_store.select_theme(($event.target as HTMLSelectElement).value)">
                        <option v-for="theme in theme_store.get_all()" :key="theme" :value="theme">{{ theme }}</option>
                    </select>
                </div>
                <div class="form-group mb-4">
                    <label for="language" class="form-label">{{t("language")}}</label>
                    <select name="language" id="language" class="form-select" v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
                            {{language_names.get(locale) ?? "Error"}}
                        </option>
                    </select>
                </div>
            </fieldset>
        </form>
    </div>
</template>