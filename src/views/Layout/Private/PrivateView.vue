<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router';
import { useEmergenciesCollection } from '@/stores/emergencies';
import { useUsersCollection } from '@/stores/users';
import Sidebar from '@/views/Layout/Private/SidebarNav.vue'

onMounted(() => {
    useEmergenciesCollection().getEmergencies();
    useEmergenciesCollection().getEmergenciesFeedbacks();
    useUsersCollection().getUsers();
})
</script>

<template>
    <div>
        <Sidebar></Sidebar>
        <main class="lg:pl-72">
            <p class="ml-8 mt-5 text-primaryRed text-xl font-semibold">{{ $route.name }}</p>
            <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                <RouterView :key="$route.fullPath"></RouterView>
            </div>
        </main>
    </div>
</template>