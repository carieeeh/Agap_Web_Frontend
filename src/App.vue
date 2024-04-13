<script setup>
import { watch, ref } from 'vue';
import { RouterView } from 'vue-router'
import { useEmergenciesCollection } from '@/stores/emergencies';
import EmergencyInfo from "@/views/components/Dialogs/EmergencyInfo.vue";

const emergencies = useEmergenciesCollection();
const selectedEmergency = ref(null);
const showModal = ref(false);

watch(() => emergencies.emergencies, (newValue) => {
  const index = newValue.findIndex(item => item.status === "pending");
  selectedEmergency.value = newValue[index];
  showModal.value = true;
}, { deep: true });
</script>

<template>
  <EmergencyInfo v-if="selectedEmergency" :isOpen="showModal" @close="showModal = false" :emergency="selectedEmergency" :dismissible="false" />
  <RouterView />
</template>