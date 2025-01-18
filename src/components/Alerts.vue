<script setup lang="ts">
import {use_alert_store, AlertType} from "@/stores/alert_store";

const alert_store = use_alert_store();
</script>

<template>
    <TransitionGroup tag="div" class="alerts row flex-column w-100 gy-5 p-0 mx-auto align-items-center position-fixed" name="alerts">
        <div v-for="alert in alert_store.alerts" :key="alert.id" :class="['alert-' + AlertType[alert.type].toLowerCase()]" class="my-1 col-sm-10 col-12 alert alert-dismissible">
            <button @click="alert_store.remove(alert.id)" type="button" class="btn-close"></button>
            <p class="mb-0">{{ alert.text }}</p>
        </div>
    </TransitionGroup>
</template>

<style scoped>
.alerts {
    z-index: 1;
    margin-top: -1rem;
}

.alerts-move, .alerts-enter-active, .alerts-leave-active {
    transition: all 0.5s ease;
}

.alerts-leave-active {
    transition: all 0.5s;
    position: absolute;
}
.alerts-enter-from, .alerts-leave-to {
    opacity: 0;
}
</style>