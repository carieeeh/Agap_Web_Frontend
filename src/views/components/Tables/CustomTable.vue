<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({ tableHeader: Array, items: Array, users: Array, label: String })
const emits = defineEmits(['row-click']);

const rowClick = (event) => {
    emits('row-click', event)
}
</script>

<template>
    <div>
        <div class="mt-5">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">{{ label }}</h1>
                </div>
            </div>
            <div class="mt-3 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr class="first:pl-4 last:pr-4">
                                        <th scope="col" v-for="header in tableHeader" :key="header.key"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <p>{{ header.label }}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(item, index) in items" :key="index" @click="rowClick(item)"
                                        class="hover:bg-slate-200 hover:cursor-pointer">
                                        <td v-for="header in tableHeader" :key="header.key"
                                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <slot :name="header.key" :data="item">
                                                <p>{{ item[header.key] }}</p>
                                            </slot>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>