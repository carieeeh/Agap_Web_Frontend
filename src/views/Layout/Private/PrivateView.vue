<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router';
import { useEmergenciesCollection } from '@/stores/emergencies';
import { useUsersCollection } from '@/stores/users';
import Sidebar from '@/views/Layout/Private/SidebarNav.vue'

const openHamburger = ref(false);

onMounted(() => {
    useEmergenciesCollection().getEmergencies();
    useEmergenciesCollection().getEmergenciesFeedbacks();
    useUsersCollection().getUsers();
})
</script>

<template>
    <div class="relative">
        <Sidebar class="hidden lg:block " :isOpen="true" />
        <Sidebar class="lg:hidden z-50" :isOpen="openHamburger" @close="openHamburger = false" />
        <main class="lg:pl-72">
            <div class="flex mt-5 pr-3 items-center justify-between">
                <p class="ml-3 lg:ml-8 text-primaryRed text-xl font-semibold">{{ $route.name }}</p>
                <button :class="['lg:hidden', { 'hidden': openHamburger }]" @click="openHamburger = true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                <RouterView :key="$route.fullPath"></RouterView>
            </div>
        </main>
    </div>
</template>