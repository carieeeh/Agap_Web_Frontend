<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({ stats: { type: Array } });
const emits = defineEmits(['click']);

const click = () => {
    emits('click');
}

</script>


<template>
    <div>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5" @click="click()">
            <div v-for="item in stats" :key="item.name" :class="[
                'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-b-4',
                item.color,
            ]">
                <dt class="truncate text-sm font-medium text-gray-500">
                    {{ item.name }}

                </dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 relative">
                    {{ item.stat }}
                    <img class="h-14 absolute -top-6 -right-4" :src="item.image" alt="" />
                </dd>
            </div>
        </dl>
    </div>
</template>