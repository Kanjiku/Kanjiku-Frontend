<template>
    <div class="options">
        <div class="mx-auto col-12 col-sm-10 col-md-8 mb-4">
            <h2>Options</h2>
            <form>
                <fieldset>
                    <div class="form-group mb-4">
                        <label for="themeSelect" class="form-label">Theme</label>
                        <select class="form-select theme" v-model="currentTheme">
                            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
                        </select>
                    </div>
                    <button @click.prevent="apply()" class="btn btn-primary">Apply</button>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore, mapMutations } from "vuex";

const store = useStore();

const themes = computed(() => store.getters.getThemes);
let currentTheme = ref(localStorage.getItem("theme"));

const apply = () => {
    store.commit("setTheme", currentTheme.value);
}
</script>

<style scoped lang="scss">
</style>