<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({ tableHeader: Array, items: Array, users: Array, label: String })
const formatDate = (date) => {
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', options);
}

const findUser = (emergency_user_uid) => {
    let userData = props.users.find(user => user.user_uid == emergency_user_uid)
    return userData ? userData.first_name + ' ' + userData.last_name : emergency_user_uid;
}
</script>

<template>
    <div>
        {{ items[0] }}
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
                                    <tr v-for="(item, index) in items" :key="index">
                                        <!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ person.name }}
                                    </td> -->
                                        <td v-for="header in tableHeader" :key="header.key"
                                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <p v-if="header.key == 'resident_uid'">
                                                {{ findUser(item[header.key]) }}
                                            </p>
                                            <p v-else-if="header.key == 'created_at'">
                                                {{ formatDate(item[header.key]) }}
                                            </p>
                                            <p v-else>{{ item[header.key] }}</p>
                                        </td>
                                        <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ person.email }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ person.role }}
                                    </td>
                                    <td
                                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" class="text-primaryRed hover:text-indigo-900">Edit<span
                                                class="sr-only">, {{ person.name }}</span></a>
                                    </td> -->
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