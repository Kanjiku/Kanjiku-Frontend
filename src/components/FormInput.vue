<script setup lang="ts">
import type { ValidationResult } from '@/utils/utils';

const { name, type = "text", placeholder, validation } = defineProps<{
	type?: string,
	label_str: string,
	name: string,
	placeholder?: string,
	required?: boolean,
	validation?: ValidationResult | null
}>();

const model = defineModel();


</script>

<template>
	<div class="form-group mb-4">
		<label :for="name" class="form-label">
			{{ label_str }}<span v-show="required" class="text-danger">*</span>
		</label>
		<input :type="type" :name="name" :id="name" v-model="model" class="form-control" :placeholder="placeholder"
			:class="{ 'is-valid': validation?.valid === true, 'is-invalid': validation?.valid === false }">
		<div v-show="validation !== null && validation !== undefined && validation.message !== ''"
			:class="[validation?.valid === true ? 'valid-feedback' : 'invalid-feedback']">
			{{ validation?.message }}
		</div>
	</div>
</template>