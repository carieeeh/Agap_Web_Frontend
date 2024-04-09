<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String, Number,
    },
    label: String,
    type: {
        type: String,
        default: 'text'
    },
    rules: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});

const errors = ref([]);
const emits = defineEmits(['update:modelValue']);

function emitValue(value) {
    if (props.rules.includes('required') && value.trim() == "" && !errors.value.includes('required')) {
        errors.value.push('required');
    } else if (!props.rules.includes('required') && errors.value.includes('required')) {
        const index = errors.value.indexOf('required');
        errors.value.splice(index, 1);
    }
    emits('update:modelValue', value);
}
</script>

<template>
    <div class="my-3">
        <p class="text-sm mb-1.5">{{ label }}</p>
        <input :type="type" @input="emitValue($event.target.value)" :value="modelValue" :disabled="disabled"
            :class="['ring-1 ring-gray-400 w-full px-2 py-1 rounded-sm text-sm', { 'bg-gray-200': disabled }]">
        <p v-if="errors.length > 0" class="text-xs text-red-500 mt-1.5">{{ `The ${label} is ${errors.join(", ")}` }}</p>
    </div>
</template>
