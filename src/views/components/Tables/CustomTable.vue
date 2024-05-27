<script setup>
import { ref, computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
const  props = defineProps({ tableHeader: Array, items: Array, users: Array, label: String })
const emits = defineEmits(['row-click', 'next', 'prev']);

const rowClick = (event) => {
    emits('row-click', event)
}
// const searchQuery = ref('');
const filteredItems = ref(props.items);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));

// function search() {
//     const query = searchQuery.value.toLowerCase();
//     filteredItems.value = props.items?.filter(item => item?.role.toLowerCase().includes(query) || item?.full_name?.toLowerCase().includes(query));
//     currentPage.value = 1; // Reset to first page on search
// }


const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.value.slice(start, end);
});

// onMounted(() => {
//     search();
// })
</script>

<template>
    <div>
        <div class="mt-5">
            <div class="sm:flex sm:items-center">
                <div class="flex sm:flex-auto justify-between">
                    <div class="flex">
                        <h1 class="text-base font-semibold leading-6 text-gray-900">{{ label }}</h1>
                        <slot name="buttons">

                        </slot>
                    </div>
                    <!-- <div class="border p-1 rounded-md">
                        <input placeholder="Search ..." class="rounded-sm focus:outline-none" type="text"
                            @change="search()" v-model="searchQuery">
                        <button class="bg-red-500 rounded-md p-2 text-sm text-white hover:bg-red-600" @click="search()">
                            Search
                        </button>
                    </div> -->
                    <div class="flex gap-5">
                        <button class="rounded-md bg-primaryRed text-white p-1" @click="prevPage()">
                            <ChevronLeftIcon class="h-5 w-5 shrink-0" />
                        </button>
                        <button class="rounded-md bg-primaryRed text-white p-1" @click="nextPage()">
                            <ChevronRightIcon class="h-5 w-5 shrink-0" />
                        </button>
                    </div>
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
                                    <tr v-for="(item, index) in paginatedItems" :key="index" @click="rowClick(item)"
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