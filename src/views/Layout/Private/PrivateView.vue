<script setup>
import { onMounted, watch, ref } from 'vue'
import { RouterView } from 'vue-router';
import { useUsersCollection } from '@/stores/users';
import { useAuthentication } from '@/stores/authentication';
import { useHandleMessaging } from '@/composables/firebase_messaging';
import { useEmergenciesCollection } from '@/stores/emergencies';
import EmergencyInfo from "@/views/components/Dialogs/EmergencyInfo.vue";
import Sidebar from '@/views/Layout/Private/SidebarNav.vue'
import { useStationCollection } from '@/stores/station';
import { useWarningMessage } from '@/composables/utilities';


const emergencies = useEmergenciesCollection();
const selectedEmergency = ref(null);
const showModal = ref(false);

function accept(event) {
    showModal.value = false;
    emergencies.acceptEmergency(event);
}

function reject(event) {
    showModal.value = false;
    emergencies.rejectEmergency(event);
}

watch(() => emergencies.emergencies, (newValue) => {
    const index = newValue.findIndex(item => item.status === "pending" || item.status === "additional");
    selectedEmergency.value = newValue[index];
    useStationCollection().findNearestStation(selectedEmergency.value);
    showModal.value = true;
}, { deep: true });

watch(() => useUsersCollection().users, () => {
    useUsersCollection().updateUserFCMToken(useAuthentication().user.uid);
})

watch(() => useUsersCollection().users, (newValue) => {
    const index = newValue.findIndex(item => item.status === "pending");
    console.log(index);
    if (index != -1) {
        useWarningMessage("Pending registrations.", "We have a new or pending rescuer registration.", "top-right")
    }
})

onMounted(() => {
    useStationCollection().getStations();
    useUsersCollection().getUsers();
    useEmergenciesCollection().getRescuerLocations();
    useEmergenciesCollection().getEmergencies();
    useEmergenciesCollection().getEmergenciesFeedbacks();
    useHandleMessaging();

})
</script>

<template>
    <div class="relative">
        <EmergencyInfo v-if="selectedEmergency" :isOpen="showModal" @close="showModal = false"
            :emergency="selectedEmergency" :dismissible="false" @accept="accept($event)" @reject="reject($event)" />
        <Sidebar />
        <main class="lg:pl-72">
            <div class="flex mt-5 pr-3 items-center justify-between">
                <p class="ml-3 lg:ml-8 text-primaryRed text-xl font-semibold">{{ $route.name }}</p>
            </div>
            <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                <RouterView :key="$route.fullPath"></RouterView>
            </div>
        </main>
    </div>
</template>