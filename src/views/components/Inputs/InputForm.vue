<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String, Number,
    },
    label: String,
    type: {
        type: String,
        default: 'text'
    }
})
defineEmits(['update:modelValue'])
</script>

<template>
    <div class="my-2">
        <p class="text-sm mb-1.5">{{ label }}</p>
        <input :type="type" @input="$emit('update:modelValue', $event.target.value)"
            class="ring-1 ring-gray-200 w-full px-2 py-0.5 rounded-sm">
    </div>
</template>
