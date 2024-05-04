<script setup>

const props = defineProps({
    label: String,
    modelValue: {
        type: String, Number,
    },
    checked: {
        type: Boolean,
        default: false,
    }
});

const emits = defineEmits(['update:modelValue', "checked"]);

function select(event) {
    emits("checked", props.label);
    emits('update:modelValue', event.target.checked)
}
</script>

<template>
    <div>
        <input type="checkbox" @change="select($event)" :checked="checked">
        <span class="text-sm px-2 capitalize">
            {{ label }}
        </span>
    </div>
</template>
