<template>
    <div class="options">
        <h2>Options</h2>
        <form>
            <fieldset>
                <div class="form-group">
                    <label for="themeSelect" class="form-label mt-4">Theme</label>
                    <select class="form-select theme" v-model="currentTheme">
                        <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
                    </select>
                </div>
                <button @click.prevent="apply()" class="btn btn-primary">Apply</button>
            </fieldset>
        </form>
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
.options {
    width: 50vw;
    margin: auto;
    padding: 2rem;

    .form-group {
        margin: 1rem;
    }
    .btn {
        margin: 1rem;
    }
}
</style>