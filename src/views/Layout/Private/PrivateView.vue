<template>
    <div>
        <Sidebar></Sidebar>
        <main class="lg:pl-72">
            <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                <RouterView :key="$route.fullPath"></RouterView>
            </div>
        </main>
    </div>
</template>
    
<script setup>
// import { ref } from 'vue'
import { RouterView } from 'vue-router';
import Sidebar  from '@/views/Layout/Private/SidebarNav.vue'

</script>