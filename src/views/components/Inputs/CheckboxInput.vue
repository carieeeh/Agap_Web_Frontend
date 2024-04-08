<script setup>

defineProps({
    label: String,
    modelValue: {
        type: String, Number,
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div>
        <input type="checkbox" @change="$emit('update:modelValue', $event.target.checked)">
        <span class="text-sm px-2">
            {{ label }}
        </span>
    </div>
</template>
