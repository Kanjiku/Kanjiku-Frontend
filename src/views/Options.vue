<script setup lang="ts">
import { use_theme_store } from "@/stores/theme_store";
import { ref } from "vue";

const theme_store = use_theme_store();

let current_theme = ref(theme_store.get_current_instant());

function apply() {
    if (current_theme.value != "") {
        theme_store.select_theme(current_theme.value);
    }
}

</script>

<template>
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 py-4">
        <h2>Options</h2>
        <form>
            <fieldset>
                <div class="form-group mb-4">
                    <label for="theme" class="form-label"></label>
                    <select name="theme" id="theme" class="form-select" v-model="current_theme">
                        <option v-for="theme in theme_store.get_all()" :key="theme" :value="theme">{{ theme }}</option>
                    </select>
                </div>
                <button @click.prevent="apply()" class="btn btn-primary">Apply</button>
            </fieldset>
        </form>
    </div>
</template>