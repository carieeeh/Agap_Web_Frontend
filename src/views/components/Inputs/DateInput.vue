<!-- eslint-disable no-unused-vars -->
<script setup>
const props = defineProps({ label: String, modelValue: String });
const emits = defineEmits(['update:modelValue'])
</script>

<template>
    <div>
        <p class="text-sm p-1">{{ label }}</p>
        <input :value="modelValue" @input="$emit('update:modelValue')" type="date" class="border border-gray-300 rounded-md w-full px-2 py-1 flex items-center">
    </div>
</template>
