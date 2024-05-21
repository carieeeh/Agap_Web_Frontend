<template>
    <div class="w-full grid justify-center h-screen">
        <div class="mt-28">
            <img class="h-32 z-10" src="/assets/images/red_no_bg_logo.png" alt="" />

            <p v-if="isLoading"
                class="animate-pulse hover:cursor-not-allowed bg-red-500 w-40 flex justify-center mx-auto my-10 rounded p-2 text-white">
                Generating excel ...</p>
            <div v-else
                class="mx-auto flex justify-center my-10 w-36 bg-green-400 p-2 rounded-md hover:bg-green-500 hover:cursor-pointer">
                <download-excel :data="jsonData">
                    Download excel
                </download-excel>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(true);
const jsonData = ref({});

onMounted(() => {
    jsonData.value = JSON.parse(route.query.data);
    console.log(jsonData.value[0])
    setTimeout(() => {
        isLoading.value = false; // Hide loading message after 3 seconds
    }, 5000);
});
</script>