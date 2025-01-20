<script setup lang="ts">

export type ValidationResult = {
    valid: boolean;
    message: string;
};

const {name, type = "text", validation} = defineProps<{
    name: string,
    type: string,
    validation?: ValidationResult
}>();

const model = defineModel();


</script>

<template>
    <div class="form-group mb-4">
        <label :for="name" class="form-label">
            <slot>{{name}}</slot>
        </label>
        <input :type="type" :name="name" :id="name" v-model="model" class="form-control"
            :class="{'is-valid': validation?.valid === true, 'is-invalid': validation?.valid === false}">
        <div v-show="validation !== null" :class="[validation?.valid === true ? 'valid-feedback' : 'invalid-feedback']">
            {{validation?.message}}
        </div>
    </div>
</template>