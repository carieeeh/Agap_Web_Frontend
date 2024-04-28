<script setup>
defineProps(["items", "modelValue", "label"]);
const emits = defineEmits(["update:modelValue"]);

function select(item) {
    emits("update:modelValue", item);
}
</script>

<template>
    <div>
        <div class="text-sm">
            {{ label }}
        </div>
        <fieldset class="mt-1">
            <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div v-for="(item, index) in items" :key="index" class="flex items-center">
                    <input :id="index" name="notification-method" type="radio" :checked="item == modelValue" @click="select(item)"
                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label :for="index" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        {{ item }}
                    </label>
                </div>
            </div>
        </fieldset>
    </div>
</template>
